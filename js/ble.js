var BluetoothLowEnergy = (function() {

	var development_mode;
	
	var adapter;

	var init = function() {
		development_mode = BLINDCAP.development_mode;
		adapter = function() {
			if (!development_mode) {
				return tizen.bluetooth.getLEAdapter();
			} else {
				return "no adapter";
			}
		}();
	};

	var device_list = [];
	var address_list = [];
	var selected_device;
	var watch_id = null;
	var scan_time = 15000;

	var addDevice = function(device) {

		ConnectPage.getDevicesBox().className = "popup";

		var deviceNode = document.createElement("div");
		deviceNode.className = "device";

		var deviceNameNode = document.createElement("div");
		deviceNameNode.className = "device-name";
		var textNameNode = document.createTextNode(device.name + ' ' + 'rssi:'
				+ (device.txpowerlevel ? device.txpowerlevel : 'unknown'));
		deviceNameNode.appendChild(textNameNode);

		var deviceMacNode = document.createElement("div");
		deviceMacNode.className = "device-mac";
		var textMacNode = document.createTextNode(device.address);
		deviceMacNode.appendChild(textMacNode);

		deviceNode.appendChild(deviceNameNode);
		deviceNode.appendChild(deviceMacNode);

		ConnectPage.getDevicesBox().appendChild(deviceNode);
		deviceNode.addEventListener("click", function() {
			connect(device)
		}, false);
		device_list.push(device);
		address_list.push(device.address);
	};

	var connectionSuccess = function() {
		var device = selected_device;
		console.log("Connected to the device: " + device.name + " ["
				+ device.address + "]");
		gatt_service = device.getService(device.uuids[0]);
		gatt_characteristic = gatt_service.characteristics[gatt_service.characteristics.length - 1];

		BLINDCAP.pages.change("main");

	};

	var connectionFailure = function(error) {
		var device = selected_device;
		console.log("Disconnected from the device " + device.name + " ["
				+ device.address + "]");
	};

	var connectionListener = 
	{
	   onconnected: function(device) 
	   {
	      console.log("Connected to the device: " + device.name + " [" + device.address + "]");
	   },
	   ondisconnected: function(device) 
	   {
	      console.log("Disconnected from the device " + device.name + " [" + device.address + "]");
	      selected_device.removeConnectStateChangeListener(watch_id);
	      connect(selected_device);
	   }
	};
	
	var connect = function(device) {
		stopScan();

		ConnectPage.changeStatus("connect");

		ConnectPage.getDevicesBox().className = "popup off";

		selected_device = device;
		watch_id = selected_device.addConnectStateChangeListener(connectionListener);

		device.connect(connectionSuccess, connectionFailure);
		console.log(device);

	};

	var stopScan = function() {
		console.log("stop BLE scan");
		adapter.stopScan();
		ConnectPage.changeStatus("stop_scan");
	};

	var startScan = function() {
		console.log("start BLE scan");
		ConnectPage.changeStatus("scan");
		device_list = [];
		address_list = [];
		ConnectPage.getDevicesBox().innerHTML = "";
		adapter.startScan(deviceFound);
		setTimeout(stopScan, scan_time);
	};

	var deviceFound = function(device) {
		console.log(device);

		if ((targetServiceUUIDs.indexOf(device.uuids[0].toLowerCase()) > -1) && (address_list.indexOf(device.address) == -1)) {
			console.log("Found device " + device.name);
			addDevice(device);
			if (device_list.length > 2) {
				stopScan();
			}
		}

	};

	var gattWriteSuccess = function() {
		// TODO
	};

	var gattWriteFailure = function() {
		// TODO
	};

	var gattWrite = function(value) {
		if (!development_mode){
			gatt_characteristic.writeValue(value, gattWriteSuccess, gattWriteFailure);
		}
	};

	var getSelectedDevice = function() {
		return selected_device;
	}
	
	var disconnect = function(){
		selected_device.removeConnectStateChangeListener(watch_id);
		selected_device.disconnect();
	}

	return {
		init : init,
		startScan : startScan,
		disconnect: disconnect,
		gattWrite : gattWrite,
		getSelectedDevice : getSelectedDevice
	};
})();
