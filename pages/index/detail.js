// pages/index/detail.js
Page({

  /**
   * Page initial data
   */
  data: {
    restaurant: {},
    restaurants: [],
    reviews: [],
    currentUser: null,
    review: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('userInfo!', getApp().globalData.userInfo);
    this.setData({
      currentUser: getApp().globalData.userInfo,
    });
    const Restaurants = new wx.BaaS.TableObject('restaurants');
    const Reviews = new wx.BaaS.TableObject('reviews');

    Restaurants.get(options.id).then((res) => {
      this.setData({
        restaurants: res.data,
      })
    });

    let query = new wx.BaaS.Query();

    query.compare('restaurants_id', '=', options.id);

    Reviews.setQuery(query).find().then((res) =>{
      this.setData({
        reviews: res.data.objects,
      })
    })
  },

  formSubmit: function (event) {
    console.log('formSubmit', event);
    let content = event.detail.value.content;
    let review = new wx.BaaS.TableObject('review');
    let newReview = review.create();
    const data = {
      restaurants_id: this.data.restaurants.id,
      content: content
    }

    newReview.set(data);
    // Post data to API
    newReview.save().then((res) => {
      console.log('save res', res);
      const newReviews = this.data.review;
      newReviews.push(res.data);
      this.setData({
        review: newReviews,
      })
    })
  },

  formReset: function () {
    console.log('reset')
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

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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