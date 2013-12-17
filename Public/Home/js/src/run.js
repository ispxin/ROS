define(function(require) {
    
    // 加载全局GLOBAL对象
    window.GLOBAL = require('./global');
    
    // 加载jquery暴露到全局
    window.$ = require('jquery');
	
	// 加载App模块
	require('./app').init();
	
	// 加载Contextmenu模块
	require('./contextmenu').init();

	// console.log(seajs.cache);

});