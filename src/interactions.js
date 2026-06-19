// Interactive Upgrades: Glitch, Sounds, and Puzzle

// --- 1. GLITCH & SPEAKER LOGIC ---
function initNameInteractions() {
    const nameHeader = document.getElementById('name-header');

    if (nameHeader) {
        let glitchTimeout;
        nameHeader.addEventListener('mouseenter', () => {
            if (nameHeader.classList.contains('is-glitching')) return;
            
            // Start glitch
            nameHeader.classList.add('is-glitching');
            nameHeader.setAttribute('data-text', "हर्षवर्धन पाटील");
            nameHeader.innerText = "हर्षवर्धन पाटील";
            
            // Stop glitch after 2.5 seconds
            clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => {
                nameHeader.classList.remove('is-glitching');
                nameHeader.innerText = "Harshwardhan Patil";
                nameHeader.removeAttribute('data-text');
            }, 2500);
        });
    }

    const speakerIcon = document.getElementById('name-speaker');
    if (speakerIcon) {
        // Preload the audio file
        const pronunciationAudio = new Audio('sounds/name_pronunciation.wav');
        pronunciationAudio.volume = 0.8;

        speakerIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Clone the audio node so it can be played multiple times quickly
            const clone = pronunciationAudio.cloneNode();
            clone.volume = pronunciationAudio.volume;
            clone.play().catch(e => console.log("Audio play blocked by browser:", e));
            
            speakerIcon.classList.add('playing');
            setTimeout(() => speakerIcon.classList.remove('playing'), 1500);
        });
    }
}




// Re-initialize on load and barba transitions
document.addEventListener('DOMContentLoaded', () => {
    initNameInteractions();
});

// For Barba.js page transitions
if (window.barba) {
    barba.hooks.after(() => {
        initNameInteractions();
    });
}
