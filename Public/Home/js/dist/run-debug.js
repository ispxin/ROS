define("build/ros/1.0.0/run-debug", [ "./global-debug", "jquery-debug", "./cookie-debug", "./login-debug", "./desk-debug", "./user-debug", "./popupmenu-debug", "./debounce-debug", "./dialog-debug", "./drag-debug", "./task-debug" ], function(require) {
    // 加载全局配置文件
    window.GLOBAL = require("./global-debug");
    // 加载jquery暴露到全局
    window.$ = require("jquery-debug");
    // 加载cookie插件
    require("./cookie-debug")($);
    // 加载login暴露到全局
    window.login = require("./login-debug");
    // 加载Desk模块
    require("./desk-debug").init();
});

/**
 * ROS配置参数
 */
define("build/ros/1.0.0/global-debug", [], {
    version: "v1.0",
    // 版本号
    validDate: 365,
    // Cookie有效期
    sortType: "y",
    // App排序方式 ( 参数 x : 横向排序 y : 纵向排序 )
    tpl: {}
});

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
define("build/ros/1.0.0/cookie-debug", [ "jquery-debug" ], function(require) {
    var $ = require("jquery-debug");
    return function($) {
        var pluses = /\+/g;
        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }
        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }
        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }
        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape...
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
            }
            try {
                // Replace server-side written pluses with spaces.
                // If we can't decode the cookie, ignore it, it's unusable.
                s = decodeURIComponent(s.replace(pluses, " "));
            } catch (e) {
                return;
            }
            try {
                // If we can't parse the cookie, ignore it, it's unusable.
                return config.json ? JSON.parse(s) : s;
            } catch (e) {}
        }
        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }
        var config = $.cookie = function(key, value, options) {
            // Write
            if (value !== undefined && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);
                if (typeof options.expires === "number") {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                return document.cookie = [ encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
                options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
            }
            // Read
            var result = key ? undefined : {};
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            var cookies = document.cookie ? document.cookie.split("; ") : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split("=");
                var name = decode(parts.shift());
                var cookie = parts.join("=");
                if (key && key === name) {
                    // If second argument (value) is a function it's a converter...
                    result = read(cookie, value);
                    break;
                }
                // Prevent storing a cookie that we couldn't decode.
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
        };
        config.defaults = {};
        $.removeCookie = function(key, options) {
            if ($.cookie(key) !== undefined) {
                // Must not alter options, thus extending a fresh object...
                $.cookie(key, "", $.extend({}, options, {
                    expires: -1
                }));
                return true;
            }
            return false;
        };
    };
});

/**
 * Login模块
 */
