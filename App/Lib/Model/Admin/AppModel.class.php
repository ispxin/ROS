<?php

class AppModel extends Model {

	// 自动验证
	protected $_validate = array(
		array('category', 'require', '请选择应用分类！'),
		array('title', 'require', '请填写应用标题！'),
		array('author', 'require', '请填写应用提供者！'),
		array('url', 'url', '请填写正确的应用地址！'),
		array('icon', 'require', '请填写图标地址！'),
		array('width', 'number', '请填写应用宽度，例如：800'),
		array('height', 'number', '请填写应用高度，例如：500'),
	);
	
	protected $_auto = array ( 
	    array('state', '1'),  // 新增的时候把state字段设置为1
	    array('pubdate', 'time', 1, 'function'), // 对pubdate字段在新增的时候写入当前时间戳
	);

}
