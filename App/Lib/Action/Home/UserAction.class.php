<?php

class UserAction extends CommonAction {
	
	// 登录
	public function signin() {
		
		if (empty($_POST['user'])) {
			$this -> ajaxReturn(0, '请输入账号', 0);
		}
		
		if (empty($_POST['password'])) {
			$this -> ajaxReturn(1, '请输入密码', 0);
		}

		$user = $this -> _post('user');
		$password = $this -> _post('password');

		$map = array();
		$map['user'] = $user;

		import('ORG.Util.RBAC');
		$authInfo = RBAC::authenticate($map);

		// 验证账号密码
		if (empty($authInfo)) {
			$this -> ajaxReturn(0, '账号不存在', 0);
		} else {
			if ($authInfo['password'] != md5($password)) {
				$this -> ajaxReturn(1, '密码错误', 0);
			} else {

				session(C('USER_AUTH_KEY'), $authInfo['id']);
				session('username', $authInfo['user']);
				
				cookie('ROS_username', $authInfo['user']);
				cookie('ROS_status', 1);

				$this -> ajaxReturn($authInfo, '登录成功', 1);

			}
		}
		
	}
	
	// 注册
    public function register() {
    	
		// 开始验证
		if (empty($_POST['user'])) {
			$this -> ajaxReturn(0, '请输入E-mail', 0);
		} else {
			
			$user = $this -> _post('user');

			if (!ereg('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', $user)) {
				$this -> ajaxReturn(0, 'E-mail格式不正确', 0);
			}
			
			$result = M('User') -> where(array('user' => $user)) -> find();
			
			if ($result) {
				$this -> ajaxReturn(1, 'E-mail已被注册', 0);
			}
			
		}
		
		if (empty($_POST['password'])) {
			$this -> ajaxReturn(0, '请输入密码', 0);
		}
		
		if (empty($_POST['passwordRepeat'])) {
			$this -> ajaxReturn(0, '请输入确认密码', 0);
		}

		$user = $this -> _post('user');
		$password = $this -> _post('password');
		$passwordRepeat = $this -> _post('passwordRepeat');
		
		if (md5($password) != md5($passwordRepeat)) {
			$this -> ajaxReturn(2, '密码不一致', 0);
		}
		
		// 创建数据对象
		$data['user'] = $user;
		$data['password'] = md5($password);
		$data['regtime'] = time();
		
		// 保存数据
		M('User') -> data($data) -> add();
		
		$this -> ajaxReturn(0, '注册成功', 1);
		
    }

	// 退出
	public function logout() {
		session('[destroy]');
		cookie('ROS_status', null);
		$this -> ajaxReturn(0, '成功退出', 1);
	}
	
}