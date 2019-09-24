var app = getApp();
Page({
  data: {
    user: app.globalData.user,
    BASE: app.globalData.BASE,
    CDN: app.globalData.BASE.config.CDN,
    winHeight: "400",
    currentTab: 1,
    scrollLeft: 0,
    catelist:[],
    foodlist:[],
    expertList: [{
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }]
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.data.BASE.request.get(`/home.php?action=foodlist&cateid=${cur}`).then((res)=>{
        console.log(res.data)
         this.setData({
           foodlist : res.data,
           currentTab: cur
         })
      })
    }
  },
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    this.data.BASE.request.get('/home.php?action=foodcate').then((res)=>{
    this.setData({
      catelist : res.data.foodcate,
      foodlist : res.data.foodlist
    })
    })
  },
  footerTap: app.footerTap
})