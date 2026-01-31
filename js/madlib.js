// Mad‑Lib page behavior: generate card, print, download PNG. No storage.
(function(){
    function qs(sel, ctx=document){ return ctx.querySelector(sel); }

    function readQueryParam(name){
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    function escapeHtml(s){
        return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
    }

    function makeCardHTML(data, dayLabel){
        // Simple SVG card for crisp printing and PNG export
        const title = escapeHtml(dayLabel || 'A Little Poem for You');
        const adj = escapeHtml(data.adj);
        const noun = escapeHtml(data.noun);
        const verb = escapeHtml(data.verb);
        const place = escapeHtml(data.place);

        const poemLines = [
            `You are my ${adj}, my sweetest ${noun},`,
            `You ${verb} in the corners of our days,`,
            `And even the quiet feels like a celebration`,
            `Whenever I think of ${place} with you.`
        ];

        const svg = `
            <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
                <defs>
                    <style>
                        <![CDATA[
                        .bg{fill:#FBF5DE}
                        .paper{fill:#fff;stroke:#EAC8A6;stroke-width:6}
                        .title{font-family:Georgia, serif; font-size:36px; fill:#8B7355}
                        .poem{font-family:Georgia, serif; font-size:26px; fill:#6B5B4A}
                        .signature{font-family:Georgia, serif; font-size:20px; fill:#DC3C22}
                        ]]>
                    </style>
                </defs>
                <rect class='bg' width='100%' height='100%'></rect>
                <rect class='paper' x='80' y='80' width='1040' height='640' rx='6' ry='6'></rect>
                <text x='150' y='150' class='title'>${title}</text>
                <g transform='translate(150,200)'>
                    <text class='poem' x='0' y='0'>${poemLines[0]}</text>
                    <text class='poem' x='0' y='50'>${poemLines[1]}</text>
                    <text class='poem' x='0' y='100'>${poemLines[2]}</text>
                    <text class='poem' x='0' y='150'>${poemLines[3]}</text>
                </g>
                <text x='150' y='520' class='signature'>Forever yours,</text>
                <text x='150' y='550' class='signature' font-weight='700'>Shafin</text>
            </svg>
        `;

        return svg;
    }

    function showResult(svgString){
        const container = qs('#madlibCardContainer');
        container.innerHTML = svgString;
        qs('#result').style.display = 'block';
        qs('#madlibForm').style.display = 'none';
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
            // white background
            ctx.fillStyle = '#fff';
            ctx.fillRect(0,0,canvas.width,canvas.height);
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
        const form = qs('#madlibForm');
        const printBtn = qs('#printBtn');
        const downloadBtn = qs('#downloadBtn');
        const editBtn = qs('#editBtn');
        const resetBtn = qs('#resetBtn');
        const dayParam = readQueryParam('day');

        if(dayParam){
            qs('#madlibDay').textContent = `Day ${dayParam} — Mini Poem`;
        }

        form.addEventListener('submit', function(e){
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
                adj: formData.get('adj') || '',
                noun: formData.get('noun') || '',
                verb: formData.get('verb') || '',
                place: formData.get('place') || ''
            };
            const dayLabel = dayParam ? `For Day ${dayParam}` : 'A Little Poem For You';
            const svg = makeCardHTML(data, dayLabel);
            showResult(svg);
        });

        printBtn && printBtn.addEventListener('click', function(){
            // Open printable new window with the SVG to use browser's print (no storage)
            const svg = qs('#madlibCardContainer').innerHTML;
            const w = window.open('', '_blank');
            w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Print Card</title>');
            w.document.write('<style>body{margin:0;background:#FBF5DE;font-family:Georgia, serif}.card{max-width:1200px;margin:20px auto;}</style>');
            w.document.write('</head><body>');
            w.document.write('<div class="card">' + svg + '</div>');
            w.document.write('</body></html>');
            w.document.close();
            w.focus();
            // Give new window time to render
            setTimeout(()=>{ w.print(); }, 300);
        });

        downloadBtn && downloadBtn.addEventListener('click', function(){
            const svg = qs('#madlibCardContainer').innerHTML;
            svgToPngDownload(svg, 'madlib-card.png');
        });

        editBtn && editBtn.addEventListener('click', function(){
            qs('#result').style.display = 'none';
            qs('#madlibForm').style.display = '';
        });

        resetBtn && resetBtn.addEventListener('click', function(){
            form.reset();
        });
    });
})();