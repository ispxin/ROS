define("build/ros/1.0.0/run-debug", [ "./app-debug", "jquery-debug", "./login-debug", "./contextmenu-debug", "./dialog-debug" ], function(require) {
    // 加载App模块
    require("./app-debug").init();
    // 加载Contextmenu模块
    require("./contextmenu-debug").init();
    // console.log(seajs.cache);
    require("./dialog-debug");
});

/**
 * App模块
 */
define("build/ros/1.0.0/app-debug", [ "jquery-debug", "build/ros/1.0.0/login-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var login = require("build/ros/1.0.0/login-debug");
    // 防反跳、延迟函数的执行在函数最后一次调用时刻的 wait 毫秒之后
    function debounce(func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = app, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) result = func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(context, args);
            return result;
        };
    }
    var app = {
        // 初始化
        init: function() {
            // 默认App排序方式变量
            // x : 横向排序
            // y : 纵向排序
            this.sortType = "y";
            this.win = $(window);
            this.iNow = 0;
            this.oDesk = $("#desk");
            this.oDeskContent = $("#desk-content");
            this.aAppContent = this.oDeskContent.children();
            this.oIndicator = $("#indicator");
            this.aIndicator = this.oIndicator.children();
            this.setDesk();
            this.setAppSort(this.sortType);
            this.resizeDesk();
            this.bind();
        },
        // 设置桌面
        setDesk: function() {
            this.iWidth = this.win.width() - 240;
            this.iHeight = this.win.height() - 160;
            this.iLeft = this.win.width() - 120;
            this.oDeskContent.css({
                width: this.iWidth,
                height: this.iHeight
            });
            for (var i = 0; i < this.aAppContent.length; i++) {
                if (i == this.iNow) {
                    this.aAppContent.eq(i).css({
                        width: this.iWidth,
                        height: this.iHeight,
                        left: 0
                    });
                    continue;
                }
                this.aAppContent.eq(i).css({
                    width: this.iWidth,
                    height: this.iHeight,
                    left: -this.iLeft
                });
            }
        },
        // 指示器
        indicator: function(obj) {
            var index = obj.index();
            obj.addClass("active").siblings().removeClass("active");
            if (index > this.iNow) {
                this.aAppContent.eq(index).css("left", -this.iWidth);
                this.aAppContent.eq(this.iNow).stop().animate({
                    left: this.iLeft,
                    opacity: 0
                }, 600);
            } else if (index < this.iNow) {
                this.aAppContent.eq(index).css("left", this.iWidth);
                this.aAppContent.eq(this.iNow).stop().animate({
                    left: -this.iLeft,
                    opacity: 0
                }, 600);
            }
            this.aAppContent.eq(index).stop().animate({
                left: 0,
                opacity: 1
            }, 600);
            this.iNow = index;
        },
        // 设置App纵向
        setAppY: function() {
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
                    aApp.eq(j).animate({
                        left: iLeft,
                        top: iTop
                    }, 700);
                    arrPos[i].push([ iLeft, iTop ]);
                });
            });
        },
        // 设置App横向
        setAppX: function() {
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
                    aApp.eq(j).animate({
                        left: iLeft,
                        top: iTop
                    }, 700);
                    arrPos[i].push([ iLeft, iTop ]);
                });
            });
        },
        // 设置App排序方式
        setAppSort: function(type) {
            this.sortType = type;
            if (type == "x") {
                this.setAppX();
            } else if (type == "y") {
                this.setAppY();
            }
        },
        // Resize事件
        resizeDesk: function() {
            var _this = this;
            var setDeskDebounce = debounce(this.setDesk, 100);
            var setAppXDebounce = debounce(this.setAppX, 100);
            var setAppYDebounce = debounce(this.setAppY, 100);
            this.win.on("resize", function() {
                setDeskDebounce();
                if (_this.sortType == "x") {
                    setAppXDebounce();
                } else if (_this.sortType == "y") {
                    setAppYDebounce();
                }
            });
        },
        // 事件
        bind: function() {
            var _this = this;
            // 指示器切换
            this.aIndicator.on("click", function() {
                _this.indicator($(this));
            });
            // Login模块
            $("#navbar-avatar").on("click", function() {
                login.open();
            });
        }
    };
    // 开放接口
    module.exports = {
        init: function() {
            app.init();
        },
        setAppSort: function(type) {
            app.setAppSort(type);
        }
    };
});

