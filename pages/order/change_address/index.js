// pages/order/change_address/index.js
import {order_changeAddr,order_addr} from "../../../network/order"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    addr: ''
  },
//去选择地址
handleToChooseAddr() {
  wx.navigateTo({
    url: '/pages/order/address/index'
  });
    
},

  //取消修改地址
  handleCancel() {
    wx.showModal({
      title: '',
      content: '您确定取消修改地址吗?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#666',
      confirmText: '确定',
      success: (result) => {
        if (result.confirm) {
          wx.navigateBack({
            delta: 1
          });
        }
      }
    });  
  },

  //确定修改地址
  handleConfirm() {
    if(!this.data.addr.addressId) {
      return wx.showToast({ title: '地址没有变化,不需要提交',icon: 'none'});
        
    }
    let parm = {
      addressId: this.data.addr.addressId,
      orderId: this.data.orderId
    }
    console.log(parm)
    order_changeAddr(parm).then(res=>{
      wx.showToast({
        title: '修改地址成功',
        icon: 'success',
        duration: 1500
      });
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1 // 回退前 delta(默认为1) 页面
        })
      },2000)  
    })
  },

  //获取后台数据
  getAddr() {
    order_addr(this.data.orderId).then(res=>{
      this.setData({
        addr: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.orderId = options.orderId;
    this.getAddr()
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