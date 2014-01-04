<?php

class CategoryModel extends Model {

	// 自动验证
	protected $_validate = array(
		array('name', 'require', '分类名称不能为空！'),
		array('sort', 'require', '排序不能为空！'),
	);

}
