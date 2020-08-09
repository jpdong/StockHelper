// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "stock-dev-a2f995"
})
const db = cloud.database()
const cmd = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.stock_code);
  const stock_code = event.stock_code;
  console.log("stock_code:" + stock_code)
  const stockData = await db.collection("past_years_data")
  .where({
    stock_code:stock_code
  })
  .get()
  console.log(stockData)
  const newNum = stockData.data[0].visit_num + 1;
  return db.collection("past_years_data")
  .where({
    stock_code:stock_code
  })
  .update({
    data:{
      visit_num:newNum
    }
  })
}