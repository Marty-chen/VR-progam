// pages/store_details/index.js
import {shopDetail} from '../../network/shop';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: ''
  },
  //打电话
  handlePhoneCall() {
    if(!this.data.shop.phone) return
    wx.makePhoneCall({
      phoneNumber: this.data.shop.phone 
    })
  },
  //图片预览
  //轮播图预览
  handleSwiperPreviewImg(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.shop.storeImg[index], // 当前显示图片的http链接
      urls: this.data.shop.storeImg // 需要预览的图片http链接列表
    })
  },
  // 案例展示预览
  handleCasePreviewImg(e) {
    console.log(e.currentTarget.dataset.img)
    let img = e.currentTarget.dataset.img;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  //请求数据
  getShopDetail(id) {
    let location = wx.getStorageSync('location')
    let parm = {
      ...location,
      storeId: id
    }
    console.log(parm)
    shopDetail(parm).then(res=>{
      this.setData({
        shop: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopDetail(options.storeId);
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