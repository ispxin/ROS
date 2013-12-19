/**
 * Drag模块
 */
define(function(require, exports, module) {

    var $document = $(document);
    
    var Drag = function(dragObj, controlObj) {
    	
    	this.dragObj = dragObj;
    	this.controlObj = controlObj || dragObj;
    	
    	this.bind();
    }
    
    Drag.prototype = {
    	
    	// 鼠标按下
    	down : function(ev) {

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
	        
	        $document.on('mousemove.drag', function(ev) {
	        	_this.move(ev);
	        });
	        
	        $document.on('mouseup.drag', function() {
    			_this.up();
    		});
    		
    	},
    	
    	// 鼠标移动
    	move : function(ev) {

    		var L = ev.clientX - this.disX;
            var T = ev.clientY - this.disY;

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

            this.controlObj.css({
            	left : L,
            	top : T
            });
    		
    	},
    	
    	// 鼠标弹起
    	up : function() {

    		$document.off('mousemove.drag');
    		$document.off('mouseup.drag');
    		
    		if (this.dragObj.releaseCapture) {
                this.dragObj.releaseCapture();
            }
    		
    	},
    	
    	// 事件绑定
    	bind : function() {
    		
    		var _this = this;
    		
    		this.dragObj.on('mousedown', function(ev) {
    			
    			_this.down(ev);

    			return false;
    			
    		});

    	}
    	
    }
    
    var drag = function(dragObj, controlObj) {
    	new Drag(dragObj, controlObj);
    }
    
    if (!$.ros) {
    	$.ros = {}
    }
    
    $.ros.drag = drag;

});

