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

		$username = $this -> _post('user');
		$password = $this -> _post('password');

		$map = array();
		$map['user'] = $username;

		import('ORG.Util.RBAC');
		$authInfo = RBAC::authenticate($map);

		// 验证账号密码
		if (empty($authInfo)) {
			$this -> ajaxReturn(0, '账号不存在', 0);
		} else {
			if ($authInfo['password'] != md5($password)) {
				$this -> ajaxReturn(1, '密码错误', 0);
			} else {
				// 记录登陆session
				session(C('USER_AUTH_KEY'), $authInfo['id']);
				session('username', $authInfo['user']);
				session('role', $authInfo['role']);
				// 记录登陆cookie
				cookie('ROS_username', $authInfo['user'], 60*60*24*365);
				cookie('ROS_status', 1);
				// 记录用户登陆信息
				$data['ip'] = get_client_ip();
				$data['lastlogintime'] = time();
				M('User') -> where(array('id' => $authInfo['id'])) -> save($data);
				// 返回登陆状态
				$this -> ajaxReturn(2, '登录成功', 1);
			}
		}
		
	}
	
	// 注册
    public function register() {
    	
		// 开始验证
		if (empty($_POST['user'])) {
			$this -> ajaxReturn(0, '请输入E-mail', 0);
		} else {
			
			$username = $this -> _post('user');

			if (!ereg('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', $username)) {
				$this -> ajaxReturn(0, 'E-mail格式不正确', 0);
			}
			
			$result = M('User') -> where(array('user' => $username)) -> find();
			
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

		$username = $this -> _post('user');
		$password = $this -> _post('password');
		$passwordRepeat = $this -> _post('passwordRepeat');
		
		if (md5($password) != md5($passwordRepeat)) {
			$this -> ajaxReturn(2, '密码不一致', 0);
		}
		
		// 创建数据对象
		$data['role'] = 0;
		$data['state'] = 1;
		$data['user'] = $username;
		$data['password'] = md5($password);
		$data['regtime'] = time();
		
		// 保存数据
		M('User') -> data($data) -> add();
		
		$this -> ajaxReturn(array('user' => $username), '注册成功', 1);
		
    }

	// 退出
	public function logout() {
		session('[destroy]');
		cookie('ROS_status', null);
		$this -> ajaxReturn(0, '成功', 1);
	}
	
}