<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN" class="index">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><?php echo (C("CFG_WEBNAME")); ?></title>
		<link rel="stylesheet" href="__CSS__/bootstrap.css">
<link rel="stylesheet" href="__CSS__/bootstrap-reset.css">
<link rel="stylesheet" href="__CSS__/style.css">
<script src="__JS__/jquery-1.8.3.min.js"></script>
<script src="__JS__/bootstrap.min.js"></script>
	</head>
	<body>

		<!-- header s -->
		<div class="r-navbar">
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		
		<div class="navbar-header">
			<a href="__GROUP__" class="navbar-brand"><span class="glyphicon glyphicon-fire"></span> ROS</a>
		</div>
		
		<ul class="nav navbar-nav navbar-right">
			<li>
				<a href="__GROUP__"><span class="glyphicon glyphicon-user"></span> 欢迎您，<?php echo ($username); ?></a>
			</li>
			<li>
				<a href="__ROOT__/" target="_blank"><span class="glyphicon glyphicon-home"></span> 主页</a>
			</li>
			<li>
				<a href="__GROUP__/Public/logout"><span class="glyphicon glyphicon-off"></span> 退出</a>
			</li>
		</ul>
		
	</nav>
</div>
		<!-- header e -->
		
		<!-- nav s -->
		<div class="r-left">
			<div class="r-nav" id="j-nav">
	
	<div class="r-subnav">
		<h2>
			<span class="glyphicon glyphicon-th-large"></span> APP应用
			<div class="r-subnav-icon"><span class="glyphicon glyphicon-chevron-up j-subnav-icon"></span></div>
		</h2>
		<ul>
			<li><a href="__GROUP__/App/add" target="main">发布应用</a></li>
			<li><a href="__GROUP__/App" target="main">应用管理</a></li>
			<li><a href="__GROUP__/Category" target="main">应用分类</a></li>
		</ul>
	</div>
	
	<div class="r-subnav">
		<h2>
			<span class="glyphicon glyphicon-comment"></span> 评论
			<div class="r-subnav-icon"><span class="glyphicon glyphicon-chevron-up j-subnav-icon"></span></div>
		</h2>
		<ul>
			<li><a href="__GROUP__/" target="main">评论管理</a></li>
		</ul>
	</div>
	
	<div class="r-subnav">
		<h2>
			<span class="glyphicon glyphicon-user"></span> 会员
			<div class="r-subnav-icon"><span class="glyphicon glyphicon-chevron-up j-subnav-icon"></span></div>
		</h2>
		<ul>
			<li><a href="__GROUP__/User" target="main">会员管理</a></li>
		</ul>
	</div>
	
	<div class="r-subnav">
		<h2>
			<span class="glyphicon glyphicon-cog"></span> 系统操作
			<div class="r-subnav-icon"><span class="glyphicon glyphicon-chevron-up j-subnav-icon"></span></div>
		</h2>
		<ul>
			<li><a href="__GROUP__/" target="main">网站配置</a></li>
			<li><a href="__GROUP__/System/editPw" target="main">修改密码</a></li>
			<li><a href="__GROUP__/" target="main">清除缓存</a></li>
		</ul>
	</div>
	
	<div class="r-copyright">© <a href="#" target="_blank">ROS</a> v1.0</div>
	
</div>
		</div>
		<!-- nav e -->
		
		<!-- main s -->
		<div class="r-right">
			<div class="r-main">
				<iframe src="__GROUP__/Index/main" name="main" frameborder="0"></iframe>
			</div>
		</div>
		<!-- main e -->
		
		<script>
			// 导航菜单
			$('#j-nav h2').on('click', function() {
				$('#j-nav ul').stop().slideUp(200);
				$(this).next().stop().slideDown(200);
				$('#j-nav h2').find('.j-subnav-icon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
				$(this).find('.j-subnav-icon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			});
		</script>

	</body>
</html>