//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    user: app.globalData.user,
    BASE: app.globalData.BASE,
    CDN: app.globalData.BASE.config.CDN,
    imgUrls: [],
   meunList: [
      '../../image/city.png',
      '../../image/all.png',
      '../../image/timer.png',
      '../../image/video_sel.png',
      '../../image/mahout.png'
    ],
    hotfood:[],
    indicatorDots: true,
  },
  onLoad(){
    this.data.BASE.request.get('/home.php?action=banner').then((res)=>{
     
      this.setData({
        imgUrls : res.data
      });
    })
    this.data.BASE.request.get('/home.php?action=hotfood').then((res)=>{
      console.log(res.data)
       this.setData({
         hotfood : res.data
       })
    })
  }
})