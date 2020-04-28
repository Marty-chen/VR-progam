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

// 退款理由列表
export function order_reason(opts) {
    return request({
        url: '/api/odr/reason',
        data: opts,
        method: 'post'
    })
}

// 确认收货
export function order_confirmTake(opts) {
    return request({
        url: '/api/odr/confirmTake',
        data: opts,
        method: 'post'
    })
}

// 去付款
export function order_payment(opts) {
    return request({
        url: '/api/odr/payment',
        data: opts,
        method: 'post'
    })
}
// 修改地址
export function order_changeAddr(opts) {
    return request({
        url: '/api/odr/editAddress',
        data: opts,
        method: 'post'
    })
}

// 获取订单地址
export function order_addr(opts) {
    return request({
        url: '/api/odr/address',
        data: opts,
        method: 'post'
    })
}

