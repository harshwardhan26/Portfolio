const sounds = {
    vine_boom: new Audio('sounds/vine_boom.wav'),
    metal_pipe: new Audio('sounds/metal_pipe.wav'),
    sad_violin: new Audio('sounds/sad_violin.wav'),
    airhorn: new Audio('sounds/airhorn.wav'),
    ba_dum_tss: new Audio('sounds/ba_dum_tss.wav'),
    crickets: new Audio('sounds/crickets.wav'),
    get_out: new Audio('sounds/get_out.wav'),
    scream: new Audio('sounds/scream.wav'),
    name_pronunciation: new Audio('sounds/name_pronunciation.wav')
};

// Set volumes (some meme sounds are very loud!)
sounds.metal_pipe.volume = 0.5;
sounds.scream.volume = 0.4;
sounds.vine_boom.volume = 0.8;
sounds.airhorn.volume = 0.6;

let isMuted = localStorage.getItem('pa_isMuted') === 'true';

function playMemeSound(soundName) {
    if (isMuted) return;
    const sound = sounds[soundName];
    if (sound) {
        // Clone the node so we can play the same sound multiple times overlapping
        const clone = sound.cloneNode();
        clone.volume = sound.volume;
        clone.play().catch(e => {
            // Browsers may block autoplay before user interaction, catch the error gracefully
            console.log("Audio play blocked by browser:", e);
        });
    }
}

function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('pa_isMuted', isMuted);
    updateMuteUI();
}

function updateMuteUI() {
    const muteBtn = document.getElementById('pa-mute-btn');
    if (muteBtn) {
        if (isMuted) {
            muteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <line x1="17" y1="7" x2="21" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="21" y1="7" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>`;
        } else {
            muteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>`;
        }
    }
}

// Global Synth Sounds
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playHoverSound() {
    if (isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function playClickSound() {
    if (isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
}
