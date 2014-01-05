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
		<div class="page-header">
			<a href="__GROUP__/Index/main" class="glyphicon glyphicon-circle-arrow-left" title="返回"></a> 发布应用
		</div>
		<!-- page header e -->

		<!-- panel s -->
		<form action="__URL__/addSave" method="post">

			<div class="row">
				<div class="col-md-9">
					<!-- 目录 标题 s -->
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-btn">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
									<span id="j-cate-current">选择分类</span> <span class="caret"></span>
								</button>
								<ul class="dropdown-menu" id="j-cate-list">
									<?php if(is_array($category_list)): $i = 0; $__LIST__ = $category_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?><li>
											<a href="javascript:;" data-id="<?php echo ($data["id"]); ?>"><?php echo ($data["html"]); ?><span><?php echo ($data["name"]); ?></span></a>
										</li><?php endforeach; endif; else: echo "" ;endif; ?>
								</ul>
							</div>
							<input type="hidden" name="category" id="j-input-cate" />
							<input type="text" class="form-control" name="title" placeholder="请填写应用标题" />
						</div>
					</div>
					<!-- 目录 标题 e -->
					
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">提供者</span>
							<input type="text" class="form-control" name="author" placeholder="请填写应用提供者" />
						</div>
					</div>
					
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">地址</span>
							<input type="text" class="form-control" name="url" placeholder="请填写应用地址" />
						</div>
					</div>
					
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">图标</span>
							<input type="text" class="form-control" name="icon" placeholder="请填写图标地址" />
						</div>
					</div>
					
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">宽度</span>
							<input type="text" class="form-control" name="width" />
							<span class="input-group-addon">px</span>
						</div>
					</div>
					
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">高度</span>
							<input type="text" class="form-control" name="height" />
							<span class="input-group-addon">px</span>
						</div>
					</div>
					
					<div class="form-group">
						<textarea class="form-control" rows="5" placeholder="请填写应用描述" name="description"></textarea>
					</div>
					
					<div class="form-group">
						<span class="mr10">窗口是否支持最大化：</span>
						<label class="mr20">
							<input type="radio" name="isMax" checked="checked" value="1" /> 是
					    </label>
					    <label>
							<input type="radio" name="isMax" value="0" /> 否
					    </label>
					</div>

					<!-- post btn s -->
					<div class="form-group">
						<button type="submit" class="btn btn-primary btn-lg">
							<span class="glyphicon glyphicon-ok-sign"></span> 发布
						</button>
					</div>
					<!-- post btn e -->

				</div>
				<div class="col-md-3">

					<div class="form-group">
						<button type="submit" class="btn btn-block btn-lg btn-success">
							<span class="glyphicon glyphicon-eye-open"></span> 预览
						</button>
					</div>

					<div class="panel panel-default">
						<div class="panel-heading">
							暂留
						</div>
						<div class="panel-body">

						</div>
					</div>

				</div>
			</div>
		</form>
		<!-- panel e -->

		<!-- script s -->
		<script type="text/javascript">
            // 选择分类目录
            $('a', '#j-cate-list').on('click', function() {
                var iCate = $(this).find('span').html();
                var cateId = $(this).data('id');
                $('#j-cate-current').html(iCate);
                $('#j-input-cate').val(cateId);
            });

		</script>
		<!-- script e -->

	</body>
</html>