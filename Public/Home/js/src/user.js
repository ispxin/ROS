/**
 * User模块
 */
define(function(require) {
	
	var user = {
		
		checkLogin : function() {
			var result = false;
			var status = $.cookie('ROS_status');
			if ( status == 1 ) {
				result = true;
			}
			return result;
		},
		
		logout : function() {
			
			$.ajax({
				url : './index.php/User/logout',
	    		type : 'get',
	    		success : function(msg) {
					if (msg.status == 1) {
						location.reload();
					}
	    		}
			});
			
		}
		
	}

	return user;
	
});