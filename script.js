// --- Stereotipi Modal Reveal Button ---
document.addEventListener('DOMContentLoaded', function () {
  var revealBtn = document.getElementById('stereotipi-reveal-btn');
  var revealText = document.getElementById('stereotipi-reveal-text');
  if (revealBtn && revealText) {
    revealBtn.addEventListener('click', function () {
      revealBtn.style.display = 'none';
      revealText.style.display = 'block';
    });
  }

  // Reset reveal state when modal is opened or slide is changed
  var stereotipiModal = document.getElementById('stereotipiModal');
  var stereotipiSlides = stereotipiModal ? stereotipiModal.querySelectorAll('.stereotipi-slide') : null;
  var backBtn = document.getElementById('stereotipi-back-btn');
  var provaBtn = document.getElementById('stereotipi-prova');
  var backBtn2 = document.getElementById('stereotipi-back');

  function resetReveal() {
    if (revealBtn && revealText) {
      revealBtn.style.display = '';
      revealText.style.display = 'none';
    }
  }

  // Quando si apre il modal (display block)
  if (stereotipiModal) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        if (m.attributeName === 'style' && stereotipiModal.style.display === 'block') {
          resetReveal();
        }
      });
    });
    observer.observe(stereotipiModal, { attributes: true });
  }
  // Quando si torna indietro alla slide 0
  if (backBtn2) {
    backBtn2.addEventListener('click', resetReveal);
  }
  if (backBtn) {
    backBtn.addEventListener('click', resetReveal);
  }
  // Quando si va avanti alla slide 1
  if (provaBtn) {
    provaBtn.addEventListener('click', resetReveal);
  }
});
// ...existing code...
// --- Vedi il percorso nel modal protezioni ---
document.addEventListener('DOMContentLoaded', function () {
  const vediPercorsoBtn = document.getElementById('vedi-percorso-btn');
  const percorsoContent = document.getElementById('percorso-content');
  const timelineStepsInline = document.getElementById('timeline-steps-inline');
  const protezioniSlideshowImg = document.getElementById('protezioni-slideshow-img');
  const protezioniSlideshowBtns = document.getElementById('protezioni-slideshow-btns');
  const protezioniTitle = document.querySelector('#protezioniSlideshowModal h2');
  let currentStepIndexInline = 0;
  function renderTimelineInline() {
    if (!timelineStepsInline) return;
    timelineStepsInline.innerHTML = '';
    timelineSteps.forEach((step, idx) => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'timeline-step' + (currentStepIndexInline === idx ? ' active' : '');
      stepDiv.setAttribute('data-step', step.id);
      stepDiv.innerHTML = `<div class=\"timeline-dot\"></div><div class=\"timeline-label\">${step.title}</div>`;
      if (currentStepIndexInline === idx) {
        stepDiv.innerHTML += `<div class=\"timeline-content\">${step.content}</div>`;
      }
      timelineStepsInline.appendChild(stepDiv);
    });
  }
  function goToStepInline(newIdx) {
    if (newIdx < 0) return;
    if (newIdx >= timelineSteps.length) return;
    currentStepIndexInline = newIdx;
    renderTimelineInline();
  }
  if (vediPercorsoBtn && percorsoContent && timelineStepsInline) {
    vediPercorsoBtn.addEventListener('click', function () {
      const showPercorso = (percorsoContent.style.display === 'none' || percorsoContent.style.display === '');
      percorsoContent.style.display = showPercorso ? 'block' : 'none';
      if (protezioniSlideshowImg) protezioniSlideshowImg.style.display = showPercorso ? 'none' : '';
      if (protezioniSlideshowBtns) protezioniSlideshowBtns.style.display = showPercorso ? 'none' : '';
      if (protezioniTitle) protezioniTitle.style.display = showPercorso ? 'none' : '';
      renderTimelineInline();
    });
    percorsoContent.addEventListener('click', function (e) {
      let stepDiv = e.target.closest('.timeline-step');
      if (stepDiv) {
        let stepId = stepDiv.getAttribute('data-step');
        let idx = timelineSteps.findIndex(s => s.id === stepId);
        goToStepInline(idx);
      }
    });
    document.getElementById('timeline-arrow-up-inline').addEventListener('click', function () {
      goToStepInline(currentStepIndexInline - 1);
    });
    document.getElementById('timeline-arrow-down-inline').addEventListener('click', function () {
      goToStepInline(currentStepIndexInline + 1);
    });
  }
});
// Ciclo multilingua per la scritta Benvenuto nell'onboarding
document.addEventListener('DOMContentLoaded', function () {
  var welcomeEl = document.getElementById('onboarding-welcome');
  if (!welcomeEl) return;
  var messages = [
    'Benvenuto!',
    'Welcome!',
    'Bienvenue!',
    'Willkommen!',
    '¡Bienvenido!',
    'أهلاً وسهلاً',
    'Добро пожаловать!',
    '欢迎',
    'Καλώς ήρθατε!',
    'Witamy!'
  ];
  var idx = 0;
  setInterval(function () {
    idx = (idx + 1) % messages.length;
    welcomeEl.textContent = messages[idx];
  }, 1500);
});
// --- Quiz Modal: mostra il numero solo nella slide 0 ---
document.addEventListener('DOMContentLoaded', function () {
  var quizModal = document.getElementById('quizModal');
  if (!quizModal) return;
  var quizSlides = quizModal.querySelectorAll('.quiz-slide');
  var quizNumber = document.getElementById('quiz-modal-number-in');
  var currentQuizSlide = 0;
  function updateQuizNumber() {
    if (quizNumber) quizNumber.style.display = (currentQuizSlide === 0) ? '' : 'none';
  }
  // Cerca i bottoni di navigazione
  var nextBtn = document.getElementById('quiz-next');
  var prevBtn = document.getElementById('quiz-prev');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (currentQuizSlide < quizSlides.length - 1) {
        quizSlides[currentQuizSlide].style.display = 'none';
        currentQuizSlide++;
        quizSlides[currentQuizSlide].style.display = '';
        updateQuizNumber();
      }
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (currentQuizSlide > 0) {
        quizSlides[currentQuizSlide].style.display = 'none';
        currentQuizSlide--;
        quizSlides[currentQuizSlide].style.display = '';
        updateQuizNumber();
      }
    });
  }
  // Se c'è un pulsante start quiz
  var startBtn = document.getElementById('quiz-start');
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      quizSlides[0].style.display = 'none';
      quizSlides[1].style.display = '';
      currentQuizSlide = 1;
      updateQuizNumber();
    });
  }
  // All'avvio
  updateQuizNumber();
});
// --- Stereotipi Modal Header Logic ---
document.addEventListener('DOMContentLoaded', function () {
  var stereotipiModal = document.getElementById('stereotipiModal');
  if (!stereotipiModal) return;
  var headerNumber = document.getElementById('stereotipi-modal-number');
  var backBtn = document.getElementById('stereotipi-back-btn');
  // Slide navigation logic (assume slide 0 = intro, slide 1 = cards)
  var stereotipiSlides = stereotipiModal.querySelectorAll('.stereotipi-slide');
  var currentSlide = 0;
  function updateHeader() {
    if (currentSlide === 0) {
      headerNumber.style.display = '';
      backBtn.style.display = 'none';
    } else {
      headerNumber.style.display = 'none';
      backBtn.style.display = '';
    }
  }
  // Next/prev logic (assume you have buttons to go to next/prev slide)
  var provaBtn = document.getElementById('stereotipi-prova');
  var backBtn2 = document.getElementById('stereotipi-back');
  if (provaBtn) {
    provaBtn.addEventListener('click', function () {
      stereotipiSlides[0].style.display = 'none';
      stereotipiSlides[1].style.display = '';
      currentSlide = 1;
      updateHeader();
    });
  }
  if (backBtn2) {
    backBtn2.addEventListener('click', function () {
      stereotipiSlides[1].style.display = 'none';
      stereotipiSlides[0].style.display = '';
      currentSlide = 0;
      updateHeader();
    });
  }
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      stereotipiSlides[1].style.display = 'none';
      stereotipiSlides[0].style.display = '';
      currentSlide = 0;
      updateHeader();
    });
  }
  // Init
  updateHeader();
});
// Onboarding overlay logic
document.addEventListener("DOMContentLoaded", function() {
  const onboarding = document.getElementById("onboarding-overlay");
  const onboardingBtn = document.getElementById("onboarding-close");
  function closeOnboarding() {
    onboarding.style.opacity = "0";
    setTimeout(() => { onboarding.style.display = "none"; }, 600);
  }
  if (onboarding && onboardingBtn) {
    onboardingBtn.addEventListener("click", closeOnboarding);
    window.addEventListener("keydown", closeOnboarding);
    onboarding.addEventListener("click", function(e) {
      if (e.target === onboarding) closeOnboarding();
    });
    window.addEventListener("scroll", function() {
      if (onboarding.style.display !== "none") closeOnboarding();
    }, { once: true });
  }
  // Reindirizza a about.html se si clicca in qualsiasi punto dell'onboarding
  if (onboarding) {
    onboarding.addEventListener('click', function() {
      window.location.href = 'about.html';
    });
  }
});

// FUNZIONI GENERALI
// Assicura che l'immagine sia corretta all'apertura
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Funzioni per gestire apertura/chiusura modal e blocco scroll
function openModal(modal) {
  modal.style.display = "block";
  document.documentElement.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.style.display = "none";
  document.documentElement.style.overflow = "";
}

// Elementi DOM
const sections = gsap.utils.toArray("section");
const dots = document.querySelectorAll(".dot");
const navbarLogo = document.getElementById("navbar-logo");
const quizModal = document.getElementById("quizModal");
const quizClose = document.querySelector(".quiz-close");
const islandModal = document.getElementById("islandModal");
const videoModal = document.getElementById("videoModal");
const videoModal2 = document.getElementById("videoModal2");
const stereotipiModal = document.getElementById("stereotipiModal");
const viaggioModal = document.getElementById("viaggioModal");
const passaportoModal = document.getElementById("passaportoModal");
const testimonianzeModal = document.getElementById("testimonianzeModal");
const videoClose = document.querySelector(".video-close");
const videoClose2 = document.querySelector(".video-close-2");
const stereotipiClose = document.querySelector(".stereotipi-close");
const viaggioClose = document.querySelector(".viaggio-close");
const passaportoClose = document.querySelector(".passaporto-close");
const rotteClose = document.querySelector(".rotte-close");
const testimonianzeClose = document.querySelector(".testimonianze-close");
const stereotipiVideo = document.getElementById("stereotipi-video");
const bagagliVideo = document.getElementById("bagagli-video");
const islandClose = document.querySelector(".island-close");

// Main horizontal scroll

const scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".outer-container",
    pin: true,
    scrub: 1,
    end: () => "+=" + window.innerWidth * (sections.length - 1),
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      // Update active dot based on scroll progress
      const progress = self.progress;
      const activeIndex = Math.round(progress * (sections.length - 1));
      
      dots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }
});

// Add click handlers to dots for navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const targetProgress = index / (sections.length - 1);
    const targetScroll = scrollTween.scrollTrigger.end * targetProgress;
    
    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: "power2.inOut"
    });
  });
});

// Logo click handler - scroll to first section
if (navbarLogo) {
  navbarLogo.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 0.8,
      ease: "power2.inOut"
    });
  });
}



//FUNZIONI MODAL BOX

// Chiusura centralizzata di tutti i modal cliccando sull'overlay
window.addEventListener("click", (event) => {
  const modalActions = [
    { modal: islandModal, close: () => closeModal(islandModal) },
    { modal: quizModal, close: () => { closeModal(quizModal); resetQuiz && resetQuiz(); } },
    { modal: videoModal, close: () => { closeModal(videoModal); stereotipiVideo && stereotipiVideo.pause && stereotipiVideo.pause(); if (stereotipiVideo) stereotipiVideo.currentTime = 0; } },
    { modal: videoModal2, close: () => { closeModal(videoModal2); bagagliVideo && bagagliVideo.pause && bagagliVideo.pause(); if (bagagliVideo) bagagliVideo.currentTime = 0; } },
    { modal: stereotipiModal, close: () => { closeModal(stereotipiModal); resetStereotipiModal && resetStereotipiModal(); } },
    { modal: richiestaAsiloModal, close: () => closeModal(richiestaAsiloModal) },
    { modal: viaggioModal, close: () => closeModal(viaggioModal) },
    { modal: passaportoModal, close: () => closeModal(passaportoModal) },
    { modal: testimonianzeModal, close: () => closeModal(testimonianzeModal) },
    { modal: accoglienzaSlideshowModal, close: () => { closeModal(accoglienzaSlideshowModal); stopAccoglienzaSlideshow && stopAccoglienzaSlideshow(); document.documentElement.style.overflow = ""; } },
    { modal: protezioniSlideshowModal, close: () => { closeModal(protezioniSlideshowModal); stopMaschereSlideshow && stopMaschereSlideshow(); } },
    { modal: modalMap, close: () => { closeModal(modalMap); document.documentElement.style.overflow = ""; } },
    { modal: mareModal, close: () => closeModal(mareModal) },
    { modal: mareMapModal, close: () => closeModal(mareMapModal) },
    { modal: rotteModal, close: () => { closeModal(rotteModal); document.documentElement.style.overflow = ""; } },
    { modal: modal16, close: () => closeModal(modal16) },
    { modal: modal17, close: () => { closeModal(modal17); document.documentElement.style.overflow = ""; } },
    { modal: msnaModal, close: () => closeModal(msnaModal) },
    { modal: msnaMonzaModal, close: () => { closeModal(msnaMonzaModal); stopDixitSlideshow && stopDixitSlideshow(); document.documentElement.style.overflow = ""; } },
  ];
  modalActions.forEach(({ modal, close }) => {
    if (modal && event.target === modal) close();
  });
});

