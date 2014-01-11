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
		<div class="page-header"><a href="__GROUP__/Index/main" class="glyphicon glyphicon-circle-arrow-left" title="返回"></a> 应用分类</div>
		<!-- page header e -->

		<!-- panel s -->
		<div class="row">
  			<div class="col-md-8">
  				
  				<div class="panel panel-default">
					<div class="panel-heading">所有分类</div>
					<div class="panel-body">
						<form action="__URL__/sortSave" method="post">
							<table class="table table-has-input table-hover">
								<thead>
									<tr>
										<th width="10%">排序</th>
										<th width="50%">名称</th>
										<th width="20%" class="text-center">应用数</th>
										<th width="20%" class="text-center">操作</th>
									</tr>
								</thead>
								<tbody>
									<?php if(is_array($category_list)): $i = 0; $__LIST__ = $category_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?><tr>
										<td><input type="text" class="form-control" name="<?php echo ($data["id"]); ?>" value="<?php echo ($data["sort"]); ?>" /></td>
										<td><?php echo ($data["html"]); ?> <?php echo ($data["name"]); ?></td>
										<td class="text-center"><span class="label label-danger"><?php echo ($data["app_count"]); ?></span></td>
										<td class="text-center">
											<a href="__URL__/edit/id/<?php echo ($data["id"]); ?>" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-edit"></span> 编辑</a> 
											<a href="__URL__/delete/id/<?php echo ($data["id"]); ?>" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-trash"></span> 删除</a>
										</td>
									</tr><?php endforeach; endif; else: echo "" ;endif; ?>
								</tbody>
							</table>
							
							<P>
								<button type="submit" class="btn btn-primary btn-lg">
									<span class="glyphicon glyphicon-ok-sign"></span> 更新排序
								</button>
							</P>
						</form>
						
					</div>
				</div>
  				
  			</div>
  			<div class="col-md-4">
  				
  				<div class="panel panel-default">
					<div class="panel-heading">添加分类</div>
					<div class="panel-body">
						
						<form action="__URL__/addSave" method="post">
							<div class="form-group">
								<label>名称</label>
								<input type="text" class="form-control" name="name" />
							</div>
							<div class="form-group">
								<label>排序</label>
								<input type="text" class="form-control" name="sort" value="100" />
							</div>
							<P>
								<button type="submit" class="btn btn-primary btn-lg">
									<span class="glyphicon glyphicon-ok-sign"></span> 添加
								</button>
							</P>
						</form>
						
					</div>
				</div>
  				
  			</div>
  		</div>
		<!-- panel e -->

		<!-- pager s -->
		<ul class="pagination pull-right">
			<?php echo ($page); ?>
		</ul>
		<!-- pager e -->

	</body>
</html>