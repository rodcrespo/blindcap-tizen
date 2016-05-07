var connect_page = null;
var scan_button = null;

BLINDCAP.pages.connect = {
	instance: function(){
		return document.querySelector('#connect');
	},
	init: function(){
		connect_page = BLINDCAP.pages.connect;		
		scan_button = connect_page.elements.scan_button;
		scan_button.listeners.set();
	},
	elements: {
		devices_box: {
			instance: function(){
				return document.querySelector('#device-list');
			},
		},
		scan_button: {
			instance: function(){
				return document.querySelector('#BLEscan');
			},
			listeners: {
				set: function(){
					scan_button.addEventListener("click", scan_button.listeners.click);
				},
				click: function() {
					startScan();
			    }
			}
			
		}
	}
};
