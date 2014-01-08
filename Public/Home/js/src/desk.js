/**
 * Desk 模块
 */
define(function(require, exports, module) {

    var user = require('./user'),
    	login = require('./login'),
    	popupmenu = require('./popupmenu'),
        debounce = require('./debounce'),
    	dialog = require('./dialog'),
    	task = require('./task');

    var $window = $(window),
    	$document = $(document),
    	$body = $('body');
    
    var desk = {
    	
    	// 初始化
    	init : function() {
    		
    		// 设置Cookie初始值
    		$.cookie('ROS_desk', 1);
    		
    		if (!$.cookie('ROS_sortType')) {
    			this.sortType = GLOBAL.sortType;
    			$.cookie('ROS_sortType', GLOBAL.sortType, {expires : GLOBAL.validDate});
    		} else {
    			this.sortType = $.cookie('ROS_sortType');
    		}

			this.iNow = 0;
			
    		this.oDesk = $('#desk');
    		this.oDeskContent = $('#desk-content');
    		this.oNavbar = $('#navbar');
            this.oIndicator = $('#indicator');
            this.aIndicator = this.oIndicator.children();
    		
    		this.getApp();
    		this.setDesk();
    		this.setNavbar();
            this.setAppSort(this.sortType);
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
    	getApp : function() {
    	    
    	    var _this = this;
            
            $.ajax({
                url : './index.php/Index/getApp',
                type : 'get',
                async : false
            }).done(function(appData) {
                var html = _this.createAppHtml(appData.data);
                _this.oDeskContent.append(html);
                _this.aAppContent = _this.oDeskContent.children();
            });
    	      
    	},
    	
    	// 生成App html
    	createAppHtml : function(data) {
    	    
            var html = '';

            $.each(data, function(i) {
                
                html += '<ul class="app-content">';
                
                $.each(data[i], function(j) {
                    
                    var item = data[i][j];
                    
                    if (item !== null) {
                    
                        html += '<li title="'+ item.title +'" class="app-item" data-id="'+ item.id +'" data-index="'+ j +'" data-type="'+ item.type +'" data-title="'+ item.title +'" data-icon="'+ item.icon +'" data-url="'+ item.url +'" data-width="'+ item.width +'" data-height="'+ item.height +'" data-ismax="'+ item.isMax +'">' +
                                    '<div class="app-icon">' +
                                        '<img src="'+ item.icon +'">' +
                                    '</div>' +
                                    '<div class="app-name">' +
                                        '<span><i>'+ item.title +'</i></span>' +
                                    '</div>' +
                                '</li>';
                    }
                    
                });
                
                html += '<li class="app-item" data-type="add"><div class="app-icon"><span class="app-add"></span></div><div class="app-name"><span><i>添加应用</i></span></div></li></ul>';

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
           
           // 设置当前屏幕
           $.cookie('ROS_desk', ++index);
  
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
    	    $.cookie('ROS_sortType', type, {expires : GLOBAL.validDate});
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
    			if ($.cookie('ROS_sortType') == 'x') {
                    setAppXDebounce();
                } else if ($.cookie('ROS_sortType') == 'y') {
                    setAppYDebounce();
                }
    		});
    		
    	},

        // App打开
        appOpen : function(obj) {
        	
            var appData = obj.data();

            $.ros.dialog({
            	id : appData.id,
                icon : appData.icon,
                title : appData.title,
                url : appData.url,
                width : appData.width,
                height : appData.height,
                isMax : appData.ismax
            });
            
        },
        
        // 删除应用
        appDel : function(obj) {
            
            obj.remove();
            
            this.setAppSort($.cookie('ROS_sortType'));
            
        },
        
        // 移动应用
        appMoveDesk : function(app, deskId) {
            
            // 获取到添加应用对象
            var oAddApp = this.oDeskContent.children().eq(deskId).children().eq(-1);
            // 将app插入到添加应用前一位
            $(oAddApp).before(app);
            // 重新排序
            this.setAppSort($.cookie('ROS_sortType'));
            
        },
        
        // 添加应用
        appAdd : function() {
        	
        	$.ros.dialog({
            	id : 'add',
                icon : '/ros/Public/Home/images/app/app-add.png',
                title : '应用市场',
                url : './index.php/App',
                width : 800,
                height : 500,
                isMax : false
            });
        	
        },
        
        // 锁定桌面
        lockDesk : function() {
        	
        	var _this = this;
        	
        	var wallpaperSrc = $('#wallpaper img').attr('src');
        	
        	var username = $.cookie('ROS_username');
        	
        	var tpl = '<div class="lock-desk" id="lock-desk">' +
							'<div class="lock-desk-avatar">' +
								'<img src="/ros/Public/Home/images/desktop/avatar.gif" />' +
							'</div>' +
							'<div class="lock-desk-user">'+ username +'</div>' +
							'<div class="lock-desk-form">' +
								'<input type="hidden" name="user" id="user" value="'+ username +'" />' +
								'<input type="password" class="lock-desk-input" name="password" id="password" />' +
								'<div class="lock-desk-enter" title="进入" id="enterDesk"></div>' +
							'</div>' +
						'</div>' +
						'<div style="position:absolute; left:0; top:0; width:100%; height:100%; z-index:1;"></div>' +
						'<img src="'+ wallpaperSrc +'" style="position:absolute; left:0; top:0; z-index:0; width:100%; height:100%;">';
        	
        	this.oLock = $('<div>').css({
        		display : 'none',
        		position : 'absolute',
        		left : 0,
        		top : 0,
        		width : '100%',
        		height : '100%',
        		zIndex : 9999
        	}).html(tpl).appendTo('body');

        	$('#enterDesk').on('click', function() {
        	    var data = {
        	        user : $('#user').val(),
        	        password : $('#password').val()
        	    }
        		_this.unlockDesk(data);
        	});

            $('#password').on('keyup', function(ev) {
                
                if ($(this).val()) {
                    $(this).next().show();
                } else {
                    $(this).next().hide();
                }

                if (ev.keyCode == 13) {

                    if (!$(this).val()) {
                        _this.lockWaggle();
                        return;
                    }

                    var data = {
                        user : $('#user').val(),
                        password : $('#password').val()
                    }
                    _this.unlockDesk(data);
                }

            }); 
        	
        	user.lock().done(function(msg) {
        	    _this.oLock.fadeIn(600);
        	    $('#password').focus();
        	});
        	
        	$document.on('click.lockFocus', function() {
        	    $('#password').focus();
        	});

        },
        
        // 解锁桌面
        unlockDesk : function(data) {
            
            var _this = this;

            $.ajax({
                url : './index.php/User/signin',
                type : 'post',
                data : data,
                success : function(msg) {
                    
                    if (msg.status == 1) {
                        _this.oLock.fadeOut(300, function() {
                            $(this).remove();
                            $document.off('click.lockFocus');
                        });
                    } else if (msg.status == 0) {
                        _this.lockWaggle();
                        $('#password').focus();
                    }
   
                }
            });
        	
        },
        
        // 锁屏晃动
        lockWaggle : function() {
            var iNow = 0;
            var timer = null;
            var arr = [-116, -106, -115, -107, -114, -108, -113, -109, -112, -110, -111];
            
            clearInterval(timer);
            timer = setInterval(function() {
                $('#lock-desk').css('margin-left', arr[iNow]);
                iNow++;
                if (iNow == arr.length) {
                    clearInterval(timer);
                }
            }, 30);

        },
        
        // 账号设置窗口
        userSetting : function() {
        	
        	$.ros.dialog({
            	id : 'userSetting',
                icon : '/ros/Public/Home/images/app/user.png',
                title : '账号设置',
                url : '',
                width : 500,
                height : 400,
                isMax : false
            });
        	
        },
    	
    	// 事件
        bind : function() {
            
            var _this = this;
            
            // 桌面单击隐藏右键菜单
            $body.on('click', function() {
                $('.contextmenu').hide();
            });
            
            // 阻止桌面右键默认事件
            $body.on('contextmenu', function() {
               return false; 
            });
            
            // 桌面右键菜单
            this.oDesk.on('contextmenu', function(ev) {
				
				var contextmenu = popupmenu.contextmenu(_this, dialog);
				
				$('.contextmenu').hide();
				
				popupmenu.show(ev, contextmenu);

				return false;
			});
			
			// App右键菜单
			this.oDeskContent.on('contextmenu', 'li[data-type="app"]', function(ev) {
				
	        	var appmenu = popupmenu.appmenu(_this, $(this));
	        	
	        	$('.contextmenu').hide();
	        	
	        	popupmenu.show(ev, appmenu);
				
				return false;
	        	
	        });
            
            // Navbar拖拽
            $.ros.drag(true, this.oNavbar);

            // 指示器切换
            this.aIndicator.on('click', function() {
                _this.indicator($(this));
            });
            
            // Login模块
			$('#navbar-avatar').on('click', function() {
				
				if (user.checkLogin()) {
					_this.userSetting();
				} else {
					login.open();
				}

            });

            // App拖拽
            // this.oDeskContent.find('li').each(function() {
                // $.ros.drag(false, $(this));
            // });
            
            // 添加应用
            this.oDeskContent.on('click', 'li[data-type="add"]', function() {
            	_this.appAdd();
            });
            
            // 临时App打开
            this.oDeskContent.on('click', 'li[data-type="app"]', function() {
	        	_this.appOpen($(this));
	        });
	        
	        $('#loading').fadeOut(500);
            
        }
    	
    }

	// 开放接口
    module.exports = {
    	init : function() {
    		desk.init();
    	},
    	lockDesk : function() {
    		desk.lockDesk();
    	},
    	setAppSort : function(type) {
    	    desk.setAppSort(type);
    	},
    	appOpen : function(obj) {
    	    desk.appOpen(obj);
    	},
    	appDel : function(obj) {
    	    desk.appDel(obj);
    	},
    	appAdd : function() {
    		desk.appAdd();
    	}
    }

});