import request from './network.js';
//首页数据
export function getHomeData(opts) {
    return request({
        url: '/api/home.pub',
        data: opts,
        method: 'post'
    })
}


//附近商家门店数据
export function nearbyStore(opts) {
    return request({
        url: '/api/usr/store/nearbyMerchantDetail.pub',
        data: opts,
        method: 'post'
    })
}