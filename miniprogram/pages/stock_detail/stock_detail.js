// miniprogram/pages/stock-detail/stock-detail.js
import * as echarts from '../../lib/ec-canvas/echarts';
const app = getApp()
var pageInstance
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stockData: {},
    roeChart: {
      onInit: roeChart
    },
    cashFlowChart: {
      onInit: cashFlowChart
    },
    epsChart: {
      onInit: epsChart
    },
    depositReceivedChart: {
      onInit: depositReceivedChart
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageInstance = this
    console.log("detail load:" + JSON.stringify(options))
    showData(options)
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

function showData(data) {
  repostVisit(data.stock_code)
  var currentData = {}
  console.log("showData:" + JSON.stringify(data))
  console.log("report size:" + app.globalData.reportList)
  let globalList = app.globalData.reportList;
  for (const key in globalList) {
    console.log("showData:key:" + JSON.stringify(globalList[key]))
    let item = globalList[key];
    if (item.stock_code == data.stock_code) {
      currentData = item
      break
    }
  }
  console.log("current:" + JSON.stringify(currentData))
  wx.setNavigationBarTitle({
    title: currentData.stock_name + "（" + currentData.stock_code + "）"
  })
  let years = []
  let epss = []
  let roes = []
  let cashFlows = []
  let depositReceiveds = []
  var yearDatas = currentData.year;
  var epsUnit;
  var roeUnit;
  var cashFlowUnit;
  var depositReceivedUnit;
  console.log("yearData:" + yearDatas)
  if (yearDatas.length == 0) {
    return
  }
  yearDatas.sort(function (a, b) { return a.index - b.index });

  for (const key in yearDatas) {
    let item = yearDatas[key]
    years.push(item.index)
    epss.push(item.eps)
    roes.push(item.roe)
    cashFlows.push(item.cash_flow)
    depositReceiveds.push(item.deposit_received)
    epsUnit = item.eps_unit;
    roeUnit = item.roe_unit;
    cashFlowUnit = item.cash_flow_unit;
    depositReceivedUnit = item.deposit_received_unit;
  }
  pageInstance.data.stockData = {
    years: years,
    epss: epss,
    roes: roes,
    cashFlows: cashFlows,
    depositReceiveds: depositReceiveds,
    epsUnit: epsUnit,
    roeUnit: roeUnit,
    cashFlowUnit: cashFlowUnit,
    depositReceivedUnit: depositReceivedUnit,
  }
  pageInstance.setData({
    stockData: {
      years: years,
      epss: epss,
      roes: roes,
      cashFlows: cashFlows,
      depositReceiveds: depositReceiveds,
      epsUnit: epsUnit,
    roeUnit: roeUnit,
    cashFlowUnit: cashFlowUnit,
    depositReceivedUnit: depositReceivedUnit,
    }
  })
}

function repostVisit(code) {
  wx.cloud.callFunction({
    name: "visit",
    data: {
      stock_code: code,
    },
    success(res) {
      console.log("uploadData success:" + JSON.stringify(res))
    },
    fail(res) {
      console.log("uploadData error:" + res)
    }
  })
}

function roeChart(canvas, width, height) {
  console.log("roeChart")
  var stockData = pageInstance.data.stockData
  initChart(canvas, width, height, "净资产收益率（单位：" + stockData.roeUnit + "）", stockData.years, stockData.roes)
}

function epsChart(canvas, width, height) {
  var stockData = pageInstance.data.stockData
  initChart(canvas, width, height, "每股收益（单位：" + stockData.epsUnit + "）", stockData.years, stockData.epss)
}

function cashFlowChart(canvas, width, height) {
  var stockData = pageInstance.data.stockData
  initChart(canvas, width, height, "经营现金流净额（单位：" + stockData.cashFlowUnit + "）", stockData.years, stockData.cashFlows)
}

function depositReceivedChart(canvas, width, height) {
  var stockData = pageInstance.data.stockData
  initChart(canvas, width, height, "预收账款（单位：" + stockData.depositReceivedUnit + "）", stockData.years, stockData.depositReceiveds)
}

function initChart(canvas, width, height, title, xData, yData) {
  console.log("width:" + width + " height:" + height)
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  title
  var option = {
    title: {
      text: title,
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: yData
    }]
  };
  chart.setOption(option);
  return chart;
}