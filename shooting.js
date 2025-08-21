import * as PIXI from "pixi.js";

export default class Shooting{
    constructor({app,player}){
        this.app =app;
        this.player = player;
        this.bulletSpeed = 4;
        this.bullets = [];
        this.bulletRad = 8;
        this.maxBullets = 3;

    }
    fire(){
        //PIXI graphics are used to make shapes, here to make the bullet
        const bullet = new PIXI.Graphics();

        //from where the bullet will spawn from
        bullet.position.set(this.player.x,this.player.y);
        
        //color the bullet purple so we can see the bullet
        bullet.beginFill(0xC724B1, 1);

        

    }
}