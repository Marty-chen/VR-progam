// pages/order/order_details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowCancel: false,
    cancelRadio: '1'
  },


  //复制订单编号
  handleCopy(e) {
    // console.log(e.currentTarget.dataset.order_num)
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
      onChange(event) {
        this.setData({
            cancelRadio: event.detail
        });
        console.log(this.data.cancelRadio)
    },
    onClick(event) {
      const {
          name
      } = event.currentTarget.dataset;
      console.log(name)
      this.setData({
          cancelRadio: name
      });
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