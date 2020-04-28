// pages/order/order_details/index.js
import {
  order_detail,
  order_cancel,
  order_del,
  order_reason,
  order_confirmTake,
  order_payment
} from "../../../network/order"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: '',
    isShowCancel: false,
    reasonId: '',
    reasonList: [], //退款理由列表
  },
  //去退款页面
  handleToRefund(e) {
    let goods = [e.currentTarget.dataset.order];
    wx.navigateTo({
      url: '/pages/refund/index',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          goods
        })
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
    const reasonId = event.currentTarget.dataset.name;
    this.setData({
      reasonId
    });
    // console.log(this.data.reasonId)
  },
  //取消订单
  handleCancelOrder() {
    let parm = {
      reasonId: this.data.reasonId,
      orderId: this.data.orderDetail.orderId
    }
    order_cancel(parm).then(() => {
      wx.showToast({
        title: '取消成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/order/index'
        })
      }, 1000)

    })
  },
  //删除订单
  handleDelOrder() {
    wx.showModal({
      title: '提示',
      content: '删除后不可恢复，你确定要删除？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          order_del(this.data.orderDetail.orderId).then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/order/index'
              })
            }, 1000)
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },

   //去付款
   handleTopayment() {
    let orderId = this.data.orderDetail.orderId;
    console.log(orderId)
    let parm = {
      ip: "127.0.0.1",
      orderId
    }
    order_payment(parm).then(res => {
      let order = res.data;
      wx.requestPayment({
        timeStamp: order.timeStamp,
        nonceStr: order.nonceStr,
        package: order.package,
        signType: order.signType,
        paySign: order.paySign,
        success: data => {
          wx.showToast({
            title: "支付成功",
            icon: "success",
            duration: 2000
          })
          setTimeout(() => {
            //跳转到支付成功页面
            wx.reLaunch({
              url: '/pages/notice_pages/payment_success/index?orderId=' + order.orderId
            })
          }, 1000)

        },
        fail: err => {
          console.log(err)
          wx.showToast({
            title: "支付失败,请重新支付",
            icon: "none",
            duration: 2000
          })
        }
      })
    })
  },
  
  //确认收货
  handleConfirmTakeOrder() {
    let id = this.data.orderDetail.orderId;
    console.log(id)
    wx.showModal({
      title: '确认收货',
      content: '您确定收到了货物？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          order_confirmTake(id).then(() => {
            wx.showToast({
              title: '确认成功',
              icon: 'success'
            })
            //刷新后台数据
            this.getOrderDetail()
          })
        }
      }
    });
  },

//去修改地址
handleToAddrList(e) {
  let orderId = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/order/change_address/index?orderId=' + orderId
  })
},


  //查询后台订单详情数据
  getOrderDetail() {
    let id = {
      orderId: this.data.orderId
    }
    order_detail(id).then(res => {
      this.setData({
        orderDetail: res.data
      })
    })
  },
  //获取退款理由列表
  getReasonList() {
    let type = 0
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
    console.log(options.orderId)
    this.data.orderId = options.orderId;
    this.getReasonList()
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
    this.getOrderDetail()
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