<?php

class AppAction extends CommonAction {
	
    public function index() {
    	
		$Category = M('Category');
		$App = M('App');
		
		$category = 0;
		
		// 查询条件
		$where['state'] = 1;
		
		// 获取分类下应用
    	if (!empty($_GET['category'])) {
    		$where['category'] = $this -> _get('category');
			$category = $this -> _get('category');
    	}
		
		// 分页实例化
    	$Page = $this -> paging($App, $where, $pagesize='5');
    	
		// 查询应用分类
		$category_list = $Category -> order('sort asc') -> select();

		// 查询应用列表
		$app_list = $App -> where($where) -> order('id asc') -> limit($Page -> firstRow.','.$Page -> listRows) -> getField('id,title,icon,description');
		
		$this -> assign('category_list', $category_list);
		$this -> assign('app_list', $app_list);
		$this -> assign('category', $category);
		$this -> assign('page', $Page -> show());
    	$this -> display();
    }
	
	/**
	 * 添加
	 */
	public function add() {
		
		$isLogin =  $this -> checkLogin();
		
		if (!$isLogin) {
			exit;
		}
		
		if (!is_numeric($_GET['desk']) || !is_numeric($_GET['id']) || !is_string($_GET['type'])) {
			exit;
		}
		
		if ($_GET['type'] != 'app') {
			exit;
		}
		
		$User = M('User');

		$userid = $_SESSION['userid'];
		$appid = $this -> _get('type') . '_' . $this -> _get('id');
		$desk = 'desk' . $this -> _get('desk');
		
		$deskField = $User -> where(array('id' => $userid)) -> getField($desk);
		
		if (substr_count($deskField, $appid)) {
			exit;
		}
		
		$appIdList = explode(',', $deskField);
		
		array_push($appIdList, $appid);
		
		$deskField = implode(',', $appIdList);

		$User -> where(array('id' => $userid)) -> setField($desk, $deskField);
		
		dump($deskField);
		
	}
	
	
	
	/**
	 * 判断用户是否已经添加过应用
	 */
	protected function isHasApp($id) {
		
	}
	
}