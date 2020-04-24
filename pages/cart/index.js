// pages/cart/index.js
import {
  cart_list,
  cart_update
} from "../../network/cart"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isAllCheck: false,
    isEdit: true,
    parm: {
      current: 1,
      size: 10
    },
    pages: '',
    showNoMore: false,
    totalQty: 0,
    totalPrice: 0
  },

  // 点击全选
  checkAll() {
    let boole = !this.data.isAllCheck
    this.data.cartList.forEach((l, i) => {
      let check = "cartList[" + i + "].check"
      this.setData({
        [check]: boole,
        isAllCheck: boole
      })
    })
    this.getToatl()
  },
  //点击单选
  handleCheckGoods(e) {
    let index = e.currentTarget.dataset.index;
    let boole = !this.data.cartList[index].check;
    this.data.cartList[index].check = !this.data.cartList[index].check;
    let check = "cartList[" + index + "].check"
    this.setData({
      [check]: boole,
      isAllCheck: this.data.cartList.every(i => i.check)
    })
    this.getToatl()
  },
  //管理
  toEdit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  //步进器
  stepChange(e) {
    let index = e.currentTarget.dataset.index;
    let parm = {
      cartId: this.data.cartList[index].cartId,
      qty: e.detail
    }
    cart_update(parm).then(() => {
      let qty = "cartList[" + index + "].qty"
      this.setData({
        [qty]: e.detail
      })
      if(this.data.cartList[index].check) {
        this.getToatl()
      }
    })
    
  },
  //去结算
  handleToConfirmOrder() {
    let checkGoods = this.data.cartList.filter(i => i.check)
    if(checkGoods.length == 0) {
      return wx.showToast({
        title: '请选择商品',
        icon: 'none'
      })
    }
    let cartIds = [];
    checkGoods.forEach(i=>{
      cartIds.push(i.cartId)
    })

    wx.navigateTo({
      url: '/pages/cart/confirm_order/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { cartIds })
      }
    })
  },

  //计算总件数和总价格
  getToatl() {
    let checkGoods = this.data.cartList.filter(i => i.check)
    console.log(checkGoods)
    let totalQty = 0;
    let totalPrice = 0;
    checkGoods.forEach(i => {
      totalQty += i.qty;
      totalPrice += i.price * i.qty
    })
    this.setData({
      totalQty,
      totalPrice: totalPrice.toFixed(2)
    })
  },

  //请求购物车列表数据
  getCartList() {
    cart_list(this.data.parm).then(res => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      let cartList = this.data.cartList;
      res.data.records.forEach(i => {
        i.check = false
        cartList.push(i)
      })
      cartList.forEach(item=>{
        item.price = item.price.toFixed(2)
      })
      this.setData({
        cartList,
        pages: res.data.pages
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
    this.getCartList()
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
    this.data.cartList = [];
    this.getCartList()
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
      this.getCartList()
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