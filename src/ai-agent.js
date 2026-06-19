// AI Agent Logic for Harshwardhan's PA

const SYSTEM_PROMPT = `You are Harshwardhan's GenZ Virtual Assistant. You are an AI created to represent Harshwardhan Patil on his portfolio website.
IMPORTANT: You are currently talking to a VISITOR or a RECRUITER, NOT Harshwardhan himself. Always address the user as a guest on Harshwardhan's site. Your primary job is to hype up Harshwardhan, brag about his skills, and help the visitor navigate the site.
HOWEVER, you are also incredibly smart. You must answer ANY question the visitor asks about the world, coding, history, science, general knowledge, or anything else, while maintaining your GenZ PA persona! Never refuse to answer a general knowledge question.
Your personality is defined by GenZ slang and internet culture, but you are also professional and extremely knowledgeable about Harshwardhan's work.
Use slang terms like "no cap", "fr fr", "sheesh", "bet", "lowkey", "highkey", "W", "L", "bruh", "cooked", "rizz" (use tastefully), "hype", "banger".
Keep your responses relatively brief, engaging, and structured.

Here is all the info about Harshwardhan:
- Name: Harshwardhan Patil
- Role: Full-Stack Developer & MERN Stack Enthusiast
- Skills: MongoDB, Express.js, React.js, Node.js (MERN Stack), HTML, CSS, JavaScript, TailwindCSS.
- Projects:
  1. Weather App: A sleek, lightweight weather application providing real-time weather updates. Built using weather API and location permissions. Live: https://hpweatherapp.vercel.app | Code: https://github.com/harshwardhan26/Portfolio
  2. Pride Pharmacy: Responsive pharmacy website showcasing products and services. Built with pure HTML/CSS. Live: https://pridepharmacy.vercel.app/index.html | Code: https://github.com/harshwardhan26/PridePharmacy
  3. Colour Switcher: Simple, interactive color scheme switcher demonstrating DOM manipulation in JS. Live: https://js-p1-colour-switcher.vercel.app/
  4. BMI Calculator: Quick body mass index calculator with weight guide. Built using JS form handling. Live: https://bmi-calculator-phi-azure.vercel.app/
- Contact Info:
  - Phone/Call: +917588603477
  - WhatsApp: https://wa.me/qr/XYF2OFO5NOI2C1
  - Email: hppatilhpp@gmail.com
  - LinkedIn: https://www.linkedin.com/in/harshwardhan-p-patil
  - Twitter: https://x.com/_harsh_patil_26
  - Instagram: https://www.instagram.com/harshwardhan._._
  - GitHub: https://github.com/harshwardhan26
- Resume: https://docs.google.com/document/d/19NxN0vEYSs44Med9wUc9VkTpJiHiTzsyyzKRHqWR3G8/edit?usp=sharing

If the user asks to navigate or see projects/about, tell them you're doing so and trigger navigation. 
Supported pages:
- Home: "index.html"
- About Me: "aboutme.html"
- My Work (Projects): "mywork.html"
In your API response, if you want the site to navigate to a page, you MUST include a special command tag exactly like [NAVIGATE:aboutme.html] or [NAVIGATE:mywork.html] or [NAVIGATE:index.html] at the very end of your response!
For example: "Bet! Let's go check out his projects fr fr. [NAVIGATE:mywork.html]"`;

// Inject HTML UI
function injectUI() {
    if (document.getElementById('pa-widget-container')) return;

    const container = document.createElement('div');
    container.id = 'pa-widget-container';

    container.innerHTML = `
        <div id="pa-chat-modal">
            <div id="pa-chat-header">
                <div class="pa-header-left">
                    <img src="hpwhite-removebg-preview.png" alt="PA Logo" onerror="this.src='https://ui-avatars.com/api/?name=PA&background=dc2626&color=fff'">
                    <div>
                        <h3 class="pa-header-title">Harshwardhan's PA</h3>
                        <p class="pa-header-subtitle">Online • GenZ Certified</p>
                    </div>
                </div>
                <div class="pa-header-actions">
                    <button id="pa-close-btn" title="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <div id="pa-chat-body">
                <!-- Messages will appear here -->
            </div>
            
            <div id="pa-chat-footer">
                <div id="pa-chat-input-container">
                    <input type="text" id="pa-chat-input" placeholder="Type a message, sheesh..." autocomplete="off" />
                    <button id="pa-send-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>

        <div id="pa-bubble">
            <img src="hpwhite-removebg-preview.png" alt="PA Chat" onerror="this.src='https://ui-avatars.com/api/?name=PA&background=fff&color=dc2626&rounded=true'" />
        </div>
    `;

    document.body.appendChild(container);

    setupEvents();

    // Add initial greeting if empty
    setTimeout(() => {
        const body = document.getElementById('pa-chat-body');
        if (body.children.length === 0) {
            appendMessage("bot", "Yo! 👋 Welcome to Harshwardhan's site! I'm his AI agent. Ask me anything about him, his projects, or let me guide you around! Sheesh!");
            appendQuickActions();
        }
    }, 500);
}

