import request from './network.js';
// 订单列表
export function getOrderList(opts) {
    return request({
        url: '/api/odr/findListByUserId',
        data: opts,
        method: 'post'
    })
}
//订单详情数据
export function orderDetails(opts) {
    return request({
        url: '/api/odr/getOdrByUserId',
        data: opts,
        method: 'post'
    })
}

//取消订单
export function cancelOrder(opts) {
    return request({
        url: '/api/odr/rapidCarWashRefund',
        data: opts,
        method: 'post'
    })
}

//评价
export function comment(opts) {
    return request({
        url: '/api/odr/eva/save',
        data: opts,
        method: 'post'
    })
}

//确认完成
export function confirmOdr(opts) {
    return request({
        url: '/api/odr/confirmOdr',
        data: opts,
        method: 'post'
    })
}

//确认预约
export function confirmReserve(opts) {
    return request({
        url: '/api/odr/confirmReserve',
        data: opts,
        method: 'post'
    })
}

//取消预约
export function cancelYuyue(opts) {
    return request({
        url: '/api/odr/cancelReserve',
        data: opts,
        method: 'post'
    })
}

//快捷洗车价格
export function wascarprice(opts) {
    return request({
        url: '/api/odr/wascarprice',
        data: opts,
        method: 'post'
    })
}