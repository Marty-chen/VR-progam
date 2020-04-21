import request from './network.js';
//店铺列表
export function shopList(opts) {
    return request({
        url: '/api/store/list.pub',
        data: opts,
        method: 'post'
    })
}

//店铺详情
export function shopDetail(opts) {
    return request({
        url: '/api/store/detail.pub',
        data: opts,
        method: 'post'
    })
}