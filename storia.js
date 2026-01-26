// Accordion functionality for storia.html
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            
            // Toggle active state for clicked section
            section.classList.toggle('active');
        });
    });

    // Check if there's a hash in the URL and expand the corresponding section
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection && targetSection.classList.contains('accordion-section')) {
            targetSection.classList.add('active');
            // Scroll to the section itself to make the header visible
            // Use setTimeout to ensure the DOM is ready
            setTimeout(() => {
                // Scroll to the accordion section with some offset to show the header
                const yOffset = -80; // Negative offset to show content above
                const element = targetSection;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 100);
        }
    }
});
