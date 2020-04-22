import request from './network.js';
//登陆
export function userLogin(opts) {
    return request({
        url: '/api/login/wx.pub',
        data: opts,
        method: 'post'
    })
}

//退出登陆
export function logout(opts) {
    return request({
        url: '/api/logout',
        data: opts,
        method: 'post'
    })
}