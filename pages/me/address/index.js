// pages/me/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //去添加地址
  toNewAddress() {
    wx.navigateTo({
      url: '/pages/me/address/new_address/index'
    })
  },
  //选择地址
  handleChooseAddr() {
    let router = getCurrentPages()
    console.log(router)
    //判断是否在购物车跳转过来的
    if(router[1].route == "pages/cart/confirm_order/index") {

    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})