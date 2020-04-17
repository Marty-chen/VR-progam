// pages/cart/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllCheck: false,
    isEdit: true,
    value: 2
  },
  
  // 点击全选
  checkAll() {
    this.setData({
      isAllCheck: !this.data.isAllCheck
    })
  },

  //管理
  toEdit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  //步进器
  stepChange(value) {
    console.log(value.detail)
    // setTimeout(() => {
    //   this.setData({ value });
    // }, 500);
  },
  //去结算
  handleToConfirmOrder() {
    wx.navigateTo({
      url: '/pages/cart/confirm_order/index'
    })
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