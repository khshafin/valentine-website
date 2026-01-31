// Letters mapping (matches day 1..14). Note: comma on its own day (day 10).
const LETTERS = ['আ','মি','তো','মা','কে','ভা','লো','বা','সি',',','অ','ধ','রা','!'];

function createGrid() {
    const grid = document.getElementById('easterGrid');
    grid.innerHTML = '';

    // Layout: 7 columns x 2 rows (replicates the calendar look)
    for (let i = 0; i < 14; i++) {
        const cell = document.createElement('div');
        cell.className = 'easter-cell';
        const index = i + 1;
        const letter = LETTERS[i] || '';

        // Add number and a cell-badge (badge hidden until unlocked / animated)
        const numberHTML = `<div class="cell-number">${index}</div>`;
        const badgeHTML = `<div class="cell-badge">${letter}</div>`;

        cell.innerHTML = `${numberHTML}${badgeHTML}`;
        grid.appendChild(cell);
    }
}

// Animate unlock sequence: date show -> badge flies out -> date disappears
function animateUnlockSequence() {
    const grid = document.getElementById('easterGrid');
    const cells = Array.from(grid.querySelectorAll('.easter-cell'));

    // Determine unlocked days
    const unlocked = [];
    cells.forEach((cell, idx) => {
        const dayNumber = idx + 1;
        if (window.isDayUnlockedForEgg && window.isDayUnlockedForEgg(dayNumber)) {
            unlocked.push(idx);
        }
    });

    // For visual flow, animate each unlocked day in order with a stagger
    unlocked.forEach((cellIndex, i) => {
        const delay = i * 700; // time between each unlock
        setTimeout(() => {
            const cell = cells[cellIndex];
            const numberEl = cell.querySelector('.cell-number');
            const badge = cell.querySelector('.cell-badge');

            // Pop-in the date number briefly
            numberEl.classList.add('pop-in');

            // After small pause, animate badge flying out a bit and make it visible
            setTimeout(() => {
                badge.classList.add('fly-out');

                // After its flight, mark the number as hidden and keep badge docked
                setTimeout(() => {
                    numberEl.classList.add('hide-number');
                    badge.classList.remove('fly-out');
                    badge.classList.add('docked');
                }, 550);
            }, 220);
        }, delay);
    });

    // After all unlocks finish, assemble the letters
    const totalDelay = unlocked.length * 700 + 500;
    setTimeout(() => {
        assembleFromDockedBadges();
    }, totalDelay);
}

// Move badges from their docked positions and assemble text
function assembleFromDockedBadges() {
    const grid = document.getElementById('easterGrid');
    const assembleArea = document.getElementById('assembleArea');
    const assembledText = document.getElementById('assembledText');

    assembledText.textContent = '';
    window._assembledLetters = new Array(LETTERS.length).fill('');

    // Collect docked badges in day order
    const cells = Array.from(grid.querySelectorAll('.easter-cell'));
    const docked = [];
    cells.forEach((cell, idx) => {
        const badge = cell.querySelector('.cell-badge');
        if (badge && badge.classList.contains('docked') && badge.textContent.trim()) {
            docked.push({ el: badge, idx });
        }
    });

    // Create flyers (clones) from each docked badge and move to assemble center
    const flyers = docked.map(d => {
        const rect = d.el.getBoundingClientRect();
        const fly = document.createElement('div');
        fly.className = 'fly-letter';
        fly.textContent = d.el.textContent;
        document.body.appendChild(fly);
        fly.style.left = (rect.left + rect.width / 2) + 'px';
        fly.style.top = (rect.top + rect.height / 2) + 'px';
        return { el: fly, idx: d.idx };
    });

    // Destination: center of assembleArea
    const destRect = assembleArea.getBoundingClientRect();
    const centerX = destRect.left + destRect.width / 2;
    const centerY = destRect.top + destRect.height / 2 + 6;

    flyers.forEach((f, i) => {
        const el = f.el;
        const delay = i * 120;
        el.style.transition = `transform 800ms cubic-bezier(.2,.9,.2,1) ${delay}ms, opacity 300ms ${delay}ms`;

        const startRect = el.getBoundingClientRect();
        const dx = centerX - (startRect.left + startRect.width / 2);
        const dy = centerY - (startRect.top + startRect.height / 2);

        requestAnimationFrame(() => {
            el.style.transform = `translate(${dx}px, ${dy}px) scale(0.95)`;
            el.style.opacity = '0.0';
        });

        // Update assembled text in order
        setTimeout(() => {
            const letter = el.textContent;
            const position = f.idx; // original day index
            if (!window._assembledLetters) window._assembledLetters = new Array(LETTERS.length).fill('');
            window._assembledLetters[position] = letter;

            // Build final text inserting spaces where appropriate so final output is:
            // "আমি তোমাকে ভালোবাসি, অধরা!"
            const parts = window._assembledLetters.map(p => p || '');
            let result = '';
            for (let i = 0; i < parts.length; i++) {
                result += parts[i];
                // Insert a space after day 2 (index 1), after day 5 (index 4), and after comma (day 10 index 9)
                if (i === 1 || i === 4 || i === 9) {
                    result += ' ';
                }
            }
            assembledText.textContent = result;
        }, delay + 750);

        // Remove flyer after animation
        setTimeout(() => {
            el.remove();
        }, delay + 1100);
    });
}

function init() {
    createGrid();

    // Start unlock-phase animation after a short pause
    setTimeout(() => {
        animateUnlockSequence();
    }, 400);

    const replay = document.getElementById('replayButton');
    replay.addEventListener('click', () => {
        // Reset grid badges and assembled state
        document.querySelectorAll('.cell-badge').forEach(b => {
            b.classList.remove('docked');
            b.classList.remove('fly-out');
        });
        document.querySelectorAll('.cell-number').forEach(n => {
            n.classList.remove('hide-number');
            n.classList.remove('pop-in');
        });
        document.getElementById('assembledText').textContent = '';
        window._assembledLetters = new Array(LETTERS.length).fill('');
        // rerun sequence
        setTimeout(() => animateUnlockSequence(), 250);
    });
}

window.addEventListener('DOMContentLoaded', init);