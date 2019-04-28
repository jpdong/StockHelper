// miniprogram/pages/contribution/contribution.js
import * as Stock from "../../model/Stock.js";
import * as Report from "../../model/Report.js";
import * as Util from "../../lib/util.js";
var pageInstance
Page({
  data: {
    submiting: false,
    stock: new Stock.Stock("", ""),
    report: new Report.Report(),
    name: "",
    code: "",
    year: "",
    producationAsset: "",
    receivable: "",
    money: "",
    liability: "",
    slidelineAsset: "",
    totalProfit: "",
    totalAsset: "",
  },

  onLoad: function(options) {
      pageInstance = this
  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  },

  inputStockName(e) {
    console.log("inputStockName:" + e.detail.value)
    this.name = e.detail.value
    this.setData({
      name:e.detail.value
    })
  },
  inputStockCode(e) {
    console.log("inputStockCode:" + e.detail.value)
    this.code = e.detail.value
    this.setData({
      code: e.detail.value
    })
  },
  inputYear(e) {
    console.log("inputYear:" + e.detail.value)
    this.year = e.detail.value
    this.setData({
      year: e.detail.value
    })
  },
  inputProducationAsset(e) {
    console.log("inputProducationAsset:" + e.detail.value)
    this.producationAsset = e.detail.value
    this.setData({
      producationAsset: e.detail.value
    })
  },
  inputReceivable(e) {
    console.log("inputReceivable:" + e.detail.value)
    this.receivable = e.detail.value
    this.setData({
      receivable: e.detail.value
    })
  },
  inputMoney(e) {
    console.log("inputMoney:" + e.detail.value)
    this.money = e.detail.value
    this.setData({
      money: e.detail.value
    })
  },
  inputLiability(e) {
    console.log("inputLiability:" + e.detail.value)
    this.liability = e.detail.value
    this.setData({
      liability: e.detail.value
    })
  },
  inputSlidelineAsset(e) {
    console.log("inputSlidelineAsset:" + e.detail.value)
    this.slidelineAsset = e.detail.value
    this.setData({
      slidelineAsset: e.detail.value
    })
  },
  inputTotalProfit(e) {
    console.log("inputTotalProfit:" + e.detail.value)
    this.totalProfit = e.detail.value
    this.setData({
      totalProfit: e.detail.value
    })
  },
  inputTotalAsset(e) {
    console.log("inputTotalAsset:" + e.detail.value)
    this.totalAsset = e.detail.value
    this.setData({
      totalAsset: e.detail.value
    })
  },
  contributeData(e) {
    this.setData ({
      submiting:true
    })
    uploadData(new Stock.Stock(this.data.name, this.data.code), this.data.year, this.data.producationAsset, this.data.receivable, this.data.money, this.data.liability, this.data.slidelineAsset, this.data.totalProfit, this.data.totalAsset)
  }
})

function uploadData(stock, year, producationAsset, receivable, money, liability, slidelineAsset, totalProfit, totalAsset) {
  if (Util.checkNotNull(stock) && Util.checkNumber(year) && Util.checkNumber(producationAsset) && Util.checkNumber(receivable) &&
    Util.checkNumber(money) && Util.checkNumber(liability) && Util.checkNumber(slidelineAsset) && Util.checkNumber(totalProfit) && Util.checkNumber(totalAsset)) {
    wx.cloud.callFunction({
      name: "contributeReport",
      data: {
        data: JSON.stringify(new Report.Report(stock.name, stock.code, year, producationAsset, receivable, money, liability, slidelineAsset, totalProfit, totalAsset))
      },
      success(res) {
        console.log("uploadData success:" + JSON.stringify(res))
        if (res.result.code == 0) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.result.msg,
            icon: 'fail',
            duration: 2000
          })
        }
        pageInstance.setData({
          name:"",
          submiting: false
        })
        clearData()
      },
      fail(res) {
        console.log("uploadData error:" + res)
        pageInstance.setData({
          submiting:false
        })
      }
    })
  } else {
    Util.dialog("提示","请填写所有的项目，未知或没有请填写0")
    pageInstance.setData({
      submiting: false
    })
  }
  
}

function clearData() {
  pageInstance.data.name = ""
  pageInstance.data.code = ""
  pageInstance.data.year = ""
  pageInstance.data.producationAsset = ""
  pageInstance.data.receivable = ""
  pageInstance.data.money = ""
  pageInstance.data.liability = ""
  pageInstance.data.slidelineAsset = ""
  pageInstance.data.totalProfit = ""
  pageInstance.data.totalAsset = ""
  pageInstance.setData({
    name: "",
    code: "",
    year: "",
    producationAsset: "",
    receivable: "",
    money: "",
    liability: "",
    slidelineAsset: "",
    totalProfit: "",
    totalAsset: ""
  })
}