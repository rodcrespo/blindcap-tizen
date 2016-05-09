var BLINDCAP = {
	pages: {
		change: function(newPage){
			console.log("changing");
			if (BLINDCAP.pages.actual){
				var oldPage = BLINDCAP.pages.actual;
				oldPage.getPage().className = "page out";
				oldPage.destroy();
				
				BLINDCAP.pages.actual = BLINDCAP.pages.get(newPage);
				BLINDCAP.pages.actual.init();

				setTimeout(function(){
					oldPage.getPage().className = "page hidden";
					BLINDCAP.pages.actual.getPage().className = "page";
				}, 500);
				
			} else{
				BLINDCAP.pages.actual = BLINDCAP.pages.get(newPage);
				BLINDCAP.pages.actual.init();
				BLINDCAP.pages.actual.getPage().className = "page";

			}
			
		},
		actual: null,
		get: function(page){
			return BLINDCAP.pages[page];
		},
		main: MainPage,
		connect: ConnectPage
	},
	ble: BluetoothLowEnergy,
	development_mode: true
};


window.onload = function() {
	BluetoothLowEnergy.init();
	
    document.addEventListener('tizenhwkey', function(e) {
    	console.log(e.keyName);
        if (e.keyName === "back") {
        	console.log("back");
        	if (BLINDCAP.pages.actual === BLINDCAP.pages.main){
            	if (!BLINDCAP.development_mode){
            		BluetoothLowEnergy.disconnect();
            	}
        	    BLINDCAP.pages.change("connect");
        	} else{
	            try {
	                window.tizen.application.getCurrentApplication().exit();
	            } catch (ignore) {}
        	}
        }
    });
    
    BLINDCAP.pages.change("connect");
};


var targetServiceUUIDs = ["629a0c20-0418-d8bc-e411-22a2d08a13fa", "969c692e-9cc2-4f99-8e70-c5a844400451"]
var targetCharacterUUIDs = ["fa138a01-a222-11e4-bcd8-1804200c9a62", "969c692e-9cc2-4f99-8e70-c5a844400451"]