define("build/ros/1.0.0/login-debug", [], function(require, exports, module) {
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
            var username = $.cookie("ROS_username");
            if (username) {
                $("#user").val(username);
                $("#password").focus();
            } else {
                $("#user").focus();
            }
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
                this.waggle();
                return false;
            }
            // 验证密码
            var checkPasswordFlag = _this.checkPassword();
            if (!checkPasswordFlag) {
                $("#password").focus();
                this.waggle();
                return false;
            }
            // 验证后端
            $.ajax({
                url: CONFIG.WEBURL + "index.php/User/signin",
                data: data,
                type: "post",
                success: function(msg) {
                    if (msg.status == 1) {
                        location.reload();
                    } else if (msg.status == 0) {
                        if (msg.data == 0) {
                            oMessageUser.html("账号不存在").parent().addClass("error");
                            _this.waggle();
                        } else if (msg.data == 1) {
                            oMessagePassword.html("密码错误").parent().addClass("error");
                            _this.waggle();
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
                this.waggle();
                return false;
            }
            // 验证注册密码
            var checkRegPasswordFlag = _this.checkRegPassword();
            if (!checkRegPasswordFlag) {
                $("#reg-password").focus();
                this.waggle();
                return false;
            }
            // 验证注册确认密码
            var checkRegPasswordRepeatFlag = _this.checkRegPasswordRepeat();
            if (!checkRegPasswordRepeatFlag) {
                $("#reg-password-repeat").focus();
                this.waggle();
                return false;
            }
            // 验证密码是否一致
            var checkPasswordSameFlag = _this.checkPasswordSame();
            if (!checkPasswordSameFlag) {
                $("#reg-password-repeat").focus();
                this.waggle();
                return false;
            }
            // 注册请求
            $.ajax({
                url: CONFIG.WEBURL + "index.php/User/register",
                data: data,
                type: "post",
                success: function(msg) {
                    if (msg.status == 1) {
                        $("#register input").val("");
                        _this.change("signin");
                        $("#user").val(msg.data.user);
                        $("#password").focus();
                    } else if (msg.status == 0) {
                        if (msg.data == 1) {
                            oMessageRegUser.html("E-mail已被注册").parent().addClass("error");
                            _this.waggle();
                        } else if (msg.data == 2) {
                            oMessageRegPasswordRepeat.html("E-密码不一致").parent().addClass("error");
                            _this.waggle();
                        }
                    }
                }
            });
        },
        waggle: function() {
            var iNow = 0;
            var timer = null;
            var arr = [ -155, -145, -154, -146, -153, -147, -152, -148, -151, -149, -150 ];
            clearInterval(timer);
            timer = setInterval(function() {
                $("#login").css("margin-left", arr[iNow]);
                iNow++;
                if (iNow == arr.length) {
                    clearInterval(timer);
                }
            }, 30);
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
 * Desk 模块
 */
define("build/ros/1.0.0/desk-debug", [ "build/ros/1.0.0/user-debug", "build/ros/1.0.0/popupmenu-debug", "build/ros/1.0.0/login-debug", "build/ros/1.0.0/debounce-debug", "build/ros/1.0.0/dialog-debug", "build/ros/1.0.0/drag-debug", "build/ros/1.0.0/task-debug" ], function(require, exports, module) {
    var user = require("build/ros/1.0.0/user-debug"), popupmenu = require("build/ros/1.0.0/popupmenu-debug"), debounce = require("build/ros/1.0.0/debounce-debug"), dialog = require("build/ros/1.0.0/dialog-debug"), task = require("build/ros/1.0.0/task-debug");
    var $window = $(window), $document = $(document), $body = $("body");
    var desk = {
        // 初始化
        init: function() {
            // 设置Cookie初始值
            $.cookie("ROS_desk", 1);
            if (!$.cookie("ROS_sortType")) {
                this.sortType = GLOBAL.sortType;
                $.cookie("ROS_sortType", GLOBAL.sortType, {
                    expires: GLOBAL.validDate
                });
            } else {
                this.sortType = $.cookie("ROS_sortType");
            }
            this.iNow = 0;
            this.oDesk = $("#desk");
            this.oDeskContent = $("#desk-content");
            this.oNavbar = $("#navbar");
            this.oIndicator = $("#indicator");
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
        setDesk: function() {
            this.iWidth = $window.width() - 240;
            this.iHeight = $window.height() - 160;
            this.iLeft = $window.width() - 120;
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
        // 创建App
        getApp: function() {
            var _this = this;
            $.ajax({
                url: CONFIG.WEBURL + "index.php/Index/getApp",
                type: "get",
                async: false
            }).done(function(appData) {
                var html = _this.createAppHtml(appData.data);
                _this.oDeskContent.append(html);
                _this.aAppContent = _this.oDeskContent.children();
            });
        },
        // 生成App html
        createAppHtml: function(data) {
            var html = "";
            $.each(data, function(i) {
                html += '<ul class="app-content">';
                $.each(data[i], function(j) {
                    var item = data[i][j];
                    if (item !== null) {
                        html += '<li title="' + item.title + '" class="app-item" data-id="' + item.id + '" data-index="' + j + '" data-type="' + item.type + '" data-title="' + item.title + '" data-icon="' + item.icon + '" data-url="' + item.url + '" data-width="' + item.width + '" data-height="' + item.height + '" data-ismax="' + item.isMax + '">' + '<div class="app-icon">' + '<img src="' + item.icon + '">' + "</div>" + '<div class="app-name">' + "<span><i>" + item.title + "</i></span>" + "</div>" + "</li>";
                    }
                });
                html += '<li class="app-item" data-type="add"><div class="app-icon"><span class="app-add"></span></div><div class="app-name"><span><i>添加应用</i></span></div></li></ul>';
            });
            return html;
        },
        // 设置Navbar位置
        setNavbar: function() {
            this.oNavbar.css({
                left: ($window.width() - 240) / 2,
                top: 10,
                display: "block"
            });
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
            // 设置当前屏幕
            $.cookie("ROS_desk", ++index);
        },
        // 设置App纵向
        setAppY: function() {
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
                    aApp.eq(j).animate({
                        left: iLeft,
                        top: iTop
                    }, 700);
                });
            });
        },
        // 设置App横向
        setAppX: function() {
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
                    aApp.eq(j).animate({
                        left: iLeft,
                        top: iTop
                    }, 700);
                });
            });
        },
        // 设置App排序方式
        setAppSort: function(type) {
            $.cookie("ROS_sortType", type, {
                expires: GLOBAL.validDate
            });
            if (type == "x") {
                this.setAppX();
            } else if (type == "y") {
                this.setAppY();
            }
        },
        // 碰撞检测
        bump: function(obj1, obj2) {
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
        jl: function(obj1, obj2) {
            var a = obj1.offset().left - obj2.offset().left;
            var b = obj1.offset().top - obj2.offset().top;
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        },
        // 计算距离最近的App
        appNear: function(app) {
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
        appMove: function() {},
        // Resize事件
        resizeDesk: function() {
            var _this = this;
            var setDeskDebounce = debounce(this, this.setDesk, 100);
            var setAppXDebounce = debounce(this, this.setAppX, 100);
            var setAppYDebounce = debounce(this, this.setAppY, 100);
            $window.on("resize", function() {
                setDeskDebounce();
                if ($.cookie("ROS_sortType") == "x") {
                    setAppXDebounce();
                } else if ($.cookie("ROS_sortType") == "y") {
                    setAppYDebounce();
                }
            });
        },
        // App打开
        appOpen: function(obj) {
            var appData = obj.data();
            $.ros.dialog({
                id: appData.id,
                icon: appData.icon,
                title: appData.title,
                url: appData.url,
                width: appData.width,
                height: appData.height,
                isMax: appData.ismax
            });
        },
        // 删除应用
        appDel: function(app) {
            var _this = this;
            var data = {
                appid: app.data("id"),
                type: 1
            };
            $.ajax({
                url: CONFIG.WEBURL + "index.php/App/delApp",
                type: "post",
                data: data,
                success: function(msg) {
                    if (msg.status == 1) {
                        app.remove();
                        _this.setAppSort($.cookie("ROS_sortType"));
                    }
                }
            });
        },
        // 移动应用
        appMoveDesk: function(app, deskId) {
            var _this = this;
            var data = {
                appid: app.data("id"),
                desk: deskId + 1,
                type: 1
            };
            $.ajax({
                url: CONFIG.WEBURL + "index.php/App/moveDeskApp",
                type: "post",
                data: data,
                success: function(msg) {
                    if (msg.status == 1) {
                        // 获取到添加应用对象
                        var oAddApp = _this.oDeskContent.children().eq(deskId).children().eq(-1);
                        // 将app插入到添加应用前一位
                        $(oAddApp).before(app);
                        // 重新排序
                        _this.setAppSort($.cookie("ROS_sortType"));
                    }
                }
            });
        },
        // 添加应用
        appAdd: function() {
            $.ros.dialog({
                id: "add",
                icon: "/ros/Public/Home/images/app/app-add.png",
                title: "应用市场",
                url: "./index.php/App",
                width: 800,
                height: 500,
                isMax: false
            });
        },
        // 锁定桌面
        lockDesk: function() {
            var _this = this;
            var wallpaperSrc = $("#wallpaper img").attr("src");
            var username = $.cookie("ROS_username");
            var tpl = '<div class="lock-desk" id="lock-desk">' + '<div class="lock-desk-avatar">' + '<img src="/ros/Public/Home/images/desktop/avatar.gif" />' + "</div>" + '<div class="lock-desk-user">' + username + "</div>" + '<div class="lock-desk-form">' + '<input type="hidden" name="user" id="user" value="' + username + '" />' + '<input type="password" class="lock-desk-input" name="password" id="password" />' + '<div class="lock-desk-enter" title="进入" id="enterDesk"></div>' + "</div>" + "</div>" + '<div style="position:absolute; left:0; top:0; width:100%; height:100%; z-index:1;"></div>' + '<img src="' + wallpaperSrc + '" style="position:absolute; left:0; top:0; z-index:0; width:100%; height:100%;">';
            this.oLock = $("<div>").css({
                display: "none",
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 9999
            }).html(tpl).appendTo("body");
            $("#enterDesk").on("click", function() {
                var data = {
                    user: $("#user").val(),
                    password: $("#password").val()
                };
                _this.unlockDesk(data);
            });
            $("#password").on("keyup", function(ev) {
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
                        user: $("#user").val(),
                        password: $("#password").val()
                    };
                    _this.unlockDesk(data);
                }
            });
            user.lock().done(function(msg) {
                _this.oLock.fadeIn(600);
                $("#password").focus();
            });
            $document.on("click.lockFocus", function() {
                $("#password").focus();
            });
        },
        // 解锁桌面
        unlockDesk: function(data) {
            var _this = this;
            $.ajax({
                url: CONFIG.WEBURL + "index.php/User/signin",
                type: "post",
                data: data,
                success: function(msg) {
                    if (msg.status == 1) {
                        _this.oLock.fadeOut(300, function() {
                            $(this).remove();
                            $document.off("click.lockFocus");
                        });
                    } else if (msg.status == 0) {
                        _this.lockWaggle();
                        $("#password").focus();
                    }
                }
            });
        },
        // 锁屏晃动
        lockWaggle: function() {
            var iNow = 0;
            var timer = null;
            var arr = [ -116, -106, -115, -107, -114, -108, -113, -109, -112, -110, -111 ];
            clearInterval(timer);
            timer = setInterval(function() {
                $("#lock-desk").css("margin-left", arr[iNow]);
                iNow++;
                if (iNow == arr.length) {
                    clearInterval(timer);
                }
            }, 30);
        },
        // 账号设置窗口
        userSetting: function() {
            $.ros.dialog({
                id: "userSetting",
                icon: "/ros/Public/Home/images/app/user.png",
                title: "账号设置",
                url: "",
                width: 500,
                height: 400,
                isMax: false
            });
        },
        // 事件
        bind: function() {
            var _this = this;
            // 桌面单击隐藏右键菜单
            $body.on("click", function() {
                $(".contextmenu").hide();
            });
            // 阻止桌面右键默认事件
            $body.on("contextmenu", function() {
                return false;
            });
            // 桌面右键菜单
            this.oDesk.on("contextmenu", function(ev) {
                var contextmenu = popupmenu.contextmenu(_this, dialog);
                $(".contextmenu").hide();
                popupmenu.show(ev, contextmenu);
                return false;
            });
            // App右键菜单
            this.oDeskContent.on("contextmenu", 'li[data-type="app"]', function(ev) {
                var appmenu = popupmenu.appmenu(_this, $(this));
                $(".contextmenu").hide();
                popupmenu.show(ev, appmenu);
                return false;
            });
            // Navbar拖拽
            $.ros.drag(true, this.oNavbar);
            // 指示器切换
            this.aIndicator.on("click", function() {
                _this.indicator($(this));
            });
            // Login模块
            $("#navbar-avatar").on("click", function() {
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
            this.oDeskContent.on("click", 'li[data-type="add"]', function() {
                _this.appAdd();
            });
            // 临时App打开
            this.oDeskContent.on("click", 'li[data-type="app"]', function() {
                _this.appOpen($(this));
            });
            $("#loading").fadeOut(500);
        }
    };
    // 开放接口
    module.exports = {
        init: function() {
            desk.init();
        },
        lockDesk: function() {
            desk.lockDesk();
        },
        setAppSort: function(type) {
            desk.setAppSort(type);
        },
        appOpen: function(obj) {
            desk.appOpen(obj);
        },
        appDel: function(obj) {
            desk.appDel(obj);
        },
        appAdd: function() {
            desk.appAdd();
        }
    };
});

/**
 * User模块
 */
define("build/ros/1.0.0/user-debug", [], function(require) {
    var user = {
        // 检查登陆状态
        checkLogin: function() {
            var result = false;
            var status = $.cookie("ROS_status");
            if (status == 1) {
                result = true;
            }
            return result;
        },
        // 退出
        logout: function() {
            $.getJSON("./index.php/User/logout", function(msg) {
                if (msg.status == 1) {
                    location.reload();
                }
            });
        },
        // 锁定
        lock: function() {
            return $.ajax({
                url: "./index.php/User/logout",
                type: "get"
            });
        }
    };
    return user;
});

/**
 * menu模块
 */
define("build/ros/1.0.0/popupmenu-debug", [ "build/ros/1.0.0/user-debug", "build/ros/1.0.0/login-debug" ], function(require, exports, module) {
    var $document = $(document), user = require("build/ros/1.0.0/user-debug"), login = require("build/ros/1.0.0/login-debug");
    var popupmenu = {
        // 桌面右键菜单
        contextmenu: function(desk, dialog) {
            var isLogin = user.checkLogin();
            var tpl = '<div class="contextmenu-style">' + '<ul class="contextmenu-ul">' + '<li class="contextmenu-li">' + '<a href="javascript:;" class="contextmenu-a" id="mShowDesk">显示桌面</a>' + "</li>" + '<li class="contextmenu-li">' + '<a href="javascript:;" class="contextmenu-a" id="mCloseAllApp">关闭所有窗口</a>' + "</li>" + '<li class="contextmenu-li">' + '<span class="line"></span>' + "</li>" + '<li class="contextmenu-li contextsubmenu">' + '<a href="#" class="contextmenu-a">添加<span class="icon-arrow"></span></a>' + '<div class="contextsubmenu-wrap">' + '<ul class="contextsubmenu-ul contextmenu-style">' + '<li class="contextsubmenu-li">' + '<a href="#" class="contextsubmenu-a" id="mAppAdd">添加应用<span class="icon icon-app"></span></a>' + "</li>" + '<li class="contextsubmenu-li">' + '<a href="#" class="contextsubmenu-a">新建文件夹<span class="icon icon-folder"></span></a>' + "</li>" + "</ul>" + "</div>" + "</li>" + '<li class="contextmenu-li">' + '<span class="line"></span>' + "</li>" + '<li class="contextmenu-li">' + '<a href="#" class="contextmenu-a">更换壁纸</a>' + "</li>" + '<li class="contextmenu-li">' + '<a href="#" class="contextmenu-a">系统设置</a>' + "</li>" + '<li class="contextmenu-li contextsubmenu">' + '<a href="#" class="contextmenu-a">排序方式<span class="icon-arrow"></span></a>' + '<div class="contextsubmenu-wrap">' + '<ul class="contextsubmenu-ul contextmenu-style">' + '<li class="contextsubmenu-li">' + '<a href="javascript:;" class="contextsubmenu-a ' + ($.cookie("ROS_sortType") == "x" ? "on" : "") + ' " id="mSetAppX">横向排列<span class="icon icon-current"></span></a>' + "</li>" + '<li class="contextsubmenu-li">' + '<a href="javascript:;" class="contextsubmenu-a ' + ($.cookie("ROS_sortType") == "y" ? "on" : "") + ' " id="mSetAppY">纵向排列<span class="icon icon-current"></span></a>' + "</li>" + "</ul>" + "</div>" + "</li>" + '<li class="contextmenu-li">' + '<span class="line"></span>' + "</li>" + (isLogin ? '<li class="contextmenu-li"><a href="javascript:;" class="contextmenu-a" id="mLockDesk">锁定</a></li>' : "") + (isLogin ? '<li class="contextmenu-li"><a href="javascript:;" class="contextmenu-a" id="mLogout">注销</a></li>' : "") + (isLogin ? "" : '<li class="contextmenu-li"><a href="javascript:;" class="contextmenu-a" id="mLogin">登录</a></li>') + "</ul>" + "</div>";
            if (!GLOBAL.tpl.contextmenu) {
                GLOBAL.tpl.contextmenu = $('<div class="contextmenu"></div>').html(tpl).appendTo("body");
                // 横向排序
                $("#mSetAppX").on("click", function() {
                    desk.setAppSort("x");
                    $(this).parent().parent().find("a").removeClass("on");
                    $(this).addClass("on");
                });
                // 纵向排序
                $("#mSetAppY").on("click", function() {
                    desk.setAppSort("y");
                    $(this).parent().parent().find("a").removeClass("on");
                    $(this).addClass("on");
                });
                // 显示桌面
                $("#mShowDesk").on("click", function() {
                    if ($.isEmptyObject(dialog.dialogList)) {
                        return;
                    }
                    $.each(dialog.dialogList, function(i, n) {
                        n.hide();
                    });
                });
                // 关闭所有应用
                $("#mCloseAllApp").on("click", function() {
                    if ($.isEmptyObject(dialog.dialogList)) {
                        return;
                    }
                    $.each(dialog.dialogList, function(i, n) {
                        n.remove();
                    });
                });
                // 添加应用
                $("#mAppAdd").on("click", function() {
                    desk.appAdd();
                });
                // 锁定桌面
                $("#mLockDesk").on("click", function() {
                    desk.lockDesk();
                });
                // 注销
                $("#mLogout").on("click", function() {
                    user.logout();
                });
                // 登录
                $("#mLogin").on("click", function() {
                    login.open();
                });
            }
            return GLOBAL.tpl.contextmenu;
        },
        // App右键菜单
        appmenu: function(desk, app) {
            var tpl = '<div class="contextmenu-style">' + '<ul class="contextmenu-ul">' + '<li class="contextmenu-li">' + '<a class="contextmenu-a" href="javascript:;" id="mAppOpen">打开应用</a>' + "</li>" + '<li class="contextmenu-li">' + '<span class="line"></span>' + "</li>" + '<li class="contextmenu-li contextsubmenu">' + '<a class="contextmenu-a" href="#">移动应用到<span class="icon-arrow"></span></a>' + '<div class="contextsubmenu-wrap">' + '<ul class="contextsubmenu-ul contextmenu-style" id="mScreenMove">' + '<li class="contextsubmenu-li">' + '<a class="contextsubmenu-a" href="javascript:;" data-desk="0">桌面1</a>' + "</li>" + '<li class="contextsubmenu-li">' + '<a class="contextsubmenu-a" href="javascript:;" data-desk="1">桌面2</a>' + "</li>" + '<li class="contextsubmenu-li">' + '<a class="contextsubmenu-a" href="javascript:;" data-desk="2">桌面3</a>' + "</li>" + '<li class="contextsubmenu-li">' + '<a class="contextsubmenu-a" href="javascript:;" data-desk="3">桌面4</a>' + "</li>" + '<li class="contextsubmenu-li">' + '<a class="contextsubmenu-a" href="javascript:;" data-desk="4">桌面5</a>' + "</li>" + "</ul>" + "</div>" + "</li>" + '<li class="contextmenu-li">' + '<a class="contextmenu-a" href="javascript:;" id="mAppDel">卸载应用</a>' + "</li>" + "</ul>" + "</div>";
            if (!GLOBAL.tpl.appmenu) {
                GLOBAL.tpl.appmenu = $('<div class="contextmenu"></div>').html(tpl).appendTo("body");
            }
            $("#mAppOpen").off("click").on("click", function() {
                desk.appOpen(app);
            });
            $("#mAppDel").off("click").on("click", function() {
                desk.appDel(app);
            });
            $("#mScreenMove li").each(function(i) {
                if (i == $.cookie("ROS_desk") - 1) {
                    $(this).find("a").addClass("disabled");
                } else {
                    $(this).find("a").removeClass("disabled");
                }
            });
            $("#mScreenMove").off("click").on("click", "a:not(.disabled)", function() {
                var deskId = $(this).data("desk");
                desk.appMoveDesk(app, deskId);
            });
            return GLOBAL.tpl.appmenu;
        },
        // Task右键菜单
        taskmenu: function(dialog) {
            var tpl = '<div class="contextmenu-style">' + '<ul class="contextmenu-ul">' + '<li class="contextmenu-li">' + '<a class="contextmenu-a" href="javascript:;" id="mMinDialog">最小化</a>' + "</li>" + '<li class="contextmenu-li">' + '<a class="contextmenu-a" href="javascript:;" id="mMaxresDialog">最大化</a>' + "</li>" + '<li class="contextmenu-li">' + '<span class="line"></span>' + "</li>" + '<li class="contextmenu-li">' + '<a class="contextmenu-a" href="javascript:;" id="mCloseDialog">关闭窗口</a>' + "</li>" + "</ul>" + "</div>";
            if (!GLOBAL.tpl.menu) {
                GLOBAL.tpl.menu = $('<div class="contextmenu"></div>').html(tpl).appendTo("body");
            }
            var mMaxresDialog = $("#mMaxresDialog"), mMinDialog = $("#mMinDialog");
            if (dialog.o.isMax) {
                mMaxresDialog.html(dialog.maxed ? "还原" : "最大化");
                mMaxresDialog.off("click").on("click", function() {
                    dialog.maxres();
                });
                mMaxresDialog.parent().show();
            } else {
                mMaxresDialog.parent().hide();
            }
            mMinDialog.html(dialog.opened ? "最小化" : "打开");
            mMinDialog.off("click").on("click", function() {
                if (dialog.opened) {
                    dialog.hide();
                } else {
                    dialog.show();
                }
            });
            $("#mCloseDialog").off("click").on("click", function() {
                dialog.remove();
            });
            return GLOBAL.tpl.menu;
        },
        // 显示菜单
        show: function(ev, obj) {
            var iWidth = obj.outerWidth(), iHeight = obj.outerHeight(), x = ev.clientX, y = ev.clientY, w = $document.width() - iWidth, h = $document.height() - iHeight;
            if (x > w) {
                obj.css("left", x - iWidth);
            } else {
                obj.css("left", x);
            }
            if (y > h) {
                obj.css("top", y - iHeight);
            } else {
                obj.css("top", y);
            }
            obj.fadeIn(100);
        }
    };
    // 开放接口
    return popupmenu;
});

/**
 * 防反跳、延迟函数的执行在函数最后一次调用时刻的 wait 毫秒之后
 */
define("build/ros/1.0.0/debounce-debug", [], function() {
    return function(ct, func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = ct, args = arguments;
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
    };
});

/**
 * Dialog模块
 */
define("build/ros/1.0.0/dialog-debug", [ "build/ros/1.0.0/drag-debug", "build/ros/1.0.0/task-debug", "build/ros/1.0.0/popupmenu-debug", "build/ros/1.0.0/user-debug", "build/ros/1.0.0/login-debug" ], function(require, exports, module) {
    require("build/ros/1.0.0/drag-debug");
    require("build/ros/1.0.0/task-debug");
    var $window = $(window), $document = $(document), dialogList = {};
    var defaults = {
        icon: null,
        title: "",
        url: "",
        width: 300,
        height: 200,
        isDrag: 1,
        isMin: 1,
        isMax: 1
    };
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
                nowDialog.__task.setActive();
            }
            nowDialog.zIndexUp();
            return;
        }
        this.__init();
        this.__center();
        // 绑定关闭事件
        this.__$("close").on("click", function() {
            _this.close();
        });
        // 绑定resize事件
        $window.on("resize", function() {
            _this.__resize();
        });
        // 绑定最小化事件
        if (this.o.isMin) {
            this.__$("min").on("click", function() {
                _this.hide();
            });
        }
        // 绑定最大化，还原事件
        if (this.o.isMax) {
            this.__$("maxres").on("click", function() {
                _this.maxres($(this));
            });
        }
        // 绑定拖拽事件
        if (this.o.isDrag) {
            $.ros.drag(false, this.__$("title"), this.__dialog);
            this.__$("title").on("mousedown", function() {
                // 置顶窗口
                _this.zIndexUp();
                // 设置为活动任务
                _this.__task.setActive();
                // 解决拖拽bug
                var iframeMask = $('<div class="iframeMask"></div>').appendTo(_this.__$("content"));
                $document.on("mouseup", function() {
                    iframeMask.remove();
                });
            });
        }
        this.show();
        this.__openTask();
    }
    Dialog.prototype = {
        __init: function() {
            this.__dialog = $("<div>").css({
                display: "none",
                position: "absolute",
                left: 0,
                top: 0,
                bottom: "auto",
                right: "auto",
                zIndex: Dialog.zIndex,
                margin: 0,
                padding: 0,
                outline: 0,
                border: "0 none",
                background: "transparent"
            }).html(this.__createTmplate()).appendTo($("#desk-dialog"));
            // 将dialog对象存入队列
            dialogList[this.o.id] = this;
        },
        // 显示
        show: function() {
            this.__dialog.show();
            this.zIndexUp();
            this.opened = true;
        },
        // 隐藏
        hide: function() {
            this.__dialog.hide();
            this.__task.cancelActive();
            this.opened = false;
        },
        // 显示，隐藏切换
        toggle: function() {
            var dialogCount = this.__getDialogCount();
            if (dialogCount > 1) {
                this.show();
                this.__task.setActive();
            } else if (dialogCount == 1) {
                if (this.opened) {
                    this.hide();
                } else {
                    this.show();
                    this.__task.setActive();
                }
            }
        },
        // 最大化，还原
        maxres: function() {
            if (!this.maxed) {
                this.__maximize();
            } else {
                this.__restore();
            }
        },
        // 关闭（销毁）
        close: function() {
            var _this = this;
            this.__dialog.animate({
                left: $window.width(),
                top: 0,
                width: 0,
                height: 0,
                opacity: 0
            }, 500, function() {
                _this.remove();
            });
        },
        // 销毁
        remove: function() {
            // 删除队列标记
            delete dialogList[this.o.id];
            // 关闭任务
            this.__task.close();
            // 清除DOM
            this.__dialog.remove();
        },
        // 置顶浮层
        zIndexUp: function() {
            var index = ++Dialog.zIndex;
            this.__dialog.css("zIndex", index);
        },
        // 判断是否创建过
        __isCreate: function(id) {
            var result = false;
            $.each(dialogList, function(i) {
                if (id == i) {
                    result = true;
                }
            });
            return result;
        },
        // 处理内容
        __processUrl: function() {
            return '<iframe i="iframe" name="dialog-' + this.o.id + '" src="' + this.o.url + '" frameborder="no" allowtransparency="true" scrolling="auto" width="' + this.o.width + '" height="' + this.o.height + '"></iframe>';
        },
        // 创建模板
        __createTmplate: function() {
            var tmplate = '<div i="dialog" class="dialog">' + '<div i="head" class="dialog-head">' + (this.o.icon ? '<div class="dialog-logo"><img src="' + this.o.icon + '" class="dialog-logo-icon" /></div>' : "") + '<div i="title" class="dialog-title">' + (this.o.title ? this.o.title : "") + "</div>" + '<div class="dialog-handle">' + (this.o.isMin ? '<span i="min" class="dialog-minimize" title="最小化"></span>' : "") + (this.o.isMax ? '<span i="maxres" class="dialog-maxres dialog-maximize" title="最大化"></span>' : "") + '<span i="close" class="dialog-close" title="关闭"></span>' + "</div>" + "</div>" + '<div i="content" class="dialog-content">' + this.__processUrl() + "</div>" + "</div>";
            return tmplate;
        },
        // 居中
        __center: function() {
            var dialog = this.__dialog, wWidth = $window.width(), wHeight = $window.height(), dWidth = dialog.width(), dHeight = dialog.height(), dLeft = (wWidth - dWidth) / 2, dTop = (wHeight - dHeight) / 2;
            dialog.css({
                left: dLeft,
                top: dTop
            });
        },
        // 拖动
        __resize: function() {
            if (this.maxed) {
                this.__$("iframe").css({
                    width: $window.width() - 2,
                    height: $window.height() - 31
                });
            }
        },
        // 选择器
        __$: function(i) {
            return this.__dialog.find("[i=" + i + "]");
        },
        // 最大化
        __maximize: function() {
            this.zIndexUp();
            var oldLeft = this.__dialog.offset().left, oldTop = this.__dialog.offset().top;
            this.__dialog.data({
                left: oldLeft,
                top: oldTop
            });
            this.__dialog.animate({
                left: 0,
                top: 0
            }, 500);
            this.__$("iframe").animate({
                width: $window.width() - 2,
                height: $window.height() - 31
            }, 500);
            this.__$("maxres").removeClass("dialog-maximize").addClass("dialog-restore").attr("title", "还原");
            this.maxed = true;
        },
        // 还原
        __restore: function() {
            this.__dialog.animate({
                left: this.__dialog.data("left"),
                top: this.__dialog.data("top")
            }, 500);
            this.__$("iframe").animate({
                width: this.o.width,
                height: this.o.height
            }, 500);
            this.__$("maxres").removeClass("dialog-restore").addClass("dialog-maximize").attr("title", "最大化");
            this.maxed = false;
        },
        // 打开任务
        __openTask: function() {
            this.__task = $.ros.task({
                dialog: this,
                id: this.o.id,
                title: this.o.title,
                icon: this.o.icon
            });
        },
        // 返回当前dialog队列数量
        __getDialogCount: function() {
            var count = 0;
            $.each(dialogList, function() {
                count++;
            });
            return count;
        }
    };
    // 当前叠加高度
    Dialog.zIndex = 1024;
    var dialog = function(options) {
        return new Dialog(options);
    };
    if (!$.ros) {
        $.ros = {};
    }
    $.ros.dialog = dialog;
    module.exports = {
        dialogList: dialogList
    };
});

