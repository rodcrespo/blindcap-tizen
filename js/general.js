window.onload = function() {
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
            	remoteDevice.disconnect();
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    pages.connect = document.querySelector('#connect');
    pages.main = document.querySelector('#main');
    changePage("connect");
};


var adapter = tizen.bluetooth.getLEAdapter();
var pages = {}
pages.init = {};

var targetServiceUUIDs = ["629a0c20-0418-d8bc-e411-22a2d08a13fa", "969c692e-9cc2-4f99-8e70-c5a844400451"]
var targetCharacterUUIDs = ["fa138a01-a222-11e4-bcd8-1804200c9a62", "969c692e-9cc2-4f99-8e70-c5a844400451"]
var remoteDevice = null;
var watchId;
var gattService;
var property;


var changePage = function(newPage){
	if (pages.actual){
		pages.actual.className = "hidden";
	}
	pages.actual = pages[newPage];
	pages.actual.className = "";
	pages.init[newPage]();
};