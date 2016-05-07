var main_page = null;
var blue_circles = null;
var turn_button = null;


BLINDCAP.pages.main = {
	instance: function(){
		return document.querySelector('#main');
	},
	init: function(){
		main_page = BLINDCAP.pages.main;
		blue_circles = main_page.elements.blue_circles;
		turn_button = main_page.elements.turn_button;
		turn_button.listeners.set();
	},
	elements: {
		blue_circles: {
			instance: function(){
				return document.querySelector('#animation');
			},
			animation: {
				running: false,
				start_id: 117,
				end_id: 161,
				actual_id: 117,
				time: 40,	
				timeout: null,
				setTimeout: function(){
					blue_circles.animation.timeout = setTimeout(blue_circles.animation.change, blue_circles.animation.time);
				},
				start: function(){
					blue_circles.instance.className = "animation";
					blue_circles.animation.setTimeout();
				},
				change: function(){
					blue_circles.animation.actual_id = (blue_circles.animation.actual_id < blue_circles.animation.end_id) ? blue_circles.animation.actual_id + 1 : blue_circles.animation.start_id;
					blue_circles.instance.src = "images/blue_circles_00" + blue_circles.animation.actual_id + ".png";
					blue_circles.animation.setTimeout();
				},
				end: function(){
					blue_circles.instance.className = "";
					blue_circles.animation.actual_id = blue_circles.animation.start_id;
					//TODO remove Timeout
				}
			}
		},
		turn_button: {
			instance: function(){
				return document.querySelector('#button-turn');
			},
			animation: {
				timeout: null,
				time: 400,
				setTimeout: function(){
					turn_button.animation.timeout = setTimeout(turn_button.animation.end, turn_button.animation.time);
				},
				start: function(){
					turn_button.instance.className = "on";
					turn_button.animation.setTimeout();
				},
				end: function(){
					turn_button.instance.className = "off";
				}
			},
			turn: function(){
				console.log("turn!!");

				turn_button.animation.start();
				BLINDCAP.ble.gatt.characteristic.writeValue([1], BLINDCAP.ble.gatt.write.success, BLINDCAP.ble.gatt.write.fail);
				setTimeout(function(){
					BLINDCAP.ble.gatt.characteristic.writeValue([0], BLINDCAP.ble.gatt.write.success, BLINDCAP.ble.gatt.write.fail);
				}, 3000)
			},
			listeners: {
				set: function(){
					turn_button.addEventListener("click", turn_button.listeners.click);
				},
				click: function() {
			    	turn();
			    }
			}
			
		}
	}
};

