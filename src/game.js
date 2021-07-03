console.log('[Fabiano] Flappy Bird');

const sprites = new Image();

sprites.src = '../assets/sprites.png';

const canvas =  document.querySelector('canvas');
const context = canvas.getContext('2d');

//[Plano de fundo]
const backgroundScenery = {
  sourceX: 390, sourceY: 0, 
  width: 275, height: 204, 
  x: 0, y: canvas.height - 204, 
  drawScenery(){
    context.fillStyle = '#70c5ce';
    context.fillRect(0 , 0, canvas.width, canvas.height);
    context.drawImage(
      sprites,
      backgroundScenery.sourceX, backgroundScenery.sourceY,
      backgroundScenery.width, backgroundScenery.height,
      backgroundScenery.x, backgroundScenery.y,
      backgroundScenery.width, backgroundScenery.height,
    )
    context.drawImage(
      sprites,
      backgroundScenery.sourceX, backgroundScenery.sourceY,
      backgroundScenery.width, backgroundScenery.height,
      (backgroundScenery.x + backgroundScenery.width), backgroundScenery.y,
      backgroundScenery.width, backgroundScenery.height,
    )
  }
}
//[chão]
const ground = {
  sourceX: 0, sourceY: 610, 
  width: 224, height: 112, 
  x: 0, y: canvas.height - 112, 
  drawGround(){
    context.drawImage(
      sprites,
      ground.sourceX, ground.sourceY, 
      ground.width, ground.height, 
      ground.x, ground.y, 
      ground.width, ground.height, 
    )
    context.drawImage(
      sprites,
      ground.sourceX, ground.sourceY, 
      ground.width, ground.height, 
      (ground.x + ground.width), ground.y, 
      ground.width, ground.height, 
    )
  }
}

const flappyBird = {
  sourceX: 0, sourceY: 0, 
  width: 33, height: 24, 
  canvasX: 10, canvasY: 50, 
  velocity: 0,
  gravity: 0.25,
  update(){
    flappyBird.velocity = flappyBird.velocity + flappyBird.gravity;
    flappyBird.canvasY = flappyBird.canvasY + flappyBird.velocity;
  },
  drawBird(){
    context.drawImage(
      sprites,
      flappyBird.sourceX, flappyBird.sourceY, //sprit
      flappyBird.width, flappyBird.height,
      flappyBird.canvasX, flappyBird.canvasY,
      flappyBird.width, flappyBird.height
    );
  }
}

// [mensagemGetReady]
const  messageGetReady = {
  sourceX: 134, sourceY: 0, 
  width: 174, height: 152, 
  x: (canvas.width / 2) - 174 / 2, y: 50, 

  drawMessageGetReady(){
    context.drawImage(
      sprites,
      messageGetReady.sourceX, messageGetReady.sourceY, 
      messageGetReady.width, messageGetReady.height, 
      messageGetReady.x, messageGetReady.y,
      messageGetReady.width, messageGetReady.height, 
      
    );
  }
}
//
//[TELAS]
//
let activeScreen = {};

function changeScreen(newScreen) {
  activeScreen = newScreen;
}

const Screens = {
  START: {
    draw(){
      backgroundScenery.drawScenery();
      ground.drawGround();
      flappyBird.drawBird();
      messageGetReady.drawMessageGetReady();
    },
    click(){
      changeScreen(Screens.GAME);
    },
    update(){

    }
  }
}

Screens.GAME = {
  draw(){
    backgroundScenery.drawScenery();
    ground.drawGround();
    flappyBird.drawBird();
  },
  update() {
    flappyBird.update();
  }
}


function loop(){

  activeScreen.draw();
  activeScreen.update();
  
  requestAnimationFrame(loop);
}

window.addEventListener('click', () =>{
  if(activeScreen.click()){
    activeScreen.click();
  }
});


changeScreen(Screens.START);
loop();
