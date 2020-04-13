// pages/login/login.js
import { userLogin } from "../../network/login"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    bindGetUserInfo(e) {
        if (e.detail.errMsg == "getUserInfo:ok") {
            let userInfo = e.detail;
            // console.log(userInfo)
            wx.login({
                success: res => {
                    let code = res.code;
                    let mapLocation = wx.getStorageSync('mapLocation')

                    let loginData = {
                        ...userInfo,
                        code,
                        ...mapLocation,
                        nickName: userInfo.userInfo.nickName,
                        avatarUrl: userInfo.userInfo.avatarUrl
                    };
                    // console.log(loginData);
                    userLogin(loginData).then(res => {
                        wx.setStorageSync('userInfo', userInfo);
                        wx.setStorageSync('loginTokens', res.data);
                        wx.showToast({
                            title: "登陆成功",
                            icon: 'success',
                            duration: 2000
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1, // 回退前 delta(默认为1) 页面
                            })
                        }, 2000)
                    })
                }
            })
        }


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})