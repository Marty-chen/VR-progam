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
        shop_list: [],
        showAuthorized: false,
        location: '',
        searchShopName: '',
        current: 1,
        size: 5,
        pages: '',
        address: {
            recommend: ''
        },
        showNoMore: false //显示没有更多

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
                wx.chooseLocation({
                    latitude,
                    longitude,
                    success: data => {
                        _this.data.location = {
                            lat: data.latitude,
                            lng: data.longitude
                        }

                        _this.setData({
                            'address.recommend': data.name
                        })
                        _this.handleClearData();

                    }
                })
            },
            fail: err => {
                _this.setData({
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
                this.data.location = parm
                wx.setStorageSync('location', parm)
                this.getQQmapsdk(location)
                this.handleClearData();
            },
            fail: err => {
                console.log(err)
                this.setData({
                    showAuthorized: true
                });
                this.handleClearData();
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
    //向后台请求店铺列表数据
    handleGetStore() {
        let data = {
            storeName: this.data.searchShopName,
            ...this.data.location,
            current: this.data.current,
            size: this.data.size
        }
        // console.log(data)
        shopList(data).then(res => {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            let shop_list = this.data.shop_list;
            if (res.data.records.length > 0) {
                res.data.records.forEach(i => {
                    shop_list.push(i)
                })
            }

            this.setData({
                pages: res.data.pages,
                shop_list
            })

        })
    },
    //搜索店铺
    handleSearchShop(event) {
        if (!event.detail) return
        this.data.searchShopName = event.detail;
        this.handleClearData();
    },
    //监听搜索框输入
  handleSearchInput(e) {
    this.setData({
        searchShopName: e.detail
    })
  },
  //监听搜索框失去焦点事件
  handleSearchBlur(){
    if(this.data.searchShopName) return
    this.handleClearData()
  },
    //清除搜索框内容
    handleClearSearch() {
        this.data.searchShopName = ''
        this.handleClearData()
    },
    //清空数据重新向后台获取数据
    handleClearData() {
        this.data.current = 1;
        this.data.shop_list = [];
        this.handleGetStore()
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
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.setData({
            showNoMore: false,
        })
        this.data.current = 1;
        this.data.shop_list = [];
        this.handleGetStore()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.current < this.data.pages) {
            this.setData({
                showNoMore: false
            })
            this.data.current += 1
            this.handleGetStore()
        } else {
            if (this.data.showNoMore) return
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