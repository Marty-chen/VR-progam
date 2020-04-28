import {
    baseURL,
    timeout,
    head
} from './config.js'
import { signature } from "./sign.js"

function request(options) {
    wx.showLoading({
        title: '加载中',
    })
    let  header;
    let token = wx.getStorageSync('token');
    // 设置请求头
    if(token) {
        header = {
            ...head,
            token
        }
    }
    
    if(options.sign) {
        let sign = signature(options.data)
        console.log(sign)
         header.sign = sign;
    }
    
 
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + options.url,
            timeout,
            data: options.data,
            header,
            method: options.method,
            success: res=> {
                console.log(res.data)
                wx.hideLoading()
                if (res.data.code == "0000") {
                    setTimeout(() => {
                        resolve(res.data)
                    }, 10)
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 1500
                    })

                    // if (res.data.code == "1001" || res.data.code == "1007" || res.data.code == "1008" || res.data.code == "1009" || res.data.code == "1010" || res.data.code == "1012") {
                    //     wx.removeStorageSync('loginTokens');
                    //     wx.removeStorageSync('userInfo');
                    //     setTimeout(() => {
                    //         wx.navigateTo({
                    //             url: '/pages/login/login'
                    //         })
                    //     }, 1000)
                    //     return
                    // }
                    reject(res)
                }
            },
            fail: err => {
                wx.hideLoading()
                setTimeout(() => {
                    wx.showToast({
                        title: "服务器开小差了，请稍后再试",
                        icon: 'none',
                        duration: 2000
                    })
                }, 10)

                reject(err)
            },
            complete: res => {}
        })
    })
}

export default request;