/**
 * App模块
 */
define(function(require) {
	
	// 加载jquery暴露到全局
    window.$ = require('jquery');
    
    // 加载cookie插件
    require('./cookie');
    
    var login = require('./login');

    var app = {
    	
    	// 初始化
    	init : function() {
    		
    		this.bind();
    		
    	},
    	
    	// 创建App
    	creatApp : function(data) {
    		
    		var addBtn = $("#desk-content", parent.document).children().eq($.cookie('ROS_desk')-1).children().eq(-1);
    		var iLeft = addBtn.css('left');
    		var iTop = addBtn.css('top');

    		var html = '<li title="'+ data.title +'" class="app-item" data-id="'+ data.id +'" data-type="app" data-title="'+ data.title +'" data-icon="'+ data.icon +'" data-url="'+ data.url +'" data-width="'+ data.width +'" data-height="'+ data.height +'" data-ismax="'+ data.isMax +'" style="left:'+ iLeft +'; top:'+ iTop +';">' +
	                    '<div class="app-icon">' +
	                        '<img src="'+ data.icon +'">' +
	                    '</div>' +
	                    '<div class="app-name">' +
	                        '<span><i>'+ data.title +'</i></span>' +
	                    '</div>' +
	                '</li>';

    		addBtn.before(html);
			this.setAddBtn(addBtn);
    	
    	},
    	
    	// 设置addBtn位置
    	setAddBtn : function(addBtn) {
    		
    		var oDeskContent = $("#desk-content", parent.document);
    		var nRange = 120;
			var index = addBtn.index();
			var sortType = $.cookie('ROS_sortType');
			
			if (sortType == 'y') {
				var nowNum = Math.floor(oDeskContent.height() / nRange);
				var iLeft = nRange * Math.floor(index / nowNum);
				var iTop = nRange * (index % nowNum);
			} else if (sortType == 'x') {
				var nowNum = Math.floor(oDeskContent.width() / nRange);
				var iTop= nRange * Math.floor(index / nowNum);
				var iLeft = nRange * (index % nowNum);
			}

			addBtn.css({ left : iLeft, top : iTop });
    		
    	},
    	
    	// 添加App
    	addApp : function(addBtn, appid) {
    		
    		var _this = this;
    		
    		var data = {
	    		appid : appid,
	    		desk : $.cookie('ROS_desk'),
	    		type : 1
	    	}
	    	
	    	$.ajax({
	    		url : CONFIG.WEBURL + 'index.php/App/addApp',
	    		type : 'post',
	    		data : data,
	    		success : function(msg) {
	    		    console.log(msg);
	    			if (msg.status == 1) {
	    				_this.creatApp(msg.data);
	    				addBtn.parent().prev().find('span').text(msg.data.appCount);
	    				addBtn.text('已添加').addClass('disabled');
	    			} else if (msg.status == 2) {
	    			    parent.window.login.open();
	    			}
	    		}
	    	});
    		
    	},
    	
    	// 事件
    	bind : function() {
    		
    		var _this = this;
    		
    		$('#appList').on('click', '.btn-addApp:not(.disabled)', function() {
    			var appid = $(this).data('id');
				_this.addApp($(this), appid);
			});
    		
    	}
    	
    }
	
	app.init();
	
});