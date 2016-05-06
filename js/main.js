var animationStartNum = 117;
var animationEndNum = 161;
var animationActualNum; 
var animationTime = 40;
var animationImage;
var turnButton;
var turnAnimationTime = 400;



var initMain = function(){

    animationImage = document.querySelector('#animation');
	startAnimation();
	
	turnButton = document.querySelector('#button-turn');
    
	turnButton.addEventListener("click", function() {
    	turn();
    });
};
pages.init.main = initMain;

var writeSuccess = function(value)
{
   console.log("Written");
};

var writeFail = function(error)
{
   console.log("writeValue() failed: " + error);
};


var turn = function(){
	console.log("turn!!");

	startButtonAnimation();
	property.writeValue([1], writeSuccess, writeFail);
	setTimeout(function(){
		property.writeValue([0], writeSuccess, writeFail);
	}, 3000)
};

var startButtonAnimation = function(){
	turnButton.className = "on";
	setTimeout(endButtonAnimation, turnAnimationTime);
};

var endButtonAnimation = function(){
	turnButton.className = "off";
};

var startAnimation = function(){
	animationImage.className = "animation";
	setTimeout(changeAnimation, animationTime);
};

var changeAnimation = function(){
	animationActualNum = (animationActualNum < animationEndNum) ? animationActualNum + 1 : animationStartNum;
	animationImage.src = "images/blue_circles_00" + animationActualNum + ".png";
	setTimeout(changeAnimation, animationTime);
};