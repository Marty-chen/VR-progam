// pages/goods_details/index.js
import Toast from "@vant/weapp/toast/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowPopup: false,
    currentIndex: 0
  },
  //立即购买
  payNow() {
    this.setData({
      isShowPopup: true
    })
  },
  //关闭立即购买
  closePopup() {
    this.setData({
      isShowPopup: false
    })
  },
  //选择规格
  sizeChoose(e) {
    let currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex
    })
  },
  onClickIcon() {
    console.log('点击图标');
  },

  onClickButton() {
    console.log('点击按钮');
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