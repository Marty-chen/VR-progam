import request from './network.js';
//商品列表
export function goods_list(opts) {
    return request({
        url: '/api/gds/list.pub',
        data: opts,
        method: 'post'
    })
}

//商品信息
export function goods_detail(opts) {
    return request({
        url: '/api/gds/detail.pub',
        data: opts,
        method: 'post'
    })
}
//商品主图和详情图
export function goods_imgs(opts) {
    return request({
        url: '/api/gds/file/list.pub',
        data: opts,
        method: 'post'
    })
}

//商品承诺
export function goods_promise(opts) {
    return request({
        url: '/api/gds/commitment/list.pub',
        data: opts,
        method: 'post'
    })
}

//推荐更多
export function goods_recommend(opts) {
    return request({
        url: '/api/gds/recommend.pub',
        data: opts,
        method: 'post'
    })
}

//商品sku
export function goods_sku(opts) {
    return request({
        url: '/api/gds/sku/skus.pub',
        data: opts,
        method: 'post'
    })
}

//立即购买
export function goods_payNow(opts) {
    return request({
        url: '/api/odr/confirmOrder',
        data: opts,
        method: 'post'
    })
}

//加入购物车
export function goods_addCart(opts) {
    return request({
        url: '/api/ship/cart/save',
        data: opts,
        method: 'post'
    })
}

//提交订单
export function goods_createOrder(opts) {
    return request({
        url: '/api/odr/createOrder',
        data: opts,
        method: 'post',
        sign: true
    })
}