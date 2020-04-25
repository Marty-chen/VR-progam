// pages/notice_pages/payment_success/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: ''
  },
  //查看详情
  handleToOrderDetail() {
    wx.reLaunch({
      url: '/pages/order/order_details/index?orderId=' + this.data.orderId
    })
  },
  // 返回首页
  handleToHome() {
    wx.switchTab({
      url: '/pages/home/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.orderId)
    this.data.orderId = options.orderId;
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