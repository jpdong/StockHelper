// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "stock-dev-a2f995"
})
const db = cloud.database()
const cmd = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log("skip:" + event.skip + ",size:" + event.size)
  return db.collection("industry")
  .orderBy('visit_num', 'desc')
  .skip(event.skip)
  .limit(event.size)
  .get()
}