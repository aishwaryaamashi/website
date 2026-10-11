/**
 * ===================================================================
 * 💙 BIRTHDAY WEBSITE INTERACTIVE ENGINE (script.js) 💙
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure config exists
  const config = window.BIRTHDAY_CONFIG;
  if (!config) {
    console.error("Configuration file config.js not loaded!");
    return;
  }

  // -----------------------------------------------------------------
  // 1. STATE MANAGEMENT
  // -----------------------------------------------------------------
  const state = {
    currentScreen: 'screen-cake',
    candlesBlown: false,
    giftBoxOpened: false,
    exploredGifts: new Set(),
    currentPhotoIndex: 0,
    totalPhotos: config.photoAlbumScreen.photos.length,
    finalRevealed: false
  };

  // -----------------------------------------------------------------
  // 2. AMBIENT PARTICLES (Dreamy floating blue stars & hearts)
  // -----------------------------------------------------------------
  initAmbientParticles();

  function initAmbientParticles() {
    const container = document.getElementById('sparkles-container');
    if (!container) return;
    
    const symbols = ['✦', '✧', '⋆', '💙', '✨', '🩵', '•'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'ambient-particle';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      
      const left = Math.random() * 100;
      const size = Math.random() * (1.2 - 0.6) + 0.6;
      const duration = Math.random() * (12 - 7) + 7;
      const delay = Math.random() * 8;
      
      particle.style.left = `${left}%`;
      particle.style.fontSize = `${size}rem`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
    }
  }

  // -----------------------------------------------------------------
  // 3. CONFETTI ENGINE (Canvas-based celebratory burst)
  // -----------------------------------------------------------------
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function triggerConfetti(originX = 0.5, originY = 0.5, count = 75) {
    if (!canvas || !ctx) return;
    
    const colors = ['#6495ED', '#84AEE6', '#B8D4F7', '#FFFFFF', '#FAF7F2', '#3B82F6', '#FFD1DC'];
    const startX = canvas.width * originX;
    const startY = canvas.height * originY;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 9 + 4;
      confettiParticles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        life: 1
      });
    }

    if (!confettiAnimationId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.rotationSpeed;
      p.life -= 0.012;
      p.opacity = Math.max(0, p.life);

      if (p.life <= 0 || p.y > canvas.height + 20) {
        confettiParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    if (confettiParticles.length > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimationId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // -----------------------------------------------------------------
  // 4. SCREEN NAVIGATION ROUTER
  // -----------------------------------------------------------------
  function navigateTo(targetScreenId) {
    const currentEl = document.getElementById(state.currentScreen);
    const targetEl = document.getElementById(targetScreenId);
    
    if (!targetEl) {
      console.warn(`Screen ${targetScreenId} not found.`);
      return;
    }

    if (currentEl) {
      currentEl.classList.remove('active');
    }

    targetEl.classList.add('active');
    state.currentScreen = targetScreenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track explored gifts if visiting one of the 4 gifts
    if (['screen-letter', 'screen-album', 'screen-memories', 'screen-poem'].includes(targetScreenId)) {
      const giftKeyMap = {
        'screen-letter': 'letter',
        'screen-album': 'album',
        'screen-memories': 'memories',
        'screen-poem': 'poem'
      };
      markGiftExplored(giftKeyMap[targetScreenId]);
    }
  }

  // Attach back button listeners
  document.querySelectorAll('[data-back-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const backTarget = btn.getAttribute('data-back-to');
      navigateTo(backTarget);
    });
  });

  // -----------------------------------------------------------------
  // 5. SCREEN 1: THE BIRTHDAY CAKE 🎂
  // -----------------------------------------------------------------
  const btnMakeWish = document.getElementById('btn-make-wish');
  const btnBlowCandles = document.getElementById('btn-blow-candles');
  const cakeSubtitle = document.getElementById('cake-subtitle');
  const cakeSuccess = document.getElementById('cake-success-container');
  const btnOpenSurprise = document.getElementById('btn-open-surprise');
  const flames = [
    document.getElementById('flame-1'),
    document.getElementById('flame-2'),
    document.getElementById('flame-3')
  ];
  const smokes = [
    document.getElementById('smoke-1'),
    document.getElementById('smoke-2'),
    document.getElementById('smoke-3')
  ];

  // Step 1: Make a wish
  if (btnMakeWish) {
    btnMakeWish.addEventListener('click', () => {
      btnMakeWish.classList.add('hidden');
      cakeSubtitle.textContent = config.cakeScreen.blowPrompt;
      btnBlowCandles.classList.remove('hidden');
    });
  }

  // Step 2: Blow the candles
  if (btnBlowCandles) {
    btnBlowCandles.addEventListener('click', () => {
      if (state.candlesBlown) return;
      state.candlesBlown = true;

      // Animate flames out
      flames.forEach(flame => {
        if (flame) flame.classList.add('extinguished');
      });

      // Animate smoke wisps
      smokes.forEach(smoke => {
        if (smoke) smoke.classList.add('active');
      });

      // Confetti burst
      triggerConfetti(0.5, 0.45, 90);

      // Hide blow button, show success
      btnBlowCandles.classList.add('hidden');
      cakeSubtitle.classList.add('hidden');
      cakeSuccess.classList.remove('hidden');
    });
  }

  // Step 3: Open surprise -> Screen 2
  if (btnOpenSurprise) {
    btnOpenSurprise.addEventListener('click', () => {
      navigateTo('screen-giftbox');
    });
  }

  // -----------------------------------------------------------------
  // 6. SCREEN 2: THE GIFT BOX 🎁
  // -----------------------------------------------------------------
  const giftBoxWrapper = document.getElementById('giftbox-interactive');
  const giftTapHint = document.getElementById('gift-tap-hint');
  const giftCardsGrid = document.getElementById('gift-cards-grid');
  const giftFooterAction = document.getElementById('gift-footer-action');
  const exploredCountEl = document.getElementById('explored-count');
  const btnGotoFinal = document.getElementById('btn-goto-final');

  if (giftBoxWrapper) {
    const handleBoxOpen = () => {
      if (!state.giftBoxOpened) {
        state.giftBoxOpened = true;
        giftBoxWrapper.classList.add('opened');
        if (giftTapHint) giftTapHint.textContent = "Tap any card below to explore! 💙";
        
        triggerConfetti(0.5, 0.4, 70);
        
        if (giftCardsGrid) giftCardsGrid.classList.remove('hidden');
        if (giftFooterAction) giftFooterAction.classList.remove('hidden');
      }
    };

    giftBoxWrapper.addEventListener('click', handleBoxOpen);
    giftBoxWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleBoxOpen();
      }
    });
  }

  // Gift Card Click Handlers
  document.querySelectorAll('.gift-card').forEach(card => {
    const target = card.getAttribute('data-target');
    const handleCardClick = () => {
      if (target) {
        navigateTo(target);
      }
    };

    card.addEventListener('click', handleCardClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick();
      }
    });
  });

  function markGiftExplored(giftId) {
    state.exploredGifts.add(giftId);
    
    // Update card styling
    const cardEl = document.getElementById(`card-${giftId}`);
    if (cardEl) {
      cardEl.classList.add('explored');
    }

    // Update count display
    if (exploredCountEl) {
      exploredCountEl.textContent = state.exploredGifts.size;
    }

    // If all explored, highlight final button
    if (state.exploredGifts.size >= 4 && btnGotoFinal) {
      btnGotoFinal.classList.remove('btn-secondary');
      btnGotoFinal.classList.add('btn-accent', 'btn-pulse');
    }
  }

  if (btnGotoFinal) {
    btnGotoFinal.addEventListener('click', () => {
      navigateTo('screen-final');
    });
  }

  // -----------------------------------------------------------------
  // 7. SCREEN 3: MY BIRTHDAY LETTER 💌
  // -----------------------------------------------------------------
  const letterBody = document.getElementById('letter-body');
  const letterDate = document.getElementById('letter-date');
  const letterSignature = document.getElementById('letter-signature');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelopeTapHint = document.getElementById('envelope-tap-hint');

  if (letterBody) {
    letterBody.textContent = config.letterScreen.letterContent;
  }
  if (letterDate) {
    letterDate.textContent = config.letterScreen.date;
  }
  if (letterSignature) {
    letterSignature.textContent = config.letterScreen.signature;
  }

  if (envelopeWrapper) {
    const handleEnvelopeClick = () => {
      envelopeWrapper.classList.toggle('opened');
      if (envelopeTapHint) {
        envelopeTapHint.textContent = envelopeWrapper.classList.contains('opened') 
          ? "Tap envelope again to fold back ♡" 
          : "Tap envelope to open your letter ✉️";
      }
    };

    envelopeWrapper.addEventListener('click', handleEnvelopeClick);
    envelopeWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnvelopeClick();
      }
    });
  }

  // -----------------------------------------------------------------
  // 8. SCREEN 4: OUR POLAROID PHOTO ALBUM 📸
  // -----------------------------------------------------------------
  const polaroidImg = document.getElementById('polaroid-img');
  const polaroidCaption = document.getElementById('polaroid-caption');
  const polaroidDate = document.getElementById('polaroid-date');
  const photoCounter = document.getElementById('photo-counter');
  const photoDots = document.getElementById('photo-dots');
  const activePolaroid = document.getElementById('active-polaroid');
  const btnPrevPhoto = document.getElementById('btn-prev-photo');
  const btnNextPhoto = document.getElementById('btn-next-photo');

  // Build dots
  if (photoDots) {
    photoDots.innerHTML = '';
    config.photoAlbumScreen.photos.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `photo-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to photo ${idx + 1}`);
      dot.addEventListener('click', () => renderPhoto(idx));
      photoDots.appendChild(dot);
    });
  }

  function renderPhoto(index) {
    const photos = config.photoAlbumScreen.photos;
    if (!photos || photos.length === 0) return;

    state.currentPhotoIndex = (index + photos.length) % photos.length;
    const current = photos[state.currentPhotoIndex];

    if (polaroidImg) {
      polaroidImg.src = current.src;
      polaroidImg.alt = current.caption || "Photo memory";
    }
    if (polaroidCaption) {
      polaroidCaption.textContent = current.caption || "";
    }
    if (polaroidDate) {
      polaroidDate.textContent = current.date || "";
    }
    if (photoCounter) {
      photoCounter.textContent = `Photo ${state.currentPhotoIndex + 1} of ${photos.length}`;
    }

    if (activePolaroid) {
      const rot = current.rotation || 0;
      activePolaroid.style.transform = `rotate(${rot}deg)`;
    }

    // Update dots
    const dots = document.querySelectorAll('.photo-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.currentPhotoIndex);
    });
  }

  // Initial photo render
  renderPhoto(0);

  if (btnPrevPhoto) {
    btnPrevPhoto.addEventListener('click', () => renderPhoto(state.currentPhotoIndex - 1));
  }
  if (btnNextPhoto) {
    btnNextPhoto.addEventListener('click', () => renderPhoto(state.currentPhotoIndex + 1));
  }

  // Keyboard navigation for album
  document.addEventListener('keydown', (e) => {
    if (state.currentScreen === 'screen-album') {
      if (e.key === 'ArrowLeft') renderPhoto(state.currentPhotoIndex - 1);
      if (e.key === 'ArrowRight') renderPhoto(state.currentPhotoIndex + 1);
    }
  });

  // Lightbox trigger on Polaroid click
  if (activePolaroid) {
    activePolaroid.addEventListener('click', () => {
      const current = config.photoAlbumScreen.photos[state.currentPhotoIndex];
      openLightbox(current.src, current.caption);
    });
    activePolaroid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const current = config.photoAlbumScreen.photos[state.currentPhotoIndex];
        openLightbox(current.src, current.caption);
      }
    });
  }

  // -----------------------------------------------------------------
  // 9. SCREEN 5: OUR MEMORIES TOGETHER 🫂
  // -----------------------------------------------------------------
  const memoriesGrid = document.getElementById('memories-grid');

  if (memoriesGrid) {
    memoriesGrid.innerHTML = '';
    config.memoriesScreen.memories.forEach(mem => {
      const card = document.createElement('article');
      card.className = 'memory-card';

      let photoMarkup = '';
      if (mem.photo) {
        photoMarkup = `
          <div class="memory-photo-thumb" role="button" tabindex="0" aria-label="Enlarge memory photo">
            <img src="${mem.photo}" alt="${mem.title}" loading="lazy">
          </div>
        `;
      }

      card.innerHTML = `
        <span class="memory-pin">📌</span>
        <div class="memory-header">
          <span class="memory-tag">${mem.tag}</span>
          <span class="memory-icon">${mem.icon}</span>
        </div>
        <h3 class="memory-title">${mem.title}</h3>
        <p class="memory-text">${mem.content}</p>
        ${photoMarkup}
      `;

      // Attach thumbnail lightbox click if photo exists
      if (mem.photo) {
        const thumb = card.querySelector('.memory-photo-thumb');
        if (thumb) {
          thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(mem.photo, mem.title);
          });
          thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(mem.photo, mem.title);
            }
          });
        }
      }

      memoriesGrid.appendChild(card);
    });
  }

  // -----------------------------------------------------------------
  // 10. SCREEN 6: MY POEM 🩵 ("My Favourite Kind of Pretty")
  // -----------------------------------------------------------------
  const poemBody = document.getElementById('poem-body');

  if (poemBody) {
    poemBody.innerHTML = '';
    config.poemScreen.stanzas.forEach((stanzaLines, sIdx) => {
      const stanzaEl = document.createElement('div');
      stanzaEl.className = 'poem-stanza';
      stanzaEl.style.animationDelay = `${sIdx * 0.25}s`;

      stanzaLines.forEach(line => {
        const lineEl = document.createElement('p');
        lineEl.className = 'poem-line';
        lineEl.textContent = line;
        stanzaEl.appendChild(lineEl);
      });

      poemBody.appendChild(stanzaEl);
    });
  }

  // -----------------------------------------------------------------
  // 11. SCREEN 7: THE FINAL SURPRISE — "ONE LAST THING" 💌
  // -----------------------------------------------------------------
  const finalEnvelope = document.getElementById('final-envelope');
  const btnOpenFinal = document.getElementById('btn-open-final');
  const finalEnvelopeContainer = document.getElementById('final-envelope-container');
  const finalMessageContainer = document.getElementById('final-message-container');
  const finalMessageBody = document.getElementById('final-message-body');
  const finalPhotoImg = document.getElementById('final-photo-img');
  const finalPhotoCaption = document.getElementById('final-photo-caption');
  const finalClosingQuote = document.getElementById('final-closing-quote');
  const finalBottomGreeting = document.getElementById('final-bottom-greeting');

  // Hydrate final content
  if (finalMessageBody) {
    finalMessageBody.innerHTML = '';
    config.finalScreen.messageParagraphs.forEach(para => {
      const p = document.createElement('p');
      p.textContent = para;
      finalMessageBody.appendChild(p);
    });
  }

  if (finalPhotoImg) {
    finalPhotoImg.src = config.finalScreen.finalPhoto;
  }
  if (finalPhotoCaption) {
    finalPhotoCaption.textContent = config.finalScreen.finalPhotoCaption;
  }
  if (finalClosingQuote) {
    finalClosingQuote.textContent = `"${config.finalScreen.closingQuote}"`;
  }
  if (finalBottomGreeting) {
    finalBottomGreeting.textContent = config.finalScreen.bottomGreeting;
  }

  // Trigger final reveal
  function revealFinalSurprise() {
    if (state.finalRevealed) return;
    state.finalRevealed = true;

    triggerConfetti(0.5, 0.4, 100);

    if (finalEnvelopeContainer) {
      finalEnvelopeContainer.classList.add('hidden');
    }
    if (finalMessageContainer) {
      finalMessageContainer.classList.remove('hidden');
      finalMessageContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (finalEnvelope) {
    finalEnvelope.addEventListener('click', revealFinalSurprise);
    finalEnvelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        revealFinalSurprise();
      }
    });
  }
  if (btnOpenFinal) {
    btnOpenFinal.addEventListener('click', revealFinalSurprise);
  }

  // -----------------------------------------------------------------
  // 12. GLOBAL LIGHTBOX MODAL
  // -----------------------------------------------------------------
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightboxModal.classList.remove('hidden');
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
