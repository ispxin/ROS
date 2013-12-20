/**
 * Contextmenu模块
 */
define(function(require, exports, module) {

    var $document = $(document),
    	desk = require('./desk'),
    	dialog = require('./dialog'),
    	obj = $('#contextmenu');
    
    var contextmenu = {
        
        // 初始化
        init : function() {

            var _this = this;
            
            // 右键调出菜单
            $document.on('contextmenu', function(ev) {
                _this.show(ev);
                ev.preventDefault();
            });
            
            // 桌面单击关闭菜单
            $document.on('click', function() {
            	obj.fadeOut(100);
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
        show : function(ev) {
            
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