/**
 * Contextmenu模块
 */
define(function(require, exports, module) {

    var $document = $(document),
    	desk = require('./desk'),
    	dialog = require('./dialog'),
    	oContextmenu = $('#contextmenu');
    
    /*var appMenuHtml = '<div class="contextmenu-style">' +
								'<ul class="contextmenu-ul">' +
									'<li class="contextmenu-li">' +
										'<a class="contextmenu-a" href="javascript:;">打开应用</a>' +
									'</li>' +
									'<li class="contextmenu-li">' +
										'<span class="line"></span>' +
									'</li>' +
									'<li class="contextmenu-li contextsubmenu">' +
										'<a class="contextmenu-a" href="#">移动应用到<span class="icon-arrow"></span></a>' +
										'<div class="contextsubmenu-wrap">' +
											'<ul class="contextsubmenu-ul contextmenu-style">' +
												'<li class="contextsubmenu-li">' +
													'<a class="contextsubmenu-a" href="#">桌面1</a>' +
												'</li>' +
												'<li class="contextsubmenu-li">' +
													'<a class="contextsubmenu-a" href="#">桌面2</a>' +
												'</li>' +
												'<li class="contextsubmenu-li">' +
													'<a class="contextsubmenu-a" href="#">桌面3</a>' +
												'</li>' +
												'<li class="contextsubmenu-li">' +
													'<a class="contextsubmenu-a" href="#">桌面4</a>' +
												'</li>' +
												'<li class="contextsubmenu-li">' +
													'<a class="contextsubmenu-a" href="#">桌面5</a>' +
												'</li>' +
											'</ul>' +
										'</div>' +
									'</li>' +
									'<li class="contextmenu-li">' +
										'<a class="contextmenu-a" href="javascript:;">卸载应用</a>' +
									'</li>' +
								'</ul>' +
							'</div>';*/
    
    var contextmenu = {
        
        // 初始化
        init : function() {

            var _this = this;
            
            // 桌面右键调出菜单
            $document.on('contextmenu', function(ev) {
                _this.show(ev, oContextmenu);
                ev.preventDefault();
            });
            
            // 桌面单击关闭菜单
            $document.on('click', function() {
            	oContextmenu.hide();
            });
            
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
            
        },
        
        // 显示右键菜单
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
    		contextmenu.init();
    	}
    }

});