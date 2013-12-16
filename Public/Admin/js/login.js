/*!
 * rBlog v1.0 by wangyingran.com
 * Copyright 2013 rBlog, Inc.
 */

var login = (function() {

	// 初始化
	function init() {
		bind();
	}
	
	// 登录方法
	function enter() {
		
		var oAlert = $('#j-login-alert');
		var oUser = $('#user');
		var oPassword = $('#password');
		var oUserVal = oUser.val();
		var oPasswordVal = oPassword.val();
		
		if (!oUserVal) {
			oAlert.html('请输入用户名').removeClass('hidden');
			oUser.focus();
			return;
		}
		
		if (!oPasswordVal) {
			oAlert.html('请输入密码').removeClass('hidden');
			oPassword.focus();
			return;
		}
		
		var data =  $("#r-login-form").serialize();
		
		$.ajax({
			type : 'post',
			url : '/Public/checkLogin',
			data : data,
			success : function(data) {
				
				console.log(data);
				
				// if (msg == 1) {
					// oAlert.html('用户名不存在').removeClass('hidden');
					// oUser.focus();
				// } else if (msg == 2) {
					// oAlert.html('密码不正确').removeClass('hidden');
					// oPassword.focus();
				// } else if (msg == 3) {
					// window.location.href = 'index.php';
				// }
				
			}
		});
		
	}
	
	// 事件绑定
	function bind() {
		
		// 按钮登录
		$('#j-btn-login').on('click', enter);
		
		// 回车键登录
		$('#user, #password').on('keydown', function(ev) {
			if (ev.keyCode == 13) {
				enter();
			}
		});

	}
	
	// 开放接口
	return {
		init : init
	}
	
})();

$(function() {
	login.init();
});