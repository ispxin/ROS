/**
 * Task模块
 */
define(function(require, exports, module) {
    
    var win = $(window),
        taskContentInner = $('#task-content-inner');
    
    
    var Task = function(options) {
        
        this.dialog = options.dialog;
        this.id = options.id;
        this.title = options.title;
        this.icon = options.icon;
        
        this.init();

    }
    
    Task.prototype = {
        
        // 初始化
        init : function() {
            this.createTask();
            this.bind();
        },
        
        // 创建任务
        createTask : function() {
            
            var tpl = '<div class="task-app-icon"><img src="'+ this.icon +'"></div><div class="task-app-title">'+ this.title +'</div>';

            this.task = $('<li id="task-'+ this.id +'" data-id="'+ this.id +'"></li>').html(tpl).appendTo(taskContentInner);
        
        },
        
        // 关闭任务
        close : function() {
            this.task.remove();
        },
        
        // 事件
        bind : function() {
            
            var _this = this;
            
            this.task.on('click', function() {
                
                if (_this.dialog.isHide) {
                    _this.dialog.show();
                } else {
                    _this.dialog.hide();
                }
                
            });
            
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