<?php
return array(

	// 数据库配置信息
	'DB_TYPE'   => 'mysql',
	'DB_HOST'   => '127.0.0.1',
	'DB_NAME'   => 'ros',
	'DB_USER'   => 'root',
	'DB_PWD'    => '11111111',
	'DB_PORT'   => 3306,
	'DB_PREFIX' => 'ros_',

	// 网站名称
	'CFG_WEBNAME' => 'ROS桌面应用系统 v1.0',
	// 网站地址
	'CFG_WEBURL' => 'http://127.0.0.1/ros/',

	// 项目分组设定
	'APP_GROUP_LIST' => 'Home,Admin',
	// 默认分组
	'DEFAULT_GROUP'  => 'Home',
	
	// 默认认证类型 1 登录认证 2 实时认证
	'USER_AUTH_TYPE' => 2,
	// 默认认证标记
	'USER_AUTH_KEY' => 'userid',
	// 默认验证数据表模型
	'USER_AUTH_MODEL' => 'User',
	
	// 显示页面Trace信息
	// 'SHOW_PAGE_TRACE' => true,
	
);
?>