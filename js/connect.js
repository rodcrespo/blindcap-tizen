var ConnectPage = (function () {   
    
	var development_mode;
	
    var init = function(){
    	development_mode = BLINDCAP.development_mode;
    	console.log("init connect");
    	page = document.querySelector('#connect');
    	scan_button = document.querySelector('#connect-bg-3');
		scan_button.addEventListener("click", scanButtonClickListener);
		devices_box = document.querySelector('#device-list');
		connect_message = document.querySelector('#connect-message');
		startConnectBackgroundAnimation();
    }
    
    var destroy = function(){
		scan_button.removeEventListener("click", scanButtonClickListener);
		stopConnectMessagePulse();
		endConnectBackgroundAnimation();
		changeStatus("idle");
		document.querySelector('#connect-bg-' + connect_background_animation.start_id ).className = "background";
		document.querySelector('#connect-bg-' + connect_background_animation.end_id ).className = "background off";
    }
    
    var page;
    var scan_button;
	var devices_box;
	var connect_message;
	var status = "idle";
    
	var scanButtonClickListener = function() {
		if (development_mode){
			BLINDCAP.pages.change("main");
		} else {
			if (status != "scan" && status != "connect"){
				BluetoothLowEnergy.startScan();
			}
		}
    };
    
    var startConnectMessagePulse = function() {
    	
    };
    
    var stopConnectMessagePulse = function() {
    	
    };
    
    var changeStatus = function(newStatus){
    	switch(newStatus){
    		case "scan":
    			connect_message.innerHTML = "SCANNING..."
    			startConnectMessagePulse();
    	    	status = newStatus
    			break;
    		case "connect":
    			connect_message.innerHTML = "CONNECTING..."
				startConnectMessagePulse();
    	    	status = newStatus
    			break;
    		case "stop_scan":
    			if(status != "connect"){
    				status = "idle";
    				connect_message.innerHTML = " ";
    				stopConnectMessagePulse();
    		    	status = newStatus
    			}
    			break;
    		default:
    			status = "idle";
				connect_message.innerHTML = " ";
				stopConnectMessagePulse();
		    	status = newStatus

    	}
    }
    
	var connect_background_animation = {
			running: false,		
			start_id: 0,
			end_id: 3,
			actual_id: 0,
			time: 400,	
			timeout: null,
		};
	
	var connectBackgroundSetTimeout = function(){
		connect_background_animation.timeout = setTimeout(changeConnectBackgroundAnimation, connect_background_animation.time);
	};
	
	var startConnectBackgroundAnimation = function(){
		connect_background_animation.running = true;
		block_turn = true;
		connectBackgroundSetTimeout();
	};
	
	var changeConnectBackgroundAnimation = function(){
		if (connect_background_animation.actual_id < connect_background_animation.end_id) {
			if (connect_background_animation.actual_id > connect_background_animation.start_id) {
	    		document.querySelector('#connect-bg-' + (connect_background_animation.actual_id - 1)).className = "background off";
	    	};
			connect_background_animation.actual_id++; 
	    	document.querySelector('#connect-bg-' + connect_background_animation.actual_id).className = "background";
	    	connectBackgroundSetTimeout();
		} else {
			document.querySelector('#connect-bg-' + (connect_background_animation.actual_id - 1)).className = "background off";
			endConnectBackgroundAnimation();
		}
	}
	
	var endConnectBackgroundAnimation = function(){
		connect_background_animation.running = false;
		connect_background_animation.actual_id = connect_background_animation.start_id
		if(connect_background_animation.timeout){
			clearTimeout(connect_background_animation.timeout);
		}
	};
 
    return {
    	init: init,
    	destroy: destroy,
        getPage: function(){return page;},
    	getDevicesBox: function(){return devices_box;},
        changeStatus: changeStatus
    };
})();