/**
 * Drag模块
 */
define("build/ros/1.0.0/drag-debug", [], function(require, exports, module) {
    var $document = $(document);
    function Drag(lock, dragObj, controlObj) {
        this.lock = lock;
        this.dragObj = dragObj;
        this.controlObj = controlObj || dragObj;
        this.bind();
    }
    Drag.prototype = {
        // 鼠标按下
        down: function(ev) {
            var _this = this;
            this.disX = ev.clientX - this.controlObj.position().left;
            this.disY = ev.clientY - this.controlObj.position().top;
            this.docWidth = $document.width();
            this.docHeight = $document.height();
            this.controlWidth = this.controlObj.outerWidth();
            this.controlHeight = this.controlObj.outerHeight();
            if (this.setCapture) {
                this.setCapture();
            }
            $document.on("mousemove.drag", function(ev) {
                _this.move(ev);
            });
            $document.on("mouseup.drag", function() {
                _this.up();
            });
        },
        // 鼠标移动
        move: function(ev) {
            var L = ev.clientX - this.disX;
            var T = ev.clientY - this.disY;
            if (this.lock) {
                if (L < 0) {
                    L = 0;
                } else if (L > this.docWidth - this.controlWidth) {
                    L = this.docWidth - this.controlWidth;
                }
                if (T < 0) {
                    T = 0;
                } else if (T > this.docHeight - this.controlHeight) {
                    T = this.docHeight - this.controlHeight;
                }
            }
            this.controlObj.css({
                left: L,
                top: T
            });
        },
        // 鼠标弹起
        up: function() {
            $document.off("mousemove.drag");
            $document.off("mouseup.drag");
            if (this.dragObj.releaseCapture) {
                this.dragObj.releaseCapture();
            }
        },
        // 事件绑定
        bind: function() {
            var _this = this;
            this.dragObj.on("mousedown", function(ev) {
                _this.down(ev);
                ev.preventDefault();
            });
        }
    };
    var drag = function(lock, dragObj, controlObj) {
        new Drag(lock, dragObj, controlObj);
    };
    if (!$.ros) {
        $.ros = {};
    }
    $.ros.drag = drag;
});

