# node-express
node框架express系列教程
<p>一.搭建express框架</p>
   <p>使用express应用生成器,前提是已经安装好node</p>
   <p>(1)npm install express-generator -g</p>
   <p>(2)express 项目名称 如：express myexpress</p>
   <p>(3)cd 项目名称</p>
   <p>(4)npm install</p>
   <p>(5)set DEBUG=myapp & npm start （Windows平台应用启动）</p>
   <p>(6)访问 http://localhost:3000/ </p>
   <p>此时的目录结构</p>
	<p>   	.
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
	    └── layout.jade</p>
<p>二.连接数据库</p>
   <p>(1)下载mysql，使用一款界面工具比如：navicat,创建一个数据库，在数据库创建一个表</p>
   <p>(2)安装mysql依赖： npm install mysql --save</p>
   <p>(3)创建一个服务，本质就是一个接口（个人理解）</p>
      	<p>2.1： 如，创建一个用户查询接口，就以routes/user.js为例</p>
      	<p>首先: 引入mysql模块:var mysql = require('mysql');</p>
      	<p>其次: 创建数据库链接</p>
      		<p>let connection = mysql.createConnection({</p>
			<p>	host: '127.0.0.1',</p>
			<p>	user: 'root',  //用户名</p>
			<p>	password: 'root', //用户密码</p>
			<p>	database: '****' //database</p>
			<p>});
		<p>然后: 执行创建连接 </p>
			<p>connection.connect();</p>
		<p>其次: 业务逻辑处理</p>
			  <p>定义sql语句： let sql = 'select * from user' , //user是指查询的表名</p>
			  <p>router.get('/', function(req, res, next) {</p>
				<p>connection.query(sql语句,function (err, result) {</p>
				       <p> if(err){</p>
				         <p> console.log('[SELECT ERROR] - ',err.message);</p>
				         <p> return;</p>
				        <p>}</p>
				        <p>let obj = {</p>
				        	<p>status:'200',</p>
				        	<p>data:result</p>
				        <p>}</p>
				        <p>res.send(obj);</p>
					<p>});</p>
				<p>});</p>
				<p>module.exports = router;</p>
		<p>最后:访问路由</p>
			<p>在app.js中引入</p>
			<p>var user = require('./routes/users');</p>
			<p>app.use('/users', user);</p>
	<p>到此，一个简单的链接数据库就ok.访问http://localhost:3000/users，就可以看到返回的数据。</p>
	<p>（就相当于一个接口：http://127.0.0.1:3000/users）</p>
	<p>(4)优化，为了统一管理，进行了模块化管理(粗浅的提供一种思路)</p>
	   <p>首先: 创建数据库链接，作为一个models。</p>
	       	<p> 新建 db/db.js</p>
	   <p>其次: sql语句，作为一个模块。</p>
	        <p> 新建 mysql/sql.js</p>
	   <p>最后: 在业务.js引入：</p>
	   		<p>const link = require('../db/db')</p>
			<p>const sql = require('../mysql/sql')</p>
			<p>具体代码：请一一对照这几个文件。</p>
	<p>以上便是一个简单的express框架连接数据库的案例。</p>




