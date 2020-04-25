import request from './network.js';
// 订单列表
export function order_list(opts) {
    return request({
        url: '/api/odr/list',
        data: opts,
        method: 'get'
    })
}

// 订单详情
export function order_detail(opts) {
    return request({
        url: '/api/odr/detail',
        data: opts,
        method: 'get'
    })
}

// 取消订单
export function order_cancel(opts) {
    return request({
        url: '/api/odr/cancel',
        data: opts,
        method: 'post'
    })
}

// 删除订单
export function order_del(opts) {
    return request({
        url: '/api/odr/del',
        data: opts,
        method: 'post'
    })
}

