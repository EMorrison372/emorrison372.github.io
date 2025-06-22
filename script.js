// Quote carousel functionality (for index.html)
let currentQuote = 0;
const quotes = document.querySelectorAll('.quote');

// Initialize quote positions
function initializeQuotes() {
    if (quotes.length > 0) {
        quotes.forEach((quote, index) => {
            if (index === 0) {
                quote.classList.add('active');
            } else {
                quote.classList.add('next');
            }
        });
    }
}

function showNextQuote() {
    if (quotes.length === 0) return;

    const current = currentQuote;
    const next = (currentQuote + 1) % quotes.length;

    // Move current quote to the left (out of view)
    quotes[current].classList.remove('active');
    quotes[current].classList.add('prev');

    // Move next quote to center (active position)
    quotes[next].classList.remove('next', 'prev');
    quotes[next].classList.add('active');

    // After the animation completes, reset the exited quote to the right side
    // but don't animate it - just position it for the next cycle
    setTimeout(() => {
        quotes[current].classList.remove('prev');
        quotes[current].style.transition = 'none';
        quotes[current].classList.add('next');
        // Re-enable transition after positioning
        setTimeout(() => {
            quotes[current].style.transition = 'transform 0.8s ease-in-out';
        }, 50);
    }, 800);

    currentQuote = next;
}

// Start quote carousel (6 seconds interval)
let quoteInterval;
if (quotes.length > 0) {
    quoteInterval = setInterval(showNextQuote, 6000);
}

// Mobile menu toggle with hamburger to X animation
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Image zoom functionality for book covers
let currentZoomImage = 0;
let currentBookId = '';

function openImageZoom(imageId) {
    const modal = document.getElementById('imageZoomModal');
    const container = document.getElementById('zoomImageContainer');

    if (modal && container) {
        currentBookId = imageId;
        currentZoomImage = 0;
        showZoomImage();
        modal.style.display = 'flex';
    }
}

function showZoomImage() {
    const container = document.getElementById('zoomImageContainer');
    const indicator = document.getElementById('zoomIndicator');

    if (container && indicator) {
        // For now, show placeholder since no actual images are uploaded yet
        // **When you add real book covers:**
        // Replace the placeholder functionality in script.js with:
        //
        // const img = document.createElement('img');
        // img.src = currentZoomImage === 0 ? 'path/to/front-cover.jpg' : 'path/to/back-cover.jpg';
        // img.className = 'zoom-image';
        // img.alt = currentZoomImage === 0 ? 'Front Cover' : 'Back Cover';

        const placeholder = document.createElement('div');
        placeholder.className = 'zoom-placeholder';
        const coverType = currentZoomImage === 0 ? 'Front' : 'Back';
        placeholder.innerHTML = `<span>Enlarged Book Cover<br/>${coverType} Cover Preview<br/><br/>(Replace with actual book cover image)</span>`;

        container.innerHTML = '';
        container.appendChild(placeholder);

        indicator.textContent = `${coverType} Cover`;
    }
}

function prevZoomImage(event) {
    event.stopPropagation();
    currentZoomImage = currentZoomImage === 0 ? 1 : 0;
    showZoomImage();
}

function nextZoomImage(event) {
    event.stopPropagation();
    currentZoomImage = currentZoomImage === 0 ? 1 : 0;
    showZoomImage();
}

function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    if (modal) {
        modal.style.display = 'none';
        currentZoomImage = 0;
        currentBookId = '';
    }
}

// Close popup when clicking outside
window.onclick = function(event) {
    const imageModal = document.getElementById('imageZoomModal');
    if (event.target === imageModal) {
        closeImageZoom();
    }
}

// Scroll animations for books page
function initBookAnimations() {
    const bookItems = document.querySelectorAll('.book-item');
    const spiceLegend = document.querySelector('.spice-legend');

    // Check if we're on books page and trigger animations
    if (bookItems.length > 0 && window.location.pathname.includes('books.html')) {
        // Trigger animations on page load
        setTimeout(() => {
            bookItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 200);
            });
        }, 100);
    }

    // Scroll-triggered animations
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;

        bookItems.forEach(item => {
            const elementTop = item.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                item.classList.add('fade-in');
            }
        });

        // Add animation for spice legend
        if (spiceLegend) {
            const spiceTop = spiceLegend.getBoundingClientRect().top;
            if (spiceTop < windowHeight - 100) {
                spiceLegend.classList.add('fade-in');
            }
        }
    });
}

// Handle direct book linking from homepage thumbnails
function handleBookLinks() {
    // Check if there's a hash in the URL (like #book1 or #book2)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Remove the #
        const targetElement = document.getElementById(targetId);

        if (targetElement && targetElement.classList.contains('book-item')) {
            // Wait a moment for page to load, then scroll to the book
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Trigger fade-in animations for all books
                const bookItems = document.querySelectorAll('.book-item');
                bookItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, index * 200);
                });
            }, 300);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quote carousel if on homepage
    if (quotes.length > 0) {
        initializeQuotes();
    }

    // Initialize book animations if on books page
    initBookAnimations();

    // Handle direct book links
    handleBookLinks();
});