/**
 * Login模块
 */
define("build/ros/1.0.0/login-debug", [ "jquery-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var tpl = '<div class="close" title="关闭" id="login-close"></div>' + '<div class="form-wraper">' + '<form class="form" id="signin">' + '<div class="header">ROS</div>' + '<div class="item">' + '<input type="text" class="input" placeholder="账号" id="user" name="user" />' + '<div class="message" id="message-user"></div>' + "</div>" + '<div class="item">' + '<input type="password" class="input" placeholder="密码" id="password" name="password" />' + '<div class="message" id="message-password"></div>' + "</div>" + '<div class="item">' + '<button type="button" class="button" id="btn-login">登 录</button>' + "</div>" + '<div class="item">' + '<div class="register-text clearfix">' + '<span class="fl">我还没有账号，<a href="javascript:;" id="go-register">十秒钟注册</a></span>' + '<span class="fr"><a href="#">忘记密码？</a></span>' + "</div>" + "</div>" + "</form>" + '<form class="form" id="register">' + '<div class="item">' + '<input type="text" class="input" placeholder="E-mail" id="reg-user" name="user" />' + '<div class="message" id="message-reg-user"></div>' + "</div>" + '<div class="item">' + '<input type="password" class="input" placeholder="输入密码" id="reg-password" name="password" />' + '<div class="message" id="message-reg-password"></div>' + "</div>" + '<div class="item">' + '<input type="password" class="input" placeholder="确认密码" id="reg-password-repeat" name="passwordRepeat" />' + '<div class="message" id="message-reg-password-repeat"></div>' + "</div>" + '<div class="item">' + '<button type="button" class="button" id="btn-register">注 册</button>' + "</div>" + '<div class="item">' + '<div class="register-text clearfix">' + '<span class="fl">我已经有账号了，<a href="javascript:;" id="go-signin">马上登录</a></span>' + '<span class="fr"><a href="#">忘记密码？</a></span>' + "</div>" + "</div>" + "</form>" + "</div>";
    var login = {
        // 初始化
        open: function() {
            this.create();
            this.bind();
        },
        // 创建
        create: function() {
            this.login = $("<div>", {
                "class": "login",
                id: "login"
            }).html(tpl).appendTo("body");
            this.mask = $("<div>", {
                "class": "mask"
            }).appendTo("body");
            $(this.login).animate({
                top: "50%"
            }, 400);
            $(this.mask).animate({
                opacity: .3
            }, 400);
        },
        // 关闭
        close: function() {
            $(this.login).animate({
                top: -300
            }, 400, function() {
                $(this).remove();
            });
            $(this.mask).animate({
                opacity: 0
            }, 400, function() {
                $(this).remove();
            });
        },
        // 变换状态
        change: function(state) {
            var signin = $("#signin");
            var register = $("#register");
            if (state == "register") {
                signin.animate({
                    left: -330,
                    opacity: 0
                }, 300);
                register.animate({
                    left: 0,
                    opacity: 1
                }, 300);
            } else if (state == "signin") {
                signin.animate({
                    left: 0,
                    opacity: 1
                }, 300);
                register.animate({
                    left: 330,
                    opacity: 0
                }, 300);
            }
        },
        // 验证用户名
        checkUser: function() {
            var oUser = $("#user");
            var oMessage = oUser.next();
            var sUser = oUser.val();
            var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!sUser) {
                oMessage.html("请输入账号").parent().addClass("error");
                return false;
            }
            if (!re.test(sUser)) {
                oMessage.html("请输入E-mail格式").parent().addClass("error");
                return false;
            }
            oMessage.html("").parent().removeClass("error");
            return true;
        },
        // 验证密码
        checkPassword: function() {
            var oPassword = $("#password");
            var oMessage = oPassword.next();
            var sPassword = oPassword.val();
            if (!sPassword) {
                oMessage.html("请输入密码").parent().addClass("error");
                return false;
            }
            oMessage.html("").parent().removeClass("error");
            return true;
        },
        // 验证登陆
        checkLogin: function() {
            var _this = this;
            var oMessageUser = $("#message-user");
            var oMessagePassword = $("#message-password");
            var data = $("#signin").serialize();
            // 验证用户名
            var checkUserFlag = _this.checkUser();
            if (!checkUserFlag) {
                $("#user").focus();
                return false;
            }
            // 验证密码
            var checkPasswordFlag = _this.checkPassword();
            if (!checkPasswordFlag) {
                $("#password").focus();
                return false;
            }
            // 验证后端
            $.ajax({
                url: "./User/signin",
                data: data,
                type: "post",
                success: function(msg) {
                    if (msg.status == 1) {
                        console.log(msg);
                        _this.close();
                    } else if (msg.status == 0) {
                        if (msg.data == 0) {
                            oMessageUser.html("账号不存在").parent().addClass("error");
                        } else if (msg.data == 1) {
                            oMessagePassword.html("密码错误").parent().addClass("error");
                        }
                    }
                }
            });
        },
        // 验证注册E-mail
        checkRegUser: function() {
            var oUser = $("#reg-user");
            var oMessage = oUser.next();
            var sUser = oUser.val();
            var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!sUser) {
                oMessage.html("请输入E-mail").parent().addClass("error");
                return false;
            }
            if (!re.test(sUser)) {
                oMessage.html("E-mail格式不正确").parent().addClass("error");
                return false;
            }
            oMessage.html("").parent().removeClass("error");
            return true;
        },
        // 验证注册密码
        checkRegPassword: function() {
            var oPassword = $("#reg-password");
            var oMessage = oPassword.next();
            var sPassword = oPassword.val();
            if (!sPassword) {
                oMessage.html("请输入密码").parent().addClass("error");
                return false;
            }
            oMessage.html("").parent().removeClass("error");
            return true;
        },
        // 验证注册确认密码
        checkRegPasswordRepeat: function() {
            var oPassword = $("#reg-password-repeat");
            var oMessage = oPassword.next();
            var sPassword = oPassword.val();
            if (!sPassword) {
                oMessage.html("请输入确认密码").parent().addClass("error");
                return false;
            }
            oMessage.html("").parent().removeClass("error");
            return true;
        },
        // 验证密码是否一致
        checkPasswordSame: function() {
            var oPassword = $("#reg-password");
            var oPasswordRepeat = $("#reg-password-repeat");
            var sPassword = oPassword.val();
            var sPasswordRepeat = oPasswordRepeat.val();
            var oMessagePasswordRepeat = oPasswordRepeat.next();
            if (sPassword != sPasswordRepeat) {
                oMessagePasswordRepeat.html("密码不一致").parent().addClass("error");
                return false;
            }
            return true;
        },
        // 注册
        checkRegister: function() {
            var _this = this;
            var oMessageRegUser = $("#message-reg-user");
            var oMessageRegPassword = $("#message-reg-password");
            var oMessageRegPasswordRepeat = $("#message-reg-password-repeat");
            var data = $("#register").serialize();
            // 验证注册E-mail
            var checkRegUserFlag = _this.checkRegUser();
            if (!checkRegUserFlag) {
                $("#reg-user").focus();
                return false;
            }
            // 验证注册密码
            var checkRegPasswordFlag = _this.checkRegPassword();
            if (!checkRegPasswordFlag) {
                $("#reg-password").focus();
                return false;
            }
            // 验证注册确认密码
            var checkRegPasswordRepeatFlag = _this.checkRegPasswordRepeat();
            if (!checkRegPasswordRepeatFlag) {
                $("#reg-password-repeat").focus();
                return false;
            }
            // 验证密码是否一致
            var checkPasswordSameFlag = _this.checkPasswordSame();
            if (!checkPasswordSameFlag) {
                $("#reg-password-repeat").focus();
                return false;
            }
            // 注册请求
            $.ajax({
                url: "./User/register",
                data: data,
                type: "post",
                success: function(msg) {
                    console.log(msg);
                    if (msg.status == 1) {
                        $("#register input").val("");
                        _this.change("signin");
                        $("#user").focus();
                    } else if (msg.status == 0) {
                        if (msg.data == 1) {
                            oMessageRegUser.html("E-mail已被注册").parent().addClass("error");
                        } else if (msg.data == 2) {
                            oMessageRegPasswordRepeat.html("E-密码不一致").parent().addClass("error");
                        }
                    }
                }
            });
        },
        // 事件
        bind: function() {
            var _this = this;
            // 关闭事件
            $("#login-close").on("click", function() {
                _this.close();
            });
            // 切换至注册界面
            $("#go-register").on("click", function() {
                _this.change("register");
            });
            // 切换至登陆界面
            $("#go-signin").on("click", function() {
                _this.change("signin");
            });
            // 账号Blur
            $("#user").on("blur", this.checkUser);
            // 密码Blur
            $("#password").on("blur", this.checkPassword);
            // 点击按钮登陆
            $("#btn-login").on("click", function() {
                _this.checkLogin();
            });
            // 回车键登录
            $("#user, #password").on("keydown", function(ev) {
                if (ev.keyCode == 13) {
                    _this.checkLogin();
                }
            });
            // 注册账号Blur
            $("#reg-user").on("blur", this.checkRegUser);
            // 注册密码Blur
            $("#reg-password").on("blur", this.checkRegPassword);
            // 注册确认密码Blur
            $("#reg-password-repeat").on("blur", this.checkRegPasswordRepeat);
            // 注册
            $("#btn-register").on("click", function() {
                _this.checkRegister();
            });
        }
    };
    // 开放接口
    module.exports = {
        open: function() {
            login.open();
        }
    };
});

