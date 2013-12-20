/**
 * Dialog模块
 */
define(function(require, exports, module) {

    require('./drag');
    require('./task');
    
    var $window = $(window),
    	$document = $(document),
    	dialogList = {},
    	urlRe = /^[a-zA-z]+:\/\/[^\s]*$/;
    
    var defaults = {
    	icon : null,
    	title : '',
    	content : 'Hello world : )',
    	width : 300,
    	height : 200,
    	isDrag : true,
    	isMin : true,
    	isMax : true
    }
    
    function Dialog(options) {
    	
    	var _this = this;
    	
    	// 是否已显示
    	this.opened = false;
    	// 是否已最大化
    	this.maxed = false;
    	
    	this.o = $.extend({}, defaults, options);
    	
    	var isCreate = this.__isCreate(this.o.id);
		
		if (isCreate) {
		    var nowDialog = dialogList[this.o.id];
		    if (!nowDialog.opened) {
                nowDialog.show();
		    }
		    nowDialog.zIndexUp();
			return;
		}

    	this.__init();
    	
    	this.__center();
    	
    	// 绑定关闭事件
    	this.__$('close').on('click', function() {
    		_this.close();
    	});
    	
    	// 绑定resize事件
		$window.on('resize', function() {
			_this.__resize();
		});
    	
    	// 绑定最小化事件
    	if (this.o.isMin) {
    		this.__$('min').on('click', function() {
	    		_this.hide();
	    	});
    	}
    	
    	// 绑定最大化，还原事件
    	if (this.o.isMax) {
    		this.__$('maxres').on('click', function() {
    			_this.maxres($(this));
    		});
    	}

    	// 绑定拖拽事件
    	if (this.o.isDrag) {
    		$.ros.drag(false, this.__$('title'), this.__dialog);
    		
    		this.__$('title').on('mousedown', function() {
    			
    			// 置顶窗口
    			_this.zIndexUp();
    			
    			// 设置为活动任务
    			_this.__task.setActive();
    			
    			// 解决拖拽bug
    			var iframeMask = $('<div class="iframeMask"></div>').appendTo(_this.__$('content'));
    			$document.on('mouseup', function() {
    				iframeMask.remove();
    			});	
    		});
    	}
    	
    	this.show();
    	this.__openTask();
    	
    }
    
    Dialog.prototype = {
    	
    	__init : function() {

	    	this.__dialog = $('<div>')
            .css({
                display : 'none',
                position : 'absolute',
                left : 0,
                top : 0,
                bottom : 'auto',
                right : 'auto',
                zIndex : Dialog.zIndex,
                margin : 0,
                padding : 0,
                outline : 0,
                border : '0 none',
                background : 'transparent'
            })
	    	.html(this.__createTmplate())
	    	.appendTo($('#desk-dialog'));
	    	
	    	// 将dialog对象存入队列
    		dialogList[this.o.id] = this;
	
	    },

    	// 显示
    	show : function() {

    		this.__dialog.show();
    		
    		this.zIndexUp();
    		
    		this.opened = true;
    		
    	},
    	
    	// 隐藏
    	hide : function() {

    		this.__dialog.hide();
    		
    		this.opened = false;
    		
    	},
    	
    	// 显示，隐藏切换
        toggle : function() {
        	
        	var dialogCount = this.__getDialogCount();
        	
        	if (dialogCount > 1) {
        		
        		this.show();
        		
        	} else if (dialogCount == 1) {
        		
        		if (this.opened) {
	                this.hide();
	            } else {
	                this.show();
	            }
        		
        	}
            
        },
    	
    	// 最大化，还原
    	maxres : function(obj) {
    		
    		if (!this.maxed) {
    			this.__maximize(obj);
    		} else {
    			this.__restore(obj);
    		}

    	},
    	
    	// 关闭（销毁）
    	close : function() {
    		
    		var _this = this;

    		this.__dialog.animate({
    			left : $window.width(),
    			top : 0,
    			width : 0,
    			height : 0,
    			opacity : 0
    		}, 500, function() {
    			_this.remove();
    		});
    		
    	},
    	
    	// 销毁
    	remove : function() {
    		
    		// 删除队列标记
			delete dialogList[this.o.id];
			// 关闭任务
			this.__task.close();
			// 清除DOM
			this.__dialog.remove();
    		
    	},
    	
    	// 置顶浮层
	    zIndexUp : function() {
	        
	        var index = ++ Dialog.zIndex;
	        
	        this.__dialog.css('zIndex', index);

	    },
	    
	    // 判断是否创建过
	    __isCreate : function(id) {

	    	var result = false;
	    	
	    	$.each(dialogList, function(i) {
	    		if (id == i) {
	    			result = true;
	    		}
	    	});
	    	
	    	return result;
	    	
	    },

    	// 处理内容
    	__processContent : function() {
    		
    		var isUrl = urlRe.test(this.o.content);
            
            if (isUrl) {
                return '<iframe i="iframe" src="'+ this.o.content +'" frameborder="0" allowtransparency="true" scrolling="auto" width="'+ this.o.width +'" height="'+ this.o.height +'"></iframe>';
            } else {
            	return this.o.content;
            }
    		
    	},
    	
    	// 创建模板
    	__createTmplate : function() {
    		
    		var tmplate = 
    			'<div i="dialog" class="dialog">' +
				    '<div i="head" class="dialog-head">' +
						( this.o.icon ? '<div class="dialog-logo"><img src="'+ this.o.icon +'" class="dialog-logo-icon" /></div>' : '' ) +
						'<div i="title" class="dialog-title">'+ ( this.o.title ? this.o.title : '') +'</div>'+
						'<div class="dialog-handle">' +
							( this.o.isMin ? '<span i="min" class="dialog-minimize" title="最小化"></span>' : '' ) +
							( this.o.isMax ? '<span i="maxres" class="dialog-maxres dialog-maximize" title="最大化"></span>' : '' ) +
							'<span i="close" class="dialog-close" title="关闭"></span>' +
						'</div>' +
					'</div>' +
					'<div i="content" class="dialog-content">'+ this.__processContent() +'</div>' +
				'</div>';
    		
    		return tmplate;
    	
    	},
    	
    	// 居中
    	__center : function() {

    		var dialog = this.__dialog,
    			wWidth = $window.width(),
    			wHeight = $window.height(),
    			dWidth = dialog.width(),
    			dHeight = dialog.height(),
    			dLeft = (wWidth - dWidth) / 2,
    			dTop = (wHeight - dHeight) / 2
    		
    		dialog.css({
    			left : dLeft,
    			top : dTop
    		});
    		
    	},
    	
    	// 拖动
    	__resize : function() {
    		
    		if (this.maxed) {
    			this.__$('iframe').css({
	    			width : $window.width() - 2,
	    			height : $window.height() - 31
	    		});
    		}

    	},

	    // 选择器
	    __$: function (i) {
	        return this.__dialog.find('[i=' + i + ']');
	    },
	    
	    // 最大化
	    __maximize : function(obj) {
	    	
	    	var oldLeft = this.__dialog.offset().left,
	    		oldTop = this.__dialog.offset().top;
    			
    		obj.data({
    			left : oldLeft,
    			top : oldTop
    		});
    			
    		this.__dialog.animate({
    			left : 0,
    			top : 0
    		}, 500);
    		
    		this.__$('iframe').animate({
    			width : $window.width() - 2,
    			height : $window.height() - 31
    		}, 500);
	    	
	    	obj.removeClass('dialog-maximize').addClass('dialog-restore').attr('title', '还原');

	    	this.maxed = true;
	    	
	    },
	    
	    // 还原
	    __restore : function(obj) {
    			
    		this.__dialog.animate({
    			left : obj.data('left'),
    			top : obj.data('top')
    		}, 500);
    		
    		this.__$('iframe').animate({
    			width : this.o.width,
    			height : this.o.height
    		}, 500);
	    	
	    	obj.removeClass('dialog-restore').addClass('dialog-maximize').attr('title', '最大化');
	    	
	    	this.maxed = false;
	    	
	    },
	    
	    // 打开任务
	    __openTask : function() {
	        
	        this.__task = $.ros.task({
	            dialog : this,
	            id : this.o.id,
	            title : this.o.title,
	            icon : this.o.icon
	        });
	        
	    },
	    
	    // 返回当前dialog队列数量
	    __getDialogCount : function() {
	    	var count = 0;
	    	$.each(dialogList, function() {
	    		count++;
	    	});
	    	return count;
	    }
    	
    }
    
    // 当前叠加高度
    Dialog.zIndex = 1024;

    
    var dialog = function(options) {
    	return new Dialog(options);
    }

    if (!$.ros) {
    	$.ros = {}
    }
    
    $.ros.dialog = dialog;
    
    module.exports = {
    	dialogList : dialogList
    }

});