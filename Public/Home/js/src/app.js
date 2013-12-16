/**
 * App模块
 */
define(function(require, exports, module) {
    
    var $ = require('jquery');
    var login = require('./login');

	// 防反跳、延迟函数的执行在函数最后一次调用时刻的 wait 毫秒之后
	function debounce(func, wait, immediate) {
	    var timeout, result;
	    return function() {
	        var context = app, args = arguments;
	        var later = function() {
	            timeout = null;
	            if (!immediate)
	                result = func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) result = func.apply(context, args);
	        return result;
	    };
	};
    
    var app = {
    	
    	// 初始化
    	init : function() {
    	    
    	    // 默认App排序方式变量
    	    // x : 横向排序
    	    // y : 纵向排序
    	    this.sortType = 'y';
			
			this.win = $(window);
			this.iNow = 0;
			
    		this.oDesk = $('#desk');
    		this.oDeskContent = $('#desk-content');
    		this.aAppContent = this.oDeskContent.children();
            this.oIndicator = $('#indicator');
            this.aIndicator = this.oIndicator.children();
    		
    		this.setDesk();
            this.setAppSort(this.sortType);
    		this.resizeDesk();
    		this.bind();
    		
    	},
    	
    	// 设置桌面
    	setDesk : function() {
    	    
    	    this.iWidth = this.win.width() - 240;
            this.iHeight = this.win.height() - 160;
            this.iLeft = this.win.width() - 120;
    		
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
    	    this.sortType = type;
    	    if (type == 'x') {
                this.setAppX();
            } else if (type == 'y') {
                this.setAppY();
            }
    	},
    	
    	// Resize事件
    	resizeDesk : function() {
    	    
    	    var _this = this;

    		var setDeskDebounce = debounce(this.setDesk, 100);
    		var setAppXDebounce = debounce(this.setAppX, 100);
    		var setAppYDebounce = debounce(this.setAppY, 100);

    		this.win.on('resize', function() {
    			setDeskDebounce();
    			if (_this.sortType == 'x') {
                    setAppXDebounce();
                } else if (_this.sortType == 'y') {
                    setAppYDebounce();
                }
    		});
    		
    	},
    	
    	// 事件
        bind : function() {
            
            var _this = this;
            
            // 指示器切换
            this.aIndicator.on('click', function() {
                _this.indicator($(this));
            });
            
            // Login模块
			$('#navbar-avatar').on('click', function() {
                login.open();
            });
            
        }
    	
    }

	// 开放接口
    module.exports = {
    	init : function() {
    		app.init();
    	},
    	setAppSort : function(type) {
    	    app.setAppSort(type);
    	}
    }

});