/**
 * Contextmenu模块
 */
define(function(require, exports, module) {
    
    var $ = require('jquery');
    var app = require('./app');
    
    var contextmenu = {
        
        // 初始化
        init : function() {

            this.doc = $(document);
            this.obj = $('#contextmenu');

            this.bind();
            
        },
        
        // 显示右键菜单
        show : function(ev) {
            
            this.obj.fadeIn(100);
            
            var iWidth = this.obj.outerWidth(),
                iHeight = this.obj.outerHeight(),
                x = ev.clientX,
                y = ev.clientY,
                w = this.doc.width() - iWidth,
                h = this.doc.height() - iHeight;
            
            if (x > w) {
                this.obj.css('left', x - iWidth);
            } else {
                this.obj.css('left', x);
            }
            
            if (y > h) {
                this.obj.css('top', y - iHeight);
            } else {
                this.obj.css('top', y);
            }
              
        },
        
        // 事件
        bind : function() {
            
            var _this = this;
            
            // 右键调出菜单
            this.doc.on('contextmenu', function(ev) {
                _this.show(ev);
                return false;
            });
            
            // 桌面单击关闭菜单
            this.doc.on('click', function() {
               _this.obj.fadeOut(100);
            });
            
            // 横向排序
            $('#setAppX').on('click', function() {
                app.setAppSort('x');
                $(this).parent().parent().find('a').removeClass('on');
                $(this).addClass('on');
            });
            
            // 纵向排序
            $('#setAppY').on('click', function() {
                app.setAppSort('y');
                $(this).parent().parent().find('a').removeClass('on');
                $(this).addClass('on');
            });
            
            // 锁定
            // $('#lockDesk').on('click', function() {
                // $('#wallpaper').css('zIndex', 100000); 
            // });
            
        }
        
    }

	// 开放接口
    module.exports = {
    	init : function() {
    		contextmenu.init();
    	}
    }

});