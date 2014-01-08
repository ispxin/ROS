<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title><?php echo (C("CFG_WEBNAME")); ?></title>
		<link href="__CSS__/ros.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="__JS__/seajs/sea.js"></script>
	</head>

	<body>
		
		<div class="appCenter">
			<div class="appCenter-nav">
				<ul>
					<li <?php if(($category) == "0"): ?>class="active"<?php endif; ?> >
						<a href="__URL__">全部</a>
					</li>
					<?php if(is_array($category_list)): $i = 0; $__LIST__ = $category_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?><li <?php if(($category) == $data['id']): ?>class="active"<?php endif; ?> >
						<a href="__URL__/index/category/<?php echo ($data["id"]); ?>"><?php echo ($data["name"]); ?></a>
					</li><?php endforeach; endif; else: echo "" ;endif; ?>
				</ul>
			</div>
		
			<div class="appCenter-centent">
				<div class="appCenter-centent-nav">
					<ul>
						<!-- <li class="active"><a href="#">最热</a></li> -->
						<li class="active"><a href="#">最新</a></li>
					</ul>
				</div>
				<div class="appCenter-centent-list" id="appList">
					
					<?php if(is_array($app_list)): $i = 0; $__LIST__ = $app_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?><div class="app-item">
						<div class="app-icon">
							<a href=""><img src="<?php echo ($data["icon"]); ?>" /></a>
						</div>
						<div class="app-intro">
							<h2 class="app-title"><a href="#"><?php echo ($data["title"]); ?></a></h2>
							<div class="app-description"><?php echo ($data["description"]); ?></div>
						</div>
						<div class="app-add">
							<?php if($data['isAddApp'] == 0): ?><span class="btn-addApp" data-id="<?php echo ($data["id"]); ?>">添加</span>
							<?php elseif($data['isAddApp'] == 1): ?>
							<span class="btn-addApp disabled">已添加</span><?php endif; ?>
						</div>
					</div><?php endforeach; endif; else: echo "" ;endif; ?>
					
				</div>
				
				<div class="clearfix">
					<ul class="pagination fr">
						<?php echo ($page); ?>
					</ul>
				</div>
				
			</div>
		</div>
		
		<script type="text/javascript">
		seajs.config({
			alias : {
				"jquery" : "__JS__/lib/jquery/1.8.3/jquery"
			},
			preload : ["jquery"],
			debug: true
		});
		seajs.use('__JS__/src/app');
		</script>
		
	</body>
</html>