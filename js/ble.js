var devices_box = null;
var BluetoothLowEnergy = (function () {
    var instance;
    var adapter = tizen.bluetooth.getLEAdapter();
    var gatt = 
 
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }
    
    
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();



BLINDCAP.ble = {
	init: function(){
		devices_box = BLINDCAP.pages.connect.elements.devices_box;
	},
	,
	devices: {
		selected: null,
		list: [],
		add: function(device){
			devices_box.instance.className = "popup";
			
			var deviceNode = document.createElement("div");
			deviceNode.className = "device";
			
			var deviceNameNode = document.createElement("div");
			deviceNameNode.className = "device-name";
			var textNameNode = document.createTextNode(device.name + ' ' + 'rssi:' + device.txpowerlevel);
			deviceNameNode.appendChild(textNameNode);
			
			var deviceMacNode = document.createElement("div");
			deviceMacNode.className = "device-mac";
			var textMacNode = document.createTextNode(device.address);
			deviceMacNode.appendChild(textMacNode);
			
			deviceNode.appendChild(deviceNameNode);
			deviceNode.appendChild(deviceMacNode);
			
			devices_box.instance.appendChild(deviceNode);
			console.log(deviceList.length);
		    deviceNode.addEventListener("click", function(){connectDevice(device)}, false);
		    BLE.devices.list.push(device);
		}
	},
	connect: {
		watchId: null,
		start: function(device){
			BLINDCAP.ble.scan.stop();
			devices_box.instance.className = "popup off";
			
			BLINDCAP.ble.devices.selected = device;
//			watchId = remoteDevice.addConnectStateChangeListener(connectionListener);

			BLINDCAP.ble.devices.selected.connect(BLINDCAP.ble.connect.success, BLINDCAP.ble.connect.fail);
			console.log(BLINDCAP.ble.devices.selected);
			

			BLINDCAP.pages.change("main");
		},
		success: function() {
			var device = BLINDCAP.ble.devices.selected; 
			console.log("Connected to the device: " + device.name + " [" + device.address + "]");
			BLINDCAP.ble.gatt.service = device.getService(device.uuids[0]);
			console.log(BLINDCAP.ble.gatt.service);
			console.log(BLINDCAP.ble.gatt.service.characteristics);
			BLINDCAP.ble.gatt.characteristic = BLINDCAP.ble.gatt.service.characteristics[1];
			console.log(BLINDCAP.ble.gatt.characteristic);
		},
		fail: function(error) {
			var device = BLINDCAP.ble.devices.selected; 
			console.log("Disconnected from the device " + device.name + " [" + device.address + "]");
		}
	},
	scan: {
		time: 15000,
		stop: function(){
			console.log("stop BLE scan");
			adapter.stopScan();
		},
		start: function(){
			console.log("start BLE scan");
			BLINDCAP.ble.devices.list = [];
			devices_box.instance.innerHTML = "";
			adapter.startScan(BLINDCAP.ble.scan.found);
			setTimeout(BLINCAP.ble.scan.stop, BLINDCAP.ble.scan.time);
		},
		found: function(device){
			console.log(device);

		   if (targetServiceUUIDs.indexOf(device.uuids[0].toLowerCase()) > -1) {
			   console.log("Found device " + device.name); 
			   BLINDCAP.ble.devices.add(device);
			   if(BLINDCAP.ble.devices.list.length > 2){
				   BLINDCAP.ble.scan.stop();
			   }
		   }

		}
		
	},
	
};
