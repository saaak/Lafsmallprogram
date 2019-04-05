// pages/create/card_create/card_create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    major: ["文学院", "理学院", "马克思主义学院", "经济与管理学院", "教育科学学院", "外国语学院", "化学化工学院", "生命科学学院（海洋学院）", "机械工程学院", "信息科学技术学院", "电气工程学院", "纺织服装学院", "医学院（护理学院）", "公共卫生学院", "体育科学学院", "艺术学院（建筑学院）", "地理科学学院", "交通与土木工程学院", "药学院", "国际教育学院", "张謇学院", "神经再生重点实验室", "特种医学研究院","智能信息技术研究中心"],
    majorIndex: 0,
    openid: ""
  },
  bindMajorChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', this.data.major[e.detail.value]);

    this.setData({
      majorIndex: e.detail.value
    })
  },
  bindsubmit: function (e) {
    let self = this;
    var item = e.detail.value;
    if (item.cardid=='') {
      wx.showToast({
        title: '请输入丢卡人学号',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    } else if (item.cardid.length < 9) {
      wx.showToast({
        title: '请输入格式正确的学生卡号码',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    } else if(item.cardname=='') {
      wx.showToast({
        title: '请输入丢卡人姓名',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    } else if(item.input_phone==''&&item.input_place==''&&item.input_qq=='') {
      wx.showToast({
        title: '请至少输入一种联系方式',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    } else if (item.input_phone.length != 0 && item.input_phone.length != 11 && item.input_phone.length != 8) {
      wx.showToast({
        title: '请输入格式正确的手机号码',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    } else if (item.input_qq.length != 0 && item.input_qq.length < 5 || item.input_qq.length >11) {
      wx.showToast({
        title: '请输入格式正确的QQ号码',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    } else {
      var openid = ""
       
        wx.request({
          url: 'https://www.rmrhsch.top/api/lostitem/publostitems',
          data: {
            generalsubmit: 0,
            stuff_name: e.detail.value.cardname.replace(/[\?]/g, '？'),
            detail: this.data.major[this.data.majorIndex],
            card_number: e.detail.value.cardid,
            input_phone: e.detail.value.input_phone,
            input_qq: e.detail.value.input_qq,
            input_place: e.detail.value.input_place.replace(/[\-\_\|\~\`\#\%\^\&\*\{\}\:\;\"\?]/g, ''),
            openid: getApp().globalData.userInfo.openId,
            form_id: e.detail.formId
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            console.log(e.detail.value)
            var contacts = {};
            contacts.qq = e.detail.value.input_qq;
            contacts.phone = e.detail.value.input_phone;
            contacts.place = e.detail.value.input_place.replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');
            contacts.detail = "学号：" + e.detail.value.cardid + " 、院系：" + self.data.major[self.data.majorIndex];
            console.log(contacts);
            var detail = {};
            detail.id = res.data.id;
            detail.name = e.detail.value.cardname.replace(/[\?]/g, '？')
            detail.time = res.data.time;
            (self.data.select == 1) ? detail.type = "失物招领" : detail.type = "寻物启事";
            detail.type == "失物招领" ? detail.img = ["/images/ava.png"] : detail.img = ["/images/lost.png"]

            console.log(detail);
            var put = {}
            put.detail = detail
            put.contacts = contacts
            put.display = false
            let str = JSON.stringify(put)
            //TO DO
            wx.navigateTo({
              url: '/pages/show/show?check=1&put=' + str,
            })
            //TO DO
          }
        })
      
      
      console.log(e)
    }

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

  },

  bindMajorChange: function (e) {
    this.setData({
      majorIndex: e.detail.value
    })
  },
})