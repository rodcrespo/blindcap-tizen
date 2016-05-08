var ConnectPage = (function () {   
    
	var development_mode;
	
    var init = function(){
    	development_mode = BLINDCAP.development_mode;
    	console.log("init connect");
    	page = document.querySelector('#connect');
    	scan_button = document.querySelector('#BLEscan');
		scan_button.addEventListener("click", scanButtonClickListener);
		devices_box = document.querySelector('#device-list');
		connect_message = document.querySelector('#connect-message');		
    }
    
    var destroy = function(){
		scan_button.removeEventListener("click", scanButtonClickListener);
		stopConnectMessagePulse;
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
 
    return {
    	init: init,
    	destroy: destroy,
        getPage: function(){return page;},
    	getDevicesBox: function(){return devices_box;},
        changeStatus: changeStatus
    };
})();
