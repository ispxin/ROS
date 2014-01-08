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

		// App添加标记  ：isAddApp
		// 1 => 已添加
		// 0 => 未添加
		foreach ($app_list as $key => $value) {
			$isAddApp = $this -> isAddApp($value['id']);
			if ($isAddApp) {
				$app_list[$key]['isAddApp'] = 1;
			} else {
				$app_list[$key]['isAddApp'] = 0;
			}
		}
		
		$this -> assign('category_list', $category_list);
		$this -> assign('app_list', $app_list);
		$this -> assign('category', $category);
		$this -> assign('page', $Page -> show());
    	$this -> display();
    }
	
	/**
	 * 添加
	 */
	public function addApp() {
		
		$isLogin =  $this -> checkLogin();

		if (!$isLogin) {
			exit;
		}
		
		if (!is_numeric($_POST['desk']) || !is_numeric($_POST['id'])) {
			exit;
		}
		
		$User = M('User');

		$userid = $_SESSION['userid'];
		$appid = 'app_' . $this -> _post('id');
		$desk = 'desk' . $this -> _post('desk');
		
		$deskField = $User -> where(array('id' => $userid)) -> getField($desk);

		$isHasApp = $this -> isHasApp($this -> _post('id'));
		
		if (!$isHasApp) {
			exit;
		}
		
		$isAddApp = $this -> isAddApp($appid);
		
		if ($isAddApp) {
			exit;
		}
		
		$appIdList = explode(',', $deskField);
		
		array_push($appIdList, $appid);
		
		$deskField = implode(',', $appIdList);

		$User -> where(array('id' => $userid)) -> setField($desk, $deskField);
		
		$appField = $this -> getAppField($this -> _post('id'));
		
		$this -> ajaxReturn($appField, '添加成功', 1);
		
	}
	
	
	
	/**
	 * 判断用户是否已经添加过应用
	 */
	protected function isAddApp($appid) {
		
		$deskField = M('User') -> where(array('id' => $_SESSION['userid'])) -> find();
		
		$allApp = $deskField['desk1'] . ',' . $deskField['desk2'] . ',' . $deskField['desk3'] . ',' . $deskField['desk4'] . ',' . $deskField['desk5'];
		
		if (substr_count($allApp, $appid)) {
			return true;
		}
		
		return false;
	}

	/**
	 * 检查应用仓库是否有应用
	 */
	protected function isHasApp($appid) {
		
		$result = M('App') -> where(array('id' => $appid, 'state' => 1)) -> find();
		
		if ($result) {
			return true;
		}
		
		return false;
		
	}
	
	/**
	 * 获取App字段
	 */
	protected function getAppField($appid) {
		
		return M('App') -> where(array('id' => $appid)) -> find();
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}