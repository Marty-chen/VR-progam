// pages/order/index.js
import {
  order_list
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
  //查看订单详情
  handleToOrderDetail(e) {
    let orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/order/order_details/index?orderId=' + orderId
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