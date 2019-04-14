// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemid: null,
    contacts: null,
    detail: null,
    placeicon: "/icon/position.png",
    qqicon: "/icon/QQ.png",
    phoneicon: "/icon/phone.png",
    display: true,
    check: null,
    haslocation: true,
    hasqq: true,
    hasphone: true,
    hassharebutton: true,
    hasborder: "none",
    hide: true,
    showView: false
  },

  onChangeShowState: function () {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '您确定要查看该物品的联系方式？',
      success(res){
        if (res.confirm) {
          that.setData({
            showView: (!that.data.showView)
          })
          wx.request({
            url: 'https://www.rmrhsch.top/api/lostitem/seecontact',
            method:'POST',
            data:{
              Uid: getApp().globalData.userInfo.Uid,
              itemid:that.data.itemid,
            },
            success(res){
              console.log(res)
            }
          })
        } else if (res.cancel) {

        }
      }
    })
    
  },

  showDialog() {
    this.setData({
      hassharebutton: "display:none;"
    })
    this.modal.showModal();
  },
  _preventtap() {
    console.log("preventtap")
    this.modal.hideModal();
    this.setData({
      hassharebutton: "display:default;"
    })
  },
  _bull() {
    this.setData({
      hassharebutton: "display:default;"
    })
  },
  _makephoto() {
    this.modal.hideModal();
    this.setData({
      hassharebutton: "display:default;"
    })
    console.log(this.data.contacts)
    var strcontacts = JSON.stringify(this.data.contacts)
    var strdetail = JSON.stringify(this.data.detail)
    var self = this
    wx.navigateTo({
      url: '/pages/canvas/canvas?contacts='+strcontacts + "&detail="+strdetail,
      success(res) {
        self.modal.hideModal()
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    var imgarr = this.data.detail.img;
    imgarr.forEach(function(value,i){
      var imgpath = value;
      imgarr[i] = 'https://www.rmrhsch.top'+value;
    })
    console.log(imgarr)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imgarr // 需要预览的图片http链接列表  
    })
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
    console.log('load')
    this.setData({
      check: options.check
    })
    console.log(this.data.check)
    if(options.check == 0) {
        let obj = JSON.parse(options.obj)
        console.log(obj);
        this.setData({
          itemid: obj.id,
          detail: obj,
          display: obj.display
        });
        let self = this;
        wx.request({
          url: 'https://www.rmrhsch.top/api/lostitem/getdetail',
          data: {
            id: obj.id
          },
          method:'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            self.setData({
              contacts: res.data.data
            });
            console.log(res)
            if (res.data.data.place == "") {
              self.setData({
                haslocation: false,
                hasborder: "1rpx solid #e5e5e5;"
              })
            }
            if (res.data.data.qq == "") {
              self.setData({
                hasqq: false
              })
            }
            if (res.data.data.phone == "") {
              self.setData({
                hasphone: false
              })
            }
          }
        })
        // if (this.data.detail.type == "寻物启事") {
        //   this.setData({
        //     haslocation: false,
        //     hasborder: "1rpx solid #e5e5e5;"
        //   })
        // }
        console.log(this.data.display)
    } else if (options.check == 1) {
      console.log(options.put)
      let obj = JSON.parse(options.put)
      console.log(obj)
      // if ()
      this.setData({
        contacts: obj.contacts,
        detail: obj.detail,
        display: obj.display
      })
      if (this.data.detail.type == "寻物启事" || this.data.contacts.place == "") {
        this.setData({
          haslocation: false,
          hasborder: "1rpx solid #e5e5e5;"
        })
      }
      if (this.data.contacts.qq == "") {
        this.setData({
          hasqq: false
        })
      }
      if (this.data.contacts.phone == "") {
        this.setData({
          hasphone: false
        })
      }
    } else if (options.check == 2) {
      var self = this
      wx.request({
        url: 'https://www.rmrhsch.top/api/lostitem/getdetail',
        data: {
          id: options.itemid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          var detail = res.data.data
          console.log(detail)
          if (detail.ifidcard == 1 || detail.img[0] == "/images/ava.png" || detail.img[0] == "/images/lost.png") {
            detail.display = false
          } else {
            detail.display = true
          }
          self.setData({
            itemid: res.data.data.id,
            detail: detail,
            display: detail.display,
            contacts: res.data.data
          });
          if (res.data.data.place == "" || res.data.data.place == "null" || res.data.data.place == null) {
            self.setData({
              haslocation: false,
              hasborder: "1rpx solid #e5e5e5;"
            })
          }
          if (res.data.data.qq == null || res.data.data.qq == "null" || res.data.data.qq == "") {
            self.setData({
              hasqq: false
            })
          }
          if (res.data.data.phone == null || res.data.data.phone == "null" || res.data.data.phone == "") {
            self.setData({
              hasphone: false
            })
          }
        }
      })
    }
    wx.request({
      url: 'https://www.rmrhsch.top/api/lostitem/checksee',
      method:'POST',
      data:{
        Uid: getApp().globalData.userInfo.Uid,
        itemid: this.data.itemid,
      },
      success(res){
        if(res.data.code==200){
          self.setData({
            showView: true
          })
        }else{

        }
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.modal = this.selectComponent("#modal");
    console.log('ready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    this.setData({
      hassharebutton: "display:default;"
    })
    var self = this
    console.log('show')
    setTimeout(function () {
      wx.hideLoading()
      self.setData({
        hide: false
      })
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // if (this.modal) {
      this.modal.hideModal()
    // }
    console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if(this.data.check == 1) {
      wx.navigateBack({
        delta: 2
      })
    }
    console.log('unload')
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
    return {
      title: '我在丢三落四帮帮帮上看见个失物，快来看看是不是你的吧',
      path: 'pages/show/show?check=2&itemid=' + this.data.itemid,
      success: function (res) {
        // 转发成功
        console.log(path)
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})