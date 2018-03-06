// pages/storage_pre/storage_pre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:'未设置地址'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 当页面加载完成
  onLoad: function (options) {
    console.log('onLoad');
  },
  gotoStorage:function() {
    wx.navigateTo({
      url:'../storage/storage'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key:'address',
      success: function(res) {
        console.log(res);
        if(res.data.length > 0) {
          that.setData({
            address: res.data
          })
        }
      }
    })
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      'hello': '欢迎回到松松的小程序'
     })
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
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