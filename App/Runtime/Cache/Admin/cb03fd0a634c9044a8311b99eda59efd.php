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
		<div class="page-header"><a href="__GROUP__/Index/main" class="glyphicon glyphicon-circle-arrow-left" title="返回"></a> 应用管理</div>
		<!-- page header e -->
		
		<!-- tabs s -->
		<div class="row">
			<div class="col-md-9">
				<ul class="nav nav-pills mb20">
					<li <?php if(($app_state) == "1"): ?>class="active"<?php endif; ?>>
				    	<a href="__URL__/index/state/1"><span class="badge pull-right"><?php echo ($app_count["posted"]); ?></span>已发布</a>
					</li>
					<li <?php if(($app_state) == "0"): ?>class="active"<?php endif; ?>>
				    	<a href="__URL__/index/state/0"><span class="badge pull-right"><?php echo ($app_count["rubbish"]); ?></span>回收站</a>
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
					<th>应用标题</th>
					<th width="100">分类</th>
					<th width="80">宽度</th>
					<th width="80">高度</th>
					<th width="80">最大化</th>
					<th width="120">提供者</th>
					<th width="180">发布时间</th>
					<th width="160">操作</th>
				</tr>
			</thead>
			<tbody>
				<?php if(is_array($app_list)): $i = 0; $__LIST__ = $app_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?><tr>
					<td>
						<img src="<?php echo ($data["icon"]); ?>" width="20" height="20" title="<?php echo ($data["title"]); ?>" />
						<a href="<?php echo ($data["url"]); ?>" target="_blank"><?php echo ($data["title"]); ?></a>
					</td>
					<td><a href="__URL__/index/state/<?php echo ($app_state); ?>/category/<?php echo ($data["category"]); ?>"><?php echo ($data["category_name"]); ?></a></td>
					<td><?php echo ($data["width"]); ?></td>
					<td><?php echo ($data["height"]); ?></td>
					<td>
						<?php if(($data['isMax']) == "1"): ?>支持<?php endif; ?>
					</td>
					<td><?php echo ($data["author"]); ?></td>
					<td><?php echo (date("Y-m-d H:i:s",$data["pubdate"])); ?></td>
					<td>
						<?php if($app_state == 0): ?><a href="__URL__/change/id/<?php echo ($data["id"]); ?>/state/1" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-share-alt"></span> 还原</a>
						<a href="__URL__/delete/id/<?php echo ($data["id"]); ?>" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span> 永久删除</a>
						<?php else: ?>
						<a href="__URL__/edit/id/<?php echo ($data["id"]); ?>" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-edit"></span> 编辑</a>
						<a href="__URL__/change/id/<?php echo ($data["id"]); ?>/state/0" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-trash"></span> 移至回收站</a><?php endif; ?>
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