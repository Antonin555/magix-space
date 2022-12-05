


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let spriteList = [];

addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    spriteList.push(getPlanetForOptions(5, 3, 150, 'aqua')); 
    spriteList.push(getPlanetForOptions(7,2, 300, 'white')); 
    spriteList.push(getPlanetForOptions(6, 3.7, 150, 'blue')); 
    spriteList.push(getPlanetForOptions(9, 3.4, 225, 'cyan')); 
    spriteList.push(getPlanetForOptions(2, 2.5, 285, 'white')); 
    spriteList.push(getPlanetForOptions(6.5, 1.8, 300, '#FF9F00')); 
    spriteList.push(getPlanetForOptions(7, 1.2, 420, 'white')); 
    spriteList.push(getPlanetForOptions(4, 1, 535, 'white')); 
    spriteList.push(getPlanetForOptions(2, 1.6, 650, '#FF6F00')); 
    spriteList.push(getPlanetForOptions(9, 2.7, 655, '#aceeca')); 
    spriteList.push(getPlanetForOptions(8, 2.5, 775, 'white')); 
    spriteList.push(getPlanetForOptions(5, 2.1, 900, '#a7b8be')); 
    spriteList.push(getPlanetForOptions(2, 1.8, 1000, '#18ed99')); 
    

    
    tick();
    
});

const tick = () => {


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

const getPlanetForOptions = (radius, velocity, orbitRadius, color) =>
    new Planet(canvas.width,canvas.height / 2,radius,color,velocity / 200,orbitRadius);




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
}




