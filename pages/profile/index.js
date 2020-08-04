// pages/profile/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
    points: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onShow: function (options) {
    const app = getApp();
    console.log('userData', app.globalData.userInfo);
    this.setData( {
      currentUser: app.globalData.userInfo,
    })

  //   wx.BaaS.auth.getCurrentUser().then(user => {
  //     // user 为 currentUser 对象
  //     const app = getApp();

  //     console.log(user)
  //     app.globalData.userInfo = user;

  //     this.setData({
  //       currentUser: app.globalData.userInfo,
  //     })

  // })
},
  userInfoHandler(data) {
    const app = getApp();
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      console.log('user', user);
        app.globalData.userInfo = user;
        this.setData({
          currentUser: user,
        })
      }, err => {
        // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
    })
  },

  getPhoneNumber(e) {
    wx.BaaS.wxDecryptData(e.detail.encryptedData, e.detail.iv, 'phone-number').then(
      (decryptedData) => {
        console.log("decryptedData: ", decryptedData)
      }
    )

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})