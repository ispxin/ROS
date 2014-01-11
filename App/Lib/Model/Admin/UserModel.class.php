<?php

class UserModel extends Model {

	//自动验证
	protected $_validate = array(
		array('user', 'require', '用户名不能为空！'),
		array('password', 'require', '密码不能为空！'),
		array('verify', 'require', '验证码不能为空！')
	);

}
