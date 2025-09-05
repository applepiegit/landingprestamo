// Carousel functionality
function initCarousel() {
    const wrapper = document.querySelector('.testimonial-wrapper');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    const slideCount = slides.length;
    const slideInterval = 3000; // 3 seconds

    // Clone entire set of slides for truly infinite effect
    const allSlides = Array.from(slides);
    const firstSet = allSlides.map(slide => slide.cloneNode(true));
    const lastSet = allSlides.map(slide => slide.cloneNode(true));
    
    // Add clones to wrapper
    lastSet.forEach(clone => wrapper.insertBefore(clone, wrapper.firstChild));
    firstSet.forEach(clone => wrapper.appendChild(clone));

    // Calculate slide width including gap
    const slideWidth = slides[0].offsetWidth + 32; // width + gap (2rem)
    
    // Initial position (skip the cloned set)
    wrapper.style.transform = `translateX(-${slideCount * slideWidth}px)`;
    let position = slideCount; // Start at the original set

    // Function to update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-gray-900', index === currentSlide);
            dot.classList.toggle('bg-gray-300', index !== currentSlide);
        });
    }

    // Function to slide to next
    function slideNext() {
        position++;
        currentSlide = (currentSlide + 1) % slideCount;
        wrapper.style.transition = 'transform 0.5s ease-in-out';
        wrapper.style.transform = `translateX(-${position * slideWidth}px)`;
        updateDots();

        // Reset position smoothly when reaching the end
        if (position >= slideCount * 2) {
            setTimeout(() => {
                wrapper.style.transition = 'none';
                position = slideCount;
                wrapper.style.transform = `translateX(-${position * slideWidth}px)`;
            }, 500);
        }
    }

    // Add transition end handler for smooth infinite scroll
    wrapper.addEventListener('transitionend', () => {
        if (position <= 0) {
            wrapper.style.transition = 'none';
            position = slideCount;
            wrapper.style.transform = `translateX(-${position * slideWidth}px)`;
        }
    });

    // Start automatic slideshow
    const interval = setInterval(slideNext, slideInterval);

    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            position = index + slidesToClone;
            wrapper.style.transition = 'transform 0.5s ease-in-out';
            wrapper.style.transform = `translateX(-${position * slideWidth}px)`;
            updateDots();
        });
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initCarousel);
