// fortune-cookie.js - romantic fortune cookie generator
(function(){
    const FORTUNES = [
        "Your love story will inspire others to believe in true romance.",
        "Together, you will create a lifetime of beautiful memories.",
        "The warmth you share will light up even the darkest days.",
        "Your bond grows stronger with each passing moment.",
        "In each other's arms, you have found your forever home.",
        "Your laughter together is the sweetest melody life can offer.",
        "The love you nurture today will bloom for years to come.",
        "You are each other's greatest adventure and safest harbor.",
        "Your hearts beat in perfect harmony, now and always.",
        "The future holds countless sunrises to share together.",
        "Your love is a cozy blanket on the coldest of nights.",
        "Together, you make ordinary moments extraordinary.",
        "You have found in each other what poets write about.",
        "Your partnership will weather all storms with grace.",
        "Every day with you is a gift worth treasuring.",
        "The comfort you find in each other is rare and precious.",
        "Your love grows deeper with every shared sunset.",
        "You are building a beautiful life, one moment at a time.",
        "In your embrace, all worries fade away into peace.",
        "Your connection transcends words and touches souls.",
        "Together, you have created your own little universe.",
        "The joy you bring each other multiplies with time.",
        "Your love is the kind that makes life worth living.",
        "You complete each other in ways you never imagined.",
        "Your future together shines brighter than any star.",
        "In quiet moments, you find the loudest expressions of love.",
        "Your togetherness turns a house into a home.",
        "The tenderness you share is a rare treasure.",
        "Your love story is just beginning its best chapters.",
        "Together, you make the world a softer, kinder place.",
        "Your hearts have found their perfect match.",
        "The comfort of your presence is the greatest gift.",
        "Your love is a warm fire on a winter's evening.",
        "You remind each other what truly matters in life.",
        "Your partnership is built on trust, laughter, and endless love.",
        "Together, you are creating a legacy of love.",
        "Your connection makes everything feel possible.",
        "In you, they have found their best friend and soulmate.",
        "Your love is proof that magic exists in this world.",
        "Together, you are each other's greatest blessing."
    ];

    let currentFortune = '';

    function qs(sel, ctx=document){ return ctx.querySelector(sel); }
    function readQueryParam(name){ const p = new URLSearchParams(window.location.search); return p.get(name); }
    function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

    function getRandomFortune() {
        const randomIndex = Math.floor(Math.random() * FORTUNES.length);
        return FORTUNES[randomIndex];
    }

    function makeSvg(fortune){
        const clean = escapeHtml(fortune);
        
        function wrap(text, n){
            const words = text.split(/\s+/);
            const lines = [];
            let cur = '';
            words.forEach(w => {
                if((cur + ' ' + w).trim().length > n){ lines.push(cur.trim()); cur = w; } else cur += ' ' + w;
            });
            if(cur.trim()) lines.push(cur.trim());
            return lines;
        }

        const lines = wrap(clean, 40);
        const svgLines = lines.map((l,i) => `<text class='fortune' x='600' text-anchor='middle' y='${280 + i*45}'>${l}</text>`).join('\n');

        const svg = `
            <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600' preserveAspectRatio='xMidYMid meet'>
                <defs>
                    <style>
                        <![CDATA[
                        .bg{fill:#FBF5DE}
                        .card{fill:#fff;stroke:#F4C430;stroke-width:8}
                        .title{font-family:Georgia, serif; font-size:32px; fill:#8B7355; font-weight:600}
                        .fortune{font-family:Georgia, serif; font-size:30px; fill:#6B5B4A; font-style:italic}
                        .decoration{fill:#FFB6C1}
                        .cookie{fill:#F4C430;stroke:#D4A017;stroke-width:3}
                        ]]>
                    </style>
                </defs>
                <rect class='bg' width='100%' height='100%'></rect>
                <rect class='card' x='60' y='60' width='1080' height='480' rx='15' ry='15'></rect>
                
                <ellipse class='cookie' cx='180' cy='150' rx='50' ry='38'/>
                <path d='M 150 150 Q 180 170 210 150' fill='#E6B800' opacity='0.6'/>
                
                <ellipse class='cookie' cx='1020' cy='150' rx='50' ry='38'/>
                <path d='M 990 150 Q 1020 170 1050 150' fill='#E6B800' opacity='0.6'/>
                
                <text x='600' text-anchor='middle' y='180' class='title'>Your Fortune Together</text>
                
                ${svgLines}
                
                <text x='300' y='480' class='decoration' font-size='40'>❤</text>
                <text x='900' y='480' class='decoration' font-size='40'>❤</text>
            </svg>
        `;
        return svg;
    }

    function showFortune(fortune){
        currentFortune = fortune;
        const fortuneText = qs('#fortuneText');
        fortuneText.textContent = fortune;
        
        const cookieClosed = qs('#cookieClosed');
        const result = qs('#fcResult');
        
        cookieClosed.style.display = 'none';
        result.style.display = 'block';
        
        result.classList.remove('fortune-animate');
        void result.offsetWidth;
        setTimeout(()=> result.classList.add('fortune-animate'), 40);
    }

    function resetCookie(){
        const cookieClosed = qs('#cookieClosed');
        const result = qs('#fcResult');
        
        cookieClosed.style.display = 'block';
        result.style.display = 'none';
    }

    function svgToPngDownload(svgString, filename){
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = function(){
            const canvas = document.createElement('canvas');
            canvas.width = img.width; 
            canvas.height = img.height; 
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff'; 
            ctx.fillRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(img,0,0);
            canvas.toBlob(function(blob){ 
                const a = document.createElement('a'); 
                a.download = filename; 
                a.href = URL.createObjectURL(blob); 
                document.body.appendChild(a); 
                a.click(); 
                a.remove(); 
                URL.revokeObjectURL(url); 
            }, 'image/png');
        };
        img.onerror = function(){ 
            alert('Could not generate image. Please try printing instead.'); 
            URL.revokeObjectURL(url); 
        };
        img.src = url;
    }

    document.addEventListener('DOMContentLoaded', function(){
        const cookieClosed = qs('#cookieClosed');
        const anotherBtn = qs('#fcAnother');
        const dlBtn = qs('#fcDownload');
        const backBtn = qs('#fcFormBack');
        const dayParam = readQueryParam('day');

        if (dayParam) {
            backBtn.href = `day${dayParam}.html`;
        } else {
            backBtn.href = '../index.html';
        }

        if (cookieClosed) {
            cookieClosed.style.cursor = 'pointer';
            cookieClosed.addEventListener('click', function(){
                const fortune = getRandomFortune();
                showFortune(fortune);
            });
        }

        if (anotherBtn) {
            anotherBtn.addEventListener('click', function(){
                resetCookie();
            });
        }

        if (dlBtn) {
            dlBtn.addEventListener('click', function(){
                if (currentFortune) {
                    const svg = makeSvg(currentFortune);
                    svgToPngDownload(svg, 'fortune-for-us.png');
                }
            });
        }
    });
})();
