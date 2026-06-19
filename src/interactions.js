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
