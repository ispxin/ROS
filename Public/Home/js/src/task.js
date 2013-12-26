/**
 * Task模块
 */
define(function(require, exports, module) {
    
    var $window = $(window),
    	$document = $(document),
    	popupmenu = require('./popupmenu'),
    	taskList = {};

    var Task = function(options) {
    	
    	// 是否为活动任务
    	this.active = false;
        
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
                _this.setActive();
                
            });
            
            this.__task.on('contextmenu', function(ev) {

            	var taskmenu = popupmenu.taskmenu(_this.dialog);
            	
            	$('.contextmenu').hide();
            	
            	popupmenu.show(ev, taskmenu);
				
				return false;
			});
            
        },
        
        // 创建任务
        __createTask : function() {
            
            var tpl = '<div class="task-app-icon"><img src="'+ this.icon +'"></div><div class="task-app-title">'+ this.title +'</div>';

            this.__task = $('<li>')
            .html(tpl)
            .appendTo($('#task-content-inner'));
            
            // 将任务对象存入队列
    		taskList[this.id] = this;
    		
    		this.setActive();
        
        },
        
        // 设为活动标记
        setActive : function() {
        	
        	var _this = this;

        	$.each(taskList, function(i, n) {

        		if (_this.id == i) {
					_this.__task.addClass('active');
        			_this.active = true;
        		} else {
        			n.cancelActive();
        		}

        	});
        	
        },
        
        // 取消活动标记
        cancelActive : function() {
        	this.__task.removeClass('active');
        	this.active = false;
        },
        
        // 关闭任务
        close : function() {
        	// 删除队列标记
			delete taskList[this.id];
			// 清空任务DOM
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