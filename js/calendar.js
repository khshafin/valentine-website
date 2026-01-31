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
window.DEBUG_UNLOCK_ALL = true;

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

// Initialize on page load
document.addEventListener('DOMContentLoaded', createCalendar);
