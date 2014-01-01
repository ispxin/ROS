/**
 * User模块
 */
define(function(require) {
	
	var user = {
		
		// 检查登陆状态
		checkLogin : function() {
			var result = false;
			var status = $.cookie('ROS_status');
			if ( status == 1 ) {
				result = true;
			}
			return result;
		},
		
		// 退出
		logout : function() {
		    
		    $.getJSON('./index.php/User/logout', function(msg) {
		        if (msg.status == 1) {
                    location.reload();
                }
		    });
			
		},
		
		// 锁定
		lock : function() {
		    return $.ajax({
		        url : './index.php/User/logout',
		        type : 'get'
		    });
		}
		
	}

	return user;
	
});