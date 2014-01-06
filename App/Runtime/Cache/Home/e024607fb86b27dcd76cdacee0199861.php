<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title><?php echo (C("CFG_WEBNAME")); ?></title>
		<link href="__CSS__/ros.css" rel="stylesheet" type="text/css" />
		
		<style>
			.appCenter{ position:relative; width:800px; height:500px; background:#fff; overflow:hidden;}
			.appCenter-nav{ position:absolute; left:0; top:0; width:70px; height:500px; background:#f5f5f5; border-right:1px #ddd solid;}
			.appCenter-nav ul{ width:60px; padding:10px 0 0 10px;}
			.appCenter-nav ul li{ width:60px; height:32px; margin-bottom:2px;}
			.appCenter-nav ul li.active{ position:relative;}
			.appCenter-nav ul li.active a{ position:absolute; border:1px #ddd solid; border-right:none; background:#fff; color:#333;}
			.appCenter-nav ul li.active a:hover{ background:#fff;}
			.appCenter-nav ul li a{ display:block; width:60px; height:30px; line-height:30px; text-align:center; border-radius:3px 0 0 3px; color:#08c;}
			.appCenter-nav ul li a:hover{ background:#e9e9e9;}
			.appCenter-centent{ width:500px; height:480px; margin:15px 0 0 90px;}
			.appCenter-centent-nav{ border-bottom:1px #ddd solid;}
			.appCenter-centent-nav ul{ height:26px; padding:0 10px;}
			.appCenter-centent-nav ul li{ float:left; width:60px; height:26px; margin-right:5px;}
			.appCenter-centent-nav ul li.active{ position:relative;}
			.appCenter-centent-nav ul li.active a{ position:absolute; top:1px; left:0; font-weight:bold; border:1px #ddd solid; border-bottom-color:#fff;}
			.appCenter-centent-nav ul li.active a:hover{ color:#333;}
			.appCenter-centent-nav ul li a{ display:block; width:60px; height:24px; line-height:24px; text-align:center; border:1px #fff solid; border-radius:3px 3px 0 0;}
			.appCenter-centent-nav ul li a:hover{ color:#08c;}
			.appCenter-centent-list{ margin:20px 0;}
			.appCenter-centent-list .app-item{ width:480px; height:50px; padding:10px; border-bottom:1px #ddd dotted; cursor:default;}
			.appCenter-centent-list .app-item:hover{ background:#fffff1;}
			.appCenter-centent-list .app-item .app-icon{ float:left; width:50px; height:50px;}
			.appCenter-centent-list .app-item .app-icon img{ display:block; width:50px; height:50px;}
			.appCenter-centent-list .app-item .app-intro{ float:left; width:230px; margin-left:10px; padding:5px 0;}
			.appCenter-centent-list .app-item .app-intro .app-title{ width:230px; height:20px; line-height:20px; overflow:hidden; font-weight:bold;}
			.appCenter-centent-list .app-item .app-intro .app-description{ width:230px; height:20px; line-height:20px; overflow:hidden; color:#999;}
			.appCenter-centent-list .app-item .app-add{ float:right; width:50px; height:20px; margin-top:15px;}
			.appCenter-centent-list .app-item .app-add .btn-addApp{ display:block; width:50px; height:20px; line-height:20px; background:#80b600; color:#fff; text-align:center; cursor:pointer; border-radius:3px;}
			.appCenter-centent-list .app-item .app-add .btn-addApp:hover{ background:#75a700;}
			
			.pagination{}
			.pagination li{ float:left; margin-right:5px;}
			.pagination li a{ display:block; width:26px; line-height:26px; background:#f5f5f5; text-align:center; color:#666; border-radius:3px;}
			.pagination li a:hover{ background:#e9e9e9;}
			.pagination li.active a{ background:#08c; color:#fff;}
		</style>
		
	</head>

	<body>
		
		<div class="appCenter">
			<div class="appCenter-nav">
				<ul>
					<li class="active">
						<a href="#">全部</a>
					</li>
					<li>
						<a href="http://www.baidu.com" target="_self">游戏</a>
					</li>
					<li>
						<a href="#">影音</a>
					</li>
					<li>
						<a href="#">图书</a>
					</li>
					<li>
						<a href="#">生活</a>
					</li>
					<li>
						<a href="#">工具</a>
					</li>
				</ul>
			</div>
		
			<div class="appCenter-centent">
				<div class="appCenter-centent-nav">
					<ul>
						<li class="active"><a href="#">最热</a></li>
						<li><a href="#">最新</a></li>
					</ul>
				</div>
				<div class="appCenter-centent-list">
					<div class="app-item">
						<div class="app-icon">
							<a href="#"><img src="/ros/Public/Home/images/app/clover.png" /></a>
						</div>
						<div class="app-intro">
							<h2 class="app-title"><a href="#">我的博客</a></h2>
							<div class="app-description">介绍内容</div>
						</div>
						<div class="app-add">
							<span class="btn-addApp">添加</span>
						</div>
					</div>
					<div class="app-item">
						<div class="app-icon">
							<a href="#"><img src="/ros/Public/Home/images/app/clover.png" /></a>
						</div>
						<div class="app-intro">
							<h2 class="app-title"><a href="#">我的博客</a></h2>
							<div class="app-description">介绍内容</div>
						</div>
						<div class="app-add">
							<span class="btn-addApp">添加</span>
						</div>
					</div>
					<div class="app-item">
						<div class="app-icon">
							<a href="#"><img src="/ros/Public/Home/images/app/clover.png" /></a>
						</div>
						<div class="app-intro">
							<h2 class="app-title"><a href="#">我的博客</a></h2>
							<div class="app-description">介绍内容</div>
						</div>
						<div class="app-add">
							<span class="btn-addApp">添加</span>
						</div>
					</div>
					<div class="app-item">
						<div class="app-icon">
							<a href="#"><img src="/ros/Public/Home/images/app/clover.png" /></a>
						</div>
						<div class="app-intro">
							<h2 class="app-title"><a href="#">我的博客</a></h2>
							<div class="app-description">介绍内容</div>
						</div>
						<div class="app-add">
							<span class="btn-addApp">添加</span>
						</div>
					</div>
					<div class="app-item">
						<div class="app-icon">
							<a href="#"><img src="/ros/Public/Home/images/app/clover.png" /></a>
						</div>
						<div class="app-intro">
							<h2 class="app-title"><a href="#">我的博客</a></h2>
							<div class="app-description">介绍内容</div>
						</div>
						<div class="app-add">
							<span class="btn-addApp">添加</span>
						</div>
					</div>
				</div>
				
				<div class="clearfix">
					<ul class="pagination">
						<li>
							<a href="#">«</a>
						</li>
						<li class="active">
							<a href="#">1</a>
						</li>
						<li>
							<a href="#">2</a>
						</li>
						<li>
							<a href="#">3</a>
						</li>
						<li>
							<a href="#">4</a>
						</li>
						<li>
							<a href="#">5</a>
						</li>
						<li>
							<a href="#">»</a>
						</li>
					</ul>
				</div>
				
			</div>
		</div>
		
	</body>
</html>