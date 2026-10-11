/**
 * ===================================================================
 * 💙 BIRTHDAY WEBSITE INTERACTIVE ENGINE (script.js) 💙
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Safe config retrieval with fallback
  const config = window.BIRTHDAY_CONFIG || (typeof BIRTHDAY_CONFIG !== 'undefined' ? BIRTHDAY_CONFIG : {});

  // -----------------------------------------------------------------
  // 1. STATE MANAGEMENT
  // -----------------------------------------------------------------
  const state = {
    currentScreen: 'screen-cake',
    candlesBlown: false,
    giftBoxOpened: false,
    exploredGifts: new Set(),
    currentPhotoIndex: 0,
    totalPhotos: (config.photoAlbumScreen && config.photoAlbumScreen.photos) ? config.photoAlbumScreen.photos.length : 11,
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
      p.vy += 0.25;
      p.vx *= 0.98;
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

    // Update top ribbon active pill
    document.querySelectorAll('.nav-pill').forEach(pill => {
      const pillTarget = pill.getAttribute('data-nav');
      pill.classList.toggle('active', pillTarget === targetScreenId);
    });

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

  // Attach navigation listeners for [data-nav]
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-nav');
      if (target) navigateTo(target);
    });
  });

  // Attach back button listeners for [data-back-to]
  document.querySelectorAll('[data-back-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const backTarget = btn.getAttribute('data-back-to');
      if (backTarget) navigateTo(backTarget);
    });
  });

  // Attach target listeners for [data-target]
  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-target');
      if (target) navigateTo(target);
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
      if (cakeSubtitle) {
        cakeSubtitle.textContent = (config.cakeScreen && config.cakeScreen.blowPrompt) || "Okay, now blow out your candles!";
      }
      if (btnBlowCandles) {
        btnBlowCandles.classList.remove('hidden');
      }
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
      if (cakeSubtitle) cakeSubtitle.classList.add('hidden');
      if (cakeSuccess) cakeSuccess.classList.remove('hidden');
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
  const exploredCountEl = document.getElementById('explored-count');
  const btnGotoFinal = document.getElementById('btn-goto-final');

  if (giftBoxWrapper) {
    const handleBoxOpen = () => {
      if (!state.giftBoxOpened) {
        state.giftBoxOpened = true;
        giftBoxWrapper.classList.add('opened');
        if (giftTapHint) giftTapHint.textContent = "Choose any gift card below to open! 💙";
        triggerConfetti(0.5, 0.4, 70);
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

  // -----------------------------------------------------------------
  // 7. SCREEN 3: MY BIRTHDAY LETTER 💌
  // -----------------------------------------------------------------
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelopeTapHint = document.getElementById('envelope-tap-hint');

  if (envelopeWrapper) {
    const handleEnvelopeClick = (e) => {
      // Don't toggle if clicking inside the letter sheet text
      if (e.target.closest('.letter-sheet')) return;

      envelopeWrapper.classList.toggle('opened');
      if (envelopeTapHint) {
        envelopeTapHint.textContent = envelopeWrapper.classList.contains('opened') 
          ? "Your letter is open below ♡" 
          : "Tap envelope to open your letter ✉️";
      }
    };

    envelopeWrapper.addEventListener('click', handleEnvelopeClick);
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

  const photosList = (config.photoAlbumScreen && config.photoAlbumScreen.photos) || [
    { id: 1, src: "./234a0201-4546-4274-ac7c-08d7a2084954.jfif", caption: "Our iconic swing spot & green t-shirt day 🌿✨", date: "College Days", rotation: -2 },
    { id: 2, src: "./3f6cc174-a625-4722-acf0-ccfd988cec5a.jfif", caption: "Sunny smiles & matching the vibe 🌸💙", date: "Best Moments", rotation: 3 },
    { id: 3, src: "./d2c475c2-8ac7-427f-a9f4-c64706fad886.jfif", caption: "The tightest, most chaotic hug ever! 🫂❤️", date: "Pure Joy", rotation: -3 },
    { id: 4, src: "./eae3afad-98ab-4d9b-ad65-b4eed8cdbcc2.jfif", caption: "Heart filters and looking at each other laughing 💕", date: "Unfiltered Chaos", rotation: 2 },
    { id: 5, src: "./f657e161-67eb-4fd5-b9f2-9aff2c53f821.jfif", caption: "Uniform days, masks on, and hugging through it all 🎒💙", date: "School Era", rotation: -2 },
    { id: 6, src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif", caption: "Dressed up, fairy lights, and balloon night ✨🎈", date: "Night Adventures", rotation: 3 },
    { id: 7, src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif", caption: "ID cards, sweaters, and late-night thumbs up 👍🏻🌙", date: "College Memories", rotation: -1 },
    { id: 8, src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif", caption: "Saree edition & mirror selfie shenanigans 🥻🪞", date: "Desi Vibe", rotation: 2 },
    { id: 9, src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif", caption: "Looking pretty together in the mirror ✨💄", date: "Out & About", rotation: -3 },
    { id: 10, src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif", caption: "Chilling in the bedroom doing absolutely nothing 🏠🛋️", date: "Second Home", rotation: 1 },
    { id: 11, src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif", caption: "Random goofy dancing and endless inside jokes 💃🏻✨", date: "Goofballs", rotation: -2 }
  ];

  // Build dots
  if (photoDots) {
    photoDots.innerHTML = '';
    photosList.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `photo-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to photo ${idx + 1}`);
      dot.addEventListener('click', () => renderPhoto(idx));
      photoDots.appendChild(dot);
    });
  }

  function renderPhoto(index) {
    if (!photosList || photosList.length === 0) return;

    state.currentPhotoIndex = (index + photosList.length) % photosList.length;
    const current = photosList[state.currentPhotoIndex];

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
      photoCounter.textContent = `Photo ${state.currentPhotoIndex + 1} of ${photosList.length}`;
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

  // Initial render
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
      const current = photosList[state.currentPhotoIndex];
      openLightbox(current.src, current.caption);
    });
    activePolaroid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const current = photosList[state.currentPhotoIndex];
        openLightbox(current.src, current.caption);
      }
    });
  }

  // -----------------------------------------------------------------
  // 9. SCREEN 5: MEMORIES LIGHTBOX HOOKS
  // -----------------------------------------------------------------
  document.querySelectorAll('[data-lightbox]').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = thumb.getAttribute('data-lightbox');
      const cap = thumb.getAttribute('data-caption');
      openLightbox(src, cap);
    });
  });

  // -----------------------------------------------------------------
  // 10. SCREEN 7: THE FINAL SURPRISE — "ONE LAST THING" 💌
  // -----------------------------------------------------------------
  const finalEnvelope = document.getElementById('final-envelope');
  const btnOpenFinal = document.getElementById('btn-open-final');
  const finalEnvelopeContainer = document.getElementById('final-envelope-container');
  const finalMessageContainer = document.getElementById('final-message-container');
  const finalPolaroidFrame = document.getElementById('final-polaroid-frame');

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
  }
  if (btnOpenFinal) {
    btnOpenFinal.addEventListener('click', revealFinalSurprise);
  }

  if (finalPolaroidFrame) {
    finalPolaroidFrame.addEventListener('click', () => {
      const finalSrc = (config.finalScreen && config.finalScreen.finalPhoto) || "./d2c475c2-8ac7-427f-a9f4-c64706fad886.jfif";
      const finalCap = (config.finalScreen && config.finalScreen.finalPhotoCaption) || "Forever my favourite person 🫂💙";
      openLightbox(finalSrc, finalCap);
    });
  }

  // -----------------------------------------------------------------
  // 11. GLOBAL LIGHTBOX MODAL
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
