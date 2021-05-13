// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:""
  },
  bindAddressInput: function(e) {
    this.setData({
      address:e.detail.value,
    })
  },
  bindSaveAddress: function() {
    // address?  mvvm 不找dom元素
    // setStorage 存起来 10Mb 
    // 最近看的十篇文章 可以离线阅读 用户的信息 配置
    wx.setStorage({
      key: "address",
      data:this.data.address,
      success:function(){
        wx.showToast({
          title:'地址保存成功',
          icon : 'success',
          duration:2000,
        })
      }
    });
  },
  bindClearAddress:function() {
    wx.clearStorage();
    this.setData({
      data:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'address',
      success: function(res) {
        that.setData({
          'address': res.data
        })
      },
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