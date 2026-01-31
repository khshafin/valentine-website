// Provides a simple unlocking check for Feb 2026 days and helpers to reveal egg badges
// Default to debug unlock if not defined (useful when testing from pages that don't include calendar.js)
if (typeof window.DEBUG_UNLOCK_ALL === 'undefined') window.DEBUG_UNLOCK_ALL = true;

window.isDayUnlockedForEgg = function(dayNumber) {
    // Honor global debug override for testing
    if (window.DEBUG_UNLOCK_ALL) return true;

    const now = new Date();
    const target = new Date(2026, 1, Number(dayNumber)); // month index 1 = Feb
    now.setHours(0,0,0,0);
    target.setHours(0,0,0,0);
    return now >= target;
};

window.revealEggIfUnlocked = function(dayNumber, selector) {
    try {
        const el = document.querySelector(selector);
        if (!el) return;
        if (window.isDayUnlockedForEgg(dayNumber)) {
            el.classList.add('egg-visible');
        } else {
            el.classList.remove('egg-visible');
        }
    } catch (e) {
        // ignore
    }
};
