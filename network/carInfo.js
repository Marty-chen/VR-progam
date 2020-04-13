import request from './network.js';

//增加车辆
export function saveCarInfo(opts) {
    return request({
        url: '/api/usr/carinfo/save',
        data: opts,
        method: 'post'
    })
}

// 查看所有车辆信息
export function findListByUserId(opts) {
    return request({
        url: '/api/usr/carinfo/findListByUserId',
        data: opts
    })
}

//删除车辆
export function delCar(opts) {
    return request({
        url: '/api/usr/carinfo/del',
        data: opts,
        method: 'post'
    })
}


//更新车辆信息   设为默认
export function updateCar(opts) {
    return request({
        url: '/api/usr/carinfo/update',
        data: opts,
        method: 'post'
    })
}