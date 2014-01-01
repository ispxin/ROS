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
	</head>
	<body class="iframeBody">

		<!-- page header s -->
		<div class="page-header"><a href="__GROUP__/Index/main" class="glyphicon glyphicon-circle-arrow-left" title="返回"></a> 密码修改</div>
		<!-- page header e -->
	
		<!-- panel s -->
		<form action="__URL__/editSavePw" method="post">
			<input type="hidden" name="id" value="<?php echo ($user_id); ?>">
			<div class="form-group">
				<label>输入旧密码</label>
				<input type="password" class="form-control w500" name="oldPw">
			</div>
			<div class="form-group">
				<label>输入新密码</label>
				<input type="password" class="form-control w500" name="newPw">
			</div>
			<div class="form-group">
				<label>确认新密码</label>
				<input type="password" class="form-control w500" name="confirmNewPw">
			</div>
			<P>
				<button type="submit" class="btn btn-primary btn-lg">
					<span class="glyphicon glyphicon-ok-sign"></span> 提交
				</button>
			</P>
		</form>
		<!-- panel e -->

	</body>
</html>