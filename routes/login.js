//业务逻辑
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const link = require('../db/db')
// let connection = mysql.createConnection(link.mysql)
// 使用连接池链接数据库
// var connection = mysql.createPool(link.mysql);

connection.connect();
const sql = require('../mysql/sql')
router.get('/', function(req, res, next) {
  //获取请求参数
  let params = req.query;
  //通过connection的query方法统一执行增删改查的操作。
  connection.query(sql.user.search, [params.username, params.pwd], function(err, result) {
    if (err) {
      console.log('[select error] - ', err.message);
      return;
    }
    var data = { 'info': '', 'status': '','message': '' };
    if (result) {
      data.info = result;
      if (result.length == 0) {
        data.status = '404';
        data.message = '暂无用户';
      } else {
        data.status = '200';
        data.message = '成功'
      }
    }
    res.send(data);
  });
});
module.exports = router;