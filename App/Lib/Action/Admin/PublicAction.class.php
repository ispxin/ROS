<?php

class PublicAction extends Action {

	public function index() {
		$this -> login();
	}

	/**
	 * 登录页面
	 */
	public function login() {
		if (!isset($_SESSION[C('ADMIN_AUTH_KEY')])) {
			$this -> display();
		} else {
			$this -> redirect('Index/index');
		}
	}

	/**
	 * 登录检测
	 */
	public function checkLogin() {

		$user = $this -> _post('user');
		$password = $this -> _post('password');
		$verify = $this -> _post('verify');

		$Admin = D('Admin');
		$data = $Admin -> create();

		if (!$data) {
			exit($this -> error($Admin -> getError()));
		}

		if (session('verify') != md5($verify)) {
			$this -> error('验证码错误！');
		}

		$map = array();
		$map['user'] = $user;

		import('ORG.Util.RBAC');
		$authInfo = RBAC::authenticate($map);

		// 验证账号密码
		if (empty($authInfo)) {
			$this -> error('账号不存在!');
		} else {
			if ($authInfo['password'] != md5($password)) {
				$this -> error('密码错误!');
			} else {

				// 记录认证标记
				session(C('ADMIN_AUTH_KEY'), $authInfo['id']);
				session('user', $authInfo['user']);

				$this -> success('登录成功!');

			}
		}

	}

	/**
	 * 退出登录
	 */
	public function logout() {
		if (isset($_SESSION[C('ADMIN_AUTH_KEY')])) {
			session('[destroy]');
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
