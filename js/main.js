var animationStartNum = 117;
var animationEndNum = 161;
var animationActualNum; 
var animationTime = 50;
var animationImage;
var mainPage;
var turnButton;
var turnAnimationTime = 400;


window.onload = function() {
	animationActualNum = animationStartNum;

    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            tau.changePage("connect.html");
        }
    });

    mainPage = document.querySelector('#main');

    animationImage = document.querySelector('#animation');
	startAnimation();
	
	turnButton = document.querySelector('#button-turn');
    
	turnButton.addEventListener("click", function() {
    	turn();
    });
   
};

var turn = function(){
	console.log("turn!!");

	startButtonAnimation();
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