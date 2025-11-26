
// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hero Slideshow Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show the selected slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance slides
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance when hovering over slideshow
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

heroSection.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Manual slide navigation
document.querySelector('.slide-next').addEventListener('click', nextSlide);
document.querySelector('.slide-prev').addEventListener('click', prevSlide);

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        // Reset auto-advance timer
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Basic validation
    if (!formData.name || !formData.phone) {
        alert('Please fill in required fields: Name and Phone Number');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message, ' + formData.name + '! We will contact you soon at ' + formData.phone + '.');
    
    // Reset form
    this.reset();
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add loading animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .pricing-card, .success-card').forEach(el => {
    observer.observe(el);
});


// Discount Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('discountPopup');
    const smallIcon = document.getElementById('smallIcon');
    const closePopup = document.getElementById('closePopup');
    const laterBtn = document.getElementById('laterBtn');
    const claimBtn = document.querySelector('.popup-buttons-container .btn-primary');
    
    let iconTimer;
    
    // Show full popup when website starts
    setTimeout(() => {
        showFullPopup();
    }, 1000); // Show after 1 second
    
    // Show full popup function
    function showFullPopup() {
        popup.classList.add('active');
        smallIcon.classList.remove('active');
        document.body.style.overflow = 'hidden';
        clearTimeout(iconTimer);
    }
    
    // Show small icon function
    function showSmallIcon() {
        popup.classList.remove('active');
        smallIcon.classList.add('active');
        document.body.style.overflow = '';
        
        // Set timer to show small icon again after 3 seconds
        clearTimeout(iconTimer);
        iconTimer = setTimeout(() => {
            if (!popup.classList.contains('active')) {
                smallIcon.classList.add('active');
            }
        }, 3000);
    }
    
    // Close popup and show small icon
    function closeToIcon() {
        showSmallIcon();
    }
    
    // Event listeners
    closePopup.addEventListener('click', closeToIcon);
    laterBtn.addEventListener('click', closeToIcon);
    
    // Claim button - close popup but don't show icon immediately
    claimBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.classList.remove('active');
        document.body.style.overflow = '';
        
        // Show small icon after 3 seconds
        setTimeout(() => {
            smallIcon.classList.add('active');
        }, 3000);
        
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Close when clicking outside popup content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeToIcon();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closeToIcon();
        }
    });
    
    // Small icon click - show full popup
    smallIcon.addEventListener('click', function() {
        showFullPopup();
    });
    
    // Hide small icon when scrolling
    let scrollTimer;
    window.addEventListener('scroll', function() {
        smallIcon.classList.remove('active');
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (!popup.classList.contains('active')) {
                smallIcon.classList.add('active');
            }
        }, 3000);
    });
});