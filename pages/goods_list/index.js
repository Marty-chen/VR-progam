// pages/category/index.js
import {
  goods_list
} from "../../network/goods"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    pages: '',
    parm: {
      cateId: '',
      seo: '',
      current: 1,
      size: 10
    },
    showNoMore: false
  },

  //搜索商品
  handleSearchShop(event) {
    if (!event.detail) return
    this.data.parm.seo = event.detail;
    this.handleClearData();
  },
  //监听搜索框输入
  handleSearchInput(e) {
    this.setData({
      'parm.seo': e.detail
    })
  },
  //监听搜索框失去焦点事件
  handleSearchBlur(){
    if(this.data.parm.seo) return
    this.handleClearData()
  },
  //清除搜索框内容
  handleClearSearch() {
    this.data.parm.seo = ''
    this.handleClearData()
  },
  //清空数据重新向后台获取数据
  handleClearData() {
    this.data.parm.current = 1;
    this.data.goodsList = [];
    this.getGoodsList();
  },
  //获取商品列表数据
  getGoodsList() {
    console.log(this.data.parm)
    goods_list(this.data.parm).then(res => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      let goodsList = this.data.goodsList;
      res.data.records.forEach(i => {
        goodsList.push(i)
      })
      this.setData({
        pages: res.data.pages,
        goodsList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //处理URL传过来的参数
    let name = options.name;
    let cateId = options.cateId;
    if(name) {
      wx.setNavigationBarTitle({
        title: name
      })
    }
    if(cateId) {
      this.data.parm.cateId = cateId
    }

    this.getGoodsList()
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      showNoMore: false,
    })
    this.data.parm.current = 1;
    this.data.goodsList = [];
    this.getGoodsList()
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
      this.getGoodsList()
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