/**
 * Contextmenu模块
 */
define("build/ros/1.0.0/contextmenu-debug", [ "jquery-debug", "build/ros/1.0.0/app-debug", "build/ros/1.0.0/login-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var app = require("build/ros/1.0.0/app-debug");
    var contextmenu = {
        // 初始化
        init: function() {
            this.doc = $(document);
            this.obj = $("#contextmenu");
            this.bind();
        },
        // 显示右键菜单
        show: function(ev) {
            this.obj.fadeIn(100);
            var iWidth = this.obj.outerWidth(), iHeight = this.obj.outerHeight(), x = ev.clientX, y = ev.clientY, w = this.doc.width() - iWidth, h = this.doc.height() - iHeight;
            if (x > w) {
                this.obj.css("left", x - iWidth);
            } else {
                this.obj.css("left", x);
            }
            if (y > h) {
                this.obj.css("top", y - iHeight);
            } else {
                this.obj.css("top", y);
            }
        },
        // 事件
        bind: function() {
            var _this = this;
            // 右键调出菜单
            this.doc.on("contextmenu", function(ev) {
                _this.show(ev);
                return false;
            });
            // 桌面单击关闭菜单
            this.doc.on("click", function() {
                _this.obj.fadeOut(100);
            });
            // 横向排序
            $("#setAppX").on("click", function() {
                app.setAppSort("x");
                $(this).parent().parent().find("a").removeClass("on");
                $(this).addClass("on");
            });
            // 纵向排序
            $("#setAppY").on("click", function() {
                app.setAppSort("y");
                $(this).parent().parent().find("a").removeClass("on");
                $(this).addClass("on");
            });
        }
    };
    // 开放接口
    module.exports = {
        init: function() {
            contextmenu.init();
        }
    };
});

