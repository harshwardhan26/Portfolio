// Interactive Upgrades: Glitch, Sounds, and Puzzle

// --- 1. GLITCH & SPEAKER LOGIC ---
function initNameInteractions() {
    const nameHeader = document.getElementById('name-header');
    const speakerIcon = document.getElementById('name-speaker');

    if (nameHeader) {
        let glitchTimeout;
        nameHeader.addEventListener('mouseenter', () => {
            if (nameHeader.classList.contains('is-glitching')) return;
            
            // Start glitch
            nameHeader.classList.add('is-glitching');
            nameHeader.setAttribute('data-text', "हर्षवर्धन पाटील");
            nameHeader.innerText = "हर्षवर्धन पाटील";
            
            if (typeof playMemeSound === 'function') playMemeSound('vine_boom');

            // Stop glitch after 2.5 seconds
            clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => {
                nameHeader.classList.remove('is-glitching');
                nameHeader.innerText = "Harshwardhan Patil";
                nameHeader.removeAttribute('data-text');
            }, 2500);
        });
    }

    if (speakerIcon) {
        speakerIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof playMemeSound === 'function') {
                playMemeSound('name_pronunciation');
                speakerIcon.classList.add('playing');
                setTimeout(() => speakerIcon.classList.remove('playing'), 1500);
            }
        });
    }
}

// --- 2. GLOBAL UI SOUNDS ---
function initGlobalSounds() {
    const interactables = document.querySelectorAll('a, button, .puzzle-clue');
    
    interactables.forEach(el => {
        // Prevent adding multiple listeners if barba re-runs this
        if (el.dataset.soundBound) return;
        el.dataset.soundBound = "true";

        el.addEventListener('mouseenter', () => {
            if (typeof playHoverSound === 'function') playHoverSound();
        });

        el.addEventListener('click', () => {
            if (typeof playClickSound === 'function') playClickSound();
        });
    });
}


// Re-initialize on load and barba transitions
document.addEventListener('DOMContentLoaded', () => {
    initNameInteractions();
    initGlobalSounds();
});

// For Barba.js page transitions
if (window.barba) {
    barba.hooks.after(() => {
        initNameInteractions();
        initGlobalSounds();
    });
}
