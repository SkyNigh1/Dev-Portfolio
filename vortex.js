class CyberVortex {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.time = 0;
        this.chars = '0a1αb2βcγ3dδεe4ζfη5gθιh6κiλ7jμνk8ξlπ9ρmστnυφoχψpωqΣΦrΨΩt★s☆u';
        this.resize();
        this.init();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = this.canvas.offsetWidth;
        this.height = this.canvas.height = this.canvas.offsetHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    getRandomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

    init() {
        // Créer les anneaux de caractères
        const numRings = 12;
        const charsPerRing = 50;
        
        for (let ring = 0; ring < numRings; ring++) {
            const baseRadius = 60 + ring * 40;
            
            for (let i = 0; i < charsPerRing; i++) {
                this.particles.push({
                    char: this.getRandomChar(),
                    angle: (i / charsPerRing) * Math.PI * 2,
                    speed: 0.015 / (ring + 1),
                    baseRadius: baseRadius,
                    radius: baseRadius,
                    changeTime: Math.random() * 50,
                    ring: ring,
                    size: 16 - ring * 2
                });
            }
        }
    }

    draw() {
        // Effacer complètement le canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Configuration du texte
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Effet de lueur
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = '#00d466';

        // Dessiner les caractères
        this.particles.forEach(particle => {
            particle.angle += particle.speed;
            
            // Changer périodiquement le caractère
            if (--particle.changeTime <= 0) {
                particle.char = this.getRandomChar();
                particle.changeTime = 25 + Math.random() * 50;
            }

            // Position avec effet de perspective
            const x = this.centerX + Math.cos(particle.angle) * particle.radius;
            const y = this.centerY + Math.sin(particle.angle) * (particle.radius * 0.3);

            // Variation de l'opacité basée sur la position
            const opacity = 0.4 + Math.abs(Math.sin(particle.angle)) * 0.6;

            // Dessiner le caractère
            this.ctx.font = particle.size + 'px monospace';
            this.ctx.fillStyle = 'rgba(0, 212, 102, ' + opacity + ')';
            this.ctx.fillText(particle.char, x, y);
        });
        
        this.time += 0.016;
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('cyberVortex');
    if (canvas) {
        new CyberVortex(canvas);
    }
});