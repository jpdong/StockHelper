// miniprogram/pages/detail/detail.js
const app = getApp()
var pageInstance
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stock_name: "",
    stock_code: "",
    year: "",
    producation_asset: "",
    receivable: "",
    money: "",
    liability: "",
    slideline_asset: "",
    total_profit: "",
    total_asset: "",
    producationRatio: "",
    receivable_ratio: "",
    moneyLiability_ratio: "",
    slideline_ratio: "",
    producation_response_ratio: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageInstance = this
    console.log("detail load:" + JSON.stringify(options))
    showData(options._id)
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

function showData(id) {
  const reportList = app.globalData.reportList
  var data
  for (var i = 0; i < reportList.length;i++) {
      if (id == reportList[i]._id){
          data = reportList[i]
          break
      }
  }
  pageInstance.setData({
    stock_name: data.stock_name,
    stock_code: data.stock_code,
    year: data.year,
    producation_asset: data.producation_asset,
    receivable: data.receivable,
    money: data.money,
    liability: data.liability,
    slideline_asset: data.slideline_asset,
    total_profit: data.total_profit,
    total_asset: data.total_asset,
    producation_ratio: data.producation_ratio * 100.0,
    receivable_ratio: data.receivable_ratio * 100.0,
    moneyLiability_ratio: data.moneyLiability_ratio * 100.0,
    slideline_ratio: data.slideline_ratio * 100.0,
    producation_response_ratio: data.producation_response_ratio * 100.0,
  })
}