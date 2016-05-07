var BLINDCAP = {
	pages: {
		change: function(newPage){
			if (BLINDCAP.pages.actual){
				BLINDCAP.pages.actual.className = "hidden";
			}
			BLINDCAP.pages.actual = BLINDCAP.pages.get(newPage);
			BLINDCAP.pages.actual.className = "";
			BLINDCAP.pages.get(newPage).init();
		},
		actual: null,
		get: function(page){
			return BLINDCAP.pages[page];
		}
	}
};

window.onload = function() {
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
            	BLINDCAP.ble.devices.selected.disconnect();
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    BLINDCAP.pages.change("connect");
};


var targetServiceUUIDs = ["629a0c20-0418-d8bc-e411-22a2d08a13fa", "969c692e-9cc2-4f99-8e70-c5a844400451"]
var targetCharacterUUIDs = ["fa138a01-a222-11e4-bcd8-1804200c9a62", "969c692e-9cc2-4f99-8e70-c5a844400451"]
