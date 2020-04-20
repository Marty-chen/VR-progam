export let head = {
    platform: 'WAP',
    version: '1.0.0',
    timestamp: Date.parse(new Date()),
    // "accept": "*/*",
    // "content-type": "application/json"
}

export const baseURL = 'http://192.168.101.233:23000';
export const timeout = 15000;

//图片域名
export const baseImg = 'https://zhilun-kjc.oss-cn-shenzhen.aliyuncs.com/home/';


// 安全域名设置，在设置request合法域名，添加 https://apis.map.qq.com