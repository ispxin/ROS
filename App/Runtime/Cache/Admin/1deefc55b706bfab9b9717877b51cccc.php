<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><?php echo (C("CFG_WEBNAME")); ?></title>
		<link rel="stylesheet" href="__CSS__/bootstrap.css">
<link rel="stylesheet" href="__CSS__/bootstrap-reset.css">
<link rel="stylesheet" href="__CSS__/style.css">
<script src="__JS__/jquery-1.8.3.min.js"></script>
<script src="__JS__/bootstrap.min.js"></script>
		<style>
			html {
				background: #fbfbfb;
			}
			.r-login-wrap {
				width: 360px;
				height: 350px;
				margin: auto;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
			}
			.r-login {
				padding: 40px 0;
				margin-bottom: 30px;
				background: #fff;
				border: 1px solid #e5e5e5;
				-moz-box-shadow: rgba(200,200,200,0.7) 0 4px 10px -1px;
				-webkit-box-shadow: rgba(200,200,200,0.7) 0 4px 10px -1px;
				box-shadow: rgba(200,200,200,0.7) 0 4px 10px -1px;
			}
			.r-login-form {
				width: 300px;
				margin: 0 auto;
			}
			.r-login-form .checkbox label {
				display: inline-block;
			}
			.r-login-verify {
				width: 100px;
				margin-right: 10px;
			}
			.r-login-copyright {
				text-align: center;
			}
		</style>
	</head>
	<body>
		
		<div class="r-login-wrap">
			<div class="r-login">
				<form class="r-login-form" action="__URL__/checkLogin" method="post">
					
					<div class="alert alert-warning alert-dismissable hidden" id="j-login-alert"></div>
					
					<div class="form-group">
						<label class="sr-only" for="user">用户名</label>
						<input type="text" class="form-control" id="user" name="user" placeholder="用户名">
					</div>
					<div class="form-group">
						<label class="sr-only" for="password">密码</label>
						<input type="password" class="form-control" id="password" name="password" placeholder="密码">
					</div>
					<div class="form-group form-inline" role="form">
						<div class="form-group">
							<input type="text" class="form-control r-login-verify" placeholder="验证码" name="verify">
						</div>
						<div class="form-group">
							<img src="__URL__/verify" id="j-comment-verify">
						</div>
					</div>
					<!-- <div class="form-group">
						<div class="checkbox">
							<label><input type="checkbox">记住我的登录信息</label>
						</div>
					</div> -->
					<button type="submit" class="btn btn-shadow btn-primary btn-lg btn-block" id="j-btn-login">登 录</button>
					
				</form>
			</div>
			<div class="r-login-copyright">
				本站 Theme Code 基于 <a href="http://getbootstrap.com/" target="_blank">Bootstrap 3</a> 构建 © 2013
			</div>
		</div>

		<!-- script s -->
		<script>
			$('#j-comment-verify').on('click', function() {
				var time = new Date().getTime();
				$(this).attr('src', '__URL__/verify/' + time);
			});
		</script>
		<!-- script e -->
	</body>
</html>