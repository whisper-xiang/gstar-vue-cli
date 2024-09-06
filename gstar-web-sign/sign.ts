import { ReqEncrypt, SignConfig } from './interface'
import { getBrowserInfo } from './util/browser'
import { decrypt, encrypt, md5 } from './util/encrypt'
import { generateRandom } from './util/random'

export class SignUtil {
  static config: SignConfig = {
    encryptKey: '', // 加密key
    disabledSign: false, // 禁用签名校验
    token: '', // 用户token
    clientInfo: {
      clientType: 'Business_PC',
      clientVersion: '1.0',
      fromClient: 'Business_PC'
    },
    style: 0,
    secret: 0,
    projectName: '',
    log: false
  }

  // 设置token
  static setToken(token: string): void {
    this.config.token = token
  }

  static setConfig(config: SignConfig) {
    this.config = { ...this.config, ...config }
  }

  // 获取加密配置
  static getConfig(): SignConfig {
    return this.config
  }

  // 加密请求数据
  static encryptReqData(data: object): ReqEncrypt {
    const { encryptKey, token, clientInfo, projectName, style, secret } = this.config

    if (!encryptKey && token) {
      throw new Error('请先配置加密key')
    }

    const timestamp = new Date().toUTCString() // 与 toGMTString 相同
    // 替换加密key中的5-10位为随机字符串
    const randomKey = generateRandom(6)
    const AESKey = encryptKey.replace(encryptKey.substring(4, 10), randomKey)

    const reqData = { data, clientInfo, style, secret }
    const encrypted = encrypt(encodeURIComponent(JSON.stringify(reqData)), AESKey)
    const requestId = `${projectName}_${generateRandom(8)}`
    const sign = md5(encrypted + timestamp + requestId + token)

    const { name, version } = getBrowserInfo()
    const headers = {
      'Request-Date': timestamp,
      'Request-Id': requestId,
      'Request-Salt': randomKey,
      'hc-user-agent':
        'DWGFastView-' +
        clientInfo.clientType +
        '-' +
        clientInfo.clientVersion +
        '-' +
        name +
        '-' +
        version +
        '-' +
        new Date().getTime()
    }
    return {
      param: {
        sign,
        key: encrypted
      },
      headers
    }
  }

  // 解密返回数据
  static decryptResData(data: string, randomKey: string): any {
    const { encryptKey } = this.config
    if (!encryptKey) {
      throw new Error('请先配置加密key')
    }
    const AESKey = encryptKey.replace(encryptKey.substring(4, 10), randomKey)
    const decryptData = decrypt(data, AESKey)
    const res = JSON.parse(decodeURIComponent(decryptData))
    if (this.config.log) {
      console.log(`响应数据:`, res)
      console.groupEnd()
    }
    return res
  }

  static logStart(config: any) {
    if (!this.config.log) return
    console.group(`%c [ 发起请求: ${config.url} ]`, 'font-size:16px; color:#bf2c9f;')
    console.log(`Host: ${config.baseURL}`)
    console.log(`请求参数: `, config.data)
  }
}
