define(function(require) {

	// 加载App模块
	require('./app').init();
	
	// 加载Contextmenu模块
	require('./contextmenu').init();

	// console.log(seajs.cache);
	
	require('./dialog');

});