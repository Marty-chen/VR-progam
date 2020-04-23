// pages/me/VIP/index.js
import {
  vip_list,
  createOrder
} from "../../../network/vip"
import {
  baseImg
} from "../../../network/config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImg,
    vipList: '',
    currentIndex: 0,
    isCheck: false
  },
  //选择套餐
  handleChooseVip(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  },
  //是否同意服务条款
  check() {
    this.setData({
      isCheck: !this.data.isCheck
    })
  },
  //确认支付
  handlePayVip() {
    if (!this.data.isCheck) {
      wx.showToast({
        title: '请同意会员服务条款',
        icon: 'none'
      })
    } else {
      let i = this.data.currentIndex
      let orderData = {
        vipGradeId: this.data.vipList.vipGradeVOS[i].vipGradeId,
        ip: "127.0.0.1"
      }
      createOrder(orderData).then(res => {
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
              
              this.getVipList()
            }, 1000)

          },
          fail:err=> {
            // cancelOrder(order.code)
            console.log(err)
            wx.showToast({
              title: "支付失败,请重新支付",
              icon: "none",
              duration: 2000
            })
          }
        })
      })
    }
  },


  //获取会员列表
  getVipList() {
    vip_list().then(res => {
      this.setData({
        vipList: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVipList()
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