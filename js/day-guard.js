// day-guard.js — enforce date-based access on day pages
(function(){
    function qs(sel, ctx=document){ return ctx.querySelector(sel); }

    function showLockedOverlay(dayNumber){
        const overlay = document.createElement('div');
        overlay.id = 'dayLockedOverlay';
        overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);z-index:99999;padding:24px;';

        const card = document.createElement('div');
        card.style.cssText = 'background:#fff;padding:28px;border-radius:8px;max-width:520px;width:100%;text-align:center;font-family:Georgia, serif;color:#5B4636;box-shadow:0 12px 40px rgba(0,0,0,0.2);';

        const title = document.createElement('div');
        title.style.cssText = 'font-size:22px;font-weight:600;margin-bottom:8px;color:#8B7355';
        title.textContent = 'This day is not open yet';

        const info = document.createElement('p');
        info.style.cssText = 'margin:10px 0 18px;line-height:1.5;color:#6B5B4A;font-size:16px';
        info.textContent = `Please come back on Feb ${dayNumber}, 2026 — we will unlock this day then.`;

        const back = document.createElement('a');
        back.textContent = 'Back to Calendar';
        back.href = '../index.html';
        back.className = 'back-button';
        back.style.cssText = 'display:inline-block;margin-top:8px;';

        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(back);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
    }

    window.ensureDayUnlocked = function(dayNumber){
        // If debug mode is enabled, allow access
        if (window.DEBUG_UNLOCK_ALL) return true;

        // Prefer using isDayUnlockedForEgg if available
        if (typeof window.isDayUnlockedForEgg === 'function'){
            if (window.isDayUnlockedForEgg(dayNumber)) return true;
            showLockedOverlay(dayNumber);
            return false;
        }

        // Fallback: simple date check for Feb 2026
        const now = new Date();
        const target = new Date(2026, 1, Number(dayNumber));
        now.setHours(0,0,0,0);
        target.setHours(0,0,0,0);
        if (now >= target) return true;
        showLockedOverlay(dayNumber);
        return false;
    };
})();