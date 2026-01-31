// future-sentence.js - client-only generator for a single-sentence card
(function(){
    function qs(sel, ctx=document){ return ctx.querySelector(sel); }
    function readQueryParam(name){ const p = new URLSearchParams(window.location.search); return p.get(name); }
    function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

    function makeSvg(sentence, dayLabel){
        const clean = escapeHtml(sentence);
        const title = 'One Sentence For Us:';
        const subtitle = dayLabel ? ("Day " + dayLabel) : '';

        // wrap long text into lines ~ 55 chars
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

        const lines = wrap(clean, 45);

        const svgLines = lines.map((l,i) => `<text class='sentence' x='90' y='${220 + i*50}'>${l}</text>`).join('\n');

        const svg = `
            <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'>
                <defs>
                    <style>
                        <![CDATA[
                        .bg{fill:#FBF5DE}
                        .card{fill:#fff;stroke:#EAC8A6;stroke-width:6}
                        .title{font-family:Georgia, serif; font-size:30px; fill:#8B7355}
                        .sentence{font-family:Georgia, serif; font-size:28px; fill:#6B5B4A}
                        .meta{font-family:Georgia, serif; font-size:18px; fill:#8B7355}
                        ]]>
                    </style>
                </defs>
                <rect class='bg' width='100%' height='100%'></rect>
                <rect class='card' x='60' y='60' width='1080' height='480' rx='6' ry='6'></rect>
                <text x='90' y='140' class='title'>${title}</text>
                ${subtitle ? `<text x='90' y='180' class='meta'>${subtitle}</text>` : ''}
                ${svgLines}
                <text x='90' y='520' class='meta'>— Forever yours, Shafin</text>
            </svg>
        `;
        return svg;
    }

    function showResult(svg){
        const container = qs('#fsCardContainer');
        container.innerHTML = svg;
        qs('#fsResult').style.display = 'block';
        qs('#fsForm').style.display = 'none';
    }

    function svgToPngDownload(svgString, filename){
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = function(){
            const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(img,0,0);
            canvas.toBlob(function(blob){ const a = document.createElement('a'); a.download = filename; a.href = URL.createObjectURL(blob); document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }, 'image/png');
        };
        img.onerror = function(){ alert('Could not generate image. Please try printing instead.'); URL.revokeObjectURL(url); };
        img.src = url;
    }

    document.addEventListener('DOMContentLoaded', function(){
        const form = qs('#fsForm');
        const printBtn = qs('#fsPrint');
        const dlBtn = qs('#fsDownload');
        const editBtn = qs('#fsEdit');
        const resetBtn = qs('#resetFs');
        const backToDay = qs('#backToDay');
        const dayParam = readQueryParam('day');

        if(dayParam){
            qs('#fsTitle').textContent = `Day ${dayParam} — One Sentence For Us`;
            backToDay.href = `day${dayParam}.html`;
            backToDay.textContent = `Back to Day ${dayParam}`;
            const bottomBack = qs('#fsBottomBack');
            if(bottomBack){
                bottomBack.href = `day${dayParam}.html`;
                bottomBack.textContent = `Back to Day ${dayParam}`;
            }
        } else {
            backToDay.href = 'bouquet.html';
            backToDay.textContent = 'Back';
        }

        form.addEventListener('submit', function(e){
            e.preventDefault();
            const sentence = qs('#sentence').value.trim();
            if(!sentence) return;
            const svg = makeSvg(sentence, dayParam);
            showResult(svg);
        });

        printBtn && printBtn.addEventListener('click', function(){
            const svg = qs('#fsCardContainer').innerHTML;
            const w = window.open('', '_blank');
            w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Print Card</title>');
            w.document.write('<style>body{margin:0;background:#FBF5DE;font-family:Georgia, serif}.card{max-width:1200px;margin:20px auto;}</style>');
            w.document.write('</head><body>');
            w.document.write('<div class="card">' + svg + '</div>');
            w.document.write('</body></html>');
            w.document.close();
            w.focus();
            setTimeout(()=>{ w.print(); }, 300);
        });

        dlBtn && dlBtn.addEventListener('click', function(){
            const svg = qs('#fsCardContainer').innerHTML;
            svgToPngDownload(svg, 'one-sentence-card.png');
        });

        editBtn && editBtn.addEventListener('click', function(){
            qs('#fsResult').style.display = 'none';
            qs('#fsForm').style.display = '';
        });

        resetBtn && resetBtn.addEventListener('click', function(){ form.reset(); });
    });
})();