/**
 * Dialog模块
 */
define("build/ros/1.0.0/dialog-debug", [ "jquery-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var win = $(window), doc = $(document);
    var defaults = {
        icon: null,
        title: null,
        content: "Hello world : )",
        width: 300,
        height: 200,
        isLock: false,
        isDrag: true,
        zIndex: 9999
    };
    var rDialog = function(options) {
        this.settings = $.extend({}, defaults, options);
        this.init();
    };
    rDialog.prototype = {
        // 初始化
        init: function() {
            this.create();
            this.bind();
        },
        // 创建
        create: function() {
            var tpl = '<div class="dialog-head">' + '<div class="dialog-logo">' + '<img src="__IMG__/app/clover.png" class="dialog-logo-icon" />' + "</div>" + '<div class="dialog-title">' + this.settings.title + "</div>" + '<div class="dialog-handle">' + '<span class="dialog-minimize" title="最小化"></span>' + '<span class="dialog-maxres dialog-maximize" title="最大化" data-status="maximize"></span>' + //'<span class="dialog-restore" title="还原"></span>' +
            '<span class="dialog-close" title="关闭"></span>' + "</div>" + "</div>" + '<div class="dialog-content">' + this.settings.content + "</div>" + '<div class="dialog-foot"></div>';
            this.dialog = $('<div class="dialog"></div>').html(tpl);
            this.dialogContent = this.dialog.find(".dialog-content");
            this.dialogMinimize = this.dialog.find(".dialog-minimize");
            this.dialogMaxres = this.dialog.find(".dialog-maxres");
            //this.dialogMaximize = this.dialog.find('.dialog-maximize');
            //this.dialogRestore = this.dialog.find('.dialog-restore');
            this.dialogClose = this.dialog.find(".dialog-close");
            this.dialogWidth = this.settings.width + 2;
            this.dialogHeight = this.settings.height + 29;
            this.dialogContent.css({
                width: this.settings.width,
                height: this.settings.height
            });
            this.dialog.css({
                zIndex: this.settings.zIndex,
                width: this.settings.width,
                height: this.dialogHeight
            });
            this.setPosition();
            this.dialog.appendTo("body");
        },
        // 设置位置
        setPosition: function() {
            this.winWidth = win.width();
            this.winHeight = win.height();
            this.dialogLeft = (this.winWidth - this.dialogWidth) / 2;
            this.dialogTop = (this.winHeight - this.dialogHeight) / 2;
            this.dialog.css({
                left: this.dialogLeft,
                top: this.dialogTop
            });
        },
        // 最小化
        minimize: function() {},
        // 最大化
        maximize: function() {
            var _this = this;
            this.dialogMaxres.data("status", "restore");
            this.dialogMaxres.removeClass().addClass("dialog-restore");
            this.dialog.animate({
                left: 0,
                top: 0,
                width: this.winWidth - 2,
                height: this.winHeight - 2
            });
        },
        // 还原
        restore: function(obj) {
            var _this = this;
            this.dialogMaxres.data("status", "maximize");
            this.dialogMaxres.removeClass().addClass("dialog-maximize");
            this.dialog.animate({
                left: this.dialogLeft,
                top: this.dialogTop,
                width: this.settings.width,
                height: this.dialogHeight
            });
        },
        // 最大化、还原
        maxres: function(status) {
            switch (status) {
              case "maximize":
                this.maximize();
                break;

              case "restore":
                this.restore();
                break;
            }
        },
        // 关闭
        close: function() {
            var _this = this;
            this.dialog.animate({
                left: this.winWidth,
                top: 0,
                width: 0,
                height: 0,
                opacity: 0
            }, 500, function() {
                _this.dialog.remove();
            });
        },
        // 事件绑定
        bind: function() {
            var _this = this;
            win.on("resize", function() {
                _this.setPosition();
            });
            this.dialogMinimize.on("click", function() {});
            this.dialogMaxres.on("click", function() {
                var status = $(this).data("status");
                _this.maxres(status);
            });
            // this.dialogMaximize.on('click', function() {
            // _this.maximize($(this));
            // });
            // this.dialogRestore.on('click', function() {
            // alert(1)
            // _this.restore($(this));
            // });
            this.dialogClose.on("click", function() {
                _this.close();
            });
        }
    };
    var dialog = function(options) {
        new rDialog(options);
    };
    $.dialog = dialog;
    // 测试调用
    $.dialog({
        title: "我的博客",
        content: "我就是内容哟~"
    });
});
