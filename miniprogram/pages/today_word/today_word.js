// miniprogram/pages/today_word/today_word.js
const app = getApp()
var pageInstance
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imageUrl:"",
      imageId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageInstance = this
    var fileId = "cloud://stock-dev-a2f995.7374-stock-dev-a2f995/background.png"
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        console.log(res.fileList)
        if (res.fileList[0].status == 0) {
          pageInstance.setData({
            imageId: fileId,
            imageUrl:res.fileList[0].tempFileURL
          })
        }
      },
      fail: err => {
      }
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