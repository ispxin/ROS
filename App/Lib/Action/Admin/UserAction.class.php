<?php

class UserAction extends CommonAction {
	
	// 会员管理 <视图>
	public function index() {
		
		$User = M('User');

    	// 判断状态
    	if (isset($_GET['state'])) {
    		$user_state =  $this -> _get('state');
    	} else {
    		$user_state = 1;
    	}

    	// 获取某个状态
    	$where['state'] = $user_state;
		$where['role'] = 0;
		
		// 分页实例化
    	$Page = $this -> paging($User, $where);
		
		// 获取会员数
    	$user_count = $this -> getUserCount();
		
		// 获取会员列表
    	$user_list = $User -> where($where) -> order('id desc') -> limit($Page -> firstRow.','.$Page -> listRows) -> field('id,user,regtime,ip,lastlogintime') -> select();
		
		// 获取会员应用总数
		foreach ($user_list as $key => $value) {
			$user_list[$key]['appCount'] = $this -> getUserAppCount($value['id']);
		}
		
		$this -> assign('user_state', $user_state);
		$this -> assign('user_count', $user_count);
		$this -> assign('user_list', $user_list);
		$this -> assign('page', $Page -> show());
		$this -> display();
	}
	
	// 改变应用状态 <保存>
	// $state = 0 => 锁定
	// $state = 1 => 正常
	public function change() {

		$id = $this -> _get('id');
		$state = $this -> _get('state');

		$result = M('User') -> where(array('id' => $id)) -> setField('state', $state);

		if ($result) {
			$this -> success('操作成功！', '__GROUP__/User');
		} else {
			$this -> error('操作失败！');
		}

	}

	// 永久删除会员 <删除>
	public function delete() {

		$id = $this -> _get('id');

		$result = M('User') -> where(array('id' => $id)) -> delete();

		if ($result) {
			$this -> success('删除成功！', '__GROUP__/User');
		} else {
			$this -> error('删除失败！');
		}

	}
	
	// 获取会员应用数 <内部方法>
	protected function getUserAppCount($userid) {
		return M('Userapp') -> where(array('userid' => $userid)) -> count();
	}
	
	// 获取会员数 <内部方法>
	protected function getUserCount() {
		$User = M('User');
		$arr['normal'] = $User -> where(array('role' => 0, 'state' => 1)) -> count();
		$arr['lock'] = $User -> where(array('role' => 0, 'state' => 0)) -> count();
		return $arr;
	}

}
