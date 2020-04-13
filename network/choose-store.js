import request from './network.js';

export function getStore(opts) {
    return request({
        url: '/api/usr/store/nearbyMerchantOrder',
        data: opts,
        method: 'post'
    })
}