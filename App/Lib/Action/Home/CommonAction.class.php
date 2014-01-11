<?php

class CommonAction extends Action {
	
	// 检查是否登录
	protected function checkLogin() {
		if (isset($_SESSION[C('USER_AUTH_KEY')])) {
			return true;
		} else {
			return false;
		}
	}

	// 分页 <内部方法>
	protected function paging($obj, $where='', $pagesize='15') {
		import('ORG.Util.Page');
		$count = $obj -> where($where) -> count();
		$page = new Page($count, $pagesize);
		return $page;
	}
	
}