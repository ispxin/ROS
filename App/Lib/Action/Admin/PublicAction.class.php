<?php

class PublicAction extends Action {

	public function index() {
		$this -> login();
	}

	/**
	 * 登录页面
	 */
	public function login() {

		if (isset($_SESSION[C('USER_AUTH_KEY')]) && $_SESSION['role'] == 1) {
			$this -> redirect('Index/index');
		} else {
			$this -> display();
		}

	}

	/**
	 * 登录检测
	 */
	public function checkLogin() {

		$username = $this -> _post('user');
		$password = $this -> _post('password');
		$verify = $this -> _post('verify');

		$User = D('User');
		$data = $User -> create();

		if (!$data) {
			exit($this -> error($User -> getError()));
		}

		if (session('verify') != md5($verify)) {
			$this -> error('验证码错误！');
		}

		$map = array();
		$map['user'] = $username;

		import('ORG.Util.RBAC');
		$authInfo = RBAC::authenticate($map);

		// 验证账号密码
		if (empty($authInfo)) {
			$this -> error('账号不存在!');
		} else {
			if ($authInfo['password'] != md5($password)) {
				$this -> error('密码错误!');
			} else {
				
				// 角色校验
				// 管理员：role => 1
				if ($authInfo['role'] == 1) {
					// 登陆成功记录认证标记
					session(C('USER_AUTH_KEY'), $authInfo['id']);
					session('username', $authInfo['user']);
					session('role', 1);
					cookie('ROS_username', $authInfo['user']);
					cookie('ROS_status', 1);
					$this -> success('登录成功!');
				} else {
					// 伪提示
					$this -> error('账号不存在!');
				}

			}
		}

	}

	/**
	 * 退出登录
	 */
	public function logout() {
		if (isset($_SESSION[C('USER_AUTH_KEY')])) {
			session('[destroy]');
			cookie('ROS_status', null);
			cookie('ROS_username', null);
			$this -> success('成功退出！', __URL__ . '/login/');
		} else {
			$this -> error('无需重复退出！');
		}
	}

	/**
	 * 验证码
	 */
	public function verify() {
		import('ORG.Util.Image');
		Image::buildImageVerify(4, 5, 'png', 60, 32);
	}

}
