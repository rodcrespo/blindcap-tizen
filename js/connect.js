var initConnect = function(){    
    BLEscan = document.querySelector("#BLEscan");
    BLEscan.addEventListener("click", startScan, false);
    deviceListDiv = document.querySelector('#device-list');
};

pages.init.connect = initConnect;

var BLEscan;
var deviceListDiv;
var deviceList = [];
var scanTime = 15000;



function onDeviceFound(device)
{
	console.log(device);

   if (targetServiceUUIDs.indexOf(device.uuids[0].toLowerCase()) > -1) {
	   console.log("Found device " + device.name); 
	   addDeviceToList(device);
	   if(deviceList.length > 2){
		   stopScan();
	   }
   }

}


var connectSuccess = function() {
      console.log("Connected to the device: " + remoteDevice.name + " [" + remoteDevice.address + "]");
      gattService = remoteDevice.getService(remoteDevice.uuids[0]);
      console.log(gattService);
      console.log(gattService.characteristics);
      property = gattService.characteristics[1];
      console.log(property);
};
var connectFail = function(error) {
      console.log("Disconnected from the device " + remoteDevice.name + " [" + remoteDevice.address + "]");
};

var addDeviceToList = function(device){
	deviceListDiv.className = "popup";
	
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
	
	deviceListDiv.appendChild(deviceNode);
	console.log(deviceList.length);
    deviceNode.addEventListener("click", function(){connectDevice(device)}, false);
    deviceList.push(device);
}

var stopScan = function(){
	console.log("stop BLE scan");
	adapter.stopScan();
}

var startScan = function(){
	console.log("start BLE scan");
	deviceList = [];
	deviceListDiv.innerHTML = "";
	adapter.startScan(onDeviceFound);
	setTimeout(stopScan, scanTime);
};

var connectDevice = function(device){
	stopScan();
	deviceListDiv.className = "popup off";
	
	remoteDevice = device;
//	watchId = remoteDevice.addConnectStateChangeListener(connectionListener);

	remoteDevice.connect(connectSuccess, connectFail);
	console.log(remoteDevice);
	

	changePage("main");
}


