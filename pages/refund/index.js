// pages/refund/index.js
import {
  order_reason
} from "../../network/order"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isShowCancel: false,
    reasonId: '',
    reasonList: [], //退款理由列表
    reason_name: '',
    totalPrice: 0,
    refundExplain: '',
    orderId: ''
  },


  //复制订单编号
  handleCopy(e) {
    // console.log(e.currentTarget.dataset.order_num)
    wx.setClipboardData({
      data: e.currentTarget.dataset.order_num
    })
  },
  /** 点击显示弹层 */
  handleShowCancel() {
    this.setData({
      isShowCancel: true
    });
  },
  /** 点击关闭弹层 */
  onCloseCancel() {
    this.setData({
      isShowCancel: false
    });
  },
  //退款理由选择
  onClick(event) {
    const reasonId = event.currentTarget.dataset.name;
    this.setData({
      reasonId
    });
    console.log(this.data.reasonId)
  },
  //退款理由确定
  handleCancelOrder() {
    let reason_name = this.data.reasonList.find(item=>item.reasonId == this.data.reasonId).name;
    this.setData({
      reason_name,
      isShowCancel: false
    })
    console.log(reason_name)
  },

  //退款说明
  bindKeyInput(e) {
    console.log(e.detail.value)
    this.data.refundExplain = e.detail.value;
  },

  //获取退款理由数据
  getReason() {
    let type = 1;
    order_reason(type).then(res => {
      this.setData({
        reasonList: res.data
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data => {
      console.log(data.goods)
      let goods = data.goods;
      let totalPrice = 0;
      goods.forEach(item => {
        totalPrice += item.price * item.qty
      });
      totalPrice = totalPrice.toFixed(2)
      this.setData({
        orderId: goods[0].orderId,
        goods,
        totalPrice
      })
    })
    this.getReason()
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