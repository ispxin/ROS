/**
 * Desk 模块
 */
define(function(require, exports, module) {
    
    
    // 静态App数据，后期ajax动态调用数据
    var appData = [
        [
            { id : 'app_1', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_2', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_3', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_4', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_5', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_6', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true}
        ],
        [
            { id : 'app_7', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true}
        ],
        [
            { id : 'app_8', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true}
        ],
        [
            { id : 'app_9', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true}
        ],
        [
            { id : 'app_10', type : 'app',  title : '我的博客', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true}
        ]
    ];


    var login = require('./login'),
        debounce = require('./debounce');
    	require('./dialog');
    	require('./task');

    var $window = $(window);
    
    var desk = {
    	
    	// 初始化
    	init : function() {
			
			this.iNow = 0;
			
    		this.oDesk = $('#desk');
    		this.oDeskContent = $('#desk-content');
    		this.oNavbar = $('#navbar');
            this.oIndicator = $('#indicator');
            this.aIndicator = this.oIndicator.children();
    		
    		this.createApp();
    		this.setDesk();
    		this.setNavbar();
            this.setAppSort(GLOBAL.sortType);
    		this.resizeDesk();
    		this.bind();
    		
    	},
    	
    	// 设置桌面
    	setDesk : function() {
    	    
    	    this.iWidth = $window.width() - 240;
            this.iHeight = $window.height() - 160;
            this.iLeft = $window.width() - 120;
    		
    		this.oDeskContent.css({
    			width : this.iWidth,
    			height : this.iHeight
    		});
    		
    		for (var i=0; i<this.aAppContent.length; i++) {
                if (i == this.iNow) {
                    this.aAppContent.eq(i).css({ width : this.iWidth, height : this.iHeight, left : 0 });
                    continue;
                }
                this.aAppContent.eq(i).css({ width : this.iWidth, height : this.iHeight, left : -this.iLeft }); 
            };
    		
    	},
    	
    	// 创建App
    	createApp : function() {
    	    
    	    var html = this.createAppHtml(appData);
    	    
    	    this.oDeskContent.append(html);
    	    
    	    this.aAppContent = this.oDeskContent.children();
    	      
    	},
    	
    	// 生成App html
    	createAppHtml : function(data) {
    	    
            var html = '';

            $.each(data, function(i) {
                
                html += '<ul class="app-content">';
                
                $.each(data[i], function(j) {
                    
                    var item = data[i][j];
                    
                    html += '<li class="app-item" data-id="'+ item.id +'" data-type="'+ item.type +'" data-title="'+ item.title +'" data-icon="'+ item.icon +'" data-url="'+ item.url +'" data-width="'+ item.width +'" data-height="'+ item.height +'" data-ismin="'+ item.isMin +'" data-ismax="'+ item.isMax +'">' +
                                '<div class="app-icon">' +
                                    '<img src="'+ item.icon +'">' +
                                '</div>' +
                                '<div class="app-name">' +
                                    '<span><i>'+ item.title +'</i></span>' +
                                '</div>' +
                            '</li>';
                    
                });
                
                html += '</ul>';

            });
            
            return html;
    	  
    	},
    	
    	// 设置Navbar位置
    	setNavbar : function() {
    		this.oNavbar.css({
    			left : ($window.width() - 240) / 2,
    			top : 10,
    			display : 'block'
    		});
    	},
    	
    	// 指示器
        indicator : function(obj) {
   
           var index = obj.index();
           
           obj.addClass('active').siblings().removeClass('active');
           
           if (index > this.iNow) {
               
               this.aAppContent.eq(index).css('left', -this.iWidth);
               this.aAppContent.eq(this.iNow).stop().animate({ left : this.iLeft, opacity : 0 }, 600);
               
           } else if (index < this.iNow) {
               
               this.aAppContent.eq(index).css('left', this.iWidth);
               this.aAppContent.eq(this.iNow).stop().animate({ left : -this.iLeft, opacity : 0 }, 600);
               
           }
           
           this.aAppContent.eq(index).stop().animate({ left : 0, opacity : 1 }, 600);
           
           this.iNow = index;
  
        },
    	
    	// 设置App纵向
    	setAppY : function() {
    		
    		var aAppItem = this.oDeskContent.children();
    		var nRange = 120;
			var nowNum = Math.floor(this.oDeskContent.height() / nRange);
			var arrPos = [];
			
			if (nowNum == 0) {
			    nowNum = 1;
			}
			
			aAppItem.each(function(i) {
				
				var aApp = aAppItem.eq(i).children();
				arrPos.push([]);
				
				aApp.each(function(j) {
					var iLeft = nRange * Math.floor(j / nowNum);
					var iTop = nRange * (j % nowNum);
					aApp.eq(j).animate({ left : iLeft, top : iTop }, 700);
					arrPos[i].push([iLeft, iTop]);
				});
				
			});
    		
    	},
    	
    	// 设置App横向
    	setAppX : function() {
    		
    		var aAppItem = this.oDeskContent.children();
            var nRange = 120;
            var nowNum = Math.floor(this.oDeskContent.width() / nRange);
            var arrPos = [];
            
            aAppItem.each(function(i) {
                
                var aApp = aAppItem.eq(i).children();
                arrPos.push([]);
                
                aApp.each(function(j) {
                    var iTop = nRange * Math.floor(j / nowNum);
                    var iLeft = nRange * (j % nowNum);
                    aApp.eq(j).animate({ left : iLeft, top : iTop }, 700);
                    arrPos[i].push([iLeft, iTop]);
                });
                
            });
    		
    	},
    	
    	// 设置App排序方式
    	setAppSort : function(type) {
    	    GLOBAL.sortType = type;
    	    if (type == 'x') {
                this.setAppX();
            } else if (type == 'y') {
                this.setAppY();
            }
    	},
    	
    	// Resize事件
    	resizeDesk : function() {
    	    
    	    var _this = this;

    		var setDeskDebounce = debounce(this, this.setDesk, 100);
    		var setAppXDebounce = debounce(this, this.setAppX, 100);
    		var setAppYDebounce = debounce(this, this.setAppY, 100);

    		$window.on('resize', function() {
    			setDeskDebounce();
    			if (GLOBAL.sortType == 'x') {
                    setAppXDebounce();
                } else if (GLOBAL.sortType == 'y') {
                    setAppYDebounce();
                }
    		});
    		
    	},

        // App打开
        appOpen : function(obj) {
        	
            var appData = obj.data();

            var dialog = $.ros.dialog({
            	id : appData.id,
                icon : appData.icon,
                title : appData.title,
                content : appData.url,
                width : appData.width,
                height : appData.height,
                isMin : appData.ismin,
                isMax : appData.ismax
            });
            
        },
    	
    	// 事件
        bind : function() {
            
            var _this = this;
            
            // Navbar拖拽
            $.ros.drag(this.oNavbar);

            // 指示器切换
            this.aIndicator.on('click', function() {
                _this.indicator($(this));
            });
            
            // Login模块
			$('#navbar-avatar').on('click', function() {
                login.open();
            });
            
            // App打开
            this.oDeskContent.on('click', 'li', function() {
            	_this.appOpen($(this)); 
            });
            
            // App拖拽
            this.oDeskContent.find('li').each(function() {
                $.ros.drag($(this));
            });
            
        }
    	
    }

    

	// 开放接口
    module.exports = {
    	init : function() {
    		desk.init();
    	},
    	setAppSort : function(type) {
    	    desk.setAppSort(type);
    	}
    }

});