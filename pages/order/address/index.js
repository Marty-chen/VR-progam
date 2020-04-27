// pages/me/address/index.js
import {
  addressList,
  addressUpdate,
  deleteAdd
} from "../../../network/address"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrList: []
  },
 
  //编辑地址
  handleEditAddr(e) {
    let index = e.currentTarget.dataset.index;
    let parm = {
      ...this.data.addrList[index]
    }
    wx.navigateTo({
      url: '/pages/me/address/new_address/index',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: {
            parm
          }
        })
      }
    })
  },
 
  //去添加地址
  toNewAddress() {
    wx.navigateTo({
      url: '/pages/me/address/new_address/index'
    })
  },
  //选择地址
  handleChooseAddr(e) {
    let addr = e.currentTarget.dataset.addr;
    // console.log(addr)
    let router = getCurrentPages()
    console.log(router[1].route)
      // 将参数传回上一页
      const prevPage = router[router.length - 2] // 上一页
      // 调用上一个页面的setData 方法，将数据存储
      prevPage.setData({
        addr
      })
      // 返回上一页
      wx.navigateBack({
        delta: 1
      })
    
    
  },

  //网络请求地址列表
  getAddressList() {
    addressList().then(res => {
      this.setData({
        addrList: res.data
      })
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
    this.getAddressList()
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