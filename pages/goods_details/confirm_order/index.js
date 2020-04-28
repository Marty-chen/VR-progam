// pages/cart/confirm_order/index.js
import {
  confirmOrder
} from "../../../network/cart"
import {
  goods_createOrder
} from "../../../network/goods"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartIds: [],
    orderInfo: '',
    addr: '',
    note: ''
  },

  //切换地址
  handleChangeAddr() {
    wx.navigateTo({
      url: '/pages/me/address/index'
    })
  },
  //备注内容
  bindKeyInput(e) {
    this.setData({
      note: e.detail.value
    })
  },
  //提交订单
  handleToConfirmOrder() {
    let skus = []
    this.data.orderInfo.goodsList.forEach(item=>{
      skus.push({
        gdsSkuId: item.gdsSkuId,
        qty: item.qty
      })
    })
    let parm = {
      addressId: this.data.addr.addressId,
      ip: "127.0.0.1",
      note: this.data.note,
      skus
    }
    console.log(parm)
    goods_createOrder(parm).then(res=>{
      let order = res.data;
        wx.requestPayment({
          timeStamp: order.timeStamp,
          nonceStr: order.nonceStr,
          package: order.package,
          signType: order.signType,
          paySign: order.paySign,
          success:data => {
            wx.showToast({
              title: "支付成功",
              icon: "success",
              duration: 2000
            })
            setTimeout(() => {
              //跳转到支付成功页面
              wx.reLaunch({
                url: '/pages/notice_pages/payment_success/index?orderId='+ order.orderId
              })
            }, 1000)

          },
          fail:err=> {
            console.log(err)
              //跳转到订单详情页面
              wx.reLaunch({
                url: '/pages/order/order_details/index?orderId='+ order.orderId
              })
          }
        })
    })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data => {
      let orderInfo = data.orderData;
      orderInfo.totalPostage = orderInfo.totalPostage.toFixed(2)
      orderInfo.totalAmount = orderInfo.totalAmount.toFixed(2)
      orderInfo.goodsList.forEach(i => {
        i.price = i.price.toFixed(2)
      })
      this.setData({
        orderInfo,
        addr: orderInfo.address
      })
    })   
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
    const pages = getCurrentPages()
    const currPage = pages[pages.length - 1] // 当前页
    // console.log(currPage.data) // data中会含有testdata
    // console.log(this.data.addr) 
    this.setData({
      addr: currPage.data.addr
    })
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