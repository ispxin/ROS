<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title><?php echo (C("CFG_WEBNAME")); ?></title>
		<link href="__CSS__/ros.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="__JS__/seajs/sea.js"></script>
	</head>

	<body>

		<!-- desk s -->
		<div class="desk" id="desk">
			<div class="navbar" id="navbar">
				<div class="navbar-wraper">
					<div class="avatar"><img src="__IMG__/desktop/avatar.png" id="navbar-avatar" alt="请登录" /></div>
					<div class="indicator">
						<ul id="indicator">
							<li class="active">
								<span class="indicator-num indicator-num-1">1</span>
								<span class="indicator-active"></span>
							</li>
							<li>
								<span class="indicator-num indicator-num-2">2</span>
								<span class="indicator-active"></span>
							</li>
							<li>
								<span class="indicator-num indicator-num-3">3</span>
								<span class="indicator-active"></span>
							</li>
							<li>
								<span class="indicator-num indicator-num-4">4</span>
								<span class="indicator-active"></span>
							</li>
							<li>
								<span class="indicator-num indicator-num-5">5</span>
								<span class="indicator-active"></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="desk-content" id="desk-content"></div> 
			<div class="desk-dialog" id="desk-dialog"></div>
			
			
			<!-- task s -->
			<div class="task">
				<div class="task-next disabled">
					<span class="task-btn-next" id="task-btn-next"></span>
				</div>
				<div class="task-content" id="task-content">
					<ul id="task-content-inner">
	
					</ul>
				</div>
				<div class="task-prev">
					<span class="task-btn-prev" id="task-btn-prev"></span>
				</div>
			</div>
			<!-- task e -->
			
			<!-- bg s -->
			<div class="task-bg"></div>
			<div class="bottombar-bg"></div>
			<!-- bg e -->
			
		</div>
		<!-- desk e -->

		<!-- contextmenu s -->
		<!-- <div class="contextmenu" id="contextmenu">
			<div class="contextmenu-style">
				<ul class="contextmenu-ul">
					<li class="contextmenu-li">
						<a href="javascript:;" class="contextmenu-a" id="lockDesk">锁定</a>
					</li>
					<li class="contextmenu-li">
						<a href="javascript:;" class="contextmenu-a" id="showDesk">显示桌面</a>
					</li>
					<li class="contextmenu-li">
						<a href="javascript:;" class="contextmenu-a" id="closeAllApp">关闭所有应用</a>
					</li>
					<li class="contextmenu-li">
						<span class="line"></span>
					</li>
					<li class="contextmenu-li contextsubmenu">
						<a href="#" class="contextmenu-a">添加<span class="icon-arrow"></span></a>
						<div class="contextsubmenu-wrap">
							<ul class="contextsubmenu-ul contextmenu-style">
								<li class="contextsubmenu-li">
									<a href="#" class="contextsubmenu-a">添加应用<span class="icon icon-app"></span></a>
								</li>
								<li class="contextsubmenu-li">
									<a href="#" class="contextsubmenu-a">新建文件夹<span class="icon icon-folder"></span></a>
								</li>
							</ul>
						</div>
					</li>
					<li class="contextmenu-li">
						<span class="line"></span>
					</li>
					<li class="contextmenu-li">
						<a href="#" class="contextmenu-a">更换壁纸</a>
					</li>
					<li class="contextmenu-li">
						<a href="#" class="contextmenu-a">系统设置</a>
					</li>
					<li class="contextmenu-li contextsubmenu">
						<a href="#" class="contextmenu-a">排序方式<span class="icon-arrow"></span></a>
						<div class="contextsubmenu-wrap">
							<ul class="contextsubmenu-ul contextmenu-style">
								<li class="contextsubmenu-li">
									<a href="javascript:;" class="contextsubmenu-a" id="setAppX">横向排列<span class="icon icon-current"></span></a>
								</li>
								<li class="contextsubmenu-li">
									<a href="javascript:;" class="contextsubmenu-a on" id="setAppY">纵向排列<span class="icon icon-current"></span></a>
								</li>
							</ul>
						</div>
					</li>
					<li class="contextmenu-li">
						<span class="line"></span>
					</li>
					<li class="contextmenu-li">
						<a href="#" class="contextmenu-a">反馈</a>
					</li>
					<li class="contextmenu-li">
						<a href="#" class="contextmenu-a">注销</a>
					</li>
				</ul>
			</div>
		</div> -->
		<!-- contextmenu e -->
		
		<!-- wallpaper s -->
		<div class="wallpaper" id="wallpaper"><img src="__IMG__/wallpaper/wallpaper-1.jpg" /></div>
		<!-- wallpaper e -->

		<script type="text/javascript">
		seajs.config({
			alias : {
				"jquery" : "__JS__/lib/jquery/1.8.3/jquery"
			},
			map: [
			    [ /^(.*\/ros\/Public\/Home\/js\/src\/.*\.(?:css|js))(?:.*)$/i, '$1?201312270958' ]
			],
			preload : ["jquery"],
			debug: true
		});
		seajs.use("__JS__/src/run");
		// seajs.use("__JS__/build/ros/1.0.0/run");

        // if (location.href.indexOf("?dev") > 0) {
            // seajs.use("__JS__/src/run");
        // } else {
            // seajs.use("__JS__/build/ros/1.0.0/run");
        // }
		</script>
		
	</body>
</html>