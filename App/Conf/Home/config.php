<?php
return array(

	// 模板路径解析
	'TMPL_PARSE_STRING' => array(
		'__CSS__' => __ROOT__.'/Public/Home/css',
		'__JS__' => __ROOT__.'/Public/Home/js',
		'__IMG__' => __ROOT__.'/Public/Home/images',
	),
	
	// 默认认证类型 1 登录认证 2 实时认证
	'USER_AUTH_TYPE' => 2,
	// 默认认证标记
	'USER_AUTH_KEY' => 'userid',
	// 默认验证数据表模型
	'USER_AUTH_MODEL' => 'User',
	// 默认认证网关
	// 'USER_AUTH_GATEWAY' => '/Admin/Public/login',

);
?>