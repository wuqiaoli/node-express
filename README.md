# node-express
node框架express系列教程<br> 
一.搭建express框架<br> 
   使用express应用生成器,前提是已经安装好node<br> 
   (1)npm install express-generator -g<br> 
   (2)express 项目名称 如：express myexpress<br> 
   (3)cd 项目名称<br> 
   (4)npm install<br> 
   (5)set DEBUG=myapp & npm start （Windows平台应用启动）<br> 
   (6)访问 http://localhost:3000/ <br> 
   此时的目录结构
	├── app.js
	├── bin
	│   └── www
	├── package.json
	├── public
	│   ├── images
	│   ├── javascripts
	│   └── stylesheets
	│       └── style.css
	├── routes
	│   ├── index.js
	│   └── users.js
	└── views
	   ├── error.jade
	   ├── index.jade
	    └── layout.jade
二.连接数据库<br> 
   (1)下载mysql，使用一款界面工具比如：navicat,创建一个数据库，在数据库创建一个表<br> 
   (2)安装mysql依赖： npm install mysql --save<br> 
   (3)创建一个服务，本质就是一个接口（个人理解）<br> 
      	2.1： 如，创建一个用户查询接口，就以routes/user.js为例<br> 
      	首先: 引入mysql模块:var mysql = require('mysql');<br> 
      	其次: 创建数据库链接<br> 
      		let connection = mysql.createConnection({
				host: '127.0.0.1',
				user: 'root',  //用户名
				password: 'root', //用户密码
				database: '****' //database
			});
		然后: 执行创建连接 <br> 
			connection.connect();
		其次: 业务逻辑处理<br> 
			  定义sql语句： let sql = 'select * from user' , //user是指查询的表名
			  router.get('/', function(req, res, next) {
				connection.query(sql语句,function (err, result) {
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
		最后:访问路由<br> 
			在app.js中引入
			var user = require('./routes/users');
			app.use('/users', user);
	到此，一个简单的链接数据库就ok.访问http://localhost:3000/users，就可以看到返回的数据。<br> 
	（就相当于一个接口：http://127.0.0.1:3000/users）
	(4)优化，为了统一管理，进行了模块化管理(粗浅的提供一种思路)<br> 
	   首先: 创建数据库链接，作为一个models。<br> 
	       	 新建 db/db.js
	   其次: sql语句，作为一个模块。<br> 
	         新建 mysql/sql.js
	   最后: 在业务.js引入：<br> 
	   		const link = require('../db/db')
			const sql = require('../mysql/sql')
			具体代码：请一一对照这几个文件。
	以上便是一个简单的express框架连接数据库的案例。<br> 




