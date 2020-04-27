// pages/order/index.js
import {
  order_list,
  order_del,
  order_confirmTake,
  order_reason,
  order_cancel,
  order_payment
} from "../../network/order"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        title: "全部"
      },
      {
        title: "待付款"
      },
      {
        title: "待发货"
      },
      {
        title: "待收货"
      },
      {
        title: "退款"
      },
    ],
    currentIndex: 0,
    orderList: [],
    pages: '',
    parm: {
      current: 1,
      size: 5,
      status: ''
    },
    isShowCancel: false,
    reasonId: '',
    reasonList: [], //退款理由列表
    cancelOrderId: '',
    showNoMore: false
  },
  //点击tab 
  tabClick(e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.currentIndex == index) return
    console.log(index)
    let status;
    switch (index) {
      case 0:
        status = ''; //全部
        break;
      case 1:
        status = 0; //待付款
        break;
      case 2:
        status = 1; //待发货
        break;
      case 3:
        status = 2 //待收货
        break;
      case 4:
        status = 2 //退款
        break;
    }

    this.setData({
      showNoMore: false,
      currentIndex: index,
      "parm.status": status,
      "parm.current": 1,
      orderList: []
    })
    this.getOrderList()
  },
  //去商品详情页
  handleTogoodsDetail(e) {
    let gdsId = e.currentTarget.dataset.gdsid;
    wx.navigateTo({
      url: '/pages/goods_details/index?gdsId=' + gdsId
    })
  },
  //去修改地址
  handleToAddrList(e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/change_address/index?orderId=' + orderId
    })
  },
  //查看订单详情
  handleToOrderDetail(e) {
    let orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/order/order_details/index?orderId=' + orderId
    })
  },
  //去付款
  handleTopayment(e) {
    let orderId = e.currentTarget.dataset.id;
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
  //删除订单
  handleDelOrder(e) {
    let orderId = e.currentTarget.dataset.id;
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
          order_del(orderId).then(() => {
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            //刷新后台数据
            this.data.parm.current = 1;
            this.data.orderList = [];
            this.getOrderList()
            // 回到顶部
            wx.pageScrollTo({
              scrollTop: 0
            })
          })
        }
      },
      fail: () => {}
    });
  },
  //确认收货
  handleConfirmTakeOrder(e) {
    let id = e.currentTarget.dataset.id
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
            this.data.parm.current = 1;
            this.data.orderList = [];
            this.getOrderList()
            // 回到顶部
            // wx.pageScrollTo({
            //   scrollTop: 0
            // })
          })
        }
      },
      fail: () => {}
    });
  },

  /** 点击显示弹层 */
  handleShowCancel(e) {
    let cancelOrderId = e.currentTarget.dataset.id;
    this.setData({
      isShowCancel: true,
      cancelOrderId
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
    console.log(this.data.reasonId)
  },
  //取消订单
  handleCancelOrder() {
    let parm = {
      reasonId: this.data.reasonId,
      orderId: this.data.cancelOrderId
    }
    order_cancel(parm).then(() => {
      wx.showToast({
        title: '取消成功',
        icon: 'success'
      })
      setTimeout(() => {
        this.setData({
          isShowCancel: false
        });
        this.data.parm.current = 1;
        this.data.orderList = [];
        this.getOrderList()
      }, 1000)

    })
  },
  //获取后台数据
  getOrderList() {
    order_list(this.data.parm).then(res => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      let orderList = this.data.orderList;
      res.data.records.forEach(i => {
        orderList.push(i)
      })
      this.setData({
        pages: res.data.pages,
        orderList
      })

    })
  },
  //获取退款理由列表
  getReasonList() {
    order_reason().then(res => {
      this.setData({
        reasonList: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReasonList();
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
    this.data.parm.current = 1;
    this.data.orderList = [];
    this.getOrderList()
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      showNoMore: false,
    })
    this.data.parm.current = 1;
    this.data.orderList = [];
    this.getOrderList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.parm.current < this.data.pages) {
      this.setData({
        showNoMore: false
      })
      this.data.parm.current += 1
      this.getOrderList()
    } else {
      if (this.data.showNoMore) return
      this.setData({
        showNoMore: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})