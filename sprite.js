// import * as PIXI from 'pixi.js';
// import { gsap } from 'gsap';


const app = new PIXI.Application({
    width: innerWidth,
    height: innerHeight,
    backgroundColor: 0x000000
});

document.body.appendChild(app.view);

//setting up the game background texture
const bg=PIXI.Sprite.from('assets_updated/nTCes2X.jpg');
app.stage.addChild(bg);
bg.width=innerWidth;
bg.height=innerHeight;
bg.name="background";
bg.scale.set(1,1);

let player;

//player object
player=new PIXI.Sprite.from("assets_updated/pngwing.com.png");
player.anchor.set(0.5);

//setting the sprite to the center of the screen
player.x = app.view.width /2;
player.y = app.view.width /2;

//scaling player according to the page
app.stage.addChild(player);
player.scale.set(0.1,0.1);

//mouse controller

//telling stage to accept activity
app.stage.interactive = true;

//accept activity on the event of pointer move
app.stage.on("pointermove", movePlayer);

//here e will store the data regarding the event that was triggered
function movePlayer(e){
    let pos = e.data.global;
    player.x=pos.x;
    player.y=pos.y;

}

let bullets = [];
let bulletSpeed = 10;

//to update the game
app.ticker.add(gameLoop);

app.stage.interactive = true;
app.stage.on("pointerdown", fireBullet);

function fireBullet(i){
    let bullet = createBullet(); 
    bullets.push(bullet); //push the created bullets into the array
}

//this function will create the bullets
function createBullet(){
    let bullet = new PIXI.Sprite.from("assets/CzMea.png");
    bullet.anchor.set(0.5);
    bullet.scale.set(0.05, 0.05);

    //to spawn the bullets form the players position
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.speed = bulletSpeed;

    app.stage.addChild(bullet);
    return bullet;
}

//this functions updates the bullets as they move through the stage
function updateBullets(delta){
    for(let i = 0; i< bullets.length; i++){
        bullets[i].position.y -= bullets[i].speed;

        //to cheack weather the bullets have left the stage or not
        if(bullets[i].position.y < 0){
            bullets[i].dead = true;
        }
    }

    for(let i = 0; i< bullets.length; i++){
        
        //remove the bullets if they have left the stage
        if(bullets[i].dead){
            app.stage.removeChild(bullets[i]);
            bullets.splice(i,1);
        }
    }
}

function gameLoop(delta){
    updateBullets(delta);
    updateAstros(delta);
    // if(detectCol(bullets,astros)){
    //     astros.kill();
    // }
}


//spawning astroids
let drawing = false;
let graphic;
let count = 0;

let xIni = 0;
let yIni = 0;

setInterval(() => {
    spawmAstro();
}, 75);



let astros = [];
let astroSpeed;

app.ticker.add(() => {
    astroSpeed = Math.floor(Math.random() * 10) + 1;
    //console.log(astroSpeed);
});
// function createAstro(){
//     let whoa = spawmAstro(); 
//     astros.push(whoa);
// }

function spawmAstro() {
    count += 5.0;
    if (!drawing) {
        drawing = true;
        graphic = new PIXI.Sprite.from("assets_updated/33623-5-asteroid-photos_800x800.png");
        app.stage.addChild(graphic);
        astros.push(graphic);
        graphic.speed = astroSpeed;
        graphic.scale.set(0.1 + Math.random() * 0.2);
        xIni = Math.random() * 1920;
        yIni = Math.random() * 0;
        graphic.position.set(xIni, yIni);
    } else if (count > 50) {
         count = 0;
         drawing = false;
    }
    
}

function updateAstros(delta){
    for(let i = 0; i< astros.length; i++){
        astros[i].position.y += astros[i].speed;

        //to cheack weather the bullets have left the stage or not
        if(astros[i].position.y > 1080){
            astros[i].dead = true;
        }
    }

    for(let i = 0; i< astros.length; i++){
        
        //remove the bullets if they have left the stage
        if(astros[i].dead){
            app.stage.removeChild(astros[i]);
        }
    }
}

// function detectCol(a,b){
//     let aAstro = a.getBounds();
//     let bBullet = b.getBounds();
//     return aAstro.x + bBullet.width > bBullet.x && aAstro.x < bBullet.x + bBullet.width && aAstro.y + bBullet.height > bBullet.y && aAstro < bBullet.y + bBullet.height;

// }

// function destroyingAstro(bullets, astros,bulletRadius, astroRadius){
//     bullets.array.forEach(element => {
//         astros.array.forEach((graphic,index) => {
//             let dx = graphic.position.x - bullet.position.x;
//             let dy = graphic.position.y - bullet.position.y;
//             let distance =Math.sqrt(dx*dx + dy*dy);
//             if(distance < bulletRadius + astroRadius)
//             {
//                 astros.splice(index,1);
//                 graphic.kill();
//             }
//         })   
//     });
// }

// function kill(){
//     let index = astros.indexOf(graphic);
//     app.stage.removeChild(astros[index]);
// }