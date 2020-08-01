// pages/products/products.js
Page({

  /**
   * Page initial data
   */
  data: {
    products: [], 
    product: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
      const product = new wx.BaaS.TableObject('productsDS');
      product.find().then((res) => {
        this.setData({
          products: res.data.objects,
        })
      })
    },
    // toOrder: function(e) {
    //   const id = e.currentTarget.dataset.id;
      
    //   wx.navigateTo({
    //     url: `/pages/order/order?id=${id}`,
    //   })
    // },

    formSubmit: function (event) {
      console.log('formSubmit', event);
      let products = new wx.BaaS.TableObject('productsDS'); //no data is saved here, it's a command for the future
      let order = new wx.BaaS.TableObject('ordersDS');
      let newOrder = order.create(); //1. Create an empty record; object.create() method creates a new object, using an existing object as the prototype of the newly created object.
      //const product = this.data.products
      console.log('products', this.data.products)
      const productId = event.currentTarget.dataset.id
      console.log('productid', productId)
      let product =  this.data.products.find(element => element.id === productId);
      console.log('product', product)
      const data = {
        productsDS_id: product.id,
        points: product.points,
        name: product.name,
        price: product.price
      }
      console.log('set data', data); 
      newOrder.set(data); //2. Give the record some data. Hint: Data should include the same properties as the columns in your BaaS
      // Post data to API
      newOrder.save().then((res) => { //3. Store data to the backend and handle the response data
        console.log('save res', res);
        // const newOrders = this.data.order;
        // newOrders.push(res.data);
        // this.setData({
        //   ordersDS: newOrders,
        // })
        wx.showToast({
          title: 'Order Sent!',
          icon: 'success',
          duration: 2000,
          mask: true,
        });
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