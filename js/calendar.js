// Calendar configuration
const DAYS_DATA = [
    { day: 1, month: 2, year: 2026 },
    { day: 2, month: 2, year: 2026 },
    { day: 3, month: 2, year: 2026 },
    { day: 4, month: 2, year: 2026 },
    { day: 5, month: 2, year: 2026 },
    { day: 6, month: 2, year: 2026 },
    { day: 7, month: 2, year: 2026 },
    { day: 8, month: 2, year: 2026 },
    { day: 9, month: 2, year: 2026 },
    { day: 10, month: 2, year: 2026 },
    { day: 11, month: 2, year: 2026 },
    { day: 12, month: 2, year: 2026 },
    { day: 13, month: 2, year: 2026 },
    { day: 14, month: 2, year: 2026 }
];

// DEBUG: set to true to unlock all days for development/testing
// Default to false in production so days open only on/after their date.
// You can enable it in the console for testing: `window.DEBUG_UNLOCK_ALL = true`.
window.DEBUG_UNLOCK_ALL = false;

// Check if a day is unlocked
function isDayUnlocked(dayData) {
    // Honor debug override
    if (window.DEBUG_UNLOCK_ALL) return true;

    // Date-based locking (actual behavior)
    const now = new Date();
    const targetDate = new Date(dayData.year, dayData.month - 1, dayData.day);
    now.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    return now >= targetDate;
}

// Format date for display
function formatDate(dayData) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[dayData.month - 1]} ${dayData.day}`;
}

// Create calendar
function createCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;

    // clear existing children so function is idempotent
    grid.innerHTML = '';

    DAYS_DATA.forEach((dayData, index) => {
        const dayNumber = index + 1;
        const isUnlocked = isDayUnlocked(dayData);
        const isSpecial = dayNumber === 14;

        const card = document.createElement('div');
        card.className = `day-card ${isUnlocked ? 'unlocked' : 'locked'} ${isSpecial ? 'special' : ''}`;

        if (isUnlocked) {
            card.onclick = () => {
                window.location.href = `days/day${dayNumber}.html`;
            };
        }

        card.innerHTML = `
            <div class="day-number">${dayNumber}</div>
            <div class="day-label">${formatDate(dayData)}</div>
            ${!isUnlocked ? '<div class="lock-icon">🔒</div>' : ''}
        `;

        grid.appendChild(card);
    });
}

// Allow toggling debug unlock mode programmatically and refresh calendar
window.setDebugUnlockAll = function(val) {
    window.DEBUG_UNLOCK_ALL = !!val;
    // refresh any UI that depends on unlock state
    createCalendar();
    // refresh per-page egg visibility when possible
    try { document.querySelectorAll('.egg-letter-day').forEach((el, i)=>{ const day = i+1; if(window.isDayUnlockedForEgg(day)) el.classList.add('egg-visible'); else el.classList.remove('egg-visible'); }); } catch(e) {}
};

// Dev-only toggle UI (visible only on localhost/127.0.0.1)
function createDevToggle(){
    try{
        const host = location.hostname;
        if (!['localhost','127.0.0.1','::1'].includes(host)) return;
        const btn = document.createElement('button');
        btn.id = 'devToggle';
        btn.className = 'dev-toggle';
        btn.textContent = `Dev: Unlock All (${window.DEBUG_UNLOCK_ALL ? 'On' : 'Off'})`;
        btn.title = 'Toggle unlocking for local development';
        btn.addEventListener('click', ()=>{
            const newVal = !window.DEBUG_UNLOCK_ALL;
            window.setDebugUnlockAll(newVal);
            btn.textContent = `Dev: Unlock All (${newVal ? 'On' : 'Off'})`;
            btn.classList.toggle('on', newVal);
        });
        document.body.appendChild(btn);
    }catch(e){ /* ignore */ }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createCalendar();
    createDevToggle();
});
// Initialize on page load
document.addEventListener('DOMContentLoaded', createCalendar);
