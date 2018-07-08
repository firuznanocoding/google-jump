
var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    scoreVal = document.querySelector('#score'),
    ju = true,
    jump = 240,
    rectAnim = 800,
    score = 0,
    sprite = 850,
    draconImg,
    color = 999,
    jumpStart = false;

    draconImg = new Image();
    draconImg.src = 'img/google_jump.png';

// Texture
function texture(){
    ctx.beginPath();
    ctx.moveTo(0,270);
    ctx.lineTo(800,270);
    ctx.stroke();
    ctx.closePath();
}

// Rect
function rect(rect){
    ctx.beginPath();
    rectAnim == -100 ? rectAnim = 800 : rectAnim-=5;
    ctx.drawImage(draconImg,330,0,50,50,rect,240,50,50);
   //ctx.rect(rect, 250, 25, 40);
    //ctx.fill();
    //rectAnim == 0 ? rectAnim = 800 : rectAnim-=5;
    ctx.closePath();
}

// Ball
function ball(jump){
    ctx.beginPath();
    ctx.arc(80, jump, 20, 1, 7);
    ctx.fill();
    ctx.closePath();
}

//controll
window.onkeydown = function(e){
    if(e.keyCode == 32 || e.keyCode == 38){
        jumpStart = true;
    }
}

// Jump
function jumpFunc(){
    if(jumpStart == true){
        if (ju == true){
            jumpUp();
        }else if( ju == false ){
            jumpDown();
        }
    }
}

function jumpUp(){
    if (jump > 168){
        jump-=3;
        if(jump == 168){
            ju = false;
        }
    }
}

function jumpDown(){
    if (jump < 240){
        jump+=3;
        if(jump == 240){
            jumpStart = false;
            ju = true; 
        }
    }
}

// Score
function scoreText(){
    scoreVal.innerText = Math.floor(score/2);
    score++;
}

function locationStyle(){
    if(Math.floor(score/2) > 500 && Math.floor(score/2) < 700){
        document.querySelector('body').style.backgroundColor = '#'+color;
        if(score % 5 == 0){
            color <= 0 ? document.querySelector('body').style.backgroundColor = '#000' : color-=111;
        } 
    }
    if(Math.floor(score/2) > 701){
        document.querySelector('body').style.backgroundColor = '#'+color;
        if(score % 5 == 0){
            color <= 999 ? document.querySelector('body').style.backgroundColor = '#fff' : color+=111;
        } 
    }
}

// Game Over
function gameOver(){
    if(jump == 240 && rectAnim == 95){
        clearInterval(setInt);
        rectAnim+=5;
        ctx.font = '50px serif';
        ctx.fillText('Game Over', 280, 150);
        window.onkeydown = function(){
            location.reload();
        }
    }
}

// Dracon
function dracon(jump){
    sprite >= 985 ? sprite = 850 : sprite+=44;
    ctx.drawImage(draconImg,sprite,0,40,50,50,jump,50,50);
}

//ctx.drawImage(sprites,srcX,srcY,srcW,srcH,destX,destY,destW,destY);

// Animation
var setInt = setInterval(function(){
    ctx.clearRect(0, 0, 800, 400);
    jumpFunc();
    gameOver();
    //ball(jump);
    rect(rectAnim);
    texture();
    scoreText();
    dracon(jump);
    locationStyle();
},1000/60);

