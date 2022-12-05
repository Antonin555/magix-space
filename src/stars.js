
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let spriteList = [];


addEventListener('load', () => {

    canvas.width = innerWidth;
    canvas.height = innerHeight;

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

        let alive = true;
        this.opacity -= 0.01;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(255 , 255,255,"+ this.opacity + ")";
        ctx.fill();

        

        if (this.opacity <= 0.0) { 
            
            this.opacity= Math.random() * 10;
            alive = true;
        } 
        
        return alive;
    }
}




const tick = () => {


    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    

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