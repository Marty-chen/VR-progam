import request from './network.js';
//购物车列表
export function cart_list(opts) {
    return request({
        url: '/api/ship/cart/list',
        data: opts,
        method: 'post'
    })
}

//更新数量
export function cart_update(opts) {
    return request({
        url: '/api/ship/cart/update',
        data: opts,
        method: 'post'
    })
}

//确认订单页面
export function confirmOrder(opts) {
    return request({
        url: '/api/odr/cartConfirmOrder',
        data: opts,
        method: 'post'
    })
}