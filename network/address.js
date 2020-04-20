import request from './network.js';
//新增地址
export function saveAddress(opts) {
    return request({
        url: '/api/usr/address/save',
        data: opts,
        method: 'POST'
    })
}

//地址列表
export function addressList(opts) {
    return request({
        url: '/api/usr/address/findListByUser',
        data: opts,
        method: 'POST'
    })
}

//地址编辑
export function addressUpdate(opts) {
    return request({
        url: '/api/usr/address/update',
        data: opts,
        method: 'POST'
    })
}

//地址删除
export function deleteAdd(opts) {
    return request({
        url: '/api/usr/address/delete',
        data: opts,
        method: 'POST'
    })
}