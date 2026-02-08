// fireworks.js - Fireworks effect
(function(){
    function createFireworks() {
        const canvas = document.createElement('canvas');
        canvas.id = 'fireworks-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles = [];
        
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 5;
                this.vy = (Math.random() - 0.5) * 5 - 1;
                this.life = 1;
                this.color = ['#FF69B4', '#FFB6C1', '#FF1493', '#DC3C22', '#FFD700', '#FF6347'][Math.floor(Math.random() * 6)];
                this.size = Math.random() * 3 + 2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.05; // gravity
                this.vx *= 0.985; // air resistance
                // Smooth easing: gradual fade
                this.life -= 0.008;
            }
            
            draw(ctx) {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.life);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        
        function burst(x, y) {
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle(x, y));
            }
        }
        
        let animationRunning = false;
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles = particles.filter(p => p.life > 0);
            
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });
            
            if (particles.length > 0) {
                requestAnimationFrame(animate);
                animationRunning = true;
            } else {
                animationRunning = false;
            }
        }
        
        // Trigger fireworks on click or at intervals
        function triggerFireworks() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.6;
            burst(x, y);
            if (!animationRunning) {
                animate();
            }
        }
        
        document.addEventListener('click', (e) => {
            burst(e.clientX, e.clientY);
            if (!animationRunning) {
                animate();
            }
        });
        
        // Auto-trigger fireworks more frequently
        const autoFireworks = setInterval(() => {
            triggerFireworks();
        }, 1200);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(autoFireworks);
            canvas.remove();
        });
    }
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createFireworks);
    } else {
        createFireworks();
    }
})();
