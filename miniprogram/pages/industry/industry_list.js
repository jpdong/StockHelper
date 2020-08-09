// miniprogram/pages/contribution/contribution.js
var pageInstance
const SIZE = 20
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    industryList: [],
    skip: 0,
    noMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    pageInstance = this
    loadData(0, 20)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("onPullDownRefresh")
    this.data.noMore = false
    this.data.industryList = []
    loadData(0, 20)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
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
  onShareAppMessage: function() {

  }
})

function loadData(skip, size) {
  wx.cloud.callFunction({
    name: "getIndustryList",
    data: {
      skip: skip,
      size: size
    },
    success(res) {
      console.log("uploadData success:" + JSON.stringify(res));
      var industryList = res.result.data;
      console.log(industryList);
      if (industryList.length < 20) {
        pageInstance.data.noMore = true
      }
      console.log("industryList list:" + JSON.stringify(industryList))
      pageInstance.data.skip += industryList.length
      var result = pageInstance.data.industryList
      console.log("before size:" + result.length)
      result = result.concat(industryList)
      console.log("report size:" + result.length)
      pageInstance.setData({
        industryList: result
      })
      wx.stopPullDownRefresh()
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
      wx.stopPullDownRefresh()
    }
  })
}