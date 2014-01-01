<?php

class CommonAction extends Action {
	
	public function _initialize(){
		$this -> checkLogin();
		$this -> assign('user', session('user'));
	}
	
	// 检测登录状态 <内部方法>
	protected function checkLogin() {
		// 检查认证识别号
		if (!isset($_SESSION[C('ADMIN_AUTH_KEY')])) {
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

	// 获取文章目录名称 <内部方法>
	protected function getArticleCategory($article_category_id) {
		$name = M('Category') -> where(array('id' => $article_category_id)) -> getField('name');
		return $name;
	}
	
}