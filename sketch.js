
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//variables

var gameState = 'play'

var hr = 0
var min = 2
var sec = 60
var stopTime = true

var pc, pcImg, npc, npcImg
var bgSound

var counter = 0;

var score = 0;

var answer;

var i = 1, j =1, k = 1, l = 1, m = 1, n = 1, o = 1; 

var quest;

var hints;

function preload(){
    //loading images and sounds here 
	bg = loadImage('images/bg.png');

	pcImg = loadImage('images/pc0.png');

	npcImg = loadAnimation('images/npc1.png', 'images/npc animation 2.png');

	doorImg = loadImage('images/doors.png');

	bgSound = loadSound('sounds/y2mate.com - None Shall Live.mp3');

}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	
     //sounds
	bgSound.loop();
	bgSound.setVolume(0.3)
     
	//creating playing charecter here 
	pc = createSprite(400, 800, 10, 10);
	pc.addImage('scientist', pcImg);
     
	 //creating non-playing charecter here 
	npcImg.frameDelay = 25
	npc = createSprite(200, 700, 10, 10);
	npc.addAnimation('scientist npc', npcImg);
	npc.velocityX = -5
	npc.scale = 1.5
      
	//creating doors here
	doors = createSprite(3000, 800, 10, 10);
	doors.addImage('open', doorImg);
	doors.scale = 4.5
    doors.visible = false
      
	//creating buttons here
	input1 = createInput('Answer 1')
	input1.position(1600, 400)

	input2 = createInput('Answer 2')
	input2.position(1600, 450)

	input3 = createInput('Answer 3')
	input3.position(1600, 500)

	input4 = createInput('Answer 4')
	input4.position(1600, 550)

	input5 = createInput('Answer 5')
	input5.position(1600, 600)

	input6 = createInput('Answer 6')
	input6.position(1600, 650)

	input7 = createInput('Answer 7')
	input7.position(1600, 700)

	startTimer();

	quest = ['2 + 18', '180 - 160', '8 * 3', '5 * 9', '56/8', 'Square of 6', '7 * 4']

	hints = ['What is 2 times 10', 'Remove 38 from 50', 'Remove 11 from 35', 'Remove 5 from 50', 'What is 1 less than 8', 'What is 6*6', 'Remove 7 from 35']

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  imageMode(CENTER);
  image(bg, width/2, height/2, width*7, height);

  textSize(20);
  text('Score:'+ score, camera.position.x, 70);

if(gameState === 'play'){



	if(min === 0 && sec <=60){

		bgSound.setVolume(0.4)
	}


  if(keyDown(RIGHT_ARROW)){

	pc.x = pc.x+10
  }
  if(keyDown(LEFT_ARROW)){

	pc.x = pc.x-10
  }
  camera.position.x = pc.x

  if(pc.x % 700 === 0){

	doors.x = pc.x+100
	doors.visible = true

	qna();


	counter = counter+1
  }

  answer1 = input1.value();
  if(answer1 === '20' && i === 1){

	score = score+50
	doors.visible = false

    i = 0
  }

  answer2 = input2.value();
  if(answer2 === '20' && j === 1){

	score = score+50
	doors.visible = false

    j = 0
  }

  answer3 = input3.value();
  if(answer3 === '24' && k === 1){

	score = score+50
	doors.visible = false

    k = 0
  }

  answer4 = input4.value();
  if(answer4 === '45' && l === 1){

	score = score+50
	doors.visible = false

    l = 0
  }

  answer5 = input5.value();
  if(answer5 === '7' && m === 1){

	score = score+50
	doors.visible = false

    m = 0
  }

  answer6 = input6.value();
  if(answer6 === '36' && n === 1){

	score = score+50
	doors.visible = false

    n = 0
  }

  answer7 = input7.value();
  if(answer7 === '28' && o === 1){

	score = score+50
	doors.visible = false

    o = 0
  }

  if(min == 0 && sec == 01){

      stopTimer();
	  gameState = 'end'
  }

  if(score === 350){

	gameState = 'end'
  }

   fill('white');
  text('Time Left: ' + hr + ':' + min + ':' + sec, camera.position.x, 200);

  drawSprites();
 }
 if(gameState === 'end'){

  text('Time Left: 00: 00: 00', camera.position.x, 200)
   fill('white')
   textSize(35)

  if(score === 350){

	text('Sucess! You saved the Earth From The Meteor', camera.position.x - 400, 400)
  }
  else{
 
	text('You Lost! (Press space To Restart)', camera.position.x - 400, 400 );
  }
  if(keyCode === 32){

	reset();
  }
 }
}

function hide(){
   
   switch(counter){

	 case 1: input1.hide();
	         break;

	 case 2: input2.hide();
	         break;

	 case 3: input3.hide();
	         break;

	 case 4: input4.hide();
	         break;

	 case 5: input5.hide();
	         break;

	 case 6: input6.hide();
	         break;

	 case 7: input7.hide();
	         break;

   }
	 button.hide();
}

function qna(){

	swal({
		title: `Question `+(counter+1),
		text: quest[counter],
		confirmButtonText: hints[counter]
	  });

}

/*function spawnDoors(){



  if(frameCount % 50 === 0){
	  

  }


 

}*/

function startTimer(){

	if(stopTime === true ){
       stopTime = false
	   timerCycle();		
	}
}

function stopTimer(){

	if(stopTime === false){

		stopTime = true
	}
}

function timerCycle(){

	if(stopTime === false){

		sec = parseInt(sec);

		if(min!= 00)
		min = parseInt(min) || 2
		else min = parseInt(min) || 0

		hr = parseInt(hr)

		sec = sec - 1

		if(sec === 0){

			min = min - 1
			sec = 60
		}

		if(min === 60){

			hr = hr + 1
			min = 0
			sec = 0
		}

		if(sec < 10 || sec === 0){

			sec = '0' + sec

		}

		if(min < 10 || min === 0){

			min = '0' + min
		}

		if(hr < 10 || hr === 0){

			hr = 0 + hr
		}

		setTimeout('timerCycle()',1000);
	}
}

function reset(){

	pc.x = 400
	hr = 0
	min = 2
	sec = 60
	stopTime = true

	gameState = 'play'

	startTimer();

}



