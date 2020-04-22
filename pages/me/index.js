// pages/me/index.js
import {
  logout
} from "../../network/login"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ''
  },
  //打电话
  handleCall(e) {
    // let num = e.currentTarget.dataset.phone
    // wx.makePhoneCall({
    //   phoneNumber: num
    // })
  },
  //去登录
  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //退出登录
  exitLogin() {
    let _this = this
    wx.showModal({
      title: '您确定退出登录？',
      success(res) {
        if (res.confirm) {
          logout().then(res => { //告诉后台退出登陆
              wx.removeStorageSync('token');
              wx.removeStorageSync('userInfo');
              wx.showToast({
                title: "退出成功",
                icon: 'success',
                duration: 2000
              })
              _this.setData({
                userInfo: ''
              })
            })
            .catch(err => {
              wx.removeStorageSync('token');
              wx.removeStorageSync('userInfo');
              wx.showToast({
                title: "退出成功",
                icon: 'success',
                duration: 2000
              })
              _this.setData({
                userInfo: ''
              })
            })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
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