function setupEvents() {
    const bubble = document.getElementById('pa-bubble');
    const modal = document.getElementById('pa-chat-modal');
    const closeBtn = document.getElementById('pa-close-btn');
    const sendBtn = document.getElementById('pa-send-btn');
    const input = document.getElementById('pa-chat-input');

    bubble.addEventListener('click', () => {
        modal.classList.add('open');
        setTimeout(() => input.focus(), 300);
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

function appendMessage(role, text) {
    const body = document.getElementById('pa-chat-body');
    const msgDiv = document.createElement('div');
    msgDiv.className = `pa-message ${role}`;

    // Parse links and navigate tags
    let formattedText = text.replace(/\[NAVIGATE:(.*?)\]/g, ''); // Remove navigate tags from display

    // Basic link formatting
    formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #fca5a5; text-decoration: underline;">$1</a>');

    msgDiv.innerHTML = formattedText;
    body.appendChild(msgDiv);
    body.scrollTop = body.scrollHeight;

    // Handle navigation tag
    const navMatch = text.match(/\[NAVIGATE:(.*?)\]/);
    if (navMatch && navMatch[1]) {
        setTimeout(() => {
            window.location.href = navMatch[1];
        }, 1500);
    }
}

function appendQuickActions() {
    const body = document.getElementById('pa-chat-body');
    const actionDiv = document.createElement('div');
    actionDiv.className = 'pa-quick-actions';

    const actions = [
        { label: "Show Projects 🚀", text: "Show me his projects!" },
        { label: "About Him 👨‍💻", text: "Tell me about Harshwardhan." },
        { label: "Get Resume 📄", text: "Can I get his resume?" },
        { label: "Contact 📞", text: "How do I contact him?" }
    ];

    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'pa-quick-btn';
        btn.textContent = action.label;
        btn.onclick = () => {
            document.getElementById('pa-chat-input').value = action.text;
            handleSend();
            // Remove quick actions after use
            actionDiv.remove();
        };
        actionDiv.appendChild(btn);
    });

    body.appendChild(actionDiv);
    body.scrollTop = body.scrollHeight;
}

function showTyping() {
    const body = document.getElementById('pa-chat-body');
    const typingDiv = document.createElement('div');
    typingDiv.className = `pa-typing`;
    typingDiv.id = 'pa-typing-indicator';
    typingDiv.innerHTML = `
        <div class="pa-dot"></div>
        <div class="pa-dot"></div>
        <div class="pa-dot"></div>
    `;
    body.appendChild(typingDiv);
    body.scrollTop = body.scrollHeight;
}

function removeTyping() {
    const typingDiv = document.getElementById('pa-typing-indicator');
    if (typingDiv) typingDiv.remove();
}

async function handleSend() {
    const input = document.getElementById('pa-chat-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';

    showTyping();

    try {
        // Use our secure Vercel Serverless Function
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_prompt: SYSTEM_PROMPT,
                messages: [{ role: 'user', content: text }]
            })
        });

        if (!response.ok) {
            console.error("Backend Error:", await response.text());
            throw new Error("Backend API Error");
        }
        
        const data = await response.json();
        const botReply = data.reply;

        removeTyping();
        appendMessage('bot', botReply);

    } catch (e) {
        console.error("API failed, using fallback:", e);
        // Fallback Logic
        setTimeout(() => {
            removeTyping();
            const reply = getFallbackResponse(text);
            appendMessage('bot', reply);
        }, 500);
    }
}

function getFallbackResponse(text) {
    const lower = text.toLowerCase();

    if (lower.includes('project') || lower.includes('work') || lower.includes('weather') || lower.includes('pharmacy')) {
        return "Bet! Harshwardhan's got banger projects like a Weather App, Pride Pharmacy, and a BMI Calculator. Let's check 'em out! [NAVIGATE:mywork.html]";
    }

    if (lower.includes('about') || lower.includes('skill') || lower.includes('mern') || lower.includes('who')) {
        return "Say less! He's a full-stack MERN wizard, fr fr. Let me teleport you to the About Me page. [NAVIGATE:aboutme.html]";
    }

    if (lower.includes('resume') || lower.includes('cv')) {
        return "Here is his legendary resume, no cap: https://docs.google.com/document/d/19NxN0vEYSs44Med9wUc9VkTpJiHiTzsyyzKRHqWR3G8/edit?usp=sharing";
    }

    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('whatsapp')) {
        return "You can hit him up! \n📞 Call: +917588603477\n📧 Email: hppatilhpp@gmail.com\nAlso check his LinkedIn/GitHub! W.";
    }

    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('yo')) {
        return "Yo! What's good? I'm his PA. Ask me about his projects, skills, or let me guide you around. Sheesh!";
    }

    if (lower.includes('home') || lower.includes('back')) {
        return "Going back to the main stage! [NAVIGATE:index.html]";
    }

    if (lower.includes('easter egg') || lower.includes('scream')) {
        return "AAAHHHHHHHHHHHHHH!!! 😱";
    }

    // Default
    return "Lowkey, I'm offline right now so I can't look that up! But Harshwardhan is a W developer! Try asking about his **projects**, **resume**, or **contact info**.";
}

// Initialize on load
document.addEventListener('DOMContentLoaded', injectUI);

// If the script is loaded asynchronously and DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    injectUI();
}