// 1. Img 1 opens island modal with post-it
document.addEventListener("DOMContentLoaded", function() {
  const IntroImg1 = document.querySelector('.img-1-intro');
  if (IntroImg1) {
    IntroImg1.style.pointerEvents = 'auto';
    IntroImg1.style.cursor = 'pointer';
    IntroImg1.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(islandModal);
    });
  }
});

const interactiveSquare = document.getElementById("island-square");
if (interactiveSquare) {
  interactiveSquare.addEventListener("click", () => {
    openModal(islandModal);
    
    // Reset opacity dei postit
    const postits = islandModal.querySelectorAll('.postit');
    postits.forEach(postit => {
      postit.style.opacity = '0';
    });
    
    // Animazione titolo h2
    const title = islandModal.querySelector('.island-content h2');
    gsap.fromTo(title, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    // Dopo 1 secondo, animazione postit in ordine casuale
    setTimeout(() => {
      // Shuffle array usando Fisher-Yates
      const indices = Array.from({ length: postits.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Mostra i postit in ordine randomico
      indices.forEach((postitIndex, displayOrder) => {
        setTimeout(() => {
          gsap.fromTo(postits[postitIndex], 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        }, displayOrder * 120);
      });
    }, 1000);
  });
}

// 1. Postit floating animation islandModal - leggera oscillazione randomica
const islandPostitContainer = islandModal.querySelector('.postit-container');
if (islandPostitContainer) {
  const postits = islandPostitContainer.querySelectorAll('.postit');
  
  postits.forEach((postit, index) => {
    // Parametri randomici per ogni postit
    const phase = Math.random() * Math.PI * 2;
    const frequencyX = 0.0005 + Math.random() * 0.0008;  // oscillazione lenta
    const frequencyY = 0.0004 + Math.random() * 0.0007;
    const amplitudeX = 10 + Math.random() * 15;  // ±10-25px
    const amplitudeY = 8 + Math.random() * 12;   // ±8-20px
    
    function float() {
      const t = Date.now();
      const x = amplitudeX * Math.sin(t * frequencyX + phase);
      const y = amplitudeY * Math.cos(t * frequencyY + phase * 0.7);
      postit.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(float);
    }
    float();
  });
}

islandClose.addEventListener("click", () => {
  closeModal(islandModal);
});

// 2. Quiz square opens quiz modal
document.addEventListener("DOMContentLoaded", function() {
  const IntroImg2 = document.querySelector('.img-2-intro');
  if (IntroImg2) {
    IntroImg2.style.pointerEvents = 'auto';
    IntroImg2.style.cursor = 'pointer';
    IntroImg2.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(quizModal);
    });
  }
});
// 2. Quiz functionality
let currentSlide = 0;
const totalSlides = 4;
const quizSlides = document.querySelectorAll(".quiz-slide");
const quizPrevBtn = document.getElementById("quiz-prev");
const quizNextBtn = document.getElementById("quiz-next");
const quizCurrent = document.getElementById("quiz-current");
const quizLink = document.getElementById("quiz-link");
const quizNavigation = document.querySelector(".quiz-navigation");
const quizStartBtn = document.getElementById("quiz-start");

// Show specific slide
function showSlide(slideNum) {
  quizSlides.forEach(slide => {
    slide.style.display = "none";
  });
  
  const currentSlideEl = document.querySelector(`.quiz-slide[data-slide="${slideNum}"]`);
  if (currentSlideEl) {
    currentSlideEl.style.display = "block";
  }
  
  currentSlide = slideNum;
  
  // Handle intro slide (slide 0)
  if (slideNum === 0) {
    quizNavigation.style.display = "none";
    quizLink.style.display = "none";
  } else {
    quizNavigation.style.display = "flex";
    quizCurrent.textContent = slideNum;
    
    // Update navigation buttons
    quizPrevBtn.disabled = slideNum === 1;
    quizNextBtn.disabled = slideNum === totalSlides;
    
    // Show/hide link button and next arrow based on slide
    if (slideNum === 4) {
      quizNextBtn.style.display = "none";
      quizLink.style.display = "none"; // Initially hidden, will show on answer click
      quizLink.style.pointerEvents = "none";
      quizLink.style.opacity = "0.3";
    } else {
      quizNextBtn.style.display = "inline-block";
      quizLink.style.display = "none";
    }
  }
}

// Start button handler
if (quizStartBtn) {
  quizStartBtn.addEventListener("click", () => {
    showSlide(1);
  });
}

// Navigation buttons
quizPrevBtn.addEventListener("click", () => {
  if (currentSlide > 1) {
    showSlide(currentSlide - 1);
  }
});

quizNextBtn.addEventListener("click", () => {
  if (currentSlide < totalSlides) {
    showSlide(currentSlide + 1);
  }
});

// Quiz option clicks
quizSlides.forEach(slide => {
  const options = slide.querySelectorAll(".quiz-option");
  const feedback = slide.querySelector(".quiz-feedback");
  const slideNumber = parseInt(slide.dataset.slide);
  
  options.forEach(option => {
    option.addEventListener("click", () => {
      // Remove previous classes
      options.forEach(btn => {
        btn.classList.remove("correct", "wrong");
      });
      
      const isCorrect = option.dataset.answer === "correct";
      
      if (isCorrect) {
        option.classList.add("correct");
        feedback.textContent = "✓ Esatto!";
        feedback.className = "quiz-feedback show correct";
      } else {
        option.classList.add("wrong");
        feedback.textContent = "✗ Risposta errata. Riprova!";
        feedback.className = "quiz-feedback show wrong";
      }
      
      // Enable link button on slide 4 after any answer
      if (slideNumber === 4) {
        quizLink.style.display = "inline-block";
        quizLink.style.pointerEvents = "auto";
        quizLink.style.opacity = "1";
      }
    });
  });
});

function resetQuiz() {
  showSlide(0); // Return to intro slide
  
  // Reset all slides
  quizSlides.forEach(slide => {
    const options = slide.querySelectorAll(".quiz-option");
    const feedback = slide.querySelector(".quiz-feedback");
    
    options.forEach(btn => {
      btn.classList.remove("correct", "wrong");
    });
    
    if (feedback) {
      feedback.className = "quiz-feedback";
      feedback.textContent = "";
    }
  });
  
  quizLink.style.display = "none";
}

// Close quiz modal when close button is clicked
quizClose.addEventListener("click", () => {
  closeModal(quizModal);
  resetQuiz();
});

// Close quiz modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === quizModal) {
    closeModal(quizModal);
    resetQuiz();
  }
});

// 3. Bagagli square opens video modal 2
document.addEventListener("DOMContentLoaded", function() {
  const IntroImg3 = document.querySelector('.img-3-intro');
  if (IntroImg3) {
    IntroImg3.style.pointerEvents = 'auto';
    IntroImg3.style.cursor = 'pointer';
    IntroImg3.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(videoModal2);
    });
  }
});
// 3. Custom play button for bagagli video
const customPlayBagagli = document.getElementById("custom-play-bagagli");
if (customPlayBagagli && bagagliVideo) {
  customPlayBagagli.addEventListener("click", () => {
    bagagliVideo.play();
    customPlayBagagli.classList.add("hidden");
  });

  bagagliVideo.addEventListener("play", () => {
    customPlayBagagli.classList.add("hidden");
  });

  bagagliVideo.addEventListener("pause", () => {
    customPlayBagagli.classList.remove("hidden");
  });

  bagagliVideo.addEventListener("ended", () => {
    customPlayBagagli.classList.remove("hidden");
  });
}
videoClose2.addEventListener("click", () => {
  closeModal(videoModal2);
  bagagliVideo.pause();
  bagagliVideo.currentTime = 0;
});

// 4. Rendi stereotipi1.png cliccabile per aprire stereotipi Modal
document.addEventListener("DOMContentLoaded", function() {
  const stereotipi4center = document.querySelector('.img-4-stereotipi-wrap .clickable-center');
  if (stereotipi4center) {
    stereotipi4center.style.pointerEvents = 'auto';
    stereotipi4center.style.cursor = 'pointer';
    stereotipi4center.addEventListener('click', function(e) {
      openModal(stereotipiModal);
      showStereotipiSlide(0);
      startStereotipiSlideshow();
    });
    stereotipi4center.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        openModal(stereotipiModal);
        showStereotipiSlide(0);
        startStereotipiSlideshow();
      }
    });
  }
});

// 4. Close stereotipi modal
stereotipiClose.addEventListener("click", () => {
  closeModal(stereotipiModal);
  resetStereotipiModal();
  stopStereotipiSlideshow();
});
// Stereotipi slideshow immagini
const stereotipiSlideshowImg = document.getElementById("pregiudizi-slideshow-img");
const stereotipiImages = [
  "images/home-slideshows/2.1.webp",
  "images/home-slideshows/2.2.webp",
  "images/home-slideshows/2.3.webp",
  "images/home-slideshows/2.4.webp",
  "images/home-slideshows/2.5.webp",
  "images/home-slideshows/2.6.webp"
];
let stereotipiInterval = null;
let stereotipiIndex = 0;
let stereotipiPaused = false;

function pauseStereotipiSlideshow() {
  if (!stereotipiPaused) {
    stopStereotipiSlideshow();
    stereotipiPaused = true;
  }
}

function resumeStereotipiSlideshow() {
  if (stereotipiPaused) {
    startStereotipiSlideshow();
    stereotipiPaused = false;
  }
}

if (stereotipiSlideshowImg) {
  stereotipiSlideshowImg.addEventListener('mousedown', pauseStereotipiSlideshow);
  stereotipiSlideshowImg.addEventListener('mouseup', resumeStereotipiSlideshow);
  stereotipiSlideshowImg.addEventListener('mouseleave', resumeStereotipiSlideshow);
  stereotipiSlideshowImg.addEventListener('touchstart', pauseStereotipiSlideshow);
  stereotipiSlideshowImg.addEventListener('touchend', resumeStereotipiSlideshow);
}

function startStereotipiSlideshow() {
  if (!stereotipiSlideshowImg) return;
  stopStereotipiSlideshow(); // Assicura che non ci siano intervalli attivi
  stereotipiIndex = 0;
  stereotipiSlideshowImg.src = stereotipiImages[stereotipiIndex];
  stereotipiInterval = setInterval(() => {
    stereotipiIndex = (stereotipiIndex + 1) % stereotipiImages.length;
    stereotipiSlideshowImg.src = stereotipiImages[stereotipiIndex];
  }, 400);
}

function stopStereotipiSlideshow() {
  if (stereotipiInterval) {
    clearInterval(stereotipiInterval);
    stereotipiInterval = null;
  }
}

// Rotte migratorie slideshow immagini
const rotteMigratorieSlideshowImg = document.getElementById("rottemigratorie-slideshow-img");
const rotteMigratorieImages = [
  "images/home-slideshows/8.1.webp",
  "images/home-slideshows/8.2.webp",
  "images/home-slideshows/8.3.webp",
  "images/home-slideshows/8.4.webp",
  "images/home-slideshows/8.5.webp",
  "images/home-slideshows/8.6.webp"
];
let rotteInterval = null;
let rotteIndex = 0;
let rottePaused = false;

function pauseRotteSlideshow() {
  if (!rottePaused) {
    stopRotteSlideshow();
    rottePaused = true;
  }
}

function resumeRotteSlideshow() {
  if (rottePaused) {
    startRotteSlideshow();
    rottePaused = false;
  }
}

