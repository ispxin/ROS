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
		<div class="page-header"><a href="__GROUP__/Index/main" class="glyphicon glyphicon-circle-arrow-left" title="返回"></a> 会员管理</div>
		<!-- page header e -->
		
		<!-- tabs s -->
		<div class="row">
			<div class="col-md-9">
				<ul class="nav nav-pills mb20">
					<li <?php if(($user_state) == "1"): ?>class="active"<?php endif; ?>>
				    	<a href="__URL__/index/state/1"><span class="badge pull-right"><?php echo ($user_count["normal"]); ?></span>正常</a>
					</li>
					<li <?php if(($user_state) == "0"): ?>class="active"<?php endif; ?>>
				    	<a href="__URL__/index/state/0"><span class="badge pull-right"><?php echo ($user_count["lock"]); ?></span>锁定</a>
					</li>
				</ul>
			</div>
			<div class="col-md-3">
				<div class="input-group">
			        <input type="text" class="form-control">
			        <span class="input-group-btn">
			        	<button class="btn btn-default" type="button">搜索</button>
			        </span>
			    </div>
			</div>
		</div>
		<!-- tabs e -->

		<!-- panel s -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>会员名称</th>
					<th width="150" class="text-center">应用数</th>
					<th width="200" class="text-center">注册时间</th>
					<th width="200" class="text-center">最后登陆</th>
					<th width="150" class="text-center">登陆IP</th>
					<th width="150" class="text-center">操作</th>
				</tr>
			</thead>
			<tbody>
				<?php if(is_array($user_list)): $i = 0; $__LIST__ = $user_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?><tr>
					<td><?php echo ($data["user"]); ?></td>
					<td class="text-center"><span class="label label-danger"><?php echo ($data["appCount"]); ?></span></td>
					<td class="text-center"><?php echo (date("Y-m-d H:i:s",$data["regtime"])); ?></td>
					<td class="text-center"><?php echo (date("Y-m-d H:i:s",$data["lastlogintime"])); ?></td>
					<td class="text-center"><?php echo ($data["ip"]); ?></td>
					<td class="text-center">
						<?php if($user_state == 1): ?><a href="__URL__/change/id/<?php echo ($data["id"]); ?>/state/0" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-lock"></span> 锁定</a>
						<?php else: ?>
						<a href="__URL__/change/id/<?php echo ($data["id"]); ?>/state/1" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-share-alt"></span> 解锁</a>
						<a href="__URL__/delete/id/<?php echo ($data["id"]); ?>" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span> 永久删除</a><?php endif; ?>
					</td>
				</tr><?php endforeach; endif; else: echo "" ;endif; ?>
			</tbody>
		</table>
		<!-- panel e -->

		<!-- pager s -->
		<ul class="pagination pull-right">
			<?php echo ($page); ?>
		</ul>
		<!-- pager e -->

	</body>
</html>