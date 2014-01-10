define(function(require) {
    
    // 加载全局配置文件
    window.GLOBAL = require('./global');
    
    // 加载jquery暴露到全局
    window.$ = require('jquery');

    // 加载cookie插件
    require('./cookie')($);
    
    // 加载login暴露到全局
    window.login = require('./login');
	
	// 加载Desk模块
	require('./desk').init();

	// console.log(seajs.cache);

});


