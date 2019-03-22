Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("login---onload")
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log("getsetting--success")
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log("getusrinfo success"+res)
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面?????
          // that.setData({
          //   isHide: true
          // });
        }
      }
    });
  },



  bindGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      getApp().globalData.userInfo = e.detail.userInfo;
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
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