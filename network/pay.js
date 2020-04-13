import request from './network.js';
//支付
export function createOrder(opts) {
    return request({
        url: '/api/odr/rapidCarWashOdr',
        data: opts,
        method: 'post'
    })
}

//微信用户取消支付

export function cancelOrder(opts) {
    return request({
        url: '/api/odr/cancelOrder',
        data: opts,
        method: 'post'
    })
}