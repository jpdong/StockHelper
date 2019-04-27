// miniprogram/pages/contribution/contribution.js
var pageInstance
const SIZE = 20
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportList: [],
    skip: 0,
    noMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      pageInstance = this
      loadData(0,20)
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
      this.data.noMore = false
      this.data.reportList = null
      loadData(0,20)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (pageInstance.data.noMore) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1000
      })
    } else {
      loadData(pageInstance.data.skip, SIZE)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

function loadData(skip,size){
  wx.cloud.callFunction({
    name: "getList",
    data: {
      skip: skip,
      size:size
    },
    success(res) {
      console.log("uploadData success:" + JSON.stringify(res))
      const reportList = res.result.data
      if (reportList.length < 20) {
        pageInstance.data.noMore = true
      }
      console.log("resport list:" + JSON.stringify(reportList) )
      pageInstance.data.skip += reportList.length
      var result = pageInstance.data.reportList
      console.log("before size:" + result.length)
      result = result.concat(reportList)
      app.globalData.reportList = result
      console.log("report size:" + result.length)
      pageInstance.setData({
        reportList:result
      })
      // if (res.result.code == 0) {
        
      // } else {
      //   wx.showToast({
      //     title: res.result.msg,
      //     icon: 'fail',
      //     duration: 2000
      //   })
      // }
     
    },
    fail(res) {
      console.log("uploadData error:" + res)
    
    }
  })
}