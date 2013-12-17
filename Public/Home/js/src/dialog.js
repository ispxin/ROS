/**
 * Dialog模块
 */
define(function(require, exports, module) {
    
    var config = require('./config');
    var $ = require('jquery');
    require('./drag');
    
    var win = $(window),
    	doc = $(document),
    	zIndex = 9999,
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
    
    var Dialog = function(options) {
    	this.settings = $.extend({}, defaults, options);
    	this.isMaxed = false;
    	this.init();
    }
    
    Dialog.prototype = {
    	
    	// 初始化
    	init : function() {
    	    this.createIframe();
    		this.createDialog();
    		this.bind();
    	},
    	
    	// 如果传入网址转换为iframe
    	createIframe : function() {
    	  
            var isUrl = urlRe.test(this.settings.content);
            
            if (isUrl) {
                this.settings.content = '<iframe src="'+ this.settings.content +'" frameborder="0" allowtransparency="true" scrolling="auto"></iframe>';
            }
    	     
    	},
    	
    	// 创建
    	createDialog : function() {

    		var tpl =  '<div class="dialog-head">' +
							( this.settings.icon ? '<div class="dialog-logo"><img src="'+ this.settings.icon +'" class="dialog-logo-icon" /></div>' : '' ) +
							'<div class="dialog-title">'+ ( this.settings.title ? this.settings.title : '') +'</div>'+
							'<div class="dialog-handle">' +
								( this.settings.isMin ? '<span class="dialog-minimize" title="最小化"></span>' : '' ) +
								( this.settings.isMax ? '<span class="dialog-maxres dialog-maximize" title="最大化" data-status="maximize"></span>' : '' ) +
								'<span class="dialog-close" title="关闭"></span>' +
							'</div>' +
						'</div>' +
						'<div class="dialog-content">'+ this.settings.content +'</div>' +
						'<div class="dialog-foot"></div>';
			
			this.dialog = $('<div id="dialog-'+ this.settings.id +'" class="dialog"></div>').html(tpl);
			
			this.dialogTitle = this.dialog.find('.dialog-title');
			this.dialogContent = this.dialog.find('.dialog-content');
			this.dialogMinimize = this.dialog.find('.dialog-minimize');
			this.dialogMaxres = this.dialog.find('.dialog-maxres');
			this.dialogClose = this.dialog.find('.dialog-close');
			
			this.dialogWidth = this.settings.width + 2;
			this.dialogHeight = this.settings.height + 29;
			
			this.dialogContent.css({
				width : this.settings.width,
				height : this.settings.height
			});
			
			this.dialog.css({
				zIndex : zIndex++,
				width : this.settings.width,
				height : this.dialogHeight
			});
			
			this.setPosition();

			this.dialog.appendTo('body');
    		
    	},
    	
    	// 设置位置
    	setPosition : function() {
    		
    		this.winWidth = win.width();
    		this.winHeight = win.height();
    		this.dialogLeft = (this.winWidth - this.dialogWidth) / 2;
    		this.dialogTop = (this.winHeight - this.dialogHeight) / 2;

    		if (this.isMaxed) {
    			this.dialog.css({
    				width : win.width() - 2,
    				height : win.height() - 2
    			});
    			this.dialogContent.css({
    				width : win.width() - 2,
    				height : win.height() - 31
    			});
    		} else {
    			this.dialog.css({
	    			left : this.dialogLeft,
	    			top : this.dialogTop
	    		});
    		}
    		
    	},
    	
    	// 最小化
    	minimize : function() {
    		
    	},

    	// 最大化
    	maximize : function() {
    		
    		var _this = this;
    		
    		this.dialogMaxres.data('status', 'restore').removeClass().addClass('dialog-restore').attr('title', '还原');

    		this.dialog.animate({
    			left : 0,
    			top : 0,
    			width : this.winWidth - 2,
    			height : this.winHeight - 2
    		});
    		
    		this.dialogContent.animate({
    		   width : this.winWidth - 2,
    		   height : this.winHeight - 31
    		});
    		
    	},
    	
    	// 还原
    	restore : function(obj) {
    		
    		var _this = this;
    		
    		this.dialogMaxres.data('status', 'maximize').removeClass().addClass('dialog-maximize').attr('title', '最大化');

    		this.dialog.animate({
    			left : this.dialogLeft,
    			top : this.dialogTop,
    			width : this.settings.width,
    			height : this.dialogHeight
    		});
    		
    		this.dialogContent.animate({
               width : this.settings.width,
               height : this.settings.height
            });
    		
    	},
    	
    	// 最大化、还原
    	maxres : function(status) {
    		
    		switch(status) {
    			
    			case 'maximize':
    			this.maximize();
    			this.isMaxed = true;
    			break;
    			
    			case 'restore':
    			this.restore();
    			this.isMaxed = false;
    			break;
    			
    		}
    		
    	},
    	
    	// 创建iframe mask 解决拖拽bug 
    	createIframeMask : function() {
    		
    		var _this = this;
    		
    		this.dialogTitle.on('mousedown', function() {
    			
    			_this.iframeMask = $('<div class="iframeMask"></div>').appendTo(_this.dialogContent);
    			
    			_this.dialog.css('zIndex', zIndex++);
    			
    			doc.on('mouseup', function() {
	    			_this.iframeMask.remove();
	    		});
    			
    		});

    	},
    	
    	// 关闭
    	close : function() {
    		
    		var _this = this;
    		var appId = '#app-' + this.settings.id;

    		this.dialog.animate({
    			left : this.winWidth,
    			top : 0,
    			width : 0,
    			height : 0,
    			opacity : 0
    		}, 500, function() {
    			$(appId).data('state', 0);
    			_this.dialog.remove();
    		});

    	},
    	
    	// 事件绑定
    	bind : function() {
    		
    		var _this = this;
    		
    		win.on('resize', function() {
    			_this.setPosition();
    		});
    		
    		this.dialogMinimize.on('click', function() {
    		
    		});
    		
    		this.dialogMaxres.on('click', function() {
    			
    			var status = $(this).data('status');
    			_this.maxres(status);
    			
    		});
    		
    		this.dialogClose.on('click', function() {
    			_this.close();
    		});
    		
    		if (this.settings.isDrag) {
    			this.createIframeMask();
    			$.ros.drag(_this.dialogTitle, _this.dialog);
    		}
    		
    	}
    	
    }
    
    var dialog = function(options) {
    	new Dialog(options);
    }
    
    if (!$.ros) {
    	$.ros = {}
    }
    
    $.ros.dialog = dialog;

});