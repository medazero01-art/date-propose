/* ==========================================================================
   SITE D'INVITATION EN DATE ROMANTIQUE - SCRIPT INTERACTIF
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Éléments du DOM ---
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const teaseBubble = document.getElementById('tease-bubble');
    const teaseText = document.getElementById('tease-text');
    const attemptCounter = document.getElementById('attempt-counter');
    const counterNum = document.getElementById('counter-num');
    const proposalCard = document.getElementById('proposal-card');
    const celebrationCard = document.getElementById('celebration-card');
    const replayBtn = document.getElementById('replay-btn');
    const musicBtn = document.getElementById('music-btn');
    const musicStatus = document.getElementById('music-status');
    const whatsappShare = document.getElementById('whatsapp-share');

    // --- Variables d'état ---
    let evasionCount = 0;
    let isEscaped = false;
    let isCelebrating = false;
    let yesScale = 1;

    // Messages taquins progressifs
    const teaseMessages = [
        "Oups, trop rapide pour toi ! 🏃‍♂️💨",
        "Tu as glissé sur le mauvais bouton ? 🤭",
        "Essaie encore pour voir ! 😜",
        "Ce bouton est allergique aux refus ! 🌸",
        "Même pas en rêve ! 😉",
        "Regarde le gros bouton rose, il t'attend ! 💖",
        "Erreur 404 : L'option 'Non' a fondu sous ton charme 🥰",
        "Tu triches, il faut cliquer sur OUI ! ✨",
        "Allez dis ouiii, je t'emmène au paradis ! 🌹",
        "Tu n'as aucune chance de m'attraper ! 🚀"
    ];

    // Configuration du lien WhatsApp
    const loveMessage = encodeURIComponent("J'ai dit OUI pour notre date magique ! 💖✨ Prépare-toi à me faire passer la plus belle des soirées 🥰🌹");
    if (whatsappShare) {
        whatsappShare.href = `https://api.whatsapp.com/send?text=${loveMessage}`;
    }

    // ==========================================================================
    // 1. ALGORITHME D'ESQUIVE DU BOUTON "NON" (FUITE INFINIE ET VISIBLE)
    // ==========================================================================

    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    function moveNoButton(fromMouseX, fromMouseY) {
        if (isCelebrating) return;

        evasionCount++;
        counterNum.textContent = evasionCount;
        attemptCounter.classList.add('show');

        // Afficher message taquin en boucle infinie
        const msgIndex = (evasionCount - 1) % teaseMessages.length;
        teaseText.textContent = teaseMessages[msgIndex];
        teaseBubble.classList.add('show');

        // Agrandir légèrement le bouton OUI pour attirer l'attention
        yesScale = Math.min(yesScale + 0.06, 1.8);
        btnYes.style.transform = `scale(${yesScale})`;

        // Activer le mode volant / absolu sur le premier évitement
        if (!isEscaped) {
            btnNo.classList.add('running');
            isEscaped = true;
        }

        // Toujours s'assurer que le bouton reste parfaitement visible
        btnNo.style.display = 'inline-flex';
        btnNo.style.opacity = '1';
        btnNo.style.visibility = 'visible';

        // Dimensions de sécurité
        const btnWidth = btnNo.offsetWidth || 130;
        const btnHeight = btnNo.offsetHeight || 50;
        const margin = 25;

        const minX = margin;
        const maxX = Math.max(minX, window.innerWidth - btnWidth - margin);
        const minY = margin;
        const maxY = Math.max(minY, window.innerHeight - btnHeight - margin);

        const mX = (typeof fromMouseX === 'number') ? fromMouseX : lastMouseX;
        const mY = (typeof fromMouseY === 'number') ? fromMouseY : lastMouseY;

        // Chercher une position nettement éloignée du curseur (distance minimale garantie)
        let newX = minX;
        let newY = minY;
        let bestDist = -1;

        // Tester 15 positions potentielles et choisir celle qui offre la plus belle distance de fuite
        for (let i = 0; i < 15; i++) {
            const testX = Math.floor(Math.random() * (maxX - minX)) + minX;
            const testY = Math.floor(Math.random() * (maxY - minY)) + minY;
            const distFromCursor = Math.hypot(testX - mX, testY - mY);

            if (distFromCursor > bestDist) {
                bestDist = distFromCursor;
                newX = testX;
                newY = testY;
            }
        }

        // Rotation amusante aléatoire
        const randomRot = Math.floor(Math.random() * 20) - 10;

        btnNo.style.position = 'fixed';
        btnNo.style.left = `${newX}px`;
        btnNo.style.top = `${newY}px`;
        btnNo.style.transform = `rotate(${randomRot}deg) scale(1.05)`;

        // Petite étincelle magique
        createEscapeSparkle(newX + btnWidth / 2, newY + btnHeight / 2);
    }

    // Détection continue de la proximité de la souris
    document.addEventListener('mousemove', (e) => {
        if (isCelebrating) return;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        const rect = btnNo.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
        const triggerDistance = isEscaped ? 105 : 85;

        if (dist < triggerDistance) {
            moveNoButton(e.clientX, e.clientY);
        }
    });

    // Événements survol, clic et tactile pour mobile
    btnNo.addEventListener('mouseenter', (e) => moveNoButton(e.clientX, e.clientY));
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0] || e.changedTouches[0];
        moveNoButton(touch ? touch.clientX : null, touch ? touch.clientY : null);
    }, { passive: false });
    btnNo.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) moveNoButton(touch.clientX, touch.clientY);
    }, { passive: false });
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton(e.clientX, e.clientY);
    });

    // Recentrer le bouton si la fenêtre est redimensionnée
    window.addEventListener('resize', () => {
        if (isEscaped && !isCelebrating) {
            const rect = btnNo.getBoundingClientRect();
            const btnWidth = btnNo.offsetWidth || 130;
            const btnHeight = btnNo.offsetHeight || 50;
            const margin = 20;

            const maxX = Math.max(margin, window.innerWidth - btnWidth - margin);
            const maxY = Math.max(margin, window.innerHeight - btnHeight - margin);

            const clampedX = Math.min(Math.max(rect.left, margin), maxX);
            const clampedY = Math.min(Math.max(rect.top, margin), maxY);

            btnNo.style.left = `${clampedX}px`;
            btnNo.style.top = `${clampedY}px`;
        }
    });

    // ==========================================================================
    // 2. CÉLÉBRATION LORS DU CLIC SUR "OUI"
    // ==========================================================================

    btnYes.addEventListener('click', () => {
        isCelebrating = true;

        // Masquer la carte de proposition avec animation
        proposalCard.style.opacity = '0';
        proposalCard.style.transform = 'scale(0.9) translateY(-20px)';
        
        // Cacher le bouton Non fuyant s'il était en plein vol
        btnNo.style.display = 'none';

        setTimeout(() => {
            proposalCard.classList.add('hidden');
            celebrationCard.classList.remove('hidden');
            
            // Lancer la grande pluie de confettis
            launchHeartConfetti();

            // Jouer douce mélodie si pas encore activée
            if (!isAudioPlaying) {
                toggleMusic();
            }
        }, 400);
    });

    // Bouton pour rejouer l'animation de confettis
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            launchHeartConfetti();
        });
    }

    // ==========================================================================
    // 3. EFFETS DE CONFETTIS & CŒURS MAGIQUES
    // ==========================================================================

    function launchHeartConfetti() {
        if (typeof confetti !== 'function') return;

        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;

        const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#ffffff', '#fbbf24'];

        // Salve immédiate centrale
        confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors
        });

        // Pluie continue de confettis
        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 35 * (timeLeft / duration);

            confetti({
                particleCount,
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: colors,
                shapes: ['circle', 'square'],
                scalar: 1.2
            });
        }, 250);
    }

    function createEscapeSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '1.4rem';
        sparkle.style.zIndex = '9999';
        sparkle.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        sparkle.style.transform = 'translate(-50%, -50%) scale(1)';
        sparkle.style.opacity = '1';

        document.body.appendChild(sparkle);

        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(-50%, -80px) scale(0.3) rotate(${Math.random() * 60 - 30}deg)`;
            sparkle.style.opacity = '0';
        });

        setTimeout(() => sparkle.remove(), 700);
    }

    // ==========================================================================
    // 4. ANIMATION DE FOND (CANVAS CŒURS FLOTTANTS)
    // ==========================================================================

    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let hearts = [];

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class FloatingHeart {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
            this.y = (canvas ? canvas.height : window.innerHeight) + Math.random() * 50;
            this.size = Math.random() * 14 + 10;
            this.speedY = Math.random() * 1.2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.opacity = Math.random() * 0.45 + 0.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.02;
            this.color = Math.random() > 0.4 ? '#fda4af' : '#f472b6';
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotSpeed;

            if (this.y < -30) {
                this.reset();
            }
        }

        draw() {
            if (!ctx) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            // Dessin forme de cœur SVG en Canvas Path
            const s = this.size / 30;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-10 * s, -15 * s, -25 * s, 0, 0, 25 * s);
            ctx.bezierCurveTo(25 * s, 0, 10 * s, -15 * s, 0, 0);
            ctx.fill();
            ctx.restore();
        }
    }

    if (canvas && ctx) {
        const heartCount = Math.min(Math.floor(window.innerWidth / 40), 30);
        for (let i = 0; i < heartCount; i++) {
            const h = new FloatingHeart();
            h.y = Math.random() * canvas.height; // Répartition initiale
            hearts.push(h);
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hearts.forEach(heart => {
                heart.update();
                heart.draw();
            });
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    // ==========================================================================
    // 5. AMBIANCE MUSICALE DOUCE (SYNTHÉTISEUR ROMANTIQUE WEB AUDIO)
    // ==========================================================================

    let audioCtx = null;
    let isAudioPlaying = false;
    let melodyInterval = null;

    // Notes de la mélodie douce (gamme pentatonique majeure romantique)
    const melodyNotes = [
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        523.25, // C5
        587.33, // D5
        659.25  // E5
    ];

    function playSoftChime(freq, duration = 1.2) {
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            // Enveloppe douce et soyeuse
            gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (err) {
            console.warn('Audio note error:', err);
        }
    }

    function startMelodyLoop() {
        let step = 0;
        const chords = [
            [523.25, 659.25], // C5, E5
            [440.00, 523.25], // A4, C5
            [392.00, 493.88], // G4, B4
            [329.63, 392.00]  // E4, G4
        ];

        melodyInterval = setInterval(() => {
            if (!isAudioPlaying || !audioCtx) return;
            const currentChord = chords[step % chords.length];
            playSoftChime(currentChord[0], 1.8);
            setTimeout(() => {
                if (isAudioPlaying) playSoftChime(currentChord[1], 1.6);
            }, 300);
            step++;
        }, 1400);
    }

    function toggleMusic() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (isAudioPlaying) {
            isAudioPlaying = false;
            clearInterval(melodyInterval);
            musicBtn.classList.remove('playing');
            musicStatus.textContent = "Musique : Off";
        } else {
            isAudioPlaying = true;
            musicBtn.classList.add('playing');
            musicStatus.textContent = "Musique : Douce 🎶";
            startMelodyLoop();
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

});
