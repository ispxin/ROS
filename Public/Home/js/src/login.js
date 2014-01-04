/**
 * Login模块
 */
define(function(require, exports, module) {

    var tpl =   '<div class="close" title="关闭" id="login-close"></div>' +
                '<div class="form-wraper">' +
                    '<form class="form" id="signin">' +
                        '<div class="header">ROS</div>' +
                        '<div class="item">' +
                            '<input type="text" class="input" placeholder="账号" id="user" name="user" />' +
                            '<div class="message" id="message-user"></div>' +
                        '</div>' +
                        '<div class="item">' +
                            '<input type="password" class="input" placeholder="密码" id="password" name="password" />' +
                            '<div class="message" id="message-password"></div>' +
                        '</div>' +
                        '<div class="item">' +
                            '<button type="button" class="button" id="btn-login">登 录</button>' +
                        '</div>' +
                        '<div class="item">' +
                            '<div class="register-text clearfix">' +
                                '<span class="fl">我还没有账号，<a href="javascript:;" id="go-register">十秒钟注册</a></span>' +
                                '<span class="fr"><a href="#">忘记密码？</a></span>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                    '<form class="form" id="register">' +
                        '<div class="item">' +
                            '<input type="text" class="input" placeholder="E-mail" id="reg-user" name="user" />' +
                            '<div class="message" id="message-reg-user"></div>' +
                        '</div>' +
                        '<div class="item">' +
                            '<input type="password" class="input" placeholder="输入密码" id="reg-password" name="password" />' +
                        	'<div class="message" id="message-reg-password"></div>' +
                        '</div>' +
                        '<div class="item">' +
                            '<input type="password" class="input" placeholder="确认密码" id="reg-password-repeat" name="passwordRepeat" />' +
                        	'<div class="message" id="message-reg-password-repeat"></div>' +
                        '</div>' +
                        '<div class="item">' +
                            '<button type="button" class="button" id="btn-register">注 册</button>' +
                        '</div>' +
                        '<div class="item">' +
                           '<div class="register-text clearfix">' +
                                '<span class="fl">我已经有账号了，<a href="javascript:;" id="go-signin">马上登录</a></span>' +
                                '<span class="fr"><a href="#">忘记密码？</a></span>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>';
	
	var login = {
	    
	    // 初始化
	    open : function() {
	        this.create();
	        this.bind();
	    },
	    
	    // 创建
	    create : function() {
	        this.login = $('<div>', { class : 'login', id : 'login' }).html(tpl).appendTo('body');
            this.mask = $('<div>', { class : 'mask' }).appendTo('body');
            
            var username = $.cookie('ROS_username');
            
            if (username) {
                $('#user').val(username);
                $('#password').focus();
            } else {
                $('#user').focus();
            }

            $(this.login).animate({ top : '50%' }, 400);
            $(this.mask).animate({ opacity : 0.3 }, 400);

	    },
	    
	    // 关闭
	    close : function() {
	        
	        $(this.login).animate({ top : -300 }, 400, function() {
	        	$(this).remove();
	        });
	        
	        $(this.mask).animate({ opacity : 0 }, 400, function() {
                $(this).remove();
	        });
	        
	    },
	    
	    // 变换状态
	    change : function(state) {
	        
	        var signin = $('#signin');
	        var register = $('#register');
	        
	        if (state == 'register') {
	            signin.animate({ left : -330, opacity : 0 }, 300);
                register.animate({ left : 0, opacity : 1 }, 300);
	        } else if (state == 'signin') {
	            signin.animate({ left : 0, opacity : 1 }, 300);
	            register.animate({ left : 330, opacity : 0 }, 300);
	        }
	        
	    },
	    
	    // 验证用户名
	    checkUser : function() {
	        
	        var oUser = $('#user');
            var oMessage = oUser.next();
            var sUser = oUser.val();
	        var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	        
	        if (!sUser) {
	            oMessage.html('请输入账号').parent().addClass('error');
	            return false;
	        }
	        
	        if (!re.test(sUser)) {
	            oMessage.html('请输入E-mail格式').parent().addClass('error');
                return false;
	        }
	        
	        oMessage.html('').parent().removeClass('error');
	        
	        return true;
	        
	    },
	    
	    // 验证密码
	    checkPassword : function() {
	    	
	    	var oPassword = $('#password');
            var oMessage = oPassword.next();
            var sPassword = oPassword.val();
                
	        if (!sPassword) {
	            oMessage.html('请输入密码').parent().addClass('error');
                return false;
	        }
	        
	        oMessage.html('').parent().removeClass('error');
	        
	        return true;
	        
	    },
	    
	    // 验证登陆
	    checkLogin : function() {

			var _this = this;
            var oMessageUser = $('#message-user');
            var oMessagePassword = $('#message-password');
            var data = $('#signin').serialize();
            
            // 验证用户名
            var checkUserFlag = _this.checkUser();
        
            if (!checkUserFlag) {
            	$('#user').focus();
            	this.waggle();
                return false;
            }
            
            // 验证密码
            var checkPasswordFlag = _this.checkPassword();
            
            if (!checkPasswordFlag) {
            	$('#password').focus();
            	this.waggle();
                return false;
            }
			
			// 验证后端
	        $.ajax({
	    		url : './index.php/User/signin',
	    		data : data,
	    		type : 'post',
	    		success : function(msg) {
	    			
	    			if (msg.status == 1) {
	    				
	    				// console.log(msg);
	    				// _this.close();
	    				location.reload();
	    				
	    			} else if (msg.status == 0) {
	    				
	    				if (msg.data == 0) {
	    					oMessageUser.html('账号不存在').parent().addClass('error');
	    					_this.waggle();
	    				} else if (msg.data == 1) {
	    					oMessagePassword.html('密码错误').parent().addClass('error');
	    					_this.waggle();
	    				}
	    				
	    			}
	    			
	    		}
	    	});
	        
	    },
	    
	    // 验证注册E-mail
	    checkRegUser : function() {
	        
	        var oUser = $('#reg-user');
            var oMessage = oUser.next();
            var sUser = oUser.val();
	        var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	        
	        if (!sUser) {
	            oMessage.html('请输入E-mail').parent().addClass('error');
	            return false;
	        }
	        
	        if (!re.test(sUser)) {
	            oMessage.html('E-mail格式不正确').parent().addClass('error');
                return false;
	        }
	        
	        oMessage.html('').parent().removeClass('error');
	        
	        return true;
	        
	    },
	    
	    // 验证注册密码
	    checkRegPassword : function() {
	    	
	    	var oPassword = $('#reg-password');
            var oMessage = oPassword.next();
            var sPassword = oPassword.val();
                
	        if (!sPassword) {
	            oMessage.html('请输入密码').parent().addClass('error');
                return false;
	        }
	        
	        oMessage.html('').parent().removeClass('error');
	        
	        return true;
	        
	    },
	    
	    // 验证注册确认密码
	    checkRegPasswordRepeat : function() {
	    	
	    	var oPassword = $('#reg-password-repeat');
            var oMessage = oPassword.next();
            var sPassword = oPassword.val();
                
	        if (!sPassword) {
	            oMessage.html('请输入确认密码').parent().addClass('error');
                return false;
	        }
	        
	        oMessage.html('').parent().removeClass('error');
	        
	        return true;
	        
	    },
	    
	    // 验证密码是否一致
	    checkPasswordSame : function() {
	    	
	    	var oPassword = $('#reg-password');
	    	var oPasswordRepeat = $('#reg-password-repeat');
	    	var sPassword = oPassword.val();
	    	var sPasswordRepeat = oPasswordRepeat.val();
	    	
	    	var oMessagePasswordRepeat = oPasswordRepeat.next();
	    	
	    	if (sPassword != sPasswordRepeat) {
	    		oMessagePasswordRepeat.html('密码不一致').parent().addClass('error');
	    		return false;
	    	}
	    	
	    	return true;
	    	
	    },
	    
	    // 注册
	    checkRegister : function() {
	    	
	    	var _this = this;
	    	var oMessageRegUser = $('#message-reg-user');
	    	var oMessageRegPassword = $('#message-reg-password');
	    	var oMessageRegPasswordRepeat = $('#message-reg-password-repeat');
	    	var data = $('#register').serialize();
	    	
	    	// 验证注册E-mail
            var checkRegUserFlag = _this.checkRegUser();
        
            if (!checkRegUserFlag) {
            	$('#reg-user').focus();
            	this.waggle();
                return false;
            }
            
            // 验证注册密码
            var checkRegPasswordFlag = _this.checkRegPassword();
        
            if (!checkRegPasswordFlag) {
            	$('#reg-password').focus();
            	this.waggle();
                return false;
            }
            
            // 验证注册确认密码
            var checkRegPasswordRepeatFlag = _this.checkRegPasswordRepeat();
        
            if (!checkRegPasswordRepeatFlag) {
            	$('#reg-password-repeat').focus();
            	this.waggle();
                return false;
            }
            
            // 验证密码是否一致
            var checkPasswordSameFlag = _this.checkPasswordSame();
        
            if (!checkPasswordSameFlag) {
            	$('#reg-password-repeat').focus();
            	this.waggle();
                return false;
            }
	    	
	    	// 注册请求
	    	$.ajax({
	    		url : './index.php/User/register',
	    		data : data,
	    		type : 'post',
	    		success : function(msg) {

	    			if (msg.status == 1) {
                        
	    				$('#register input').val('');
	    				_this.change('signin');
	    				$('#user').val(msg.data.user);
	    				$('#password').focus();
	    				
	    			} else if (msg.status == 0) {
	    				
	    				if (msg.data == 1) {
	    					oMessageRegUser.html('E-mail已被注册').parent().addClass('error');
	    					_this.waggle();
	    				} else if (msg.data == 2) {
	    					oMessageRegPasswordRepeat.html('E-密码不一致').parent().addClass('error');
	    					_this.waggle();
	    				}
	    				
	    			}
	    			
	    		}
	    	});

	    },
	    
	    waggle : function() {
            var iNow = 0;
            var timer = null;
            var arr = [-155, -145, -154, -146, -153, -147, -152, -148, -151, -149, -150];
            
            clearInterval(timer);
            timer = setInterval(function() {
                $('#login').css('margin-left', arr[iNow]);
                iNow++;
                if (iNow == arr.length) {
                    clearInterval(timer);
                }
            }, 30);

        },
	    
	    // 事件
	    bind : function() {
	        
	        var _this = this;
	        
	        // 关闭事件
	        $('#login-close').on('click', function() {
	             _this.close();
	        });
	        
	        // 切换至注册界面
	        $('#go-register').on('click', function() {
	            _this.change('register');
	        });
	        
	        // 切换至登陆界面
	        $('#go-signin').on('click', function() {   
                _this.change('signin');
            });
            
            // 账号Blur
            $('#user').on('blur', this.checkUser);
            
            // 密码Blur
            $('#password').on('blur', this.checkPassword);
            
            // 点击按钮登陆
            $('#btn-login').on('click', function() {
                _this.checkLogin();
            });
            
            // 回车键登录
            $('#user, #password').on('keydown', function(ev) {
                if (ev.keyCode == 13) {
	                _this.checkLogin();
	            }
            });
            
            // 注册账号Blur
            $('#reg-user').on('blur', this.checkRegUser);
            
            // 注册密码Blur
            $('#reg-password').on('blur', this.checkRegPassword);
            
            // 注册确认密码Blur
            $('#reg-password-repeat').on('blur', this.checkRegPasswordRepeat);

            // 注册
            $('#btn-register').on('click', function() {
                _this.checkRegister();
            });
	        
	    }
	    
	}

	// 开放接口
    module.exports = {
    	open : function() {
    		login.open();
    	}
    }

});