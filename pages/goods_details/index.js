// pages/goods_details/index.js
import {
  goods_detail,
  goods_imgs,
  goods_promise,
  goods_recommend,
  goods_sku,
  goods_payNow,
  goods_addCart
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
    gdsId: '',
    isShowPopup: false,
    isAddCart: true,
    skuList: [],
    skus: [],
    skuChoose: '', //选中得那条数据规则
    qty: 1
  },
  //加入购物车或者立即购买
  handleSaveGoods() {
    let parm = {
      qty: this.data.qty,
      gdsSkuId: this.data.skuChoose.gdsSkuId
    }
    if (this.data.isAddCart) {
      //加入购物车接口
      parm.gdsId = this.data.gdsId
      goods_addCart(parm).then(res=>{
        wx.showToast({
          title: "加入购物车成功"
        })
        this.setData({
          isShowPopup: false
        })
      })

    } else {
      //立即购买接口和相应逻辑
      goods_payNow(parm).then(res=>{
        let orderData = res.data
        wx.navigateTo({
          url: '/pages/goods_details/confirm_order/index',
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { orderData })
          }
        })
      })
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
    let i1 = e.currentTarget.dataset.index;
    let i2 = e.currentTarget.dataset.i;
    // console.log(i1, i2)
    let skus2 = this.data.skus;
    skus2[i1].valueName.forEach(item => {
      item.isActive = false
    })
    skus2[i1].valueName[i2].isActive = true
    this.setData({
      skus: skus2
    })
    this.handlePair()
  },

  //去配对得到相应的价格
  handlePair() {
    let active = []
    this.data.skus.forEach(i => {
      active.push(i.valueName.find(bb => bb.isActive).size)
    })
    // console.log(active)
    let acts = []
    this.data.skuList.forEach(item => {
      let bb = []
      item.valList.forEach(i => {
        bb.push(i.valueName)
      })
      acts.push(bb)
    })
    // console.log(acts)
    //调用方法向数组原型添加对比数组是否相同方法
    this.isArraysTheSame()
    
    acts.forEach((item,index)=>{
      if(item.equals(active)) {
        console.log(this.data.skuList[index])
        let skuChoose = this.data.skuList[index];
        skuChoose.price = skuChoose.price.toFixed(2)
        this.setData({
          skuChoose
        })
      }
      
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
      let goodsInfo = res.data;
      goodsInfo.minPrice = goodsInfo.minPrice.toFixed(2)
      goodsInfo.maxPrice = goodsInfo.maxPrice.toFixed(2)
      this.setData({
        goodsInfo
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
      let goodsRecommend = res.data;
      goodsRecommend.forEach(item=>{
        item.price = item.price.toFixed(2)
      })
      this.setData({
        goodsRecommend
      })
    })
  },

  //请求商品sku
  getGoodsSku() {
    goods_sku(this.data.gdsId).then(res => {
      let skuList = res.data.skuList;
      let sku = res.data.skus;
      //设置数据格式，加入isActive标识
      let skus = [];
      // {
      // skuName: '重量',
      // valueName: [{
      //   isActive: false,
      //   size: "3公斤"
      // }]}

      sku.forEach((item, index) => {
        skus.push({
          valueName: [],
          skuName: item.skuName
        })
        item.valueName.forEach((list, i) => {
          skus[index].valueName.push({
            isActive: false,
            size: list
          })
        })
      })
      //设置第一项为默认选中
      skus.forEach(item => {
        item.valueName[0].isActive = true
      })
      // console.log(skus)
      this.setData({
        skuList,
        skus
      })
      //找数据
      this.handlePair()

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.gdsId)
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

  },
  //比对两个数组是否相同
  isArraysTheSame() {
    // 将.equals方法附加到数组的原型以对任何数组调用它
    Array.prototype.equals = function (array) {
      // 如果另一个数组是假值，则返回
      if (!array) return false;
      // 比较长度-可以节省很多时间
      if (this.length != array.length) return false;
      for (var i = 0, l = this.length; i < l; i++) {
        // 检查我们是否有嵌套数组
        if (this[i] instanceof Array && array[i] instanceof Array) {
          // 递归到嵌套数组中
          if (!this[i].equals(array[i])) return false;
        } else if (this[i] != array[i]) {
          // 警告:两个不同的对象实例永远不会相等:{x:20} != {x:20}
          return false;
        }
      }
      return true;
    }
    // 从for in循环中隐藏方法
    Object.defineProperty(Array.prototype, "equals", {
      enumerable: false
    });
  }
})