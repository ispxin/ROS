/**
 * Task模块
 */
define(function(require, exports, module) {
    
    var $window = $(window);

    var Task = function(options) {
        
        this.dialog = options.dialog;
        this.id = options.id;
        this.title = options.title;
        this.icon = options.icon;
        
        this.__init();

    }
    
    Task.prototype = {
        
        // 初始化
        __init : function() {
            
            var _this = this;
            
            this.__createTask();
            
            this.__task.on('click', function() {
                
                _this.dialog.toggle();
                
            });
            
        },
        
        // 创建任务
        __createTask : function() {
            
            var tpl = '<div class="task-app-icon"><img src="'+ this.icon +'"></div><div class="task-app-title">'+ this.title +'</div>';

            this.__task = $('<li>')
            //.addClass('active')
            .html(tpl)
            .appendTo($('#task-content-inner'));
        
        },
        
        // 关闭任务
        close : function() {
            this.__task.remove();
        }

        
    }
    
    var task = function(options) {
        return new Task(options);
    }
    
    if (!$.ros) {
        $.ros = {}
    }
    
    $.ros.task = task;

});