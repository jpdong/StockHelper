const Util = require("util.js");
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "stock-dev-a2f995"
})
const db = cloud.database()
const cmd = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  console.log("data:" + event.data)
  var data = JSON.parse(event.data)
  if (Util.checkNotNull(data.stockName) && Util.checkNumber(data.stockCode) && Util.checkNumber(data.year) && Util.checkNumber(data.producationAsset) && Util.checkNumber(data.receivable) &&
    Util.checkNumber(data.money) && Util.checkNumber(data.liability) && Util.checkNumber(data.slidelineAsset) && Util.checkNumber(data.totalProfit) && Util.checkNumber(data.totalAsset)) {
    var producationRatio = 0.0
    var receivableRatio = 0.0
    var moneyLiabilityRatio = 0.0
    var slidelineRatio = 0.0
    var totalAsset = parseFloat(data.totalAsset)
    var liability = parseFloat(data.liability)
    var producationAsset = parseFloat(data.producationAsset)
    var producationResponseRatio = 0.0
    if (totalAsset != 0.0) {

      producationRatio = parseFloat(data.producationAsset) / totalAsset
      receivableRatio = parseFloat(data.receivable) / totalAsset
      slidelineRatio = parseFloat(data.slidelineAsset) / totalAsset
    }
    if (liability != 0.0) {
      moneyLiabilityRatio = parseFloat(data.money) / liability
    }
    if (producationAsset != 0.0) {
      producationResponseRatio = parseFloat(data.totalProfit) / producationAsset
    }
    await db.collection("contribution").add({
      data: {
        stock_name: data.stockName,
        stock_code: data.stockCode,
        year: data.year,
        producation_asset: data.producationAsset,
        receivable: data.receivable,
        money: data.money,
        liability: data.liability,
        slideline_asset: data.slidelineAsset,
        total_profit: data.totalProfit,
        total_asset: data.totalAsset,
        producation_ratio: producationRatio,
        receivable_ratio: receivableRatio,
        moneyLiability_ratio: moneyLiabilityRatio,
        slideline_ratio: slidelineRatio,
        producation_response_ratio: producationResponseRatio,
      }
    })
    return {
      code: 0,
      msg: "success"
    }
  } else {
    return {
      code: 1,
      msg: "invalid data"
    }
  }
}