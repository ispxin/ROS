<?php
return array(

	// 成功提示页
	'TMPL_ACTION_SUCCESS' => 'Common:message',
	// 错误提示页
    'TMPL_ACTION_ERROR' => 'Common:message',
	
	// 模板路径解析
	'TMPL_PARSE_STRING' => array(
		'__CSS__' => __ROOT__.'/Public/Admin/css',
		'__JS__' => __ROOT__.'/Public/Admin/js',
		'__IMG__' => __ROOT__.'/Public/Admin/images',
	),
	
    // 默认认证类型 1 登录认证 2 实时认证
	'USER_AUTH_TYPE' => 2,
	// 默认认证标记
	'ADMIN_AUTH_KEY' => 'administrator',
	// 默认验证数据表模型
	'USER_AUTH_MODEL' => 'Admin',
	// 默认认证网关
	'USER_AUTH_GATEWAY' => '/Admin/Public/login',
	
);
?>