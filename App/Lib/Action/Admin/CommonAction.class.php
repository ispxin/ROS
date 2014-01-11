<?php

class CommonAction extends Action {
	
	public function _initialize(){
		$this -> checkLogin();
		$this -> assign('username', session('username'));
	}
	
	// 检测登录状态 <内部方法>
	protected function checkLogin() {
		// 检查认证识别号
		if (!isset($_SESSION[C('USER_AUTH_KEY')]) || $_SESSION['role'] != 1) {
			// 跳转到认证网关
			$this -> redirect(C('USER_AUTH_GATEWAY'));
		}
	}

	// 分页 <内部方法>
	protected function paging($obj, $where='', $pagesize='15') {
		import('ORG.Util.Page');
		$count = $obj -> where($where) -> count();
		$page = new Page($count, $pagesize);
		return $page;
	}

	// 获取应用分类名称 <内部方法>
	protected function getAppCategory($app_category_id) {
		$name = M('Category') -> where(array('id' => $app_category_id)) -> getField('name');
		return $name;
	}
	
}