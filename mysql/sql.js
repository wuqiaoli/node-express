var sqlInfo = {
	user:{
		search: 'select * from user where username= ? and pwd= ?',
		//添加对用户操作的sql语句
	},
	comment:{
		message:'select * from user'
	}
}

module.exports = sqlInfo;