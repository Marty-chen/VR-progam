import {
  head
} from './config.js'
import {
  md5,
  aes
} from "../utils/signCrypto"

export function signature(options) {
  let key = aes.de(wx.getStorageSync('key'));
  // console.log("加密后key值为:" + key)
  let sign = `${JSON.stringify(options)}&platform=${
          head.platform
        }&timestamp=${head.timestamp}&version=${head.version}&key=${key}`;
         console.log(md5(sign))
  return md5(sign);

}