console.log('[Fabiano] Flappy Bird');

let frames = 0;

const sound =  new Audio();
sound.src ='../sound/hit.wav';

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
function createGround(){
  const ground = {
    sourceX: 0, sourceY: 610, 
    width: 224, height: 112, 
    x: 0, y: canvas.height - 112, 
    updateGround(){
      const movementFloor = 1;
      const repeatInGround = ground.width / 2;
      const movement = ground.x - movementFloor;
      ground.x = movement % repeatInGround;
    },
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
  return ground;
}

function makeCollision(flappyBird, ground){
  const flappyBirdY = flappyBird.canvasY + flappyBird.height;
  const groundY = ground.y;

  return (flappyBirdY >= groundY) ? true: false;
}

function  createFlappyBird(){
  const flappyBird = {
    sourceX: 0, sourceY: 0, 
    width: 33, height: 24, 
    canvasX: 10, canvasY: 50, 
    jump: 4.6,
    skip(){
      flappyBird.velocity = - flappyBird.jump;
    },
    velocity: 0,
    gravity: 0.25,
    updateBird(){
      if(makeCollision(flappyBird, globais.ground )){
        sound.play();
        changeScreen(Screens.GAME_OVER);
        return;
      }
      flappyBird.velocity = flappyBird.velocity + flappyBird.gravity;
      flappyBird.canvasY = flappyBird.canvasY + flappyBird.velocity;
    },
    wingMovements: [
      {sourceX: 0, sourceY: 0},
      {sourceX: 0, sourceY: 26},
      {sourceX: 0, sourceY: 52},
      {sourceX: 0, sourceY: 26},
    ],
    currentFrame: 0,
    updateCurrentFrame(){
      const intervalFrames = 10;
      const passedTheBreak = frames % intervalFrames === 0;
      if(passedTheBreak){
        const incrementBase = 1;
        const increment = incrementBase + flappyBird.currentFrame;
        const baseRepeat = flappyBird.wingMovements.length;
        flappyBird.currentFrame = increment % baseRepeat;
      }
    },
    drawBird(){
      flappyBird.updateCurrentFrame()
      const { sourceX, sourceY } = flappyBird.wingMovements[flappyBird.currentFrame];
      context.drawImage(
        sprites,
        sourceX, sourceY, 
        flappyBird.width, flappyBird.height,
        flappyBird.canvasX, flappyBird.canvasY,
        flappyBird.width, flappyBird.height
      );
    }
  }
  return flappyBird;
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
//[mensagemGameOver]
const  messageGameOver = {
  sourceX: 134, sourceY: 153, 
  width: 226, height: 200, 
  x: (canvas.width / 2) - 226 / 2, y: 50, 

  drawMessageGameOver(){
    context.drawImage(
      sprites,
      messageGameOver.sourceX, messageGameOver.sourceY, 
      messageGameOver.width, messageGameOver.height, 
      messageGameOver.x, messageGameOver.y,
      messageGameOver.width, messageGameOver.height, 
      
    );
  }
}

function createPipes() {
  const pipes = {
    width: 52, height: 400,
    ground: {
      sourceX: 0, sourceY: 169,
    },
    sky: {
      sourceX: 52, sourceY: 169,
    }, 
    space: 80,
    drawPipe() {

      pipes.pares.forEach(par => {

        const yRandom = par.y;
        const pipeSpacing = 90;

        const skyPipeX = par.x;
        const skyPipeY = yRandom;

        //[CANO D0 CÉU]
        context.drawImage(
          sprites,
          pipes.sky.sourceX, pipes.sky.sourceY,
          pipes.width, pipes.height,
          skyPipeX, skyPipeY,
          pipes.width, pipes.height,
        )
        //[Cano do chão]  
        const pipeGroundX = par.x;
        const pipeGroundY = pipes.height + pipeSpacing + yRandom;
        context.drawImage(
          sprites,
          pipes.ground.sourceX, pipes.ground.sourceY,
          pipes.width, pipes.height,
          pipeGroundX, pipeGroundY,
          pipes.width, pipes.height,
        )
        par.pipeSky = {
          x: skyPipeX,
          y: pipes.height + skyPipeY,
        }
        par.pipeGround = {
          x: pipeGroundX,
          y: pipeGroundY,
        }
      })
      
    },
    hasCollisionWithFlappyBird(par) {
      const flappyHead = globais.flappyBird.canvasY;
      const flappyFoot = globais.flappyBird.canvasY + globais.flappyBird.height;
      
      if((globais.flappyBird.canvasX  + globais.flappyBird.width - 5) >= par.x){
        if(flappyHead <= par.pipeSky.y){ return true;}
        if(flappyFoot >= par.pipeGround.y){return true;}
      }
    }
    ,
    pares: [],
    updatePipes(){
      const passed100Frames = frames % 100 == 0;
      if(passed100Frames){
        pipes.pares.push({
          x: canvas.width, y:-150 * (Math.random() + 1),
        })
      }

      pipes.pares.forEach(par => {
        par.x = par.x - 2;

        if(pipes.hasCollisionWithFlappyBird(par)){
          sound.play();
          changeScreen(Screens.GAME_OVER);
        }

        if(par.x + pipes.width <=0){
          pipes.pares.shift();
        }
      })
    }
  }
  return pipes;
}

function createScoreboard(){
  const scoreboard = {
    score: 0,
    drawScoreboard(){
      context.font = '35px VT323';
      context.textAlign = 'right';
      context.fillStyle = 'white';
      context.fillText(scoreboard.score, canvas.width - 10, 35);
      
    },
    updateScoreboard(){
      const intervalFrames = 20;
      const passedTheBreak = frames % intervalFrames === 0;
      if(passedTheBreak){scoreboard.score = scoreboard.score + 1;}
    }
  }
  return scoreboard;
}
//
//[TELAS]
//
const globais = {};
let activeScreen = {};

function changeScreen(newScreen) {
  activeScreen = newScreen;
  if(activeScreen.initialize){
    activeScreen.initialize();
  }
}

const Screens = {
  START: {
    initialize(){
      globais.flappyBird = createFlappyBird();
      globais.ground = createGround();
      globais.pipes = createPipes();
    },
    draw(){
      backgroundScenery.drawScenery();
      globais.flappyBird.drawBird();
      globais.ground.drawGround();
      messageGetReady.drawMessageGetReady();
      
    },
    click(){
      changeScreen(Screens.GAME);
    },
    update(){
      globais.ground.updateGround();
    }
  }
}

Screens.GAME = {
  initialize(){
    globais.scoreboard = createScoreboard();
  },
  draw(){
    backgroundScenery.drawScenery();
    globais.pipes.drawPipe();
    globais.ground.drawGround();
    globais.flappyBird.drawBird();
    globais.scoreboard.drawScoreboard();
    
  },
  click() {
    globais.flappyBird.skip();
  },
  update() {
    globais.pipes.updatePipes();
    globais.ground.updateGround();
    globais.flappyBird.updateBird();
    globais.scoreboard.updateScoreboard();
   
    
  }
}
Screens.GAME_OVER = {
  draw() {
    messageGameOver.drawMessageGameOver();
  },
  update() {},
  click() {
    changeScreen(Screens.START);
  },
}

function loop(){

  activeScreen.draw();
  activeScreen.update();
  
  frames++;
  requestAnimationFrame(loop);
}

canvas.addEventListener('click', () =>{
  if(activeScreen.click()){
    activeScreen.click();
  }
});


changeScreen(Screens.START);
loop();
