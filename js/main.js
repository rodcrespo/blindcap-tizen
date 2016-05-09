var MainPage = (function () {
    
	var development_mode;
	
    var init = function(){
    	development_mode = BLINDCAP.development_mode;
    	console.log("init main");
    	page = document.querySelector('#main');
    	turn_button = document.querySelector('#button-turn');
		turn_button.addEventListener("touchstart", turnButtonTouchStart, false);
		turn_button.addEventListener("touchend", turnButtonTouchEnd, false);
		blue_circles = document.querySelector('#animation');
		block_turn = false;
		startCirclesTurnAnimation();
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
		endTurnButtonAnimation();
		endBlueCirclesAnimation();
		endCirclesTurnAnimation();
		document.querySelector('#circles-bg-' + circles_turn_animation.start_id ).className = "background";
		document.querySelector('#circles-bg-' + (circles_turn_animation.end_id - 1)).className = "background off";
		document.querySelector('#circles-bg-' + circles_turn_animation.end_id ).className = "background off";
    }
    
    var page;
    var turn_button;
    var blue_circles;
    var block_turn = false;
    
    var turn_button_animation = {
    	running: false,		
		timeout: null,
		time: 100,
    }
 
    var turn = function(){
		console.log("turn!!");
		if (!block_turn){
			block_turn = true;
			startTurnButtonAnimation();
			BluetoothLowEnergy.gattWrite([1]);
			
			setTimeout(function(){
				BluetoothLowEnergy.gattWrite([0]);
				block_turn = false;
			}, 3000)
		}
	};
    
    var turnButtonSetTimeout = function(){
		turn_button_animation.timeout = setTimeout(endTurnButtonAnimation, turn_button_animation.time);
	};
	
	var startTurnButtonAnimation =  function(){
//		turn_button.className = "on";
		turn_button_animation.running = true;
		document.querySelector('#circles-bg-' + circles_turn_animation.end_id ).src = "images/circles_turn/circles_turn_7_pulse.png";
//		turnButtonSetTimeout();
	};
	
	var endTurnButtonAnimation = function(){
//		turn_button.className = "off";
		turn_button_animation.running = false;
		document.querySelector('#circles-bg-' + circles_turn_animation.end_id ).src = "images/circles_turn/circles_turn_7.png";
		if(turn_button_animation.timeout){
			clearTimeout(turn_button_animation.timeout);
		}
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
		blue_circles.className = "animation" + (turn_button_animation.running ? " gray" : "");
		blue_circles_animation.actual_id = (blue_circles_animation.actual_id < blue_circles_animation.end_id) ? blue_circles_animation.actual_id + 1 : blue_circles_animation.start_id;
		blue_circles.src = "images/blue_circles/blue_circles_00" + blue_circles_animation.actual_id + ".png";
		blueCirclesSetTimeout()
	};
	
	var endBlueCirclesAnimation = function(){
		blue_circles.className = "animation off";
		blue_circles_animation.actual_id = blue_circles_animation.start_id;
		blue_circles_animation.running = false;
		blue_circles.src = "images/blue_circles/blue_circles_00" + blue_circles_animation.actual_id + ".png";
		if(blue_circles_animation.timeout){
			clearTimeout(blue_circles_animation.timeout);
		}
	};   
	
	
	var circles_turn_animation = {
			running: false,		
			start_id: 0,
			end_id: 7,
			actual_id: 0,
			time: 140,	
			timeout: null,
		};
	
	var circlesTurnSetTimeout = function(){
		circles_turn_animation.timeout = setTimeout(changeCirclesTurnAnimation, circles_turn_animation.time);
	};
	
	var startCirclesTurnAnimation = function(){
		circles_turn_animation.running = true;
		block_turn = true;
		circlesTurnSetTimeout();
	};
	
	var changeCirclesTurnAnimation = function(){
		if (circles_turn_animation.actual_id < circles_turn_animation.end_id) {
			if (circles_turn_animation.actual_id > circles_turn_animation.start_id) {
	    		document.querySelector('#circles-bg-' + (circles_turn_animation.actual_id - 1)).className = "background off";
	    	};
			circles_turn_animation.actual_id++; 
	    	document.querySelector('#circles-bg-' + circles_turn_animation.actual_id).className = "background";
	    	circlesTurnSetTimeout();
		} else {
			endCirclesTurnAnimation();
		}
	}
	
	var endCirclesTurnAnimation = function(){
		circles_turn_animation.running = false;
		circles_turn_animation.actual_id = circles_turn_animation.start_id
		block_turn = false;
		if(circles_turn_animation.timeout){
			clearTimeout(circles_turn_animation.timeout);
		}
	};
	
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
		
//	   touchtimer = setTimeout(turnButtonLongClickListener, touchduration); 
	   flagLock = true;
	   
	   if (!blue_circles_animation.running){
   			blue_circles_animation.running = true;
   			startBlueCirclesAnimation();
	   }
	   turn();
	}
	
	function turnButtonTouchEnd() {
		console.log("touchEnd");
//	    if (touchtimer){
//	       clearTimeout(touchtimer);
//	       touchtimer = null;
	       flagLock = false;
//	    } 
//	    if (!is_long_click){
//	    	
//	    }
		endTurnButtonAnimation();

    	is_long_click = false;
	    
	}
    
    return {
    	init: init,
    	destroy: destroy,
        getPage: function(){return page;},
    };
})();



		

