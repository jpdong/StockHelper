// miniprogram/pages/industry_detail/industry_detail.js
import * as echarts from '../../lib/ec-canvas/echarts';
var pageInstance
const SIZE = 20
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: [],
    roeSeries: [],
    epsSeries: [],
    cashFlowSeries: [],
    depositReceiveSeries: [],
    roeChart: {
      lazyLoad: true

    },
    cashFlowChart: {
      lazyLoad: true

    },
    epsChart: {
      lazyLoad: true

    },
    depositReceivedChart: {
      lazyLoad: true

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
  wx.setNavigationBarTitle({
    title: data.industry_name
  })
  getStockList(data.industry_name)
}

function getStockList(industry) {
  wx.cloud.callFunction({
    name: "getIndustryDetail",
    data: {
      name: industry,
    },
    success(res) {
      console.log("uploadData success:" + JSON.stringify(res));
      var stockList = res.result.data;
      console.log(stockList);
      var years = []
      var roeSeries = []
      var epsSeries = []
      var cashFlowSeries = []
      var depositReceiveSeries = []
      var yearMax = 0
      if (stockList.length > 0) {
        for (const key in stockList) {
          var stock = stockList[key];
          var yearDatas = stock.year
          if (yearDatas.length == 0) {
            continue
          }
          yearDatas.sort(function (a, b) { return a.index - b.index });
          var roeData = {}
          var epsData = {}
          var cashData = {}
          var depositData = {}
          roeData.name = stock.stock_name;
          roeData.type = "line"
          roeData.smooth = true
          epsData.name = stock.stock_name;
          epsData.type = "line"
          epsData.smooth = true
          cashData.name = stock.stock_name;
          cashData.type = "line"
          cashData.smooth = true
          depositData.name = stock.stock_name;
          depositData.type = "line"
          depositData.smooth = true
          var epsList = []
          var roeList = []
          var cashList = []
          var depositList = []
          if (yearDatas.length > yearMax) {
            years = []
            yearDatas.forEach(element => {
              years.push(element.index)
            });
            yearMax = yearDatas.length
          }
          yearDatas.forEach(element => {
            epsList.push(element.eps)
            roeList.push(element.roe)
            cashList.push(element.cash_flow)
            depositList.push(element.deposit_received)
          });
          roeData.list = roeList
          epsData.list = epsList
          cashData.list = cashList
          depositData.list = depositList
          roeSeries.push(roeData)
          epsSeries.push(epsData)
          cashFlowSeries.push(cashData)
          depositReceiveSeries.push(depositData)
        }
        pageInstance.data.years = years
        pageInstance.data.roeSeries = roeSeries
        pageInstance.data.epsSeries = epsSeries
        pageInstance.data.cashFlowSeries = cashFlowSeries
        pageInstance.data.depositReceiveSeries = depositReceiveSeries
        lazyInitCharts()
      }
    },
    fail(res) {
      console.log("uploadData error:" + res)
    }
  })
}

function lazyInitCharts() {
  var roeComponnet = pageInstance.selectComponent('#roe');
  roeComponnet.init((canvas, width, height) => {
    return roeChart(canvas, width, height);
  });
  var cashComponnet = pageInstance.selectComponent('#cash');
  cashComponnet.init((canvas, width, height) => {
    return cashFlowChart(canvas, width, height);
  });
  var epsComponnet = pageInstance.selectComponent('#eps');
  epsComponnet.init((canvas, width, height) => {
    return epsChart(canvas, width, height);
  });
  var depositComponnet = pageInstance.selectComponent('#deposit');
  depositComponnet.init((canvas, width, height) => {
    return depositReceivedChart(canvas, width, height);
  });

}

function roeChart(canvas, width, height) {
  console.log("roeChart")
  var stockData = pageInstance.data
  var legendList = []
  var legendName = []
  for (var i in stockData.roeSeries) {
    legendName.push(stockData.roeSeries[i].name)
    var obj = {
      name: stockData.roeSeries[i].name,
      type: "line",
      smooth: true,
      data: stockData.roeSeries[i].list
    }
    legendList.push(obj)
  }

  return initChart(canvas, width, height, "净资产收益率（单位：%）", stockData.years, legendList, legendName)
}

function epsChart(canvas, width, height) {
  var stockData = pageInstance.data
  var legendList = []
  var legendName = []
  for (var i in stockData.epsSeries) {
    legendName.push(stockData.epsSeries[i].name)
    var obj = {
      name: stockData.epsSeries[i].name,
      type: "line",
      smooth: true,
      data: stockData.epsSeries[i].list
    }
    legendList.push(obj)
    
  }
  return initChart(canvas, width, height, "每股收益（单位：元）", stockData.years, legendList, legendName)
}

function cashFlowChart(canvas, width, height) {
  var stockData = pageInstance.data
  var legendList = []
  var legendName = []
  for (var i in stockData.cashFlowSeries) {
    legendName.push(stockData.roeSeries[i].name)
    var obj = {
      name: stockData.cashFlowSeries[i].name,
      type: "line",
      smooth: true,
      data: stockData.cashFlowSeries[i].list
    }
    legendList.push(obj)
  }
  return initChart(canvas, width, height, "经营现金流净额（单位：亿元）", stockData.years, legendList, legendName)

}

function depositReceivedChart(canvas, width, height) {
  console.log("depositReceivedChart:")
  var stockData = pageInstance.data
  console.log(stockData.depositReceiveSeries)
  var legendList = []
  var legendName = []
  for (var i in stockData.depositReceiveSeries) {
    legendName.push(stockData.depositReceiveSeries[i].name)
    var obj = {
      name: stockData.depositReceiveSeries[i].name,
      type: "line",
      smooth: true,
      data: stockData.depositReceiveSeries[i].list
    }
    legendList.push(obj)
  }
  return initChart(canvas, width, height, "预收账款（单位：亿元）", stockData.years, legendList, legendName)
}

function initChart(canvas, width, height, title, xData, ySeries, legendNameList) {
  console.log("initChart width:" + width + " height:" + height)
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
    legend: {
      data: legendNameList,
      top: 30,
      left: 'center',
      backgroundColor: 'white',
      z: 100
    },
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
    series: ySeries
  };
  chart.setOption(option);
  return chart;
}