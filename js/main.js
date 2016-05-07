var MainPage = (function () {
    
    var init = function(){
    	console.log("init main");
    	page = document.querySelector('#main');
    	turn_button = document.querySelector('#button-turn');
		turn_button.addEventListener("touchstart", turnButtonTouchStart, false);
		turn_button.addEventListener("touchend", turnButtonTouchEnd, false);
		blue_circles = document.querySelector('#animation');
		is_turning = false;
    }

    var destroy = function(){
    	turn_button.removeEventListener("touchstart", turnButtonTouchStart);
		turn_button.removeEventListener("touchend", turnButtonTouchEnd);
		if(touchtimer) {
	       clearTimeout(touchtimer);
	       flagLock = false;
	    }
		if(turn_button_animation.timeout){
			clearTimeout(turn_button_animation.timeout);
		}
		if(blue_circles_animation.timeout){
			clearTimeout(blue_circles_animation.timeout);
		}
    }
    
    var page;
    var turn_button;
    var blue_circles;
    var is_turning = false;
    
    var turn_button_animation = {
		timeout: null,
		time: 400,
    }
 
    var turn = function(){
		console.log("turn!!");
		if (!is_turning){
			is_turning = true;
			turnButtonAnimationStart();
			BluetoothLowEnergy.gattWrite([1]);
			
			
			setTimeout(function(){
				BluetoothLowEnergy.gattWrite([0]);
				is_turning = false;
			}, 3000)
		}
	};
    
    var turnButtonSetTimeout = function(){
		turn_button_animation.timeout = setTimeout(turnButtonAnimationEnd, turn_button_animation.time);
	};
	
	var turnButtonAnimationStart =  function(){
		turn_button.className = "on";
		turnButtonSetTimeout();
	};
	
	var turnButtonAnimationEnd = function(){
		turn_button.className = "off";
	};
    
	var blue_circles_animation = {
		running: false,		
		start_id: 117,
		end_id: 161,
		actual_id: 117,
		time: 40,	
		timeout: null,
	};
	
	var blueCirclesSetTimeout = function(){
		blue_circles_animation.timeout = setTimeout(changeBlueCirclesAnimation, blue_circles_animation.time);
	};
	
	var startBlueCirclesAnimation = function(){
		blue_circles.className = "animation";
		blueCirclesSetTimeout();
	};
	
	var changeBlueCirclesAnimation = function(){
		blue_circles_animation.actual_id = (blue_circles_animation.actual_id < blue_circles_animation.end_id) ? blue_circles_animation.actual_id + 1 : blue_circles_animation.start_id;
		blue_circles.src = "images/blue_circles_00" + blue_circles_animation.actual_id + ".png";
		blueCirclesSetTimeout()
	};
	
	var endBlueCirclesAnimation = function(){
		blue_circles.className = "animation off";
		blue_circles_animation.actual_id = blue_circles_animation.start_id;
	    clearTimeout(blue_circles_animation.timeout);
	}    
	
	var touchtimer, 
    flagLock,
    is_long_click = false,
    touchduration = 500;
	
	var turnButtonLongClickListener = function() { 
		is_long_click = true;
//	    alert("Long Touch!!"); 
	    if (blue_circles_animation.running){
    		blue_circles_animation.running = false
    	    endBlueCirclesAnimation();
	    }
	};

	function turnButtonTouchStart(e) {
	    e.preventDefault();
	    console.log("touchStart");
	    
	    if(flagLock){
		return;
	    }
		
	   touchtimer = setTimeout(turnButtonLongClickListener, touchduration); 
	   flagLock = true;
	}
	
	function turnButtonTouchEnd() {
		console.log("touchEnd");
		console.log(touchtimer);
	    if (touchtimer){
	       clearTimeout(touchtimer);
	       touchtimer = null;
	       flagLock = false;
	    } 
	    if (!is_long_click){
	    	if (!blue_circles_animation.running){
	    		blue_circles_animation.running = true;
	    		startBlueCirclesAnimation();
	    	}
	    	turn();
	    }
    	
    	is_long_click = false;
	    
	}
    
    return {
    	init: init,
    	destroy: destroy,
        getPage: function(){return page;},
    };
})();



		

