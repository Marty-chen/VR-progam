// pages/goods_details/index.js
import {
  goods_detail,
  goods_imgs,
  goods_promise,
  goods_recommend,
  goods_sku
} from "../../network/goods"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: '',
    goodsImgs: '',
    goodsPromise: [],
    goodsRecommend: [],
    goodsSku: [],
    gdsId: '',
    isShowPopup: false,
    currentIndex: 0,
    isAddCart: true
  },
  //加入购物车或者立即购买
  handleSaveGoods() {
    if(this.data.isAddCart) {
      //加入购物车接口


    }else {
      //立即购买接口和相应逻辑

    }
  },
  //立即购买
  payNow() {
    if (!this.isLogin()) return
    this.setData({
      isShowPopup: true,
      isAddCart: false
    })
  },
   //加入购物车
   handleAddCart() {
    if (!this.isLogin()) return
    this.setData({
      isShowPopup: true,
      isAddCart: true
    })
  },

  //判断登录状态
  isLogin() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showModal({
        title: '登录提示',
        content: '需要登录状态才能购买商品，现在去登录？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        },
        fail: () => {},
        complete: () => {}
      });
    } else {
      return true
    }
  },
  //关闭立即购买
  closePopup() {
    this.setData({
      isShowPopup: false
    })
  },
  //选择规格
  sizeChoose(e) {
    let currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex
    })
  },

  //去购物车页面
  toCart() {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },




  //请求商品信息
  getGoodsInfo() {
    goods_detail(this.data.gdsId).then(res => {
      this.setData({
        goodsInfo: res.data
      })
    })
  },
  //请求商品图片
  getGoodsImgs() {
    goods_imgs(this.data.gdsId).then(res => {
      this.setData({
        goodsImgs: res.data
      })
    })
  },
  //请求商品承诺
  getGoodsPromise() {
    goods_promise(this.data.gdsId).then(res => {
      this.setData({
        goodsPromise: res.data
      })
    })
  },

  //请求推荐更多
  getGoodsRecommend() {
    goods_recommend(this.data.gdsId).then(res => {
      this.setData({
        goodsRecommend: res.data
      })
    })
  },

  //请求商品sku
  getGoodsSku() {
    goods_sku(this.data.gdsId).then(res => {
      this.setData({
        goodsSku: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.gdsId)
    this.data.gdsId = options.gdsId;
    this.getGoodsImgs()
    this.getGoodsInfo()
    this.getGoodsRecommend()
    this.getGoodsPromise()
    this.getGoodsSku()
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