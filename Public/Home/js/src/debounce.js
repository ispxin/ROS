/**
 * 防反跳、延迟函数的执行在函数最后一次调用时刻的 wait 毫秒之后
 */
define(function() {

return function(ct, func, wait, immediate) {
    var timeout, result;
    return function() {
        var context = ct, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate)
                result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
}

});