// pages/order/order_details/index.js
import { order_detail,order_cancel,order_del } from "../../../network/order"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowCancel: false,
    cancelRadio: '1',
    orderDetail: ''
  },
  //去退款页面
  handleToRefund(e) {
    let goods = [e.currentTarget.dataset.order];
    wx.navigateTo({
      url: '/pages/refund/index',
      success: function(res){
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { goods })
      }
    })
  },

  //复制订单编号
  handleCopy(e) {
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
      //取消订单选择
    onClick(event) {
      const {
          name
      } = event.currentTarget.dataset;
      console.log(name)
      this.setData({
          cancelRadio: name
      });
  },
  //取消订单
  handleCancelOrder() {
    order_cancel(this.data.orderDetail.orderId).then(res=>{
      wx.showToast({
        title: '取消成功',
        icon: 'success'
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/order/index'
        })
      },1000)
      
    })
  },
  //删除订单
  handleDelOrder() {
    order_del(this.data.orderDetail.orderId).then(res=>{
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/order/index'
        })
      },1000)
    })
  },
  //查询后台订单详情数据
  getOrderDetail() {
    let id = {orderId: this.data.orderId}
    order_detail(id).then(res=>{
      this.setData({
        orderDetail: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderId)
    this.data.orderId = options.orderId;
    this.getOrderDetail()
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