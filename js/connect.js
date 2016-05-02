window.onload = function() {
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    var connectPage = document.querySelector('#connect');
    connectPage.addEventListener("click", function() {
    });
    
    var BLEconnect = document.querySelector("#BLEconnect");
    BLEconnect.addEventListener("click", connectBLE, false);
};

var adapter = tizen.bluetooth.getLEAdapter();
var remoteDevice = null;
var watchId;

var connectionListener = 
{
   onconnected: function(device) 
   {
      console.log("Connected to the device: " + device.name + " [" + device.address + "]");
   },
   ondisconnected: function(device) 
   {
      console.log("Disconnected from the device " + device.name + " [" + device.address + "]");
   }
};

function onDeviceFound(device)
{
   if (remoteDevice === null) 
   {
      remoteDevice = device;
      console.log("Found device " + device.name + ". Connecting...");

      watchId = remoteDevice.addConnectStateChangeListener(connectionListener);

      remoteDevice.connect();
   }

   adapter.stopScan();
}

var connectBLE = function(){
	console.log("start connect BLE scan");
	adapter.startScan(onDeviceFound);

};



