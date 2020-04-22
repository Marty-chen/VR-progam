import request from './network.js';
//会员列表
export function vip_list(opts) {
    return request({
        url: '/api/usr/vip/grade/list.pub',
        data: opts,
        method: 'post'
    })
}

//VIP 支付
export function createOrder(opts) {
    return request({
        url: '/api/usr/vip/grade/unifiedOrder',
        data: opts,
        method: 'post'
    })
}