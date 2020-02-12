

var toit = Math.floor((Math.random() * 50));   // 0-ist 49-ni
console.log("Toit " + toit);


var snakeHead = 22;  // mitmenda ruudu peal ussi pea mängu alustab
var snake = [snakeHead -1, snakeHead];
var grow = false;  // kas muudab ussi pikemaks või mitte
var suund = 1;
var leftSideNr = [0, 10, 20, 30, 40];
var rightSideNr = [9, 19, 29, 39, 49];
var upSideNr = [0,1,2,3,4,5,6,7,8,9];
var downSideNr = [40,41,42,43,44,45,46,47,48,49];
var score = 0;
var scores = []; // sinu highscore array
var scorebonus = 15;
var move = "right";
var moveLock = move;



$('table td').eq(toit).addClass('toit');  // kus toit asub

$('table td').eq(snake[0]).addClass('snakeHead');
$('table td').eq(snakeHead).addClass('snakeHead');



var timeSpeed = 250; // kui kiiresti uss liigub


var leftSide;
var rightSide;
var upSide;
var downSide;


function timer(){

	intervalHandle = setTimeout(timer, timeSpeed);


	snakeHead+=suund;

	snake.push(snakeHead);



	if((leftSide==true) && (move=="left")){
		gameover("Game over");
		return;
	}

	if((rightSide==true) && (move=="right")){
		gameover("Game over");
		return;
	}

	if((upSide==true) && (move=="up")){
		gameover("Game over");
		return;
	}

	if((downSide==true) && (move=="down")){
		gameover("Game over");
		return;
	}


	function gameover(gameover){
		clearTimeout(intervalHandle);
		$('.gameover').html(gameover);
		$('.again').css('display','inline-block');
		againClick = true; // saad again nuppu uuesti vajutada
		scores.push(score);
		highscore();   // adds score to highscore
		saveToLocalStorage();
	}


	// kui oled ussiga parem,vasal,üleval,all ääres
	function isInArray(value, array) {
  		return array.indexOf(value) > -1; // kui väärtus on suurem kui -1 siis tagastab true (-1 on alati väiksem kuna array esimene väärtus on positsioonil 0)
	}

	// true või false
	leftSide = isInArray(snakeHead, leftSideNr); 
	rightSide = isInArray(snakeHead, rightSideNr); 
	upSide = isInArray(snakeHead, upSideNr); 
	downSide = isInArray(snakeHead, downSideNr); 


	

	function hasDuplicates(array) {
   	 	return (new Set(array)).size !== array.length;
	}

	var x = hasDuplicates(snake); 

	if(x===true){   // kui on arrays sama väärtust rohkem kui 1 siis game over
		gameover("Game over");
		return;
	}



	$('table td').eq(snakeHead).addClass('snakeHead'); // lisab musta ruudu




	if(snakeHead==toit){   // kui uss sööb toidu ära siis respawnib toit kuskil uuesti

		$('table td').removeClass('toit');
		
		toit = Math.floor((Math.random() * 50));    // 0-ist 49-ni

		for(var i=0; i<snake.length; i++){
	  
			if(snake.length==50){
				gameover("The end");
				console.log('snake.length ' + snake.length);
				return;
			}else if(snake[i]==toit){
				    toit = Math.floor((Math.random() * 50));   // 0-ist 49-ni
					i=-1; continue;
			}else if(i+1==snake.length){   // kui jõudis lõpuni array kontrollimisega
					$('table td').eq(toit).addClass('toit');  // kus toit asub
					grow = true;   // uss kasvab pikemaks
					$('.score').html('Score: ' + (score+=scorebonus));
					console.log("Toit " + toit)
			}
		}

	
		console.log(snake);
	}


	// ussi tagumise osa eemaldamine

	if(grow==false){   // kui true siis uss kasvab pikemaks kuna tagumise ussi osa ei eemalda
		
		$('table td').eq(snake[0]).removeClass('snakeHead');
		snake.shift();			// eemaldab esimese array snake numbri
	
		console.log(snake);
	}

	grow = false;

	moveLock = move;



} // end of timer







 $(document).keydown(function(key) {

 		var buttonValue = parseInt(key.which,10);


 		if(buttonValue==37){       	    // Left arrow key pressed
 			if(moveLock!= "right"){
 				move = "left";
 				suund = -1;
 			}	
 		}else if(buttonValue==38){  	// Up arrow key pressed
 			if(moveLock != "down"){
 				move = "up";
 				suund = -10;
 			}	
 		}else if(buttonValue==39){  	// Right arrow key pressed
 			if(moveLock != "left"){
 				move = "right";
 				suund = 1;
 			}	
 		}else if(buttonValue==40){  	// Down arrow key pressed
 			if(moveLock != "up"){
 				move = "down";
 				suund = 10;
 			}	
 		}

});





$('.speed').on('click', function() {
   $('.btn').removeClass('orange');
  $(this).find('.btn').addClass('orange');

});


$('.slow').on('click', function() {
	timeSpeed = 500;
	scorebonus = 10;
});

$('.normal').on('click', function() {
	timeSpeed = 250;
	scorebonus = 15;
});

$('.fast').on('click', function() {
	timeSpeed = 125;
	scorebonus = 20;
});

$('.ultra').on('click', function() {
	timeSpeed = 62.5;
	scorebonus = 25;
});

// startclick
var startClick = true;  
$('.start').on('click', function() {
	if(startClick===true){
	timer();
	$(this).hide();
	startClick=false;
	}

});	

// againclick
var againClick = true;  
$('.again').on('click', function() {
	if(againClick===true){
	
	$(this).hide();
	againClick=false;


	toit = Math.floor((Math.random() * 50));    // 0-ist 49-ni
	snakeHead = 22;  // mitmenda ruudu peal ussi pea mängu alustab
	snake = [snakeHead -1, snakeHead];
	grow = false;  // kas muudab ussi pikemaks või mitte
	score = 0;
	suund = 1;
	move = "right";
	moveLock = move;

	leftSide = null;
	rightSide = null;
	upSide = null;
	downSide = null;

	$('.score').html('Score: 0');
	$('.gameover').html('');
	$('table td').removeClass('toit snakeHead');
	$('table td').eq(toit).addClass('toit');  // kus toit asub
	$('table td').eq(snake[0]).addClass('snakeHead');
	$('table td').eq(snakeHead).addClass('snakeHead');

	timer();
	
	}
});







function saveToLocalStorage(){

	if(typeof(Storage) !== "undefined") {  // juhul kui browser toetab local storage
	   
		localStorage.scoreStorage =  scores;
        localStorage.storageCheck = "true";

	} else {
	  	alert("Sorry! No Web Storage support..");
	}

}



function loadLocalStorage(){

	if(localStorage.storageCheck  == "true"){

		
		var x = localStorage.scoreStorage;
		scores = x.split(',');
		
		
		console.log("localscore " + scores);

	}
}

loadLocalStorage();




function highscore(){

	scores.sort(function(a, b){return b-a});
	
	if(scores.length>10){
		 scores.pop();
		
	}
	
	
	$('.score-value').html('');
	
	for(var i=0; i<scores.length; i++){
	
		$('.score-value').append('<li>' + (i+1) + '. ' + scores[i] + '</li>');
	}

}

highscore();
