
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); 

    
let particles = [];



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
          
        /* Initialize particle object  */
class Particle {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.opacity = 1.0;
        this.couleur1 = Math.floor(Math.random()* 155) + 125;
        this.couleur2 = Math.floor(Math.random()* 256);
    }

    tick() {
        
       this.radius += 1;
        this.opacity -= 0.001;
        this.x += this.dx ;
        this.y += this.dy ;
        ctx.beginPath();
        ctx.shadowBlur = 20;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(155 , 10, " + this.couleur1 +" ,"+ this.opacity + ")";

        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        ctx.strokeStyle = "rgba(0,0,0,1";
    ctx.stroke();

        let alive = true;

        if (this.opacity<= 1) {
            //this.opacity = Math.random() * 10.0;
            alive = true;
        } else {
            alive = false;
        }

        return alive;

    }
}


addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    for (let i = 0; i <= 150; i++) {
        let dx = (Math.random() - 0.5) * (Math.random() * 50);
        let dy = (Math.random() - 0.5) * (Math.random() * 50);
        //let dx = 5;
        //let dy = 5;
        let radius = Math.random() * 10;
        let particle = new Particle(canvas.width/2, canvas.height/2, radius, dx, dy);
            
        /* Adds new items like particle*/
        particles.push(particle);
    }

    for (let i = 0; i < 500; i++) {
        particles.push(new Stars());
     }


    tick();
    
    
});
          

      
function tick() {

   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i=0; i < particles.length;i++){
        const particle = particles[i];
        let alive = particle.tick();

        if(!alive){
            particles.splice[i,1];
            i--;
        }


    }
            
        
    requestAnimationFrame(tick);
}