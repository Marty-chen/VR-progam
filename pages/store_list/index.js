import {
  getStore
} from "../../network/choose-store"


var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'L32BZ-WO7KW-4TTRT-O5OLK-XY242-PXB6H'
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
      address: {
          recommend: '',
          add: '',
          showAuthorized: false,
          store: [],
          wasCarPrice: '' //洗车价格
      },

  },
  //跳转到店铺详情
  toStoreDetails(e) {

      let store = e.currentTarget.dataset.store;
      wx.setStorageSync('store', store)
      let order = wx.getStorageSync('orderData');
      let orderData = {
          ...order,
          storeId: store.storeId
      }
      wx.setStorageSync('orderData', orderData)

      wx.navigateTo({
          url: '/pages/store-details/store-details?wasCarPrice=' + this.data.wasCarPrice
      });
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
  /** 手动刷新定位 */
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
      // var that = this;
      // let mapLocation = wx.getStorageSync('mapLocation') || '';
      // var location;
      // console.log(mapLocation)

      // if (mapLocation) {
      //     location = {
      //         latitude: mapLocation.lat,
      //         longitude: mapLocation.lng
      //     };
      //     this.getQQmapsdk(location);
      //     this.handleGetStore(mapLocation)

      // } else {
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
                  let mapLocation = {
                      lat: latitude,
                      lng: longitude
                  }
                  this.getQQmapsdk(location)
                  // this.handleGetStore(mapLocation)
              },
              fail: err => {
                  console.log(err)
                  this.setData({
                      showAuthorized: true
                  });
              }
          })
          // }
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
              console.log(this.data.address);
          },
          fail: error => {
              console.error(error);
          },
      })
  },
  //传入经纬度向后台请求店铺数据
  handleGetStore(location) {
      getStore(location).then(res => {
          if (res.code == '0000') {
              console.log(res)
              let store1 = res.data.mapList;
              store1.forEach((item, i) => {
                  store1[i].distance = Math.ceil(item.distance)
              })

              this.setData({
                  store: store1,
                  wasCarPrice: res.data.wasCarPrice
              })
          } else {
              wx.showToast({
                  title: res.message
              })
          }
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.getCityInfo()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})