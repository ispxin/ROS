<?php

class AppAction extends CommonAction {
	
	/**
	 * 应用市场首页
	 */
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
		$app_list = $App -> where($where) -> order('id asc') -> limit($Page -> firstRow.','.$Page -> listRows) -> field('id,title,icon,description') -> select();

		foreach ($app_list as $key => $value) {
			
			// App添加标记  ：isAddApp
			// 1 => 已添加
			// 0 => 未添加
			$isAddApp = $this -> isAddApp($value['id']);
			if ($isAddApp) {
				$app_list[$key]['isAddApp'] = 1;
			} else {
				$app_list[$key]['isAddApp'] = 0;
			}
			
			// 获取App添加总数
			$appCount = $this -> getAppCount($value['id']);
			$app_list[$key]['appCount'] = $appCount;
			
		}

		$this -> assign('category_list', $category_list);
		$this -> assign('app_list', $app_list);
		$this -> assign('category', $category);
		$this -> assign('page', $Page -> show());
    	$this -> display();
    }
	
	/**
	 * 添加应用
	 */
	public function addApp() {

		$isLogin =  $this -> checkLogin();

		if (!$isLogin) {
			$this -> ajaxReturn(0, '未登陆', 2);
		}
		
		if (!is_numeric($_POST['desk']) || !is_numeric($_POST['appid']) || !is_numeric($_POST['type'])) {
			exit;
		}

		$map['userid'] = $_SESSION['userid'];
		$map['appid'] = $this -> _post('appid');
		$map['desk'] = $this -> _post('desk');
		$map['type'] = $this -> _post('type');

		$isHasApp = $this -> isHasApp($map['appid']);
		
		if (!$isHasApp) {
			exit;
		}
		
		$isAddApp = $this -> isAddApp($map['appid']);
		
		if ($isAddApp) {
			exit;
		}
		
		$result = M('Userapp') -> add($map);
		
		if ($result) {
			$appField = M('App') -> where(array('id' => $map['appid'])) -> find();
			$appField['appCount'] = $this -> getAppCount($map['appid']);
			$this -> ajaxReturn($appField, '添加成功', 1);
		} else {
			$this -> ajaxReturn(0, '添加失败', 0);
		}
		
	}

	/**
	 * 删除应用
	 */
	public function delApp() {
		
		$isLogin =  $this -> checkLogin();

		if (!$isLogin) {
			$this -> ajaxReturn(0, '未登陆', 2);
		}
		
		if (!is_numeric($_POST['appid']) || !is_numeric($_POST['type'])) {
			exit;
		}
		
		$map['userid'] = $_SESSION['userid'];
		$map['appid'] = $this -> _post('appid');
		$map['type'] = $this -> _post('type');
		
		$isHasApp = $this -> isHasApp($map['appid']);
		
		if (!$isHasApp) {
			exit;
		}
		
		$isAddApp = $this -> isAddApp($map['appid']);
		
		if (!$isAddApp) {
			exit;
		}
		
		$result = M('Userapp') -> where($map) -> delete();
		
		if ($result) {
			$this -> ajaxReturn(0, '卸载成功', 1);
		} else {
			$this -> ajaxReturn(0, '卸载失败', 0);
		}
			
	}
	
	/**
	 * 移动App桌面位置
	 */
	public function moveDeskApp() {
		
		$isLogin =  $this -> checkLogin();

		if (!$isLogin) {
			$this -> ajaxReturn(0, '未登陆', 2);
		}
		
		if (!is_numeric($_POST['appid']) || !is_numeric($_POST['type']) || !is_numeric($_POST['desk'])) {
			exit;
		}
		
		$map['userid'] = $_SESSION['userid'];
		$map['appid'] = $this -> _post('appid');
		$map['type'] = $this -> _post('type');
		$map['desk'] = $this -> _post('desk');
		
		$isHasApp = $this -> isHasApp($map['appid']);
		
		if (!$isHasApp) {
			exit;
		}
		
		$isAddApp = $this -> isAddApp($map['appid']);
		
		if (!$isAddApp) {
			exit;
		}
		
		$result = M('Userapp') -> where(array('userid' => $map['userid'], 'type' => $map['type'], 'appid' => $map['appid'])) -> save(array('desk' => $map['desk']));
		
		if ($result) {
			$this -> ajaxReturn(0, '移动成功', 1);
		} else {
			$this -> ajaxReturn(0, '移动失败', 0);
		}
		
	}

	/**
	 * 判断用户是否已经添加过应用
	 */
	protected function isAddApp($appid) {
		
		$result = M('Userapp') -> where(array('userid' => $_SESSION['userid'], 'appid' => $appid)) -> find();

		if ($result) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * 检查应用仓库是否有应用
	 */
	protected function isHasApp($appid) {
		
		$result = M('App') -> where(array('id' => $appid, 'state' => 1)) -> find();
		
		if ($result) {
			return true;
		} else {
			return false;
		}

	}
	
	/**
	 * 获取App字段
	 */
	protected function getAppField($appid) {
		return M('App') -> where(array('id' => $appid)) -> find();
	}
	
	/**
	 * 获取App添加总数
	 */
	protected function getAppCount($appid) {
		$result = M('Userapp') -> where(array('type' => 1, 'appid' => $appid)) -> field('id') -> select();
		if ($result) {
			return count($result);
		} else {
			return 0;
		}
	}
	
}