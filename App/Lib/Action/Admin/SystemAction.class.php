<?php

class SystemAction extends CommonAction {
	
	// 修改密码 <视图>
    public function editPw(){
		$this -> assign('user_id', session(C('ADMIN_AUTH_KEY')));
		$this -> display();
    }
	
	// 保存修改密码 <保存>
	public function editSavePw() {
		
		$id = $this -> _post('id');
		$oldPw = $this -> _post('oldPw');
		$newPw = $this -> _post('newPw');
		$confirmNewPw = $this -> _post('confirmNewPw');

		if (empty($oldPw)) {
			$this -> error('请输入旧密码');
		}
		
		if (empty($newPw)) {
			$this -> error('请输入新密码');
		}
		
		if (empty($confirmNewPw)) {
			$this -> error('请再次输入新密码');
		}
		
		$Admin = M('Admin');
		
		$userinfo = $Admin -> where(array('id' => $id)) -> find();
		$password = $userinfo['password'];

		if ( md5($oldPw) != $password) {
			$this -> error('旧密码输入不正确');
		}
		
		if (md5($newPw) != md5($confirmNewPw)) {
			$this -> error('两次密码输入不一致');
		}
		
		$data['password'] = md5($newPw);
		
		$result = $Admin -> where(array('id' => $id)) -> save($data);
		
		if ($result) {
			$this -> success('密码修改成功！');
		} else {
			$this -> error('密码修改失败！');
		}
		
	}
	
}