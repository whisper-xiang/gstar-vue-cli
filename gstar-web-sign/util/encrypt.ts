import CryptoJS from 'crypto-js'

/**
 * 加密
 * @param word 要加密的字符串
 * @param key  密钥
 */
export function encrypt(word: string, key: string): string {
  const str = CryptoJS.enc.Utf8.parse(word)
  const k = CryptoJS.enc.Utf8.parse(key)
  const a = CryptoJS.AES.encrypt(str, k, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return a.toString()
}

/**
 * 解密
 * @param word 要解密的字符串
 * @param key 密钥
 */
export function decrypt(word: string, key: string): string {
  try {
    const k = CryptoJS.enc.Utf8.parse(key)
    return CryptoJS.AES.decrypt(word, k, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    return ''
  }
}

/**
 * md5
 * @param word
 */
export function md5(word: string): string {
  return CryptoJS.MD5(word).toString()
}
