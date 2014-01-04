<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>rBlog个人博客系统</title>
		<link rel="stylesheet" href="__CSS__/bootstrap.css">
		<link rel="stylesheet" href="__CSS__/style.css">
	</head>
	<body>

		<!-- container s -->
		<div class="r-message">
			
			<?php if(isset($message)): ?><h1><span class="glyphicon glyphicon-ok"></span> <?php echo($message); ?></h1>
			<?php else: ?>
				<h1><span class="glyphicon glyphicon-remove"></span> <?php echo($error); ?></h1><?php endif; ?>
			<p class="text-muted"><b id="wait"><?php echo($waitSecond); ?></b> 秒后，页面自动 <a id="href" href="<?php echo($jumpUrl); ?>">跳转</a></p>
		</div>
		<!-- container s -->
		
		<script type="text/javascript">
		(function(){
		var wait = document.getElementById('wait'),href = document.getElementById('href').href;
		var interval = setInterval(function(){
			var time = --wait.innerHTML;
			if(time <= 0) {
				location.href = href;
				clearInterval(interval);
			};
		}, 1000);
		})();
		</script>

	</body>
</html>