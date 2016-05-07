var ConnectPage = (function () {   
    
    var init = function(){
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
		if (status == "idle"){
			BluetoothLowEnergy.startScan();
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
    			break;
    		case "connect":
    			connect_message.innerHTML = "CONNECTING..."
				startConnectMessagePulse();
    			break;
    		case "stop_scan":
    			if(status != "connect"){
    				status = "idle";
    				connect_message.innerHTML = " ";
    				stopConnectMessagePulse();
    			}
    		default:
    			status = "idle";
				connect_message.innerHTML = " ";
				stopConnectMessagePulse();
    	}
    	status = newStatus
    }
 
    return {
    	init: init,
    	destroy: destroy,
        getPage: function(){return page;},
    	getDevicesBox: function(){return devices_box;},
        changeStatus: changeStatus
    };
})();
