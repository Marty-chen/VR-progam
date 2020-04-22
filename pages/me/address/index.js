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
  //是否默认
  checkDefault(e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.addrList[index].isDefault == 1) return;
    wx.showModal({
      title: '提示',
      content: '您确定要把此地址设为默认地址？',
      success: (res) => {
        if (res.confirm) {
          let parm = {
            addressId: this.data.addrList[index].addressId,
            isDefault: 1
          }
          addressUpdate(parm).then(res => {
            wx.showToast({
              title: '设置成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              this.getAddressList()
            }, 2000)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


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
  //删除地址
  delAddress(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
    let parm = [this.data.addrList[index].addressId];
    wx.showModal({
      title: '删除地址',
      content: '您确定要删除该地址？',
      success: (res) => {
        if (res.confirm) {
          deleteAdd(parm).then(() => {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              this.getAddressList()
            }, 2000)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    console.log(addr)
    let router = getCurrentPages()

    //判断是否在购物车跳转过来的
    if (router[1].route == "pages/cart/confirm_order/index") {
      console.log(router[1].route)
      // 将参数传回上一页
      // const pages = getCurrentPages()
      const prevPage = router[router.length - 2] // 上一页
      // 调用上一个页面的setData 方法，将数据存储
      prevPage.setData({
        addr
      })
      // 返回上一页
      wx.navigateBack({
        delta: 1
      })
    }
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