/**
 * Task模块
 */
define("build/ros/1.0.0/task-debug", [ "build/ros/1.0.0/popupmenu-debug", "build/ros/1.0.0/user-debug", "build/ros/1.0.0/login-debug" ], function(require, exports, module) {
    var $window = $(window), $document = $(document), popupmenu = require("build/ros/1.0.0/popupmenu-debug"), taskList = {};
    var Task = function(options) {
        // 是否为活动任务
        this.active = false;
        this.dialog = options.dialog;
        this.id = options.id;
        this.title = options.title;
        this.icon = options.icon;
        this.__init();
    };
    Task.prototype = {
        // 初始化
        __init: function() {
            var _this = this;
            this.__createTask();
            this.__task.on("click", function() {
                _this.dialog.toggle();
            });
            this.__task.on("contextmenu", function(ev) {
                var taskmenu = popupmenu.taskmenu(_this.dialog);
                $(".contextmenu").hide();
                popupmenu.show(ev, taskmenu);
                return false;
            });
        },
        // 创建任务
        __createTask: function() {
            var tpl = '<div class="task-app-icon"><img src="' + this.icon + '"></div><div class="task-app-title">' + this.title + "</div>";
            this.__task = $("<li>").html(tpl).appendTo($("#task-content-inner"));
            // 将任务对象存入队列
            taskList[this.id] = this;
            this.setActive();
        },
        // 设为活动标记
        setActive: function() {
            var _this = this;
            $.each(taskList, function(i, n) {
                if (_this.id == i) {
                    _this.__task.addClass("active");
                    _this.active = true;
                } else {
                    n.cancelActive();
                }
            });
        },
        // 取消活动标记
        cancelActive: function() {
            this.__task.removeClass("active");
            this.active = false;
        },
        // 关闭任务
        close: function() {
            // 删除队列标记
            delete taskList[this.id];
            // 清空任务DOM
            this.__task.remove();
        }
    };
    var task = function(options) {
        return new Task(options);
    };
    if (!$.ros) {
        $.ros = {};
    }
    $.ros.task = task;
});
