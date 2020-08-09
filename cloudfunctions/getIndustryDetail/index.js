// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "stock-dev-a2f995"
})
const db = cloud.database()
const cmd = db.commandindustry
// 云函数入口函数
exports.main = async (event, context) => {
  console.log("name:" + event.name);
  const industry = await db.collection("industry")
    .where({
      industry_name: event.name
    })
    .get()
  console.log(industry)
  const newNum = industry.data[0].visit_num + 1;
  db.collection("industry")
    .where({
      industry_name: event.name
    })
    .update({
      data: {
        visit_num: newNum
      }
    })
  return db.collection("past_years_data")
    .where({
      industry: event.name
    })
    .get()
}