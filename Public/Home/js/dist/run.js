define("build/ros/1.0.0/run",["./app","jquery","./login","./contextmenu","./dialog"],function(a){a("./app").init(),a("./contextmenu").init(),a("./dialog")}),define("build/ros/1.0.0/app",["jquery","build/ros/1.0.0/login"],function(a,b,c){function d(a,b,c){var d,e;return function(){var f=g,h=arguments,i=function(){d=null,c||(e=a.apply(f,h))},j=c&&!d;return clearTimeout(d),d=setTimeout(i,b),j&&(e=a.apply(f,h)),e}}var e=a("jquery"),f=a("build/ros/1.0.0/login"),g={init:function(){this.sortType="y",this.win=e(window),this.iNow=0,this.oDesk=e("#desk"),this.oDeskContent=e("#desk-content"),this.aAppContent=this.oDeskContent.children(),this.oIndicator=e("#indicator"),this.aIndicator=this.oIndicator.children(),this.setDesk(),this.setAppSort(this.sortType),this.resizeDesk(),this.bind()},setDesk:function(){this.iWidth=this.win.width()-240,this.iHeight=this.win.height()-160,this.iLeft=this.win.width()-120,this.oDeskContent.css({width:this.iWidth,height:this.iHeight});for(var a=0;a<this.aAppContent.length;a++)a!=this.iNow?this.aAppContent.eq(a).css({width:this.iWidth,height:this.iHeight,left:-this.iLeft}):this.aAppContent.eq(a).css({width:this.iWidth,height:this.iHeight,left:0})},indicator:function(a){var b=a.index();a.addClass("active").siblings().removeClass("active"),b>this.iNow?(this.aAppContent.eq(b).css("left",-this.iWidth),this.aAppContent.eq(this.iNow).stop().animate({left:this.iLeft,opacity:0},600)):b<this.iNow&&(this.aAppContent.eq(b).css("left",this.iWidth),this.aAppContent.eq(this.iNow).stop().animate({left:-this.iLeft,opacity:0},600)),this.aAppContent.eq(b).stop().animate({left:0,opacity:1},600),this.iNow=b},setAppY:function(){var a=this.oDeskContent.children(),b=120,c=Math.floor(this.oDeskContent.height()/b),d=[];0==c&&(c=1),a.each(function(e){var f=a.eq(e).children();d.push([]),f.each(function(a){var g=b*Math.floor(a/c),h=b*(a%c);f.eq(a).animate({left:g,top:h},700),d[e].push([g,h])})})},setAppX:function(){var a=this.oDeskContent.children(),b=120,c=Math.floor(this.oDeskContent.width()/b),d=[];a.each(function(e){var f=a.eq(e).children();d.push([]),f.each(function(a){var g=b*Math.floor(a/c),h=b*(a%c);f.eq(a).animate({left:h,top:g},700),d[e].push([h,g])})})},setAppSort:function(a){this.sortType=a,"x"==a?this.setAppX():"y"==a&&this.setAppY()},resizeDesk:function(){var a=this,b=d(this.setDesk,100),c=d(this.setAppX,100),e=d(this.setAppY,100);this.win.on("resize",function(){b(),"x"==a.sortType?c():"y"==a.sortType&&e()})},bind:function(){var a=this;this.aIndicator.on("click",function(){a.indicator(e(this))}),e("#navbar-avatar").on("click",function(){f.open()})}};c.exports={init:function(){g.init()},setAppSort:function(a){g.setAppSort(a)}}}),define("build/ros/1.0.0/login",["jquery"],function(a,b,c){var d=a("jquery"),e='<div class="close" title="关闭" id="login-close"></div><div class="form-wraper"><form class="form" id="signin"><div class="header">ROS</div><div class="item"><input type="text" class="input" placeholder="账号" id="user" name="user" /><div class="message" id="message-user"></div></div><div class="item"><input type="password" class="input" placeholder="密码" id="password" name="password" /><div class="message" id="message-password"></div></div><div class="item"><button type="button" class="button" id="btn-login">登 录</button></div><div class="item"><div class="register-text clearfix"><span class="fl">我还没有账号，<a href="javascript:;" id="go-register">十秒钟注册</a></span><span class="fr"><a href="#">忘记密码？</a></span></div></div></form><form class="form" id="register"><div class="item"><input type="text" class="input" placeholder="E-mail" id="reg-user" name="user" /><div class="message" id="message-reg-user"></div></div><div class="item"><input type="password" class="input" placeholder="输入密码" id="reg-password" name="password" /><div class="message" id="message-reg-password"></div></div><div class="item"><input type="password" class="input" placeholder="确认密码" id="reg-password-repeat" name="passwordRepeat" /><div class="message" id="message-reg-password-repeat"></div></div><div class="item"><button type="button" class="button" id="btn-register">注 册</button></div><div class="item"><div class="register-text clearfix"><span class="fl">我已经有账号了，<a href="javascript:;" id="go-signin">马上登录</a></span><span class="fr"><a href="#">忘记密码？</a></span></div></div></form></div>',f={open:function(){this.create(),this.bind()},create:function(){this.login=d("<div>",{"class":"login",id:"login"}).html(e).appendTo("body"),this.mask=d("<div>",{"class":"mask"}).appendTo("body"),d(this.login).animate({top:"50%"},400),d(this.mask).animate({opacity:.3},400)},close:function(){d(this.login).animate({top:-300},400,function(){d(this).remove()}),d(this.mask).animate({opacity:0},400,function(){d(this).remove()})},change:function(a){var b=d("#signin"),c=d("#register");"register"==a?(b.animate({left:-330,opacity:0},300),c.animate({left:0,opacity:1},300)):"signin"==a&&(b.animate({left:0,opacity:1},300),c.animate({left:330,opacity:0},300))},checkUser:function(){var a=d("#user"),b=a.next(),c=a.val(),e=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return c?e.test(c)?(b.html("").parent().removeClass("error"),!0):(b.html("请输入E-mail格式").parent().addClass("error"),!1):(b.html("请输入账号").parent().addClass("error"),!1)},checkPassword:function(){var a=d("#password"),b=a.next(),c=a.val();return c?(b.html("").parent().removeClass("error"),!0):(b.html("请输入密码").parent().addClass("error"),!1)},checkLogin:function(){var a=this,b=d("#message-user"),c=d("#message-password"),e=d("#signin").serialize(),f=a.checkUser();if(!f)return d("#user").focus(),!1;var g=a.checkPassword();return g?(d.ajax({url:"./User/signin",data:e,type:"post",success:function(d){1==d.status?(console.log(d),a.close()):0==d.status&&(0==d.data?b.html("账号不存在").parent().addClass("error"):1==d.data&&c.html("密码错误").parent().addClass("error"))}}),void 0):(d("#password").focus(),!1)},checkRegUser:function(){var a=d("#reg-user"),b=a.next(),c=a.val(),e=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return c?e.test(c)?(b.html("").parent().removeClass("error"),!0):(b.html("E-mail格式不正确").parent().addClass("error"),!1):(b.html("请输入E-mail").parent().addClass("error"),!1)},checkRegPassword:function(){var a=d("#reg-password"),b=a.next(),c=a.val();return c?(b.html("").parent().removeClass("error"),!0):(b.html("请输入密码").parent().addClass("error"),!1)},checkRegPasswordRepeat:function(){var a=d("#reg-password-repeat"),b=a.next(),c=a.val();return c?(b.html("").parent().removeClass("error"),!0):(b.html("请输入确认密码").parent().addClass("error"),!1)},checkPasswordSame:function(){var a=d("#reg-password"),b=d("#reg-password-repeat"),c=a.val(),e=b.val(),f=b.next();return c!=e?(f.html("密码不一致").parent().addClass("error"),!1):!0},checkRegister:function(){var a=this,b=d("#message-reg-user"),c=(d("#message-reg-password"),d("#message-reg-password-repeat")),e=d("#register").serialize(),f=a.checkRegUser();if(!f)return d("#reg-user").focus(),!1;var g=a.checkRegPassword();if(!g)return d("#reg-password").focus(),!1;var h=a.checkRegPasswordRepeat();if(!h)return d("#reg-password-repeat").focus(),!1;var i=a.checkPasswordSame();return i?(d.ajax({url:"./User/register",data:e,type:"post",success:function(e){console.log(e),1==e.status?(d("#register input").val(""),a.change("signin"),d("#user").focus()):0==e.status&&(1==e.data?b.html("E-mail已被注册").parent().addClass("error"):2==e.data&&c.html("E-密码不一致").parent().addClass("error"))}}),void 0):(d("#reg-password-repeat").focus(),!1)},bind:function(){var a=this;d("#login-close").on("click",function(){a.close()}),d("#go-register").on("click",function(){a.change("register")}),d("#go-signin").on("click",function(){a.change("signin")}),d("#user").on("blur",this.checkUser),d("#password").on("blur",this.checkPassword),d("#btn-login").on("click",function(){a.checkLogin()}),d("#user, #password").on("keydown",function(b){13==b.keyCode&&a.checkLogin()}),d("#reg-user").on("blur",this.checkRegUser),d("#reg-password").on("blur",this.checkRegPassword),d("#reg-password-repeat").on("blur",this.checkRegPasswordRepeat),d("#btn-register").on("click",function(){a.checkRegister()})}};c.exports={open:function(){f.open()}}}),define("build/ros/1.0.0/contextmenu",["jquery","build/ros/1.0.0/app","build/ros/1.0.0/login"],function(a,b,c){var d=a("jquery"),e=a("build/ros/1.0.0/app"),f={init:function(){this.doc=d(document),this.obj=d("#contextmenu"),this.bind()},show:function(a){this.obj.fadeIn(100);var b=this.obj.outerWidth(),c=this.obj.outerHeight(),d=a.clientX,e=a.clientY,f=this.doc.width()-b,g=this.doc.height()-c;d>f?this.obj.css("left",d-b):this.obj.css("left",d),e>g?this.obj.css("top",e-c):this.obj.css("top",e)},bind:function(){var a=this;this.doc.on("contextmenu",function(b){return a.show(b),!1}),this.doc.on("click",function(){a.obj.fadeOut(100)}),d("#setAppX").on("click",function(){e.setAppSort("x"),d(this).parent().parent().find("a").removeClass("on"),d(this).addClass("on")}),d("#setAppY").on("click",function(){e.setAppSort("y"),d(this).parent().parent().find("a").removeClass("on"),d(this).addClass("on")})}};c.exports={init:function(){f.init()}}}),define("build/ros/1.0.0/dialog",["jquery"],function(a){var b=a("jquery"),c=b(window),d=(b(document),{icon:null,title:null,content:"Hello world : )",width:300,height:200,isLock:!1,isDrag:!0,zIndex:9999}),e=function(a){this.settings=b.extend({},d,a),this.init()};e.prototype={init:function(){this.create(),this.bind()},create:function(){var a='<div class="dialog-head"><div class="dialog-logo"><img src="__IMG__/app/clover.png" class="dialog-logo-icon" /></div><div class="dialog-title">'+this.settings.title+'</div><div class="dialog-handle"><span class="dialog-minimize" title="最小化"></span><span class="dialog-maxres dialog-maximize" title="最大化" data-status="maximize"></span><span class="dialog-close" title="关闭"></span></div></div><div class="dialog-content">'+this.settings.content+'</div><div class="dialog-foot"></div>';this.dialog=b('<div class="dialog"></div>').html(a),this.dialogContent=this.dialog.find(".dialog-content"),this.dialogMinimize=this.dialog.find(".dialog-minimize"),this.dialogMaxres=this.dialog.find(".dialog-maxres"),this.dialogClose=this.dialog.find(".dialog-close"),this.dialogWidth=this.settings.width+2,this.dialogHeight=this.settings.height+29,this.dialogContent.css({width:this.settings.width,height:this.settings.height}),this.dialog.css({zIndex:this.settings.zIndex,width:this.settings.width,height:this.dialogHeight}),this.setPosition(),this.dialog.appendTo("body")},setPosition:function(){this.winWidth=c.width(),this.winHeight=c.height(),this.dialogLeft=(this.winWidth-this.dialogWidth)/2,this.dialogTop=(this.winHeight-this.dialogHeight)/2,this.dialog.css({left:this.dialogLeft,top:this.dialogTop})},minimize:function(){},maximize:function(){this.dialogMaxres.data("status","restore"),this.dialogMaxres.removeClass().addClass("dialog-restore"),this.dialog.animate({left:0,top:0,width:this.winWidth-2,height:this.winHeight-2})},restore:function(){this.dialogMaxres.data("status","maximize"),this.dialogMaxres.removeClass().addClass("dialog-maximize"),this.dialog.animate({left:this.dialogLeft,top:this.dialogTop,width:this.settings.width,height:this.dialogHeight})},maxres:function(a){switch(a){case"maximize":this.maximize();break;case"restore":this.restore()}},close:function(){var a=this;this.dialog.animate({left:this.winWidth,top:0,width:0,height:0,opacity:0},500,function(){a.dialog.remove()})},bind:function(){var a=this;c.on("resize",function(){a.setPosition()}),this.dialogMinimize.on("click",function(){}),this.dialogMaxres.on("click",function(){var c=b(this).data("status");a.maxres(c)}),this.dialogClose.on("click",function(){a.close()})}};var f=function(a){new e(a)};b.dialog=f,b.dialog({title:"我的博客",content:"我就是内容哟~"})});