// pages/stuverify/stuverify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindsubmit: function (e) {
    let self = this;
    console.log(e.detail.value.stuid)
    console.log(e.detail.value.pwd)
    var time = this.addJYM();
    wx.request({
      url: 'https://www.rmrhsch.top/api/user/vertifystu',
      data: {
        stuid: e.detail.value.stuid,
        sname: e.detail.value.stuname,
        openid: getApp().globalData.openid,
        stuphone: e.detail.value.stuphone,
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '绑定成功',
            success:function(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
          
        }else{
          wx.showModal({
            title: '绑定失败',
            content: res.data.msg,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
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

  },

  addJYM: function (){
    //产生随机数
    var time = ((new Date().getTime() * 9301 + 49297) % 233280) / (233280.0);
    var rand = Math.random();
    time = (time + rand) * 9301;
    return time;
  }

})