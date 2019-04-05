// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    hide: true
  },

  ok: function(e) {
    console.log(e)
    var self = this
    wx.showModal({
      title: '提示',
      content: '您确定已经对接该物品吗？',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          wx.request({
            url: 'https://www.rmrhsch.top/api/lostitem/handoveritem',
            data:{
              itemid:id,
            },
            success(res) {
              console.log(res)
              self.onLoad()
              self.onShow()
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  isok: function(e){
    wx.showModal({
      title: '您已经交接过啦',
      content: '感谢您对他人的帮助',
    })
  },

  del: function (e) {
    console.log(e)
    var self = this
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          wx.request({
            url: 'https://www.rmrhsch.top/api/lostitem/delitem',
            data:{
              itemid:id,
            },
            success(res) {
              console.log(res)
              self.onLoad()
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  search: function (e) {
    var self = this;
    wx.request({
      url: 'https://www.rmrhsch.top/api/lostitem/getuseritems',
      data: {
        openid: getApp().globalData.openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        self.setData({
          currentList: res.data.data,
        })

      }
    })
  },

  detailTap: function (e) {
    var detail = e.currentTarget.dataset.anchorobj
    console.log(detail)
    if (detail.ifidcard == 1 || detail.img[0] == "/images/ava.png" || detail.img[0] == "/images/lost.png") {
      detail.display = false
    } else {
      detail.display = true
    }
    let str = JSON.stringify(detail)
    wx.navigateTo({
      url: '/pages/show/show?check=0&obj=' + str,
    })
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.showLoading({
      title: '加载中',
      success(res) {
        self.setData({
          hide: true
        })
      }
    })

    
    wx.request({
      url: 'https://www.rmrhsch.top/api/lostitem/getuseritems',
      data: {
        openid: getApp().globalData.openid,
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(getApp().globalData.openid)
        console.log(res)
        self.setData({
          currentList: res.data.data,
        })
        setTimeout(function () {
          wx.hideLoading()
          self.setData({
            hide: false
          })
        }, 2000)

      },
      fail(res) {
        console.log('fail')
      }
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
    var self = this
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