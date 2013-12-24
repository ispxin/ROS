/**
 * Desk 模块
 */
define(function(require, exports, module) {
    
    
    // 静态App数据，后期ajax动态调用数据
    var appData = [
        [
            { id : 'app_1', type : 'app',  title : '我的博客1', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_2', type : 'app',  title : '我的博客2', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_3', type : 'app',  title : '我的博客3', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_4', type : 'app',  title : '我的博客4', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_5', type : 'app',  title : '我的博客5', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true},
            { id : 'app_6', type : 'app',  title : '我的博客6', icon : '/ros/Public/Home/images/app/clover.png', width : 500, height : 300,  url : 'http://www.wangyingran.com', isMin : true, isMax : true}
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

    var $window = $(window),
    	$document = $(document);
    
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
            // this.appMove();
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
                    
                    html += '<li class="app-item" data-id="'+ item.id +'" data-index="'+ j +'" data-type="'+ item.type +'" data-title="'+ item.title +'" data-icon="'+ item.icon +'" data-url="'+ item.url +'" data-width="'+ item.width +'" data-height="'+ item.height +'" data-ismin="'+ item.isMin +'" data-ismax="'+ item.isMax +'">' +
                                '<div class="app-icon">' +
                                    '<img src="'+ item.icon +'">' +
                                '</div>' +
                                '<div class="app-name">' +
                                    '<span><i>'+ item.title +'</i></span>' +
                                '</div>' +
                            '</li>';
                    
                });
                
                html += '<li data-ismax="false" data-ismin="true" data-width="800" data-height="500" data-url="http://www.wangyingran.com" data-icon="/ros/Public/Home/images/app/app-add.png" data-title="应用市场" data-type="add" data-id="add" class="app-item"><div class="app-icon"><span class="app-add"></span></div><div class="app-name"><span><i>添加应用</i></span></div></li></ul>';

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
           
           // 当前屏幕
           GLOBAL.nowScreen = index;
  
        },
    	
    	// 设置App纵向
    	setAppY : function() {
    		
    		var _this = this;
    		
    		var aAppItem = this.oDeskContent.children();
    		var nRange = 120;
			var nowNum = Math.floor(this.oDeskContent.height() / nRange);
			
			// this.arrPosY = [];
			
			if (nowNum == 0) {
			    nowNum = 1;
			}
			
			aAppItem.each(function(i) {
				
				var aApp = aAppItem.eq(i).children();
				// _this.arrPosY.push([]);
				
				aApp.each(function(j) {
					var iLeft = nRange * Math.floor(j / nowNum);
					var iTop = nRange * (j % nowNum);
					aApp.eq(j).animate({ left : iLeft, top : iTop }, 700);
					// _this.arrPosY[i].push([iLeft, iTop]);
				});
				
			});
			
    	},
    	
    	// 设置App横向
    	setAppX : function() {
    		
    		var _this = this;
    		
    		var aAppItem = this.oDeskContent.children();
            var nRange = 120;
            var nowNum = Math.floor(this.oDeskContent.width() / nRange);
            // this.arrPosX = [];
            
            aAppItem.each(function(i) {
                
                var aApp = aAppItem.eq(i).children();
                // _this.arrPosX.push([]);
                
                aApp.each(function(j) {
                    var iTop = nRange * Math.floor(j / nowNum);
                    var iLeft = nRange * (j % nowNum);
                    aApp.eq(j).animate({ left : iLeft, top : iTop }, 700);
                    // _this.arrPosX[i].push([iLeft, iTop]);
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
    	
    	// 碰撞检测
    	bump : function(obj1, obj2) {

    		var L1 = obj1.offset().left;
			var T1 = obj1.offset().top;
			var R1 = obj1.offset().left + obj1.outerWidth();
			var B1 = obj1.offset().top + obj1.outerHeight();
	
			var L2 = obj2.offset().left;
			var T2 = obj2.offset().top;
			var R2 = obj2.offset().left + obj2.outerWidth();
			var B2 = obj2.offset().top + obj2.outerHeight();
	
			if (R1 >= L2 && L1 <= R2 && B1 >= T2 && T1 <= B2) {
				return true;
			} else {
				return false;
			}
    		
    	},
    	
    	// 计算距离
    	jl : function(obj1, obj2) {
    		var a = obj1.offset().left - obj2.offset().left;
			var b = obj1.offset().top - obj2.offset().top;
			return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    	},
    	
    	// 计算距离最近的App
    	appNear : function(app) {
    		
    		var _this = this;
    		var aApp = app.parent().children();
    		var value = 9999;
    		var index = -1;
    		
    		var nowIndex = app.index();

    		aApp.each(function(i) {
    			
    			if (i == nowIndex) {
    				return;
    			}
    			
    			if (_this.bump(app, aApp.eq(i))) {
    				var c = _this.jl(app, aApp.eq(i));
    				if (c < value) {
    					value = c;
    					index = i;
    				}
    			}
    			
    		});

    		if (index == -1) {
    			return false;
    		} else {
    			return aApp.eq(index);
    		}
    		
    	},
    	
    	// App移动
    	appMove : function() {
    		
    		/*
    		
    		var _this = this;
    		
    		this.oDeskContent.on('mousedown', 'li', function(ev) {
            	
            	var $this = $(this);
            	
            	$(this).css('zIndex', 10000);
            	
            	// 获取父级索引值
            	_this.parentIndex = $this.parent().index();
        		
        		// 鼠标按下表明用户要打开App
        		$this.data('isOpenApp', true);
        		// 获取当前点击位置
        		var iX = ev.clientX;
        		var iY = ev.clientY;
        		
        		$document.on('mousemove.isOpenApp', function(ev) {
        			// 鼠标移动表明用户不需要打开App，只是拖动App切换位置
        			if (Math.abs(ev.clientX - iX) > 5 || Math.abs(ev.clientY - iY) > 5) {
        				$this.data('isOpenApp', false);
        			}
        		});
        		
        		$document.on('mouseup.appMove', function() {
        			
        			$document.off('mousemove.isOpenApp');
        			$document.off('mouseup.appMove');
        		
	        		$this.css('zIndex', 0);
	            	
	            	if ($this.data('isOpenApp')) {
	            		_this.appOpen($this);
	            	}

	            	var nL = _this.appNear($this);
	            	var tmp = 0;
	            	
	            	var arrPos = GLOBAL.sortType == 'x' ? _this.arrPosX : _this.arrPosY;
	            	
	            	console.log(arrPos)
	            	
	            	if (nL) {
	            		
	            		nL.stop(true).animate({
	            			left : arrPos[_this.parentIndex][$this.data('index')][0],
	            			top : arrPos[_this.parentIndex][$this.data('index')][1]
	            		}, 500);
	            		
	            		$this.stop(true).animate({
	            			left : arrPos[_this.parentIndex][nL.data('index')][0],
	            			top : arrPos[_this.parentIndex][nL.data('index')][1]
	            		}, 500);
	            		
	            		tmp = $this.data('index');
	            		$this.data('index', nL.data('index'));
	            		nL.data('index', tmp);
	            		
	            	} else {
	            		$this.stop(true).animate({
	            			left : arrPos[_this.parentIndex][$this.data('index')][0],
	            			top : arrPos[_this.parentIndex][$this.data('index')][1]
	            		}, 500);
	            	}
	            	
	        	});
        		
        	});
        	
        	*/
    		
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
        
        // 删除应用
        appDel : function(obj) {
            
            obj.remove();
            
            this.setAppSort(GLOBAL.sortType);
            
        },
    	
    	// 事件
        bind : function() {
            
            var _this = this;
            
            // Navbar拖拽
            $.ros.drag(true, this.oNavbar);

            // 指示器切换
            this.aIndicator.on('click', function() {
                _this.indicator($(this));
            });
            
            // Login模块
			$('#navbar-avatar').on('click', function() {
                login.open();
            });

            // App拖拽
            // this.oDeskContent.find('li').each(function() {
                // $.ros.drag(false, $(this));
            // });
            
            // 临时App打开
            this.oDeskContent.on('click', 'li', function() {
	        	_this.appOpen($(this));
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
    	},
    	appOpen : function(obj) {
    	    desk.appOpen(obj);
    	},
    	appDel : function(obj) {
    	    desk.appDel(obj);
    	}
    }

});