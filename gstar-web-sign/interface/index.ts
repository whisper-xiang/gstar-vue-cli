export interface SignConfig {
  encryptKey: string // 加密key
  clientInfo: {
    clientType: string // 客户端信息
    clientVersion: string
    fromClient: string // 来源客户端
  }
  style?: number
  secret?: number
  token: string | undefined // 用户token
  projectName: string // 项目名称
  disabledSign?: boolean // 禁用签名校验
  encryptIv?: string // 加密偏移量
  fileUrls?: string[] // 上传及下载文件相关接口在此处定义
  log?: boolean // 是否打印日志
}

export interface ReqHeader {
  'Request-Date': string
  'Request-Id': string
  'Request-Salt': string
  'hc-user-agent': string
}
export interface ReqParam {
  sign: string
  key: string
}

export interface ReqEncrypt {
  param: ReqParam
  headers: ReqHeader
}

export interface BrowserInfo {
  name: string
  version: string
}