if (rotteMigratorieSlideshowImg) {
  rotteMigratorieSlideshowImg.addEventListener('mousedown', pauseRotteSlideshow);
  rotteMigratorieSlideshowImg.addEventListener('mouseup', resumeRotteSlideshow);
  rotteMigratorieSlideshowImg.addEventListener('mouseleave', resumeRotteSlideshow);
  rotteMigratorieSlideshowImg.addEventListener('touchstart', pauseRotteSlideshow);
  rotteMigratorieSlideshowImg.addEventListener('touchend', resumeRotteSlideshow);
}

function startRotteSlideshow() {
  if (!rotteMigratorieSlideshowImg) return;
  stopRotteSlideshow(); // Assicura che non ci siano intervalli attivi
  rotteIndex = 0;
  rotteMigratorieSlideshowImg.src = rotteMigratorieImages[rotteIndex];
  rotteInterval = setInterval(() => {
    rotteIndex = (rotteIndex + 1) % rotteMigratorieImages.length;
    rotteMigratorieSlideshowImg.src = rotteMigratorieImages[rotteIndex];
  }, 400);
}

function stopRotteSlideshow() {
  if (rotteInterval) {
    clearInterval(rotteInterval);
    rotteInterval = null;
  }
}

// Mare slideshow immagini
const mareSlideshowImg = document.getElementById("mare-slideshow-img");
const mareImages = [
  "images/home-slideshows/10.1.webp",
  "images/home-slideshows/10.3.webp",
  "images/home-slideshows/10.2.webp",
  "images/home-slideshows/10.3.webp",
  "images/home-slideshows/10.4.webp"
];
let mareInterval = null;
let mareIndex = 0;
let marePaused = false;

function pauseMareSlideshow() {
  if (!marePaused) {
    stopMareSlideshow();
    marePaused = true;
  }
}

function resumeMareSlideshow() {
  if (marePaused) {
    startMareSlideshow();
    marePaused = false;
  }
}

if (mareSlideshowImg) {
  mareSlideshowImg.addEventListener('mousedown', pauseMareSlideshow);
  mareSlideshowImg.addEventListener('mouseup', resumeMareSlideshow);
  mareSlideshowImg.addEventListener('mouseleave', resumeMareSlideshow);
  mareSlideshowImg.addEventListener('touchstart', pauseMareSlideshow);
  mareSlideshowImg.addEventListener('touchend', resumeMareSlideshow);
}

function startMareSlideshow() {
  if (!mareSlideshowImg) return;
  stopMareSlideshow(); // Assicura che non ci siano intervalli attivi
  mareIndex = 0;
  mareSlideshowImg.src = mareImages[mareIndex];
  mareInterval = setInterval(() => {
    mareIndex = (mareIndex + 1) % mareImages.length;
    mareSlideshowImg.src = mareImages[mareIndex];
  }, 900);
}

function stopMareSlideshow() {
  if (mareInterval) {
    clearInterval(mareInterval);
    mareInterval = null;
  }
}

// Stereotipi modal slide navigation

const stereotipiProvaBtn = document.getElementById("stereotipi-prova");
const stereotipiBackBtn = document.getElementById("stereotipi-back");
const stereotipiSlides = document.querySelectorAll(".stereotipi-slide");

if (stereotipiBackBtn) {
  stereotipiBackBtn.addEventListener("click", () => {
    showStereotipiSlide(0);
  });
}

function showStereotipiSlide(slideIndex) {
  stereotipiSlides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

function resetStereotipiModal() {
  showStereotipiSlide(0);
}


// Carousel cards logic for stereotipi modal
const carouselTitles = [
  "Genere",
  "Etnicità<br>Provenienza<br>Nazionalità",
  "Età",
  "Aspetto<br>Peso",
  "Formazione<br>Professione<br>Stile di vita",
  "Orientamento sessuale",
  "Salute<br>Disabilità"
];
const carouselGradients = [
  "card-gradient-blue",
  "card-gradient-yellow",
  "card-gradient-red",
  "card-gradient-green",
  "card-gradient-purple",
  "card-gradient-orange",
  "card-gradient-pink"
];
let carouselIndex = 0;
const carouselCard = document.getElementById("carousel-card");
const carouselTitle = document.getElementById("carousel-title");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
// Ogni elemento è un array di 3 stringhe (una per ciascuna textarea)
const carouselTexts = Array.from({ length: carouselTitles.length }, () => ["", "", ""]);

function updateCarousel() {
  if (carouselTitle) {
    carouselTitle.innerHTML = carouselTitles[carouselIndex];
  }
  if (carouselCard) {
    // Rimuovi tutte le classi gradient
    carouselGradients.forEach(g => carouselCard.classList.remove(g));
    // Aggiungi la classe giusta
    carouselCard.classList.add(carouselGradients[carouselIndex]);
    // Aggiorna le tre textarea
    const textareas = carouselCard.querySelectorAll('.carousel-textarea');
    const placeholders = [
      "Scrivi qui uno stereotipo che hai interiorizzato",
      "Scrivi qui un pregiudizio che ti appartiene",
      "Scrivi qui una discriminazione che hai messo in atto"
    ];
    if (textareas.length === 3) {
      textareas.forEach((ta, i) => {
        ta.value = carouselTexts[carouselIndex][i] || "";
        ta.placeholder = placeholders[i];
      });
    }
  }
}

// 4. Gestione input delle tre textarea
function setupCarouselTextareas() {
  if (!carouselCard) return;
  const textareas = carouselCard.querySelectorAll('.carousel-textarea');
  textareas.forEach((ta, i) => {
    ta.oninput = function() {
      carouselTexts[carouselIndex][i] = this.value;
    };
  });
}

if (carouselPrev && carouselNext) {
  carouselPrev.addEventListener("click", () => {
    carouselIndex = (carouselIndex - 1 + carouselTitles.length) % carouselTitles.length;
    updateCarousel();
    setupCarouselTextareas();
  });
  carouselNext.addEventListener("click", () => {
    carouselIndex = (carouselIndex + 1) % carouselTitles.length;
    updateCarousel();
    setupCarouselTextareas();
  });
}

stereotipiProvaBtn.addEventListener("click", () => {
  showStereotipiSlide(1);
  carouselIndex = 0;
  updateCarousel();
  setupCarouselTextareas();
});
// 5. Rendi stereotipi2.png cliccabile per aprire videoModal
document.addEventListener("DOMContentLoaded", function() {
  const stereotipiBg2 = document.querySelector('.img-5-stereotipi');
  if (stereotipiBg2) {
    stereotipiBg2.style.pointerEvents = 'auto';
    stereotipiBg2.style.cursor = 'pointer';
    stereotipiBg2.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(videoModal);
    });
  }
});
// 5. Custom play button for stereotipi video
const customPlayStereotipi = document.getElementById("custom-play-stereotipi");
if (customPlayStereotipi && stereotipiVideo) {
  customPlayStereotipi.addEventListener("click", () => {
    stereotipiVideo.play();
    customPlayStereotipi.classList.add("hidden");
  });

  stereotipiVideo.addEventListener("play", () => {
    customPlayStereotipi.classList.add("hidden");
  });

  stereotipiVideo.addEventListener("pause", () => {
    customPlayStereotipi.classList.remove("hidden");
  });

  stereotipiVideo.addEventListener("ended", () => {
    customPlayStereotipi.classList.remove("hidden");
  });
}
videoClose.addEventListener("click", () => {
  closeModal(videoModal);
  stereotipiVideo.pause();
  stereotipiVideo.currentTime = 0;
});

