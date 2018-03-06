//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab:0,
    // time:0,
    scend:3
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  }, 
  clickTab: function(e){
    // active 加到当前的也好 x
    // 状态改变 data binding 值
    console.log(e);
    var index = e.target.dataset.current;
    console.log(index);
    this.setData({
      currentTab:index,
    })
  },
  swiperTab: function(e) {
    this.setData({
      currentTab:e.detail.current,
    });
  },
  onLoad: function () {
    // 界面的改变，由数据决定
    // 界面的状态 === 数据的值
    // MVVM 区分dom api的本质
  //   setTimeout(() => {
  //   this.setData({
  //     currentTab:1
  //   })
  //  }, 1500)
  this.setIntime();
  },
  setIntime: function() {
    var i = 0 ;
    var scend = this.data.scend;
    setInterval(() => {
      i++;
      if(i>3 ){
         i=0;
         scend +=1 
       } 
       if (scend>2) {
         scend = 0
       }
      this.setData({
        currentTab:scend,
        scend: 3-i
      })
     }, 1000)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
