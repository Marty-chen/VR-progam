import request from './network.js';
//店铺列表
export function shopList(opts) {
    return request({
        url: '/api/store/list.pub',
        data: opts,
        method: 'post'
    })
}