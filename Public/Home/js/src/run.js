define(function(require) {
    
    // 加载全局配置文件
    window.GLOBAL = require('./global');
    
    // 创建全局模板对象
    window.TPL = {};
    
    // 加载jquery暴露到全局
    window.$ = require('jquery');
	
	// 加载Desk模块
	require('./desk').init();

	// console.log(seajs.cache);

});