// pages/me/address/new_address/index.js
import {
  saveAddress,
  addressUpdate
} from "../../../../network/address"
import areaList from "../../../../utils/city_all"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEditAddress: false,
    checked: false,
    areaList: '',
    isShowChooseCity: false,
    addFormData: {
      userName: '',
      phone: '',
      disId: '',
      detailAddress: '',
      postalCode: '',
      isDefault: '0',
      area: '',
    }
  },
  //是否设为默认
  handleSwitch(e) {
    this.setData({
      "addFormData.isDefault": e.detail.value ? "1" : "0"
    });
  },
  //显示选择地址
  showChooseCity() {
    this.setData({
      isShowChooseCity: true
    })
  },
  //关闭选择地址
  closeChooseCity() {
    this.setData({
      isShowChooseCity: false
    })
  },
  //选择地址确认
  handleConfirmCity({
    detail
  }) {
    console.log(detail.values)
    let area = detail.values[0].name +  detail.values[1].name + detail.values[2].name;
    this.setData({
      'addFormData.area': area,
      'addFormData.disId': detail.values[2].code
    })
    this.closeChooseCity()
  },
  //获取收货人
  getUserName(e) {
    this.data.addFormData.userName = e.detail
  },
  //获取手机号码
  getPhone(e) {
    this.data.addFormData.phone = e.detail
  },
  //获取详细地址
  getDetailAddr(e) {
    this.data.addFormData.detailAddress = e.detail
  },
  //获取邮政编码
  getPostalCode(e) {
    this.data.addFormData.postalCode = e.detail
  },

  //保存地址
  saveAddress() {
    console.log(this.data.addFormData)
    //验证数据有没填写完整
    if (!this.verification()) return
    
    if(!this.data.isEditAddress) { //不是编辑状态，调新增接口
      saveAddress(this.data.addFormData).then(res => {
        wx.showToast({
          title: '地址添加成功',
          icon: 'success',
          duration: 2000
        })
        
      })
    }else {
      //编辑状态，调编辑接口
      addressUpdate(this.data.addFormData).then(()=>{
        wx.showToast({
          title: '地址编辑成功',
          icon: 'success',
          duration: 2000
        })
      })

    }
    //返回上一页
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })
    }, 2000)
    
    // let router = getCurrentPages()
    // console.log(router)
    // //判断是否在购物车跳转过来的
    // if (router[1].route == "pages/cart/confirm_order/index") {

    // }

  },

  //点下一步，验证数据有没填写完整
  verification() {
    if (!this.data.addFormData.userName) {
      wx.showToast({
        title: '请填写收货人',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.addFormData.phone) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (!(/^1[3456789]\d{9}$/.test(this.data.addFormData.phone))) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.addFormData.disId) {
      wx.showToast({
        title: '请选择所在区域',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.addFormData.detailAddress) {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    return true

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      areaList
    })
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log(data.data.parm)
      let parm = data.data.parm;
      if(!parm) return
      //动态改变页面标题
      wx.setNavigationBarTitle({
      title: "编辑地址"
    })
      this.setData({
        addFormData: parm,
        isEditAddress: true,
        checked: parm.isDefault? true : false,
        'addFormData.area': parm.disName
      })
    })
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