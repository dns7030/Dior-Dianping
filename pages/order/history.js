// pages/order/history.js
// pages/products/products.js
Page({

  /**
   * Page initial data
   */
  data: {
    orders: [], 
    product: [],
    currentUser: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
      const product = new wx.BaaS.TableObject('ordersDS');
      product.find().then((res) => {
        this.setData({
          orders: res.data.objects,
        })
      })
    },


    formSubmit: function (event) {
      console.log('formSubmit', event);
      let products = new wx.BaaS.TableObject('productsDS'); //no data is saved here, it's a command for the future
      let order = new wx.BaaS.TableObject('ordersDS');
      let newOrder = order.create(); //1. Create an empty record; object.create() method creates a new object, using an existing object as the prototype of the newly created object.
      const productId = event.currentTarget.dataset.id
      let product =  this.data.products.find(element => element.id === productId);
      const data = {
        productsDS_id: product.id,
        points: product.points,
        name: product.name,
        price: product.price
      }
      newOrder.set(data); //2. Give the record some data.
      // Post data to API
      newOrder.save().then((res) => { //3. Store data to the backend and handle the response data
        console.log('save res', res);

        wx.showToast({
          title: 'Order Sent!',
          icon: 'success',
          duration: 2000,
          mask: true,
        });
        let currentUser = this.data.currentUser;
        let points = res.data.points;
        wx.BaaS.auth.getCurrentUser().then(user => { //updates point in BaaS
          user.set("points", user.get("points") + points).update().then(function(res) {
            getApp().globalData.userInfo = res.data

            wx.reLaunch({
              url: '/pages/profile/index' // show list of orders in user dashboard
            });
          })
        })
        // app.globalData.userInfo = res.data
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