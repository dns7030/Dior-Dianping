// pages/order/order.js
Page({

  /**
   * Page initial data
   */
  data: {
    restaurant: {},
    products: [],
    currentUser: null,
    order: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('userInfo!', getApp().globalData.userInfo);
    this.setData({
      currentUser: getApp().globalData.userInfo,
    });
    const Products = new wx.BaaS.TableObject('productsDS');

    Products.get(options.id).then((res) => {
      this.setData({
        products: res.data,
      })
    });


  
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onPayClick: function () {
  },


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