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

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Newsletter popup functions
function showNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closeNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Close popup when clicking outside
window.onclick = function(event) {
    const popup = document.getElementById('newsletterPopup');
    if (event.target === popup) {
        closeNewsletterPopup();
    }
}

// Scroll animations for books page
function initBookAnimations() {
    const bookItems = document.querySelectorAll('.book-item');

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