// Square 6 opens viaggio modal (like island modal)
const square6 = document.getElementById("square-6");
if (square6) {
  square6.addEventListener("click", () => {
    openModal(viaggioModal);
    
    // Reset opacity dei postit
    const postits = viaggioModal.querySelectorAll('.postit');
    postits.forEach(postit => {
      postit.style.opacity = '0';
    });
    
    // Animazione titolo h2
    const title = viaggioModal.querySelector('.island-content h2');
    gsap.fromTo(title, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    // Dopo 1 secondo, animazione postit in ordine casuale
    setTimeout(() => {
      // Shuffle array usando Fisher-Yates
      const indices = Array.from({ length: postits.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Mostra i postit in ordine randomico
      indices.forEach((postitIndex, displayOrder) => {
        setTimeout(() => {
          gsap.fromTo(postits[postitIndex], 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }, displayOrder * 80);
      });
    }, 1000);
  });
}
// 6. Postit floating animation viaggioModal - leggera oscillazione randomica
const viaggioPostitContainer = viaggioModal.querySelector('.postit-container');
if (viaggioPostitContainer) {
  const postits = viaggioPostitContainer.querySelectorAll('.postit');
  
  postits.forEach((postit, index) => {
    // Parametri randomici per ogni postit
    const phase = Math.random() * Math.PI * 2;
    const frequencyX = 0.0005 + Math.random() * 0.0008;  // oscillazione lenta
    const frequencyY = 0.0004 + Math.random() * 0.0007;
    const amplitudeX = 10 + Math.random() * 15;  // ±10-25px
    const amplitudeY = 8 + Math.random() * 12;   // ±8-20px
    
    function float() {
      const t = Date.now();
      const x = amplitudeX * Math.sin(t * frequencyX + phase);
      const y = amplitudeY * Math.cos(t * frequencyY + phase * 0.7);
      postit.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(float);
    }
    float();
  });
}
// Close viaggio modal
if (viaggioClose) {
  viaggioClose.addEventListener("click", () => {
    closeModal(viaggioModal);
  });
}

// 7. Square 7 opens passaporto modal
const square7 = document.getElementById("square-7");
if (square7) {
  square7.addEventListener("click", () => {
    openModal(passaportoModal);
  });
}

// Close passaporto modal
if (passaportoClose) {
  passaportoClose.addEventListener("click", () => {
    closeModal(passaportoModal);
  });
}
// 8. Square 8 opens rotte modal
const square8 = document.getElementById("square-8");
if (square8 && rotteModal) {
  square8.addEventListener("click", () => {
    rotteModal.style.display = "block";
    document.documentElement.style.overflow = "hidden";
    startRotteSlideshow();
  });
  const rotteClose = rotteModal.querySelector(".rotte-close");
  if (rotteClose) {
    rotteClose.addEventListener("click", function() {
      rotteModal.style.display = "none";
      document.documentElement.style.overflow = "";
    });
  }
  window.addEventListener("click", function(event) {
    if (event.target === rotteModal) {
      rotteModal.style.display = "none";
      document.documentElement.style.overflow = "";
    }
  });
}
// Close rotte modal
if (rotteClose) {
  rotteClose.addEventListener("click", () => {
    closeModal(rotteModal);
  });
}

// Square 9 opens Testimonianze modal
const square9 = document.getElementById("square-9");
if (square9) {
  square9.addEventListener("click", () => {
    openModal(testimonianzeModal);
    // Reset alla vista iniziale con tutte le bandiere e il titolo
    const flagsContainer = document.querySelector('.flags-container');
    const testimoniaView = document.getElementById('testimonianza-view');
    const title = document.querySelector('.testimonianze-content h2');
    const testimonianzeNumber = document.getElementById('testimonianze-modal-number');
    const testimoniaBack = document.getElementById('testimonianza-back');
    if (flagsContainer) flagsContainer.style.display = 'block';
    if (testimoniaView) testimoniaView.style.display = 'none';
    if (title) title.classList.remove('hidden');
    // Mostra tutte le bandiere e rimuovi la classe hidden
    const flags = flagsContainer ? flagsContainer.querySelectorAll('.flag-img') : [];
    flags.forEach(f => {
      f.classList.remove('hidden');
    });
    // Reset header and back button
    if (testimonianzeNumber) {
        testimonianzeNumber.textContent = '[ 9 ] Rotte migratorie irregolari verso l\'Europa';
      testimonianzeNumber.style.display = '';
    }
    if (testimoniaBack) {
      testimoniaBack.style.display = 'none';
    }
    // Nuove posizioni predefinite (percentuali per left/top) per evitare sovrapposizioni
    const positions = [
      { left: '5%', top: '10%' },    // Bangladesh
      { left: '70%', top: '5%' },   // Ghana
      { left: '10%', top: '65%' },  // Pakistan
      { left: '75%', top: '70%' },  // Syria
      { left: '40%', top: '35%' }   // Ukraine (centro)
    ];
    // Assicura che il contenitore abbia position: relative e dimensioni adeguate
    if (flagsContainer) {
      flagsContainer.style.position = 'relative';
      flagsContainer.style.width = '100%';
      flagsContainer.style.height = '320px';
      flagsContainer.style.minHeight = '220px';
      flagsContainer.style.maxWidth = '600px';
      flagsContainer.style.margin = '0 auto 30px auto';
    }
    flags.forEach((flag, index) => {
      flag.style.position = 'absolute';
      flag.style.left = positions[index] ? positions[index].left : '0%';
      flag.style.top = positions[index] ? positions[index].top : '0%';
      flag.style.width = '';
      flag.style.height = '';
      flag.style.opacity = '0.95';
      flag.style.zIndex = '2';
      flag.style.display = 'block';
    });
  });
}

// 9. Click handler per le bandiere
const flagsInModal = document.querySelectorAll('.flag-img');
const testimonianzeHeaderSwitch = document.querySelector('.testimonianze-header-switch');
const testimonianzeNumber = document.getElementById('testimonianze-modal-number');
const testimoniaBack = document.getElementById('testimonianza-back');
flagsInModal.forEach(flag => {
  flag.addEventListener('click', function() {
    const country = this.getAttribute('data-country');
    const textContainer = document.getElementById('testimonianza-text');
    const testimoniaView = document.getElementById('testimonianza-view');
    const flagsContainer = document.querySelector('.flags-container');
    const title = document.querySelector('.testimonianze-content h2');
    // Trova il testo corrispondente nell'HTML
    const testimonianzeDataDiv = document.querySelector('.testimonianze-data');
    const testimonianzaElement = testimonianzeDataDiv.querySelector(`[data-country="${country}"]`);
    if (textContainer && testimonianzaElement) {
      // Nascondi tutte le bandiere (compresa quella cliccata)
      flagsInModal.forEach(f => {
        f.classList.add('hidden');
      });
      // Nascondi il titolo
      if (title) {
        title.classList.add('hidden');
      }
      // Nascondi la scritta [ 9 ] Rotte migratorie irregolari verso l'Europa e mostra il bottone Indietro
      if (testimonianzeNumber && testimoniaBack) {
        testimonianzeNumber.style.display = 'none';
        testimoniaBack.style.display = 'inline';
      }
      // Nascondi il container delle bandiere
      flagsContainer.style.display = 'none';
      // Mostra la vista testimonianza
      testimoniaView.style.display = 'flex';
      // Copia il contenuto HTML dal div nascosto
      textContainer.innerHTML = testimonianzaElement.innerHTML;
      // Scroll to top del testo
      textContainer.scrollTop = 0;
    }
  });
});

// Pulsante indietro per tornare alla vista delle bandiere
if (testimoniaBack) {
  testimoniaBack.addEventListener('click', () => {
    const flagsContainer = document.querySelector('.flags-container');
    const testimoniaView = document.getElementById('testimonianza-view');
    const title = document.querySelector('.testimonianze-content h2');
    // Mostra di nuovo il titolo
    if (title) {
      title.classList.remove('hidden');
    }
    // Mostra di nuovo la scritta [ 9 ] Rotte migratorie irregolari verso l'Europa e nascondi il bottone Indietro
    if (testimonianzeNumber && testimoniaBack) {
      testimonianzeNumber.style.display = '';
      testimoniaBack.style.display = 'none';
    }
    // Mostra di nuovo tutte le bandiere
    flagsInModal.forEach(f => {
      f.classList.remove('hidden');
      gsap.to(f, {
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    // Nascondi la vista testimonianza e mostra il container bandiere
    testimoniaView.style.display = 'none';
    flagsContainer.style.display = 'block';
  });
}

// Close testimonianze modal
if (testimonianzeClose) {
  testimonianzeClose.addEventListener("click", () => {
    closeModal(testimonianzeModal);
    // Reset header and back button on close
    const testimonianzeNumber = document.getElementById('testimonianze-modal-number');
    const testimoniaBack = document.getElementById('testimonianza-back');
    if (testimonianzeNumber) {
      testimonianzeNumber.textContent = '[ 9 ] Rotte migratorie verso l\'Italia';
      testimonianzeNumber.style.display = '';
    }
    if (testimoniaBack) {
      testimoniaBack.style.display = 'none';
    }
  });
}

// 9. Flags floating animation in testimonianze modal
const flagsContainer = document.querySelector('.flags-container');
if (flagsContainer) {
  const flags = flagsContainer.querySelectorAll('.flag-img');
  
  flags.forEach((flag, index) => {
    // Parametri randomici per ogni bandiera
    const phase = Math.random() * Math.PI * 2;
    const frequencyX = 0.0003 + Math.random() * 0.0005;  // oscillazione molto lenta
    const frequencyY = 0.0003 + Math.random() * 0.0005;
    const amplitudeX = 15 + Math.random() * 20;  // ±15-35px
    const amplitudeY = 12 + Math.random() * 18;  // ±12-30px
    
    function float() {
      const t = Date.now();
      const x = amplitudeX * Math.sin(t * frequencyX + phase);
      const y = amplitudeY * Math.cos(t * frequencyY + phase * 0.7);
      flag.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(float);
    }
    float();
  });
}

// Overlay centrale per immagine 10 (mare)
const mareCenterOverlay = document.getElementById("mare-center-overlay");
const mareModal = document.getElementById("mareModal");
const mareClose = document.querySelector(".mare-close");
if (mareCenterOverlay) {
  mareCenterOverlay.addEventListener("click", () => {
    openModal(mareModal);
    startMareSlideshow(); // Avvia lo slideshow automaticamente
   
   
    // Assicura che l'immagine sia corretta all'apertura
    updateMareImg();
  });
  // Accessibilità: apri anche con tastiera
  mareCenterOverlay.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });
}
if (mareClose) {
  mareClose.addEventListener("click", () => {
    closeModal(mareModal);
  });
}

// 11. Square 11 opens mare map modal
const square11 = document.getElementById("square-11");
const mareMapModal = document.getElementById("mareMapModal");
const mareMapClose = document.querySelector(".mare-map-close");
const mareBackBtn = document.getElementById("mare-back-btn");
if (square11) {
  square11.addEventListener("click", () => {
    openModal(mareMapModal);
    // Qui puoi aggiungere logica per popolare o aggiornare #mare-map se necessario
  });
}
if (mareMapClose) {
  mareMapClose.addEventListener("click", () => {
    closeModal(mareMapModal);
  });
}
if (mareBackBtn) {
  mareBackBtn.addEventListener("click", () => {
    closeModal(mareMapModal);
    openModal(mareModal);
  });
}

// --- "le zone SAR" button in mareModal opens mareMapModal ---
const mareZonesBtn = document.getElementById("mare-zones-btn");
if (mareZonesBtn && mareModal && mareMapModal) {
  mareZonesBtn.addEventListener("click", function(e) {
    e.preventDefault();
    closeModal(mareModal);
    openModal(mareMapModal);
  });
}
// 11. Mare Map Slider Logic
const mareMapSlider = document.getElementById("mare-map-slider");
const mareMapZones = document.querySelectorAll("#mare-map-zones .mare-map-zone");
if (mareMapSlider && mareMapZones.length === 7) {
  function updateMareMapZones() {
    const selected = parseInt(mareMapSlider.value, 10);
    
    const zoneTexts = {
      7: " ",
      6: "Acque all'interno dello stato, come fiumi, laghi e porti. Lo stato ha piena sovranità",
        6: "Acque all'interno dello stato, come fiumi, laghi e porti. Lo stato ha piena sovranità<span style='display:block; margin-bottom: 16px;'></span>",
      5: "Lo stato esercita piena sovranità, ma le navi straniere hanno diritto di passaggio innocente<span style='display:block; margin-bottom: 16px;'></span>",
      4: "Lo stato può esercitare controllo per prevenire violazioni delle leggi doganali, fiscali, sanitarie o di immigrazione<span style='display:block; margin-bottom: 16px;'></span>",
      3: "Lo stato ha diritti sovrani sulle risorse naturali (pesca, estrazione di minerali), ma non sovranità completa sulle acque<span style='display:block; margin-bottom: 16px;'></span>",
      2: "Lo stato ha diritto allo sfruttamento del fondo marino e sottosuolo. Può coincidere con la ZEE o estendersi oltre le 200 miglia fino al limite del margine continentale<span style='display:block; margin-bottom: 16px;'></span>",
      1: "Tutto il mare al di fuori della ZEE. Nessuno stato ha sovranità; libero uso per navigazione, pesca, ricerca scientifica, ma soggetto a diritto internazionale<span style='display:block; margin-bottom: 16px;'></span>"
    };
    mareMapZones.forEach((zone, idx) => {
      const zoneNum = 7 - idx; // idx 0 = zona 7, idx 6 = zona 1
      // Nessuna gestione espansione, tutte le zone restano uguali
      const colDiv = zone.querySelector('div');
      let label, desc;
      if (colDiv) {
        label = colDiv.querySelector('.mare-map-zone-label');
        desc = colDiv.querySelector('.mare-map-zone-desc');
      } else {
        label = zone.querySelector('.mare-map-zone-label');
        desc = zone.querySelector('.mare-map-zone-desc');
      }
      if (label) {
        label.style.display = 'block';
        label.style.opacity = (zoneNum === selected) ? '1' : '0.25';
        label.style.transition = 'opacity 0.3s';
        // Margine sopra per tutte le zone selezionate
        if (zoneNum === selected) {
          label.style.marginTop = '14px';
          label.style.fontWeight = '600';
          // Margine sotto solo per Terra selezionata
          if (zoneNum === 7) {
            label.style.marginBottom = '16px';
          } else {
            label.style.marginBottom = '';
          }
        } else {
          label.style.marginTop = '';
          label.style.marginBottom = '';
          label.style.fontWeight = '400';
        }
      }
      if (desc) {
        if (zoneNum === selected && zoneTexts[selected]) {
          desc.style.display = 'block';
          desc.innerHTML = zoneTexts[selected];
          desc.style.marginTop = '5px'; // Spazio sopra la spiegazione
          desc.style.marginBottom = '8px'; // Margine sotto la spiegazione
          desc.style.opacity = '0.8'; // Opacità 80%
        } else {
          desc.style.display = 'none';
          desc.innerHTML = '';
          desc.style.marginTop = '';
          desc.style.marginBottom = '';
          desc.style.opacity = '';
        }
      }
    });
    // Nascondi info box (non serve più la descrizione sotto)
    const infoTitle = document.getElementById('mare-map-info-title');
    const infoDesc = document.getElementById('mare-map-info-desc');
    if (infoTitle) infoTitle.textContent = '';
    if (infoDesc) infoDesc.innerHTML = '';
    // Mostra/nasconde il testo "scorri lo slider"
    const sliderHint = document.getElementById('mare-map-slider-hint');
    if (sliderHint) {
      if (selected === 7) {
        sliderHint.style.opacity = '1';
        sliderHint.style.color = '#33758C';
      } else {
        sliderHint.style.opacity = '0.15';
        sliderHint.style.color = 'transparent';
      }
    }
  }
  mareMapSlider.addEventListener('input', updateMareMapZones);
  // Inizializza la visualizzazione corretta all'apertura
  updateMareMapZones();
}

// 12. Richiesta asilo
const square12 = document.getElementById("square-12");
const richiestaAsiloModal = document.getElementById("richiestaAsiloModal");
const richiestaAsiloClose = richiestaAsiloModal ? richiestaAsiloModal.querySelector(".richiesta-asilo-close") : null;
if (square12) {
  square12.addEventListener("click", () => {
    openModal(richiestaAsiloModal);
  });
}
if (richiestaAsiloClose) {
  richiestaAsiloClose.addEventListener("click", () => {
    closeModal(richiestaAsiloModal);
  });
}
// 12. Timeline Procedura Asilo
const timelineSteps = [
  {
    id: 'step1',
    title: 'Arrivare',
    content: `<ul><li>L’asilo si chiede dentro lo Stato: per chiedere asilo bisogna trovarsi fisicamente nel paese.</li><li>Entrare regolarmente non è sempre possibile</li><li>Visti e ingressi legali sono limitati</li></ul>`
  },
  {
    id: 'step2',
    title: 'Chiedere protezione',
    content: `<ul><li>Il percorso inizia quando una persona manifesta la volontà di ricevere protezione.</li><li>La volontà può essere manifestata alla frontiera o sul territorio</li><li>Da questo momento la persona entra nella procedura di asilo</li></ul>`
  },
  {
    id: 'step3',
    title: 'Registrazione della domanda',
    content: `<ul><li>La richiesta viene formalizzata dalle autorità.</li><li>Raccolta dei dati e delle informazioni principali</li><li>Rilascio di un permesso di soggiorno temporaneo</li></ul>`
  },
  {
    id: 'step4',
    title: 'Accoglienza e attesa',
    content: `<ul><li>L’attesa non avviene nel vuoto.</li><li>Inserimento nel sistema di accoglienza</li><li>Accesso ai servizi essenziali</li><li>La vita sul territorio continua durante l’attesa</li></ul>`
  },
  {
    id: 'step5',
    title: 'Chi decide',
    content: `<ul><li>La domanda viene valutata da un’autorità dello Stato.</li><li>Analisi della storia personale</li><li>Valutazione del paese di origine</li><li>Convocazione per il colloquio</li></ul>`
  },
  {
    id: 'step6',
    title: 'Raccontare la propria storia',
    content: `<ul><li>Il colloquio è il momento centrale.</li><li>Racconto personale con interprete</li><li>Valutazione della credibilità e dei rischi</li></ul>`
  },
  {
    id: 'step7',
    title: 'La decisione',
    content: `<ul><li>Dopo il colloquio, lo Stato prende una decisione.</li><li>La risposta arriva dopo un tempo di attesa.</li><li>La decisione può essere: riconoscimento di una protezione, rigetto (con possibilità di ricorso), o rimpatrio.</li></ul>`
  },
  {
    id: 'step8',
    title: 'Una vita che va avanti',
    content: `<ul><li>La decisione dello Stato è un momento</li><li>La vita quotidiana continua prima, durante e dopo la procedura</li></ul>`
  }
];
let currentStepIndex = 0;
function renderTimeline() {
  const stepsContainer = document.getElementById('timeline-steps');
  stepsContainer.innerHTML = '';
  timelineSteps.forEach((step, idx) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'timeline-step' + (currentStepIndex === idx ? ' active' : '');
    stepDiv.setAttribute('data-step', step.id);
    stepDiv.innerHTML = `<div class="timeline-dot"></div><div class="timeline-label">${step.title}</div>`;
    if (currentStepIndex === idx) {
      stepDiv.innerHTML += `<div class="timeline-content">${step.content}</div>`;
    }
    stepsContainer.appendChild(stepDiv);
  });
}
function goToStep(newIdx) {
  if (newIdx < 0) return;
  if (newIdx >= timelineSteps.length) return;
  currentStepIndex = newIdx;
  renderTimeline();
}
document.addEventListener('DOMContentLoaded', function() {
  renderTimeline();
  document.getElementById('timeline-steps').addEventListener('click', function(e) {
    let stepDiv = e.target.closest('.timeline-step');
    if (!stepDiv) return;
    let stepId = stepDiv.getAttribute('data-step');
    let idx = timelineSteps.findIndex(s => s.id === stepId);
    goToStep(idx);
  });
  document.getElementById('timeline-arrow-up').addEventListener('click', function() {
    goToStep(currentStepIndex-1);
  });
  document.getElementById('timeline-arrow-down').addEventListener('click', function() {
    goToStep(currentStepIndex+1);
  });
});

// 13. Square 13 opens protezioniSlideshowModal con slideshow immagini maschere
const square13 = document.getElementById("square-13");
const protezioniSlideshowModal = document.getElementById("protezioniSlideshowModal");
const protezioniSlideshowClose = protezioniSlideshowModal ? protezioniSlideshowModal.querySelector(".protezioni-slideshow-close") : null;
const protezioniSlideshowImg = document.getElementById("protezioni-slideshow-img");
const maschereImages = [
  "images/maschere/IMG_1080.webp",
  "images/maschere/IMG_1083.webp",
  "images/maschere/IMG_1084.webp",
  "images/maschere/IMG_1086.webp",
  "images/maschere/IMG_1090.webp"
];
let maschereInterval = null;
let maschereIndex = 0;

function startMaschereSlideshow() {
  if (!protezioniSlideshowImg) return;
  maschereIndex = 0;
  protezioniSlideshowImg.src = maschereImages[maschereIndex];
  maschereInterval = setInterval(() => {
    maschereIndex = (maschereIndex + 1) % maschereImages.length;
    protezioniSlideshowImg.src = maschereImages[maschereIndex];
  }, 150);
}

function stopMaschereSlideshow() {
  if (maschereInterval) {
    clearInterval(maschereInterval);
    maschereInterval = null;
  }
}

if (protezioniSlideshowImg) {
  let pausedByMouseMaschere = false;
  protezioniSlideshowImg.addEventListener('mousedown', function(e) {
    pausedByMouseMaschere = true;
    stopMaschereSlideshow();
  });
  protezioniSlideshowImg.addEventListener('touchstart', function(e) {
    pausedByMouseMaschere = true;
    stopMaschereSlideshow();
  });
  protezioniSlideshowImg.addEventListener('mouseup', function(e) {
    if (pausedByMouseMaschere) {
      startMaschereSlideshow();
      pausedByMouseMaschere = false;
    }
  });
  protezioniSlideshowImg.addEventListener('mouseleave', function(e) {
    if (pausedByMouseMaschere) {
      startMaschereSlideshow();
      pausedByMouseMaschere = false;
    }
  });
  protezioniSlideshowImg.addEventListener('touchend', function(e) {
    if (pausedByMouseMaschere) {
      startMaschereSlideshow();
      pausedByMouseMaschere = false;
    }
  });
}

if (square13 && protezioniSlideshowModal && protezioniSlideshowClose && protezioniSlideshowImg) {
  square13.addEventListener("click", function() {
      protezioniSlideshowModal.style.display = "block";
      // Always reset to image/buttons view
      const percorsoContent = document.getElementById('percorso-content');
      const protezioniSlideshowImg = document.getElementById('protezioni-slideshow-img');
      const protezioniSlideshowBtns = document.getElementById('protezioni-slideshow-btns');
      const protezioniTitle = protezioniSlideshowModal.querySelector('h2');
      if (percorsoContent) percorsoContent.style.display = 'none';
      if (protezioniSlideshowImg) protezioniSlideshowImg.style.display = '';
      if (protezioniSlideshowBtns) protezioniSlideshowBtns.style.display = '';
      if (protezioniTitle) protezioniTitle.style.display = '';
      startMaschereSlideshow();
  });
  protezioniSlideshowClose.addEventListener("click", function() {
      protezioniSlideshowModal.style.display = "none";
      stopMaschereSlideshow();
      // Reset view for next open
      const percorsoContent = document.getElementById('percorso-content');
      const protezioniSlideshowImg = document.getElementById('protezioni-slideshow-img');
      const protezioniSlideshowBtns = document.getElementById('protezioni-slideshow-btns');
      const protezioniTitle = protezioniSlideshowModal.querySelector('h2');
      if (percorsoContent) percorsoContent.style.display = 'none';
      if (protezioniSlideshowImg) protezioniSlideshowImg.style.display = '';
      if (protezioniSlideshowBtns) protezioniSlideshowBtns.style.display = '';
      if (protezioniTitle) protezioniTitle.style.display = '';
  });
  window.addEventListener("click", function(event) {
    if (event.target === protezioniSlideshowModal) {
      protezioniSlideshowModal.style.display = "none";
      stopMaschereSlideshow();
        // Reset view for next open
        const percorsoContent = document.getElementById('percorso-content');
        const protezioniSlideshowImg = document.getElementById('protezioni-slideshow-img');
        const protezioniSlideshowBtns = document.getElementById('protezioni-slideshow-btns');
        const protezioniTitle = protezioniSlideshowModal.querySelector('h2');
        if (percorsoContent) percorsoContent.style.display = 'none';
        if (protezioniSlideshowImg) protezioniSlideshowImg.style.display = '';
        if (protezioniSlideshowBtns) protezioniSlideshowBtns.style.display = '';
        if (protezioniTitle) protezioniTitle.style.display = '';
    }
  });
}

// Square 14 opens accoglienzaSlideshowModal
const square14 = document.getElementById("square-14");
const accoglienzaSlideshowModal = document.getElementById("accoglienzaSlideshowModal");
const accoglienzaSlideshowClose = accoglienzaSlideshowModal ? accoglienzaSlideshowModal.querySelector(".accoglienza-slideshow-close") : null;
const accoglienzaSlideshowImg = document.getElementById("accoglienza-slideshow-img");
const accoglienzaImages = [
  "images/home-slideshows/12.1.webp",
  "images/home-slideshows/12.2.webp",
  "images/home-slideshows/12.3.webp",
  "images/home-slideshows/12.4.webp",
  "images/home-slideshows/12.5.webp",
  "images/home-slideshows/12.6.webp"
];
let accoglienzaInterval = null;
let accoglienzaIndex = 0;

function startAccoglienzaSlideshow() {
  if (!accoglienzaSlideshowImg) return;
  accoglienzaIndex = 0;
  accoglienzaSlideshowImg.src = accoglienzaImages[accoglienzaIndex];
  accoglienzaInterval = setInterval(() => {
    accoglienzaIndex = (accoglienzaIndex + 1) % accoglienzaImages.length;
    accoglienzaSlideshowImg.src = accoglienzaImages[accoglienzaIndex];
  }, 400);
}

function stopAccoglienzaSlideshow() {
  if (accoglienzaInterval) {
    clearInterval(accoglienzaInterval);
    accoglienzaInterval = null;
  }
}

if (accoglienzaSlideshowImg) {
  let pausedByMouseAccoglienza = false;
  accoglienzaSlideshowImg.addEventListener('mousedown', function(e) {
    pausedByMouseAccoglienza = true;
    stopAccoglienzaSlideshow();
  });
  accoglienzaSlideshowImg.addEventListener('touchstart', function(e) {
    pausedByMouseAccoglienza = true;
    stopAccoglienzaSlideshow();
  });
  accoglienzaSlideshowImg.addEventListener('mouseup', function(e) {
    if (pausedByMouseAccoglienza) {
      startAccoglienzaSlideshow();
      pausedByMouseAccoglienza = false;
    }
  });
  accoglienzaSlideshowImg.addEventListener('mouseleave', function(e) {
    if (pausedByMouseAccoglienza) {
      startAccoglienzaSlideshow();
      pausedByMouseAccoglienza = false;
    }
  });
  accoglienzaSlideshowImg.addEventListener('touchend', function(e) {
    if (pausedByMouseAccoglienza) {
      startAccoglienzaSlideshow();
      pausedByMouseAccoglienza = false;
    }
  });
}

if (square14 && accoglienzaSlideshowModal && accoglienzaSlideshowClose && accoglienzaSlideshowImg) {
  square14.addEventListener("click", function() {
    accoglienzaSlideshowModal.style.display = "block";
    startAccoglienzaSlideshow();
    document.documentElement.style.overflow = "hidden";
  });
  accoglienzaSlideshowClose.addEventListener("click", function() {
    accoglienzaSlideshowModal.style.display = "none";
    stopAccoglienzaSlideshow();
    document.documentElement.style.overflow = "";
  });
  window.addEventListener("click", function(event) {
    if (event.target === accoglienzaSlideshowModal) {
      accoglienzaSlideshowModal.style.display = "none";
      stopAccoglienzaSlideshow();
      document.documentElement.style.overflow = "";
    }
  });
}

// 15. Square 15 opens modalMap
const square15 = document.getElementById("square-15");
const modalMap = document.getElementById("modalMap");
const modalMapClose = modalMap ? modalMap.querySelector(".modal-map-close") : null;
const modalMapContent = document.getElementById("modalMap-content");
const mapIframe = document.getElementById("map-iframe");
const mapTitle = document.getElementById("map-modal-title");
const prevBtn = document.getElementById("map-prev-btn");
const nextBtn = document.getElementById("map-next-btn");
const mapLegend = document.getElementById("map-legend");
if (square15 && modalMap && modalMapClose && modalMapContent && mapIframe && mapTitle && prevBtn && nextBtn && mapLegend) {
  // Ora le slide vengono lette dall'HTML tramite elementi con classe .map-slide-data
  function getMapSlidesFromHTML() {
    const slideElements = document.querySelectorAll('.map-slide-data');
    return Array.from(slideElements).map(el => {
      const title = el.getAttribute('data-title') || '';
      const src = el.getAttribute('data-src') || '';
      let legend = [];
      const legendStr = el.getAttribute('data-legend');
      if (legendStr) {
        try {
          legend = JSON.parse(legendStr);
        } catch (e) {
          legend = [];
        }
      }
      return { title, src, legend };
    });
  }
  const mapSlides = getMapSlidesFromHTML();
  let mapSlideIndex = 0;
  function renderLegend(legendArr) {
    if (!mapLegend) return;
    mapLegend.innerHTML = legendArr.map(item => `
      <div style="display: flex; align-items: center; margin-bottom: 6px;">
        <span style="display:inline-block; width: 10px; height: 10px; border-radius: 50%; background:${item.color}; margin-right: 6px; border:1px solid #fff; box-shadow:0 1px 2px #0001;"></span>
        <span style="font-size:0.75em;">${item.label}</span>
      </div>
    `).join('');
  }
  function showMapSlide(idx) {
    mapSlideIndex = idx;
    const slide = mapSlides[mapSlideIndex];
    if (mapIframe) {
      mapIframe.style.transition = 'opacity 0.5s';
      mapIframe.style.opacity = 0;
      setTimeout(() => {
        mapIframe.src = slide.src;
        mapIframe.onload = () => {
          mapIframe.style.opacity = 1;
          mapIframe.onload = null;
        };
      }, 350);
    }
    if (mapTitle) {
      mapTitle.textContent = slide.title;
    }
    renderLegend(slide.legend);
    prevBtn.disabled = mapSlideIndex === 0;
    nextBtn.disabled = mapSlideIndex === mapSlides.length - 1;
  }
  prevBtn.onclick = () => {
    if (mapSlideIndex > 0) showMapSlide(mapSlideIndex - 1);
  };
  nextBtn.onclick = () => {
    if (mapSlideIndex < mapSlides.length - 1) showMapSlide(mapSlideIndex + 1);
  };
  square15.addEventListener("click", () => {
    showMapSlide(0);
    modalMap.style.display = "block";
    document.documentElement.style.overflow = "hidden";
  });
  modalMapClose.addEventListener("click", function() {
    modalMap.style.display = "none";
    document.documentElement.style.overflow = "";
  });
  window.addEventListener("click", function(event) {
    if (event.target === modalMap) {
      modalMap.style.display = "none";
      document.documentElement.style.overflow = "";
    }
  });
}

// 16. Modal logic for square 16
const square16 = document.getElementById('square-16');
const modal16 = document.getElementById('modal16');
const close16 = document.querySelector('.professionisti-close');
if (square16 && modal16 && close16) {
  square16.addEventListener('click', function() {
    // Reset modal16 to orbit-balls view
    modal16.style.display = 'block';
    document.documentElement.style.overflow = 'hidden';
    const mainOrbitSchema = document.querySelector('#modal16 .orbit-schema');
    const btnRow = document.getElementById('modal16-btn-row');
    const storiesScreen = document.getElementById('modal16-stories-screen');
    const backBtn = document.getElementById('modal16-back-btn');
    const modal16Number = document.getElementById('modal16-modal-number');
    const modal16Title = document.querySelector('#modal16 h2');
    // Show orbit schema and buttons
    if (mainOrbitSchema) mainOrbitSchema.style.display = 'flex';
    if (btnRow) btnRow.style.display = 'flex';
    // Hide stories screen and back button
    if (storiesScreen) storiesScreen.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    if (modal16Number) modal16Number.style.display = '';
    // Show modal title, remove story header if present
    if (modal16Title) modal16Title.style.display = '';
    let storyHeader = document.getElementById('modal16-story-header');
    if (storyHeader) storyHeader.remove();
    // Hide story view if present
    if (window.storyView) window.storyView.style.display = 'none';
  });
  close16.addEventListener('click', function() {
    modal16.style.display = 'none';
    document.documentElement.style.overflow = '';
  });
  window.addEventListener('click', function(event) {
    if (event.target === modal16) {
      modal16.style.display = 'none';
      document.documentElement.style.overflow = '';
    }
  });
}
// 16. Orbit balls
document.addEventListener('DOMContentLoaded', function() {
  const balls = document.querySelectorAll('#modal16 .orbit-ball');
  const infoBox = document.getElementById('orbit-role-info');
  const infoTitle = document.getElementById('orbit-role-title');
  const infoDesc = document.getElementById('orbit-role-desc');
  const closeBtn = document.getElementById('orbit-role-close');
  const orbitContainer = document.querySelector('#modal16 .orbit-container');
  let overlay = null;
  let selectedBall = null;

    function fadeBalls(except) {
        balls.forEach(b => {
            if (b === except) {
                b.classList.add('active');
                b.classList.remove('faded');
            } else {
                b.classList.remove('active');
                b.classList.add('faded');
            }
        });
    }
    function resetBalls() {
        balls.forEach(b => {
            b.classList.remove('faded','active');
        });
    }

    balls.forEach(ball => {
        ball.addEventListener('click', function(e) {
            e.stopPropagation();
            selectedBall = ball;
            fadeBalls(ball);
            infoTitle.textContent = ball.getAttribute('data-role');
            infoDesc.textContent = ball.getAttribute('data-desc');
            infoBox.style.display = 'block';
            // Add overlay to block other clicks
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'orbit-overlay';
                orbitContainer.appendChild(overlay);
                overlay.addEventListener('click', closeInfo);
            }
        });
    });

    function closeInfo() {
        infoBox.style.display = 'none';
        resetBalls();
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
        selectedBall = null;
    }
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeInfo();
    });
});

// 16 gestione "Leggi le storie" e visualizzazione storie ---
const storiesBtn = document.getElementById('modal16-stories-btn');
const storiesScreen = document.getElementById('modal16-stories-screen');
const btnRow = document.getElementById('modal16-btn-row');
const mainOrbitSchema = document.querySelector('#modal16 .orbit-schema');
const backBtn = document.getElementById('modal16-back-btn');
const modal16Number = document.getElementById('modal16-modal-number');

const stories = [
  {
    title: 'La famiglia di B.I.',
    text: `La famiglia di B.I. è accolta nel progetto SAI Monza dal 04/06/2020.<br><br>
Il progetto non prevederebbe l’accoglienza di nuclei familiari, ma il loro è un caso particolare e il Comune ha quindi deciso di inserirli comunque in un appartamento del progetto. Il nucleo è composto dalla madre e da tre figli minorenni.<br><br>
I figli hanno attualmente 11, 12 e 15 anni e frequentano regolarmente la scuola dell’obbligo.<br><br>
Il nucleo, di origine pakistana, ha vissuto per circa un decennio in Libia, dopo il trasferimento dal Paese di origine dovuto a motivi di lavoro del padre. Con lo scoppio dei disordini in Libia, la famiglia comprende che il Paese non è più sicuro; la madre e i figli partono quindi per l’Italia.<br><br>
Al momento dell’inserimento nel progetto, il padre si trova ancora in Libia. È stato richiesto il ricongiungimento familiare, ma si tratta di una procedura piuttosto lunga.<br><br>
La madre presenta seri problemi di salute: è diabetica e ipertesa e ha difficoltà nella gestione sia delle terapie farmacologiche sia della dieta, per sé e per i figli.<br><br>
Nonostante sia in Italia ormai da anni, non parla italiano e il lavoro con lei si svolge quasi sempre con il prezioso supporto della mediatrice. Dopo i primi colloqui, si osserva che la mediatrice è riuscita a instaurare una buona relazione con la signora e si decide quindi di garantire una continuità: sarà sempre lei la mediatrice coinvolta nel lavoro con il nucleo, con incontri settimanali, in base alle esigenze specifiche (visite mediche, appuntamenti con i servizi del territorio, colloqui con le operatrici del progetto, colloqui con le insegnanti, ecc.). La presenza della mediatrice risulta fondamentale anche per l’instaurarsi della relazione educativa con l’educatrice di riferimento, nonché per evitare di caricare i figli del ruolo di unico “ponte” tra la madre e il contesto in cui vive (traduzione).<br><br>
Nell’estate del 2021 A., il più piccolo dei figli, mostra segnali evidenti di malessere psichico; viene ricoverato in ospedale e gli viene diagnosticato un disturbo ossessivo-compulsivo.<br><br>
A questo punto l’équipe decide di informare i servizi sociali comunali che si occupano di nuclei con minori, poiché risulta evidente la necessità di un supporto ulteriore alla famiglia, oltre al progetto SAI (i cui termini risultano ampiamente scaduti per il nucleo, che resta accolto in deroga al regolamento).<br><br>
Dimesso dall’ospedale, il bambino inizia un percorso presso l’UONPIA (Unità Operativa di Neuropsichiatria dell’Infanzia e dell’Adolescenza), con incontri periodici con la psicologa e la neuropsichiatra infantile.<br><br>
I servizi sociali si attivano, chiedendo che la madre intraprenda un percorso di supporto psicologico presso il CPS (Centro Psico Sociale) e segnalando la situazione al Tribunale per i Minorenni competente.<br><br>
Nel dicembre 2021 il Tribunale dispone il collocamento in una comunità mamma-bambino. Viene avviata la ricerca di una comunità adeguata, ma purtroppo non se ne trovano nel territorio di Monza e Brianza e il trasferimento in un altro territorio comporterebbe il distacco da tutti i servizi che ruotano attorno al nucleo, scuola compresa.<br><br>
Nel febbraio 2022 viene individuata una comunità nella zona di Rho e iniziano i primi colloqui in vista del trasferimento.<br><br>
Nel marzo 2022 arriva una buona notizia: il padre giunge finalmente dalla Libia e viene invitato a sostenere un colloquio conoscitivo con l’assistente sociale. Durante l’incontro viene illustrata la situazione, sempre con il supporto della mediatrice; in tale occasione il padre chiede di poter parlare con il giudice che ha emesso il decreto di collocamento in comunità per la moglie e i tre figli.<br><br>
Questa novità modifica la situazione del nucleo: il giudice si dimostra disponibile a riesaminare il caso e a incontrare il padre prima di prendere una decisione definitiva. Il nucleo resta quindi, per il momento, accolto nel progetto SAI.<br><br>
L’équipe si riunisce per decidere come agire alla luce della nuova composizione del nucleo e per ridefinire i nuovi obiettivi dell’intervento.<br><br>
<b>Coordinatrice:</b><br>Da regolamento SAI non è prevista la presenza notturna, negli appartamenti, di persone esterne al progetto; il Comune è stato molto chiaro su questo punto. Riconosco tuttavia che la presenza del padre in casa contribuisce al benessere generale del nucleo, in particolare del figlio più piccolo, A.<br><br>
<b>Educatrice di riferimento:</b><br>Dalle osservazioni effettuate, il signor B. risulta essere una risorsa importante per la moglie e per i figli. È molto presente nel suo ruolo di padre e di marito; si dimostra disponibile, collaborativo e capace di comprendere e sostenere la complessa situazione che si trova ad affrontare al suo arrivo. Inoltre parla inglese.<br><br>
<b>Mediatrice linguistica e culturale:</b><br>Da quanto osservato, ritengo che il nucleo abbia un forte bisogno di aiuto. Riconosco nel padre una figura positiva, ma anche le difficoltà di adattamento che si appresta ad affrontare, essendo arrivato in un Paese di cui non conosce lingua e cultura.<br><br>
<b>Operatore per l’integrazione:</b><br>Mi rendo disponibile a supportare il padre, in futuro, nell’orientamento professionale e nella ricerca attiva di lavoro.<br><br>
<b>Assistente sociale:</b><br>Ritengo che l’arrivo del padre, pur essendo una figura positiva, non possa rappresentare la soluzione ai problemi che riguardano l’intero nucleo e che sono emersi nel corso degli anni. Credo che i minori non abbiano avuto una figura genitoriale significativa (la madre non è in grado di prendersi cura di se stessa e il padre non lo hanno visto per molti anni) e che necessitino di un supporto educativo differente.<br><br>
<b>Psicologa:</b><br>Ho incontrato la signora B. per alcuni colloqui e ho riscontrato fin da subito una grande difficoltà nel formulare un progetto di vita per sé e per i suoi figli. Ritengo che il nucleo necessiti di una presa in carico socio-educativa che il SAI, per tipologia di servizio, non può garantire. La comunità mamma-bambino potrebbe quindi rappresentare una possibile soluzione adeguata.<br><br>
<b>Altra educatrice:</b><br>In questi anni ho sostituito l’educatrice di riferimento durante i periodi di ferie o malattia. Ho da sempre rilevato una grande difficoltà della madre nel prendersi cura di se stessa e dei figli.`
  },
  {
    title: 'Il percorso di A.',
    text: `A è accolto nel progetto SAI Monza dal 01/02/2022.<br><br>
Negli anni di accoglienza in CAS è stato sottoposto a quattro operazioni chirurgiche alla gamba destra, dovute a una precedente rottura del femore che ha portato allo sviluppo di una forma piuttosto grave di osteomielite. Questo problema di salute non gli ha permesso di avviare un percorso di formazione e integrazione sul territorio.<br><br>
All’arrivo nel progetto SAI la situazione sanitaria era stabile, e questo ha permesso ad A di iniziare un percorso di integrazione sul territorio, concentrandosi sulla formazione professionale e sull’inserimento lavorativo.<br>
Ha svolto un corso di formazione di tre mesi come addetto mensa e, successivamente, un tirocinio di sei mesi presso un’azienda, sempre in qualità di addetto mensa.<br><br>
Questo percorso è stato molto positivo per A, che ha finalmente iniziato a proiettarsi in un futuro autonomo in Italia, con un lavoro e un reddito (che, dal suo arrivo, non aveva mai avuto).<br><br>
Tuttavia, a partire da ottobre 2022, la situazione clinica è peggiorata: A ha lamentato un forte aumento del dolore e ha intensificato le visite ortopediche, dalle quali è emerso che la frattura del femore non si è ricomposta completamente. Ciò ha causato una mobilità dei chiodi e, di conseguenza, un aumento esponenziale del dolore.<br><br>
Questa condizione è diventata incompatibile con il lavoro: come addetto mensa, A doveva stare in piedi sei ore al giorno per sei giorni alla settimana, una situazione ormai per lui insostenibile. Per questo motivo, alla fine di dicembre 2022, A sceglie di non riconfermare il contratto di lavoro.<br><br>
L’ultima visita ortopedica ha evidenziato la necessità di un ulteriore intervento chirurgico urgente, finalizzato all’inserimento di un nuovo innesto nel femore per favorire la guarigione della frattura e alla sostituzione dei chiodi ormai laschi. La prospettiva è quella di un intervento nel mese di febbraio 2023, con una settimana di ricovero ospedaliero e almeno un mese successivo dedicato alla riabilitazione.<br><br>
L’équipe acconsente a prorogare il periodo di accoglienza di A di almeno altri sei mesi, oltre il primo anno (scaduto a febbraio 2023), per motivi sanitari.<br><br>
Il percorso di A è sempre stato positivo: si è dimostrato collaborativo e attivamente partecipe al proprio progetto di integrazione, tanto da aver ottenuto un permesso per tornare a trovare la sua famiglia nel Paese d’origine prima dell’operazione.<br><br>
L’8 febbraio 2023 l’educatrice di riferimento di A riceve una telefonata dalla Polizia, che comunica che A è stato trovato a spacciare in stazione e successivamente seguito presso l’abitazione, dove sono stati rinvenuti 70 grammi di hashish nel suo armadio.<br><br>
Ad A viene fissato un processo per direttissima il giorno successivo. La mattina seguente, l’educatrice di riferimento ha modo di raccogliere le dichiarazioni di A in merito all’accaduto: riferisce che l’hashish trovato nel suo armadio non era di sua proprietà, ma apparteneva a una persona esterna al progetto che da tempo dormiva lì.<br><br>
L’avvocato d’ufficio di A chiede al giudice il rinvio del processo, al fine di avere più tempo per raccogliere elementi utili alla difesa. Il processo viene fissato per maggio 2023 e, fino a quella data, A ha l’obbligo di firma in questura tutte le mattine.<br><br>
L’équipe multidisciplinare si riunisce per discutere il caso.<br><br>
Come si posiziona l’équipe rispetto al percorso di A all’interno del progetto SAI?<br>
Strumenti di lavoro: patto di accoglienza e regolamento della struttura.<br><br>
<b>Coordinatrice</b>:<br>Ricevo una telefonata dalla responsabile del progetto SAI del Comune, che ci chiede di valutare seriamente l’espulsione di A dal progetto. Devo conciliare l’esigenza di tutelare il progetto di accoglienza, sia internamente sia esternamente, con tutto il lavoro svolto dalla mia équipe con A.<br><br>
<b>Educatrice di riferimento</b>:<br>Sono la figura che ha la relazione più diretta con A e il mio principale focus di attenzione riguarda la sua salute fisica e la non dispersione del suo percorso progettuale.<br><br>
<b>Assistente sociale</b>:<br>Inizio a valutare quali potrebbero essere i servizi attivabili sul territorio in caso di espulsione di A dal progetto SAI.<br><br>
<b>Operatore per l’integrazione</b>:<br>Conosco A per il percorso formativo e lavorativo svolto, che è stato molto positivo; non avevo mai rilevato comportamenti problematici.<br><br>
<b>Altra educatrice</b> (che lavora insieme all’educatrice di riferimento nell’appartamento):<br>Conosco A, ma non in modo approfondito; il mio focus riguarda le ripercussioni di questa vicenda sugli altri ospiti della casa.<br><br>
<b>Psicologa</b>:<br>Ho incontrato A un paio di volte in colloquio a causa della difficoltà ad accettare la sua condizione fisica. L’ho trovato molto fragile: frustrato per aver dovuto rinunciare al lavoro a causa del dolore e combattuto tra la disillusione e, allo stesso tempo, la speranza legata a un nuovo intervento chirurgico.`
  },
  {
    title: 'Il caso di P.',
    text: `P. è un ragazzo di 27 anni, accolto nel progetto SAI Monza dal marzo 2022.<br><br>
All’ingresso nel progetto dimostra un alto livello di autonomia, senso pratico, un buon grado di collaborazione e un’ottima conoscenza della lingua italiana; è inoltre titolare di un contratto di lavoro a tempo determinato della durata di un anno, attivo dal luglio 2021.<br><br>
Queste premesse positive si infrangono tra la fine di marzo e l’inizio di aprile 2022, quando l’ospite inizia ad accusare malesseri diffusi e si rivolge al medico di base. Pochi giorni dopo la comparsa dei primi sintomi, P. entra in uno stato confusionale difficile da indagare, che lo porta a mostrarsi diffidente sia nei confronti delle educatrici sia dei medici.<br><br>
In occasione di un episodio di particolare malessere, le operatrici lo accompagnano al pronto soccorso. A seguito dei primi approfondimenti, i medici riscontrano una macchia nel cervello e ipotizzano che P. abbia avuto un ictus. Viene proposto il ricovero, ma P. rifiuta e firma le dimissioni volontarie.<br><br>
Nel frattempo, il contratto di lavoro giunge a scadenza. Il datore di lavoro si dimostra molto sensibile nei confronti di P., avendo egli stesso notato un drastico cambiamento nei comportamenti del ragazzo, che lo induce a contattare l’educatrice di riferimento. Si instaura una buona collaborazione tra équipe e datore di lavoro per la restante durata del contratto, a supporto di P. Tuttavia, alla scadenza del contratto e alla luce delle sopravvenute condizioni di salute, il datore si trova, a malincuore, nell’impossibilità di rinnovarlo, non ritenendo sicuro impiegare in azienda una persona in uno stato di tale smarrimento e confusione.<br><br>
L’équipe mette in atto alcune strategie per far fronte alla situazione, tra cui la presa in carico congiunta da parte di due educatrici.<br><br>
Nei mesi successivi, durante i colloqui settimanali, le educatrici cercano di aiutare l’ospite a comprendere, in sinergia con il medico di base, la necessità di approfondire la situazione clinica attraverso gli esami prescritti. Tuttavia, P. si mostra fortemente resistente agli interventi medici, anche a causa del suo stato confusionale.<br><br>
Con grande difficoltà si riesce a eseguire una risonanza magnetica. Viene prenotata una visita neurologica per discutere l’esito degli esami, ma P. si rifiuta di presentarsi. Alla visita si reca quindi una delle operatrici, portando con sé tutta la documentazione medica. Il neurologo conferma la diagnosi di ictus, ma richiede ulteriori accertamenti, anche in considerazione della giovane età del paziente. Anche rispetto a questi ulteriori approfondimenti, P. si dimostra totalmente non collaborativo.<br><br>
L’équipe si riunisce per riflettere su come supportare P. nel miglior modo possibile, nei limiti delle sue attuali capacità.<br><br>
<b>Assistente sociale</b>:<br>Ritengo che ci siano gli estremi per avviare una pratica di invalidità e che sia necessario individuare una struttura di riabilitazione idonea. Ho contattato alcuni centri riabilitativi, ma tutti richiedono ulteriori esami di approfondimento.<br><br>
<b>Educatrice di riferimento</b>:<br>Io e l’altra educatrice stiamo incontrando molte difficoltà nel lavoro con P. e nell’organizzazione degli accompagnamenti. È confuso, parzialmente consapevole della propria confusione, non comprende cosa gli stia accadendo e chiede continuamente spiegazioni sui passaggi da compiere, anche ripetendo le stesse domande più volte. È una situazione molto faticosa, sia per lui sia per noi. Fortunatamente, la relazione educativa appare solida.<br><br>
<b>Operatore per l’integrazione</b>:<br>Vengo contattato dalla responsabile della cooperativa Di Mano In Mano di Cambiago, con cui in passato sono stati attivati tirocini di inclusione sociale (non finalizzati all’assunzione). Mi comunica la disponibilità di una postazione.<br><br>
<b>Psicologa</b>:<br>Rilevo un forte affaticamento dell’équipe e, vista la resistenza dell’ospite alle cure, propongo un periodo di monitoraggio della sua permanenza nel progetto, senza sollecitare visite o altre attività. L’idea è attendere che sia P. a rendersi conto della necessità di prendersi cura della propria condizione.<br><br>
<b>Mediatore linguistico e culturale</b>:<br>Rifletto sulle diverse possibilità di cura della malattia e, in questa situazione, ritengo possa essere utile contattare la famiglia di origine, per esplorare eventuali modalità di cura alternative a quelle occidentali.<br><br>
<b>Coordinatrice</b>:<br>Ricordo che è già trascorso più di un anno di progetto e che risulta complesso giustificare ulteriormente la permanenza di P. al Ministero. Propongo quindi di richiedere una presa in carico al Servizio Sociale di riferimento e svolgo una funzione di raccordo tra le diverse posizioni dell’équipe.`
  },
  {
    title: 'Il viaggio di Y.',
    text: `Y, nato in Tunisia il 09/05/2004.<br><br>
Y lascia la Tunisia all’età di 16 anni, spinto dai genitori a trovare un buon lavoro in Europa, inviare denaro a casa per contribuire alle spese familiari e permettere ai tre fratelli più piccoli di studiare. A Monastir (Tunisia) lavora per quasi un anno come operaio edile, con l’obiettivo di risparmiare il denaro necessario per il viaggio in gommone verso le coste italiane.<br><br>
Una volta arrivato a Lampedusa, raggiunge autonomamente il Nord Italia, dopo aver saputo da alcuni connazionali che a Monza sono presenti progetti dedicati ai MSNA (minori stranieri non accompagnati). Viene quindi collocato per un anno presso una comunità di Monza, che segnala inizialmente una scarsa collaborazione progettuale da parte di Y e una difficoltà nel costruire un’idea di futuro in autonomia, dovuta a una limitata consapevolezza delle proprie risorse personali. Anche in ambito scolastico fatica a tollerare l’impegno richiesto dallo studio.<br><br>
Nel corso dei mesi, tuttavia, la comunità osserva un progressivo miglioramento: Y frequenta il corso di lingua italiana A2 presso il CPIA di Desio (MB) e conclude con successo il percorso nel giugno 2022, ottenendo una valutazione di 8/10.<br><br>
In data 10/05/2022 viene trasferito in un appartamento per la semi-autonomia all’interno del progetto SAI MSNA Monza, gestito dal Consorzio Comunità Brianza.<br><br>
Da febbraio a maggio 2022 frequenta un corso di falegnameria attivato da Randstad HR Solutions Srl presso la scuola ASLAM. Y si mostra entusiasta di questa esperienza, che contribuisce in modo significativo a rassicurarlo rispetto alle possibilità del suo futuro professionale. Al termine del corso, Randstad prevede un inserimento lavorativo presso un’azienda come falegname, ma l’assunzione viene bloccata a causa di problemi documentali (potrà essere assunta solo dopo il ritiro del permesso di soggiorno per affidamento).<br><br>
Al termine del corso gli viene proposto un percorso scolastico, finalizzato al miglioramento della conoscenza linguistica, che Y decide però di rifiutare.<br><br>
Nei mesi successivi, Y torna a mostrare una scarsa collaborazione progettuale, probabilmente legata alla difficoltà di delineare obiettivi futuri chiari.<br><br>
Dopo l’avvio di un percorso di orientamento lavorativo con l’<b>operatore per l’integrazione</b> del progetto SAI MSNA, durante il quale esprime il desiderio di lavorare nel settore della ristorazione, Y inizia un tirocinio presso McDonald’s nel mese di ottobre. Prima di accettare il tirocinio, tuttavia, impiega molto tempo nel prendere una decisione e manifesta difficoltà nel rispettare appuntamenti e colloqui fissati con l’<b>équipe educativa</b> per discutere degli obiettivi progettuali.<br><br>
Il tirocinio, che avrebbe dovuto avere una durata di tre mesi, viene interrotto dopo sole tre settimane, per scelta di Y.<br><br>
Successivamente, Y ritira finalmente il permesso di soggiorno per affidamento. L’<b>équipe</b> contatta nuovamente Randstad, ma Y appare ormai totalmente demotivato rispetto all’idea di intraprendere un percorso lavorativo.<br><br>
Mostra inoltre una scarsa autonomia nella gestione della casa, non rispettando i turni di pulizia e mantenendo, più in generale, un atteggiamento poco propositivo nei confronti della realtà che lo circonda.<br><br>
Dal punto di vista caratteriale, Y è molto timido e introverso; fatica a parlare e a esprimere pensieri e bisogni con l’<b>educatrice di riferimento</b>, rendendo complesso il lavoro progettuale. Sul territorio, tuttavia, dispone di una rete di amici con cui trascorre la maggior parte del tempo nel pomeriggio e nella sera.<br><br>
Alla luce delle difficoltà attuali nel supportare Y nello sviluppo di un progetto di autonomia, l’<b>équipe</b> si interroga su quali possibili azioni mettere in campo per aiutarlo a riacquistare fiducia in se stesso.<br><br>
<b>Operatore per l’integrazione</b>:<br>Mi sento piuttosto avvilito per l’ultima esperienza lavorativa interrotta e non ritengo che, al momento, vi siano le condizioni per proporre un nuovo inserimento professionale.<br><br>
<b>Educatrice di riferimento</b>:<br>Sono la figura che ha instaurato la relazione più significativa con Y. Sono stanca, ma non ancora pronta a rinunciare. Continuo a pensare che l’avvio di un’attività lavorativa possa rappresentare una svolta. In un raro momento di apertura, Y mi ha confidato che un’altra professione che gli piacerebbe svolgere è quella del parrucchiere, mestiere esercitato dal padre.<br><br>
<b>Psicologa</b>:<br>Ritengo che Y abbia bisogno di acquisire maggiore fiducia in se stesso. Propongo di avviare alcuni colloqui, pur temendo una sua possibile non adesione. Mi confronto quindi con l’<b>équipe</b> per individuare la modalità migliore per “agganciarlo”.<br><br>
<b>Coordinatrice</b>:<br>La responsabile del progetto SAI MSNA del Comune mi chiede di inviare il PEI aggiornato e di fornire aggiornamenti sul progetto di Y. Avverto inoltre la pressione legata alla necessità di liberare posti nel progetto, considerando il numero elevato di MSNA presenti sul territorio e non ancora collocati.<br><br>
<b>Altra educatrice</b> presente in appartamento:<br>Temo che il comportamento di Y in casa possa avere un’influenza negativa sugli altri ospiti. Se lui non rispetta le regole, anche gli altri potrebbero sentirsi legittimati a fare lo stesso.<br><br>
<b>Mediatore linguistico e culturale</b>:<br>Sono un cittadino tunisino e vengo coinvolto dall’<b>educatrice di riferimento</b> e dalla <b>coordinatrice</b> per supportare l’<b>équipe</b> nel lavoro con Y. L’ho incontrato in contesti informali e ho l’impressione che Y percepisca le figure professionali del progetto esclusivamente come normative, e non come alleate. Suggerisco di proporre attività condivise, da svolgere insieme, per favorire un maggiore senso di appartenenza al progetto e rafforzare la fiducia nell’<b>équipe</b>.`
  }
];

let storyView = null;
let storyBackBtn = null;

function showStory(idx) {
      // Rimuovi eventuale titolo storia precedente
      let storyHeader = document.getElementById('modal16-story-header');
      if (storyHeader) storyHeader.remove();
      // Crea e inserisci il titolo storia in alto
      const headerSwitch = document.querySelector('#modal16 .testimonianze-header-switch');
      if (headerSwitch) {
        storyHeader = document.createElement('div');
        storyHeader.id = 'modal16-story-header';
        storyHeader.className = 'modal16-story-title';
        storyHeader.textContent = stories[idx].title;
        headerSwitch.insertAdjacentElement('afterend', storyHeader);
      }
    // Nascondi il titolo h2 principale e mostra solo il titolo storia
    const modal16Title = document.querySelector('#modal16 h2');
    if (modal16Title) modal16Title.style.display = 'none';
  if (!storiesScreen) return;
  // Nascondi lista storie
  const intro = storiesScreen.querySelector('.modal16-stories-intro');
  const btns = storiesScreen.querySelector('.modal16-stories-btns');
  if (intro) intro.style.display = 'none';
  if (btns) btns.style.display = 'none';
  // Mostra il bottone Indietro in alto
  if (backBtn) {
    backBtn.style.display = 'inline';
    backBtn.style.position = '';
    backBtn.style.top = '';
    backBtn.style.left = '';
  }

  // Crea o mostra il contenitore storia
  if (!storyView) {
    storyView = document.createElement('div');
    storyView.className = 'modal16-story-view';
    storyView.style.display = 'flex';
    storyView.style.flexDirection = 'column';
    storyView.style.alignItems = 'center';
    storyView.style.justifyContent = 'center';
    storyView.style.marginTop = '10px';
    storyView.style.maxWidth = 'none';
    storyView.style.width = '100%';
    storyView.style.textAlign = 'left';
    storiesScreen.appendChild(storyView);
  }
  storyView.innerHTML =
    `<div class="modal16-story-text" style="font-size:1em; color:#444; margin-bottom:22px;">${stories[idx].text}</div>`;

  // Nascondi eventuale bottone "Torna all’elenco storie" vecchio
  if (storyBackBtn) storyBackBtn.style.display = 'none';

  storyView.style.display = 'flex';
}

if (storiesBtn && storiesScreen && mainOrbitSchema && btnRow && backBtn && modal16Number) {
  storiesBtn.addEventListener('click', function() {
    mainOrbitSchema.style.display = 'none';
    btnRow.style.display = 'none';
    storiesScreen.style.display = 'flex';
    // Reset view
    if (storyView) storyView.style.display = 'none';
    if (storyBackBtn) storyBackBtn.style.display = 'none';
    const intro = storiesScreen.querySelector('.modal16-stories-intro');
    const btns = storiesScreen.querySelector('.modal16-stories-btns');
    if (intro) intro.style.display = '';
    if (btns) btns.style.display = '';
    // Mostra il bottone Indietro, nascondi il numero
    backBtn.style.display = 'inline';
    modal16Number.style.display = 'none';
  });
  backBtn.addEventListener('click', function() {
    const modal16Title = document.querySelector('#modal16 h2');
    // Se siamo in modalità storia, torna all'elenco storie
    if (storyView && storyView.style.display !== 'none') {
      storyView.style.display = 'none';
      if (storyBackBtn) storyBackBtn.style.display = 'none';
      const intro = storiesScreen.querySelector('.modal16-stories-intro');
      const btns = storiesScreen.querySelector('.modal16-stories-btns');
      if (intro) intro.style.display = '';
      if (btns) btns.style.display = '';
      // Ripristina il titolo principale
      if (modal16Title) modal16Title.style.display = '';
      // Rimuovi il titolo storia in alto
      let storyHeader = document.getElementById('modal16-story-header');
      if (storyHeader) storyHeader.remove();
      // lascia il bottone Indietro visibile
      return;
    }
    // Altrimenti torna alla schermata principale
    storiesScreen.style.display = 'none';
    mainOrbitSchema.style.display = 'flex';
    btnRow.style.display = 'flex';
    // Mostra il numero, nascondi il bottone Indietro
    modal16Number.style.display = '';
    backBtn.style.display = 'none';
    // Ripristina il titolo principale
    if (modal16Title) modal16Title.style.display = '';
    // Rimuovi il titolo storia in alto
    let storyHeader = document.getElementById('modal16-story-header');
    if (storyHeader) storyHeader.remove();
  });
  // Gestione click sui bottoni delle storie
  const storyBtns = storiesScreen.querySelectorAll('.storie-btn');
  storyBtns.forEach((btn, idx) => {
    btn.addEventListener('click', function() {
      showStory(idx);
    });
  });
}

// 17. Square 17 opens modal17
const square17 = document.getElementById("square-17");
const modal17 = document.getElementById("modal17");
const modal17Close = modal17 ? modal17.querySelector(".link-professionisti-close") : null;
const modal17Home = document.getElementById("modal17-home");
const modal17Mediatore = document.getElementById("modal17-mediatore");
const modal17Podcast = document.getElementById("modal17-podcast");
const modal17Armentalhealth = document.getElementById("modal17-armentalhealth");
if (square17 && modal17 && modal17Close && modal17Home && modal17Mediatore && modal17Podcast && modal17Armentalhealth) {
  function show17(section) {
    modal17Home.style.display = section === 'home' ? '' : 'none';
    modal17Mediatore.style.display = section === 'mediatore' ? '' : 'none';
    modal17Podcast.style.display = section === 'podcast' ? '' : 'none';
    modal17Armentalhealth.style.display = section === 'armentalhealth' ? '' : 'none';
  }
  square17.addEventListener("click", () => {
    show17('home');
    modal17.style.display = "block";
    document.documentElement.style.overflow = "hidden";
  });
  modal17Close.addEventListener("click", function() {
    modal17.style.display = "none";
    document.documentElement.style.overflow = "";
  });
  window.addEventListener("click", function(event) {
    if (event.target === modal17) {
      modal17.style.display = "none";
      document.documentElement.style.overflow = "";
    }
  });
  // Bottoni home
  document.getElementById("btn-mediatore").addEventListener("click", function() { show17('mediatore'); });
  document.getElementById("btn-podcast").addEventListener("click", function() { show17('podcast'); });
  document.getElementById("btn-armentalhealth").addEventListener("click", function() { show17('armentalhealth'); });
  // Bottoni indietro
  document.getElementById("btn-back-mediatore").addEventListener("click", function() { show17('home'); });
  document.getElementById("btn-back-podcast").addEventListener("click", function() { show17('home'); });
  document.getElementById("btn-back-armentalhealth").addEventListener("click", function() { show17('home'); });
}

// Square 18 opens MSNA modal
const square18 = document.getElementById("square-18");
const msnaModal = document.getElementById("msnaModal");
const msnaClose = msnaModal ? msnaModal.querySelector(".msna-close") : null;
if (square18 && msnaModal && msnaClose) {
  square18.addEventListener("click", function() {
    msnaModal.style.display = "block";
  });
  msnaClose.addEventListener("click", function() {
    msnaModal.style.display = "none";
  });
  window.addEventListener("click", function(event) {
    if (event.target === msnaModal) {
      msnaModal.style.display = "none";
    }
  });
}

// Square 19 opens MSNA di Monza modal con slideshow immagini dixit
const square19 = document.getElementById("square-19");
const msnaMonzaModal = document.getElementById("msnaMonzaModal");
const msnaMonzaClose = msnaMonzaModal ? msnaMonzaModal.querySelector(".msna-monza-close") : null;
const msnaMonzaImg = document.getElementById("msna-monza-img");
const dixitImages = [
  "images/dixit/1.webp",
  "images/dixit/2.webp",
  "images/dixit/3.webp",
  "images/dixit/4.webp",
  "images/dixit/5.webp",
  "images/dixit/6.webp",
  "images/dixit/7.webp",
  "images/dixit/8.webp",
  "images/dixit/9.webp",
  "images/dixit/10.webp"
];
let dixitInterval = null;
let dixitIndex = 0;

function startDixitSlideshow() {
  if (!msnaMonzaImg) return;
  dixitIndex = 0;
  msnaMonzaImg.src = dixitImages[dixitIndex];
  dixitInterval = setInterval(() => {
    dixitIndex = (dixitIndex + 1) % dixitImages.length;
    msnaMonzaImg.src = dixitImages[dixitIndex];
  }, 150);
}

function stopDixitSlideshow() {
  if (dixitInterval) {
    clearInterval(dixitInterval);
    dixitInterval = null;
  }
}

// Pausa slideshow quando si tiene premuto sull'immagine
if (msnaMonzaImg) {
  let pausedByMouse = false;
  msnaMonzaImg.addEventListener('mousedown', function(e) {
    pausedByMouse = true;
    stopDixitSlideshow();
  });
  msnaMonzaImg.addEventListener('touchstart', function(e) {
    pausedByMouse = true;
    stopDixitSlideshow();
  });
  msnaMonzaImg.addEventListener('mouseup', function(e) {
    if (pausedByMouse) {
      startDixitSlideshow();
      pausedByMouse = false;
    }
  });
  msnaMonzaImg.addEventListener('mouseleave', function(e) {
    if (pausedByMouse) {
      startDixitSlideshow();
      pausedByMouse = false;
    }
  });
  msnaMonzaImg.addEventListener('touchend', function(e) {
    if (pausedByMouse) {
      startDixitSlideshow();
      pausedByMouse = false;
    }
  });
}

if (square19 && msnaMonzaModal && msnaMonzaClose && msnaMonzaImg) {
  square19.addEventListener("click", function() {
    msnaMonzaModal.style.display = "block";
    document.documentElement.style.overflow = "hidden";
    startDixitSlideshow();
  });
  msnaMonzaClose.addEventListener("click", function() {
    msnaMonzaModal.style.display = "none";
    document.documentElement.style.overflow = "";
    stopDixitSlideshow();
  });
  window.addEventListener("click", function(event) {
    if (event.target === msnaMonzaModal) {
      msnaMonzaModal.style.display = "none";
      document.documentElement.style.overflow = "";
      stopDixitSlideshow();
    }
  });
}