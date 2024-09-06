// 获取浏览器信息

import { BrowserInfo } from '../interface'

export function getBrowserInfo(): BrowserInfo {
  const ua = window.navigator.userAgent.toLowerCase()
  let name = ''
  let version = ''

  const match = (regex: RegExp) => ua.match(regex) || ''

  if (match(/msie ([\d.]+)/)) {
    // ie
    version = match(/msie ([\d.]+)/)[1]
    name = 'IE'
  } else if (match(/firefox\/([\d.]+)/)) {
    // firefox
    version = match(/firefox\/([\d.]+)/)[1]
    name = 'Firefox'
  } else if (match(/chrome\/([\d.]+)/)) {
    // Chrome
    version = match(/chrome\/([\d.]+)/)[1]
    name = 'Chrome'
  } else if (match(/opera.([\d.]+)/)) {
    // Opera
    version = match(/opera.([\d.]+)/)[1]
    name = 'Opera'
  } else if (match(/version\/([\d.]+).*safari/)) {
    // Safari
    version = match(/version\/([\d.]+).*safari/)[1]
    name = 'Safari'
  } else if (match(/edge\/([\d.]+)/)) {
    version = match(/edge\/([\d.]+)/)[1]
    name = 'edge'
  } else if (match(/maxthon\/([\d.]+)/)) {
    // 遨游浏览器
    version = match(/maxthon\/([\d.]+)/)[1]
    name = '傲游浏览器'
  } else if (match(/qqbrowser\/([\d.]+)/)) {
    // QQ浏览器
    version = match(/qqbrowser\/([\d.]+)/)[1]
    name = 'QQ浏览器'
  } else if (match(/se 2.x/)) {
    // 搜狗浏览器
    name = '搜狗浏览器'
  }
  return { name, version }
}
