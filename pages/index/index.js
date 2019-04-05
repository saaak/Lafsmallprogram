Page({

  data: {
    currentList: [],
    time: 0,
    isNone: false,
    loading: false,
    inputShowed: false,
    inputVal: ""
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
    wx.navigateTo({
      url: '/pages/search/search?query=' + this.data.inputVal.replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>]/g, '').replace(/[\?]/g, '？'),
    })
  },
  
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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

  onPullDownRefresh: function () {
    this.setData({
      loading: true
    })
    console.log('hello')
    var self = this;
    wx.request({
      url: 'https://www.rmrhsch.top/api/lostitem/getlostitems',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        wx.stopPullDownRefresh()
        console.log("finish")
        self.setData({
          currentList: res.data.data,
          loading: false
        })
        
      }
    })
  },

  onReachBottom: function () {
    var len = this.data.currentList.length
    // var latestid = this.data.currentList[len].id
    var self = this;
    console.log(len)
    wx.request({
      url:'https://www.rmrhsch.top/api/lostitem/getlostitems',
      data:{
        latestid:len
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log()
         console.log(self.data.currentList)
        console.log(res)
        var result = self.data.currentList
        for (var i = 0; i < res.data.data.length; i++){
          result.push(res.data.data[i])
          console.log(result)
        }
        self.setData({
          currentList: result,
          
        })
        // console.log(currentList)
      }
    })
  },

  filter_time: function (e) {
    var time = e.currentTarget.dataset.time
    switch(time) {
      case 'today':
        wx.navigateTo({
          url: '/pages/filter/filter?time=0',
        })
      break;
      case 'yesterday':
        wx.navigateTo({
          url: '/pages/filter/filter?time=1',
        })
      break;
      case 'week':
        wx.navigateTo({
          url: '/pages/filter/filter?time=2',
        })
      break;
      case 'ago':
        wx.navigateTo({
          url: '/pages/filter/filter?time=3',
        })
      break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
        // else {

        // }
      }
    });

    function getInfo() {
      wx.getUserInfo({
        success: function (res) {
          let rawData = res.rawData,
            signature = res.signature,
            encryptedData = res.encryptedData,
            iv = res.iv;
          wx.login({
            success(res) {
              if (res.code) {
                wx.request({
                  url: 'https://www.rmrhsch.top/api/user/wxlogin',
                  data: {
                    code: res.code,
                    rawData: rawData,
                    signature: signature,
                    encryptedData: encryptedData,
                    iv: iv
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  // header: {}, // 设置请求的 header
                  success: function (res) {
                    console.log(res);
                    if (res.data.code == 200) {
                      getApp().globalData.userInfo = res.data.data;
                      getApp().globalData.openid = res.data.data.openId;
                      wx.request({
                        url: 'https://www.rmrhsch.top/api/user/getuserinfo',
                        data: {
                          openid: getApp().globalData.openid
                        },
                        method: 'POST',
                        success: function (res) {
                          if (res.data.code == 400) {
                            wx.redirectTo({
                              url: '/pages/stuverify/stuverify'
                            });
                          } else {

                          }
                        }
                      })
                    } else {
                      getInfo();
                    }
                  },
                  fail: function () {
                    wx.showModal({
                      title: 'sorry',
                      content: '遇到未知原因，请退出小程序',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          console.log("遇到未知bug请退出小程序");
                        }
                      }
                    });
                  },
                  
                });
              }
            }
          });
        }
      });
    }
    getInfo();
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
    var self = this;
    wx.request({
      url: 'https://www.rmrhsch.top/api/lostitem/getlostitems',
      data: {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})