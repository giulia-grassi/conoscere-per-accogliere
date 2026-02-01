// Script estratto da about.html
// Gallery toggle functionality

const dixitToggleBtn = document.getElementById('dixit-toggle');
const dixitPreviewGallery = document.getElementById('dixit-preview-gallery');



dixitToggleBtn?.addEventListener('click', () => {
    // Espansione/riduzione galleria Dixit preview
    if (dixitPreviewGallery) {
        const expandedClass = 'expanded';
        if (!dixitPreviewGallery.classList.contains(expandedClass)) {
            dixitPreviewGallery.classList.add(expandedClass);
            // Mostra tutte le immagini
            const items = dixitPreviewGallery.querySelectorAll('.gallery-item');
            items.forEach(item => { item.style.display = ''; });
            dixitToggleBtn.textContent = 'Mostra meno';
        } else {
            dixitPreviewGallery.classList.remove(expandedClass);
            // Nascondi dalla quarta in poi
            const items = dixitPreviewGallery.querySelectorAll('.gallery-item');
            items.forEach((item, idx) => {
                if (idx >= 3) item.style.display = 'none';
                else item.style.display = '';
            });
            dixitToggleBtn.textContent = 'Vedi tutto';
        }
        // Scrolla il bottone in vista
        dixitToggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});



// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let allImages = [];
let currentImageIndex = 0;
let imagesInLightbox = [];

// Collect all gallery images
// Espone variabili globali per la lightbox gallery
window.imagesInLightbox = [];
window.currentImageIndex = 0;
window.openLightbox = openLightbox;

function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-full .gallery-item img');
    const dixitImages = document.querySelectorAll('.dixit-full .gallery-item img');
    const dixitPreviewImages = document.querySelectorAll('#dixit-preview-gallery .gallery-item img');

    // Dixit preview: click su immagine o overlay
    dixitPreviewImages.forEach((img, idx) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const overlay = img.parentElement.querySelector('.dixit-overlay .dixit-text');
            const caption = overlay ? overlay.textContent : (img.dataset.caption || '');
            imagesInLightbox = Array.from(dixitPreviewImages);
            currentImageIndex = idx;
            openLightbox(img.src, caption);
        });
        // Se c'è overlay, rendilo cliccabile
        const overlayDiv = img.parentElement.querySelector('.dixit-overlay');
        if (overlayDiv) {
            overlayDiv.style.cursor = 'pointer';
            overlayDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                const overlay = overlayDiv.querySelector('.dixit-text');
                const caption = overlay ? overlay.textContent : (img.dataset.caption || '');
                imagesInLightbox = Array.from(dixitPreviewImages);
                currentImageIndex = idx;
                openLightbox(img.src, caption);
            });
        }
    });

    // Regular gallery images click
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            imagesInLightbox = Array.from(galleryImages);
            currentImageIndex = index;
            openLightbox(img.src, img.dataset.caption || '');
        });
    });

    // Dixit overlay click (only in dixit-full section)
    const dixitOverlays = document.querySelectorAll('.dixit-full .dixit-overlay');
    dixitOverlays.forEach((overlay) => {
        overlay.style.cursor = 'pointer';
        overlay.addEventListener('click', (e) => {
            e.stopPropagation();
            const img = overlay.parentElement.querySelector('img');
            const dixitIndex = Array.from(dixitImages).indexOf(img);
            imagesInLightbox = Array.from(dixitImages);
            currentImageIndex = dixitIndex;
            openLightbox(img.src, img.dataset.caption || '');
        });
    });

    // Dixit preview: click su immagine o overlay
    dixitPreviewImages.forEach((img) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            // Se c'è un overlay, prendi il testo da lì
            const overlay = img.parentElement.querySelector('.dixit-overlay .dixit-text');
            const caption = overlay ? overlay.textContent : (img.dataset.caption || '');
            openLightbox(img.src, caption);
        });
        // Se c'è overlay, rendilo cliccabile
        const overlayDiv = img.parentElement.querySelector('.dixit-overlay');
        if (overlayDiv) {
            overlayDiv.style.cursor = 'pointer';
            overlayDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                const overlay = overlayDiv.querySelector('.dixit-text');
                const caption = overlay ? overlay.textContent : (img.dataset.caption || '');
                openLightbox(img.src, caption);
            });
        }
    });
}

function openLightbox(src, caption = '') {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightboxCaption.style.display = caption ? 'block' : 'none';
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    if (!imagesInLightbox.length) return;
    currentImageIndex = (currentImageIndex - 1 + imagesInLightbox.length) % imagesInLightbox.length;
    lightboxImg.src = imagesInLightbox[currentImageIndex].src;
    const caption = imagesInLightbox[currentImageIndex].dataset.caption || '';
    lightboxCaption.textContent = caption;
    lightboxCaption.style.display = caption ? 'block' : 'none';
}

function showNextImage() {
    if (!imagesInLightbox.length) return;
    currentImageIndex = (currentImageIndex + 1) % imagesInLightbox.length;
    lightboxImg.src = imagesInLightbox[currentImageIndex].src;
    const caption = imagesInLightbox[currentImageIndex].dataset.caption || '';
    lightboxCaption.textContent = caption;
    lightboxCaption.style.display = caption ? 'block' : 'none';
}

// Event listeners
lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', showPrevImage);
lightboxNext?.addEventListener('click', showNextImage);

// Close on background click
lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

// Initialize lightbox after page load
window.addEventListener('load', initLightbox);
// Nascondi dalla quarta in poi nella galleria Dixit preview (al caricamento)
window.addEventListener('DOMContentLoaded', () => {
    const preview = document.getElementById('dixit-preview-gallery');
    if (preview && !preview.classList.contains('expanded')) {
        const items = preview.querySelectorAll('.gallery-item');
        items.forEach((item, idx) => {
            if (idx >= 3) item.style.display = 'none';
            else item.style.display = '';
        });
    }
});
