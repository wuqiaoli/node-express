const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//创建数据库连接
const link = require('../db/db')
//方法一：便于管理
let connection = mysql.createConnection(link.mysql)
//方法二：便于管理
// var connection = mysql.createConnection({
// 	host: '127.0.0.1',
// 	user: 'root',
// 	password: 'root',
// 	database: 'wuqiaoli'
// });
//执行创建连接 
connection.connect();
//方法一：直接定义在router执行sql语句
// let sql = 'select * from user';
//方法二：封装成一个模块，按需引入，便于管理
const sql = require('../mysql/sql')
/* GET users listing. */
router.get('/', function(req, res, next) {

connection.query(sql.user.search,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        let obj = {
        	status:'200',
        	data:result
        }
        res.send(obj);
	});
});
module.exports = router;