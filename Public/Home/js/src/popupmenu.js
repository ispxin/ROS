/**
 * menu模块
 */
define(function(require, exports, module) {

    var $document = $(document),
    	desk = require('./desk'),
    	dialog = require('./dialog');
    
	var popupmenu = {
		
		// 初始化
		init : function() {
			
			var _this = this;
			
			// 桌面右键事件
			$document.on('contextmenu', function(ev) {
				
				var contextmenu = _this.contextmenu();
				
				_this.show(ev, contextmenu);
				
				$document.one('click', function() {
					contextmenu.hide();
				});
				
				return false;
			});
			
			// App右键事件
			$('#desk-content').on('contextmenu', 'li[data-type="app"]', function(ev) {
				
				var appmenu = _this.appmenu();
				    appmenu.obj = $(this);
				
				_this.show(ev, appmenu);
				
				$document.one('click', function() {
					appmenu.hide();
				});
				
				return false;
			});

		},
		
		// 桌面右键菜单
		contextmenu : function() {
			
			var tpl = '<div class="contextmenu-style"><ul class="contextmenu-ul"><li class="contextmenu-li"><a href="javascript:;" class="contextmenu-a" id="lockDesk">锁定</a></li><li class="contextmenu-li"><a href="javascript:;" class="contextmenu-a" id="showDesk">显示桌面</a></li><li class="contextmenu-li"><a href="javascript:;" class="contextmenu-a" id="closeAllApp">关闭所有应用</a></li><li class="contextmenu-li"><span class="line"></span></li><li class="contextmenu-li contextsubmenu"><a href="#" class="contextmenu-a">添加<span class="icon-arrow"></span></a><div class="contextsubmenu-wrap"><ul class="contextsubmenu-ul contextmenu-style"><li class="contextsubmenu-li"><a href="#" class="contextsubmenu-a">添加应用<span class="icon icon-app"></span></a></li><li class="contextsubmenu-li"><a href="#" class="contextsubmenu-a">新建文件夹<span class="icon icon-folder"></span></a></li></ul></div></li><li class="contextmenu-li"><span class="line"></span></li><li class="contextmenu-li"><a href="#" class="contextmenu-a">更换壁纸</a></li><li class="contextmenu-li"><a href="#" class="contextmenu-a">系统设置</a></li><li class="contextmenu-li contextsubmenu"><a href="#" class="contextmenu-a">排序方式<span class="icon-arrow"></span></a><div class="contextsubmenu-wrap"><ul class="contextsubmenu-ul contextmenu-style"><li class="contextsubmenu-li"><a href="javascript:;" class="contextsubmenu-a" id="setAppX">横向排列<span class="icon icon-current"></span></a></li><li class="contextsubmenu-li"><a href="javascript:;" class="contextsubmenu-a on" id="setAppY">纵向排列<span class="icon icon-current"></span></a></li></ul></div></li><li class="contextmenu-li"><span class="line"></span></li><li class="contextmenu-li"><a href="#" class="contextmenu-a">反馈</a></li><li class="contextmenu-li"><a href="#" class="contextmenu-a">注销</a></li></ul></div>';
			
			if (!TPL.contextmenu) {
				
				TPL.contextmenu = $('<div class="contextmenu"></div>').html(tpl).appendTo('body');
				
				// 横向排序
	            $('#setAppX').on('click', function() {
	                desk.setAppSort('x');
	                $(this).parent().parent().find('a').removeClass('on');
	                $(this).addClass('on');
	            });
	            
	            // 纵向排序
	            $('#setAppY').on('click', function() {
	                desk.setAppSort('y');
	                $(this).parent().parent().find('a').removeClass('on');
	                $(this).addClass('on');
	            });
	            
	            // 显示桌面
	            $('#showDesk').on('click', function() {
	            	if ($.isEmptyObject(dialog.dialogList)) {
	            		return;
	            	}
	            	$.each(dialog.dialogList, function(i, n) {
	            		n.hide();
	            	});
	            });
	            
	            // 关闭所有应用
	            $('#closeAllApp').on('click', function() {
	            	if ($.isEmptyObject(dialog.dialogList)) {
	            		return;
	            	}
	            	$.each(dialog.dialogList, function(i, n) {
	            		n.remove();
	            	});
	            });
				
			}

			return TPL.contextmenu;
			
		},
		
		// App右键菜单
		appmenu : function() {
			
			var tpl = '<div class="contextmenu-style">' +
							'<ul class="contextmenu-ul">' +
								'<li class="contextmenu-li">' +
									'<a class="contextmenu-a" href="javascript:;" id="appOpen">打开应用</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<span class="line"></span>' +
								'</li>' +
								'<li class="contextmenu-li contextsubmenu">' +
									'<a class="contextmenu-a" href="#">移动应用到<span class="icon-arrow"></span></a>' +
									'<div class="contextsubmenu-wrap">' +
										'<ul class="contextsubmenu-ul contextmenu-style" id="screenMove">' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="#" data-desk="1">桌面1</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="#" data-desk="2">桌面2</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="#" data-desk="3">桌面3</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="#" data-desk="4">桌面4</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="#" data-desk="5">桌面5</a>' +
											'</li>' +
										'</ul>' +
									'</div>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a class="contextmenu-a" href="javascript:;" id="appDel">卸载应用</a>' +
								'</li>' +
							'</ul>' +
						'</div>';
			
			if (!TPL.appmenu) {
			    
				TPL.appmenu = $('<div class="contextmenu"></div>').html(tpl).appendTo('body');
				
				$('#appOpen').on('click', function() {
                    desk.appOpen(TPL.appmenu.obj);
                });
                
                $('#appDel').on('click', function() {
                    desk.appDel(TPL.appmenu.obj);
                });
                
			}

			$('#screenMove li').each(function(i) {
			    if (i == GLOBAL.nowScreen) {
			        $(this).find('a').addClass('disabled');
			    }
			});

			return TPL.appmenu;
			
		},
		
		// 显示菜单
		show : function(ev, obj) {
            
            obj.fadeIn(100);
            
            var iWidth = obj.outerWidth(),
                iHeight = obj.outerHeight(),
                x = ev.clientX,
                y = ev.clientY,
                w = $document.width() - iWidth,
                h = $document.height() - iHeight;
            
            if (x > w) {
                obj.css('left', x - iWidth);
            } else {
                obj.css('left', x);
            }
            
            if (y > h) {
                obj.css('top', y - iHeight);
            } else {
                obj.css('top', y);
            }
              
        }
	
	}
   

	// 开放接口
    module.exports = {
    	init : function() {
    		popupmenu.init();
    	}
    };

});