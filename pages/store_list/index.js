import {
    shopList
} from "../../network/shop"


var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
    key: 'L32BZ-WO7KW-4TTRT-O5OLK-XY242-PXB6H'
});

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shop_list:[],
        showAuthorized: false,
        storeName: '',
        current: 1,
        size: 10,
        pages: '',
        address: {
            recommend: ''
        },
        showNoMore: false//显示没有更多

    },

    //关闭受权弹框
    handleClosePopup() {
        this.setData({
            showAuthorized: false
        });
    },
    closeAuthorized() {
        this.setData({
            showAuthorized: false
        });
    },
    /** 刷新定位 */
    handleRefreshLocation() {
        this.getCityInfo()
    },
    /** 手动获取定位 */
    handleGetLocation() {
        let _this = this
        wx.getLocation({
            type: 'wgs84', //返回可以用于wx.openLocation的经纬度
            success: res => {
                const latitude = res.latitude
                const longitude = res.longitude

                // console.log(data)
                wx.chooseLocation({
                    latitude,
                    longitude,
                    success: data => {

                        let mapLocation = {
                            lat: data.latitude,
                            lng: data.longitude
                        }
                        console.log(mapLocation)
                        _this.setData({
                            'address.recommend': data.name
                        })


                        // _this.handleGetStore(mapLocation)

                    }
                })
            },
            fail: err => {
                this.setData({
                    showAuthorized: true
                });

            }

        })
    },

    /**用经纬度逆解析得到地址信息 */
    getCityInfo() {
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                // console.log(res);
                var latitude = res.latitude;
                var longitude = res.longitude;
                location = {
                    latitude,
                    longitude
                };
                let parm = {
                    lat: latitude,
                    lng: longitude
                }
                wx.setStorageSync('location', parm)
                this.getQQmapsdk(location)
                this.handleGetStore(parm)
            },
            fail: err => {
                console.log(err)
                this.setData({
                    showAuthorized: true
                });
            }
        })

    },
    //调用腾讯地图接口逆向得到地址
    getQQmapsdk(location) {
        qqmapsdk.reverseGeocoder({
            location,
            success: res => {
                this.setData({
                    address: {
                        recommend: res.result.formatted_addresses.recommend,
                        add: res.result.address
                    }
                })
                // console.log(this.data.address);
            },
            fail: error => {
                console.error(error);
            },
        })
    },
    //传入经纬度向后台请求店铺数据
    handleGetStore(parm) {
        let data = {
            ...parm,
            current: this.data.current,
            size: this.data.size
        }
        console.log(data)
        shopList(data).then(res => {
            this.setData({
                pages: res.data.pages,
                shop_list: res.data.records
            })

        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCityInfo()

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('33')
        if (this.data.current < this.data.pages) {
            this.data.current += 1
            let location = wx.getStorageSync('location')
            this.handleGetOrderList(location)
        } else {
            
            // if(this.data.showNoMore) return
            console.log('33')
            this.setData({
                showNoMore: true
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

})