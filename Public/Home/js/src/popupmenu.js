/**
 * menu模块
 */
define(function(require, exports, module) {

    var $document = $(document);
    
	var popupmenu = {
		
		// 桌面右键菜单
		contextmenu : function(desk, dialog) {
			
			var tpl = '<div class="contextmenu-style">' +
							'<ul class="contextmenu-ul">' +
								'<li class="contextmenu-li">' +
									'<a href="javascript:;" class="contextmenu-a" id="mShowDesk">显示桌面</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a href="javascript:;" class="contextmenu-a" id="mCloseAllApp">关闭所有应用</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<span class="line"></span>' +
								'</li>' +
								'<li class="contextmenu-li contextsubmenu">' +
									'<a href="#" class="contextmenu-a">添加<span class="icon-arrow"></span></a>' +
									'<div class="contextsubmenu-wrap">' +
										'<ul class="contextsubmenu-ul contextmenu-style">' +
											'<li class="contextsubmenu-li">' +
												'<a href="#" class="contextsubmenu-a" id="mAppAdd">添加应用<span class="icon icon-app"></span></a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a href="#" class="contextsubmenu-a">新建文件夹<span class="icon icon-folder"></span></a>' +
											'</li>' +
										'</ul>' +
									'</div>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<span class="line"></span>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a href="#" class="contextmenu-a">更换壁纸</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a href="#" class="contextmenu-a">系统设置</a>' +
								'</li>' +
								'<li class="contextmenu-li contextsubmenu">' +
									'<a href="#" class="contextmenu-a">排序方式<span class="icon-arrow"></span></a>' +
									'<div class="contextsubmenu-wrap">' +
										'<ul class="contextsubmenu-ul contextmenu-style">' +
											'<li class="contextsubmenu-li">' +
												'<a href="javascript:;" class="contextsubmenu-a" id="mSetAppX">横向排列<span class="icon icon-current"></span></a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a href="javascript:;" class="contextsubmenu-a on" id="mSetAppY">纵向排列<span class="icon icon-current"></span></a>' +
											'</li>' +
										'</ul>' +
									'</div>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<span class="line"></span>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a href="javascript:;" class="contextmenu-a" id="mLockDesk">锁定</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a href="#" class="contextmenu-a">注销</a>' +
								'</li>' +
							'</ul>' +
						'</div>';
			
			if (!TPL.contextmenu) {
				
				TPL.contextmenu = $('<div class="contextmenu"></div>').html(tpl).appendTo('body');
				
				// 横向排序
	            $('#mSetAppX').on('click', function() {
	                desk.setAppSort('x');
	                $(this).parent().parent().find('a').removeClass('on');
	                $(this).addClass('on');
	            });
	            
	            // 纵向排序
	            $('#mSetAppY').on('click', function() {
	                desk.setAppSort('y');
	                $(this).parent().parent().find('a').removeClass('on');
	                $(this).addClass('on');
	            });
	            
	            // 显示桌面
	            $('#mShowDesk').on('click', function() {
	            	if ($.isEmptyObject(dialog.dialogList)) {
	            		return;
	            	}
	            	$.each(dialog.dialogList, function(i, n) {
	            		n.hide();
	            	});
	            });
	            
	            // 关闭所有应用
	            $('#mCloseAllApp').on('click', function() {
	            	if ($.isEmptyObject(dialog.dialogList)) {
	            		return;
	            	}
	            	$.each(dialog.dialogList, function(i, n) {
	            		n.remove();
	            	});
	            });
	            
	            // 添加应用
	            $('#mAppAdd').on('click', function() {
	            	desk.appAdd();
	            });
	            
	            // 锁定桌面
	            $('#mLockDesk').on('click', function() {
	            	desk.lockDesk();
	            });
				
			}

			return TPL.contextmenu;
			
		},
		
		// App右键菜单
		appmenu : function(desk, app) {
			
			var tpl = '<div class="contextmenu-style">' +
							'<ul class="contextmenu-ul">' +
								'<li class="contextmenu-li">' +
									'<a class="contextmenu-a" href="javascript:;" id="mAppOpen">打开应用</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<span class="line"></span>' +
								'</li>' +
								'<li class="contextmenu-li contextsubmenu">' +
									'<a class="contextmenu-a" href="#">移动应用到<span class="icon-arrow"></span></a>' +
									'<div class="contextsubmenu-wrap">' +
										'<ul class="contextsubmenu-ul contextmenu-style" id="mScreenMove">' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="javascript:;" data-desk="0">桌面1</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="javascript:;" data-desk="1">桌面2</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="javascript:;" data-desk="2">桌面3</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="javascript:;" data-desk="3">桌面4</a>' +
											'</li>' +
											'<li class="contextsubmenu-li">' +
												'<a class="contextsubmenu-a" href="javascript:;" data-desk="4">桌面5</a>' +
											'</li>' +
										'</ul>' +
									'</div>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a class="contextmenu-a" href="javascript:;" id="mAppDel">卸载应用</a>' +
								'</li>' +
							'</ul>' +
						'</div>';
			
			if (!TPL.appmenu) {
				TPL.appmenu = $('<div class="contextmenu"></div>').html(tpl).appendTo('body');
			}
			
			$('#mAppOpen').off('click').on('click', function() {
                desk.appOpen(app);
            });
            
            $('#mAppDel').off('click').on('click', function() {
                desk.appDel(app);
            });

			$('#mScreenMove li').each(function(i) {
			    if (i == GLOBAL.nowScreen) {
			        $(this).find('a').addClass('disabled');
			    } else {
			    	$(this).find('a').removeClass('disabled');
			    }
			});
			
			$('#mScreenMove a').not('.disabled').off('click').on('click', function() {
			    var deskId = $(this).data('desk');
                desk.appMoveDesk(app, deskId);
			});

			return TPL.appmenu;
			
		},
		
		// Task右键菜单
		taskmenu : function(dialog) {
			
			var tpl = '<div class="contextmenu-style">' +
							'<ul class="contextmenu-ul">' +
								'<li class="contextmenu-li">' +
									'<a class="contextmenu-a" href="javascript:;" id="mMinDialog">最小化</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a class="contextmenu-a" href="javascript:;" id="mMaxresDialog">最大化</a>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<span class="line"></span>' +
								'</li>' +
								'<li class="contextmenu-li">' +
									'<a class="contextmenu-a" href="javascript:;" id="mCloseDialog">关闭窗口</a>' +
								'</li>' +
							'</ul>' +
						'</div>';
			
			if (!TPL.menu) {
				TPL.menu = $('<div class="contextmenu"></div>').html(tpl).appendTo('body');
			}
			
			var mMaxresDialog = $('#mMaxresDialog'),
				mMinDialog = $('#mMinDialog');
			
			if ( dialog.o.isMax ) {
				
				mMaxresDialog.html( dialog.maxed ? '还原' : '最大化' );
				
				mMaxresDialog.off('click').on('click', function() {
					dialog.maxres();
				});
				
				mMaxresDialog.parent().show();
				
			} else {
				mMaxresDialog.parent().hide();
			}

			mMinDialog.html( dialog.opened ? '最小化' : '打开' );
		
			mMinDialog.off('click').on('click', function() {
				
				if (dialog.opened) {
					dialog.hide();
				} else {
					dialog.show();
				}
				
			});

			$('#mCloseDialog').off('click').on('click', function() {
				dialog.remove();
			});

			return TPL.menu;
			
		},
		
		// 显示菜单
		show : function(ev, obj) {

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
            
            obj.fadeIn(100);
              
        }
	
	}
   

	// 开放接口
    return popupmenu;

});