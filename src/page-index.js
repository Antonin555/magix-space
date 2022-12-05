


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let spriteList = [];

 
window.addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    spriteList.push(getPlanetForOptions(5, 5, 90, '#efdcbc')); 
    spriteList.push(getPlanetForOptions(10, 4, 125, '#FF0010')); 
    spriteList.push(getPlanetForOptions(15, 3, 175, '#d3bd8d')); 
    spriteList.push(getPlanetForOptions(20, 3.5, 250, '#b99f7a')); 
    spriteList.push(getPlanetForOptions(25, 3, 320, '#8f6f40')); 
    spriteList.push(getPlanetForOptions(20, 2.5, 375, '#988d62')); 
    spriteList.push(getPlanetForOptions(15, 2, 450, '#909a9c')); 
    spriteList.push(getPlanetForOptions(25, 1.5, 550, '#CCA6D8')); 
    spriteList.push(getPlanetForOptions(7, 1, 750, '#49e3ce')); 


    for (let i = 0; i < 500; i++) {
       spriteList.push(new Stars());
    }

    tick();
    
    
});


class Stars {
    constructor() {
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.radius = Math.random() * 2;
        this.opacity = 1.0;
        this.couleur1 = Math.floor(Math.random()* 256);
        this.couleur2 = Math.floor(Math.random()* 256);
    }

    tick() {
        this.opacity -= 0.01;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(255 , "+ this.couleur2+","+ this.couleur1 + "," + this.opacity + ")";
        ctx.fill();

        let alive = true;

        if (this.opacity <= 0.0) {
            this.opacity = Math.random() * 10.0;
            alive = true;
        } 
        
        return alive;
    }
}


class Planet {
    constructor(x, y, radius, color, velocity, orbitRadius) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.radian = 0;
        this.orbitRadius = orbitRadius;

    }

    draw() {
        //chemin planete
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(this.x,this.y,this.orbitRadius,0,Math.PI * 2,false);
        ctx.strokeStyle = 'rgba(0, 255, 238, 0.35)';
        ctx.stroke();


        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(this.startX,this.startY,this.orbitRadius,0,Math.PI * 2,false);
        ctx.strokeStyle = 'rgba(0, 255, 238)';
        ctx.stroke();

        // planete
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;

    }

    tick() {
        this.draw();
        let alive = true;
        if (this.velocity > 0) {
            this.radian += this.velocity;
            this.x = this.startX + Math.cos(this.radian) * this.orbitRadius; // on reduit la position de x avec le cos 
            this.y = this.startY + Math.sin(this.radian) * this.orbitRadius; // on augmente le y avec le sinus
            alive = true;

        } else
            alive = false;
        return alive;
    }


    tick2() {
        this.draw();
        let alive = true;
        if (this.velocity > 0) {
            this.radian += this.velocity;
            this.x = this.startX  * this.orbitRadius; // on reduit la position de x avec le cos 
            this.y = this.startY * this.orbitRadius; // on augmente le y avec le sinus
            alive = true;

        } else
            alive = false;
        return alive;
    }


}






const getPlanetForOptions = (radius, velocity, orbitRadius, color) =>
    new Planet(canvas.width / 2,canvas.height / 2,radius,color,velocity / 200,orbitRadius);

const tick = () => {


    ctx.clearRect(0, 0, canvas.width, canvas.height);    

    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        let alive = sprite.tick();

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}



