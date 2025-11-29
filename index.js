
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


// Dual Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Popup 1 Elements
    const popup1 = document.getElementById('discountPopup1');
    const smallIcon1 = document.getElementById('smallIcon1');
    const closePopup1 = document.getElementById('closePopup1');
    const laterBtn1 = document.getElementById('laterBtn1');
    
    // Popup 2 Elements
    const popup2 = document.getElementById('discountPopup2');
    const smallIcon2 = document.getElementById('smallIcon2');
    const closePopup2 = document.getElementById('closePopup2');
    const laterBtn2 = document.getElementById('laterBtn2');
    
    // Common Elements
    const claimBtns = document.querySelectorAll('.popup-buttons-container .btn-primary');
    
    let iconTimer1, iconTimer2;
    let currentPopup = null;
    
    // Show popups in sequence when website starts
    setTimeout(() => {
        showPopup1();
    }, 1000);
    
    // Show first popup
    function showPopup1() {
        hideAllPopups();
        popup1.classList.add('active');
        currentPopup = 1;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        clearTimeout(iconTimer1);
    }
    
    // Show second popup
    function showPopup2() {
        hideAllPopups();
        popup2.classList.add('active');
        currentPopup = 2;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        clearTimeout(iconTimer2);
    }
    
    // Hide all popups
    function hideAllPopups() {
        popup1.classList.remove('active');
        popup2.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        currentPopup = null;
    }
    
    // Show small icon for popup 1
    function showSmallIcon1() {
        hideAllPopups();
        smallIcon1.classList.add('active');
        
        clearTimeout(iconTimer1);
        iconTimer1 = setTimeout(() => {
            if (!popup1.classList.contains('active') && !popup2.classList.contains('active')) {
                smallIcon1.classList.add('active');
            }
        }, 3000);
        
        // Show second popup after first one closes
        setTimeout(() => {
            if (!popup1.classList.contains('active') && !popup2.classList.contains('active')) {
                showPopup2();
            }
        }, 2000); // 2 second delay between popups
    }
    
    // Show small icon for popup 2
    function showSmallIcon2() {
        hideAllPopups();
        smallIcon2.classList.add('active');
        
        clearTimeout(iconTimer2);
        iconTimer2 = setTimeout(() => {
            if (!popup1.classList.contains('active') && !popup2.classList.contains('active')) {
                smallIcon2.classList.add('active');
            }
        }, 3000);
    }
    
    // Event Listeners for Popup 1
    closePopup1.addEventListener('click', showSmallIcon1);
    laterBtn1.addEventListener('click', showSmallIcon1);
    
    closePopup1.addEventListener('touchend', function(e) {
        e.preventDefault();
        showSmallIcon1();
    });
    
    laterBtn1.addEventListener('touchend', function(e) {
        e.preventDefault();
        showSmallIcon1();
    });
    
    // Event Listeners for Popup 2
    closePopup2.addEventListener('click', showSmallIcon2);
    laterBtn2.addEventListener('click', showSmallIcon2);
    
    closePopup2.addEventListener('touchend', function(e) {
        e.preventDefault();
        showSmallIcon2();
    });
    
    laterBtn2.addEventListener('touchend', function(e) {
        e.preventDefault();
        showSmallIcon2();
    });
    
    // Claim buttons for both popups
    claimBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            hideAllPopups();
            
            // Show both small icons after 3 seconds
            setTimeout(() => {
                smallIcon1.classList.add('active');
                smallIcon2.classList.add('active');
            }, 3000);
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
    
    // Close when clicking outside popup content
    [popup1, popup2].forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                if (popup === popup1) {
                    showSmallIcon1();
                } else {
                    showSmallIcon2();
                }
            }
        });
        
        popup.addEventListener('touchend', function(e) {
            if (e.target === popup) {
                e.preventDefault();
                if (popup === popup1) {
                    showSmallIcon1();
                } else {
                    showSmallIcon2();
                }
            }
        });
    });
    
    // Small icon clicks
    smallIcon1.addEventListener('click', showPopup1);
    smallIcon2.addEventListener('click', showPopup2);
    
    smallIcon1.addEventListener('touchend', function(e) {
        e.preventDefault();
        showPopup1();
    });
    
    smallIcon2.addEventListener('touchend', function(e) {
        e.preventDefault();
        showPopup2();
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (popup1.classList.contains('active')) {
                showSmallIcon1();
            } else if (popup2.classList.contains('active')) {
                showSmallIcon2();
            }
        }
    });
    
    // Hide small icons when scrolling
    let scrollTimer;
    window.addEventListener('scroll', function() {
        smallIcon1.classList.remove('active');
        smallIcon2.classList.remove('active');
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (!popup1.classList.contains('active') && !popup2.classList.contains('active')) {
                smallIcon1.classList.add('active');
                smallIcon2.classList.add('active');
            }
        }, 3000);
    }, { passive: true });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (popup1.classList.contains('active')) {
                popup1.classList.remove('active');
                setTimeout(() => popup1.classList.add('active'), 100);
            } else if (popup2.classList.contains('active')) {
                popup2.classList.remove('active');
                setTimeout(() => popup2.classList.add('active'), 100);
            }
        }, 300);
    });
});


        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Format the message for WhatsApp
            let whatsappMessage = `Hello! I'm interested in your driving services.%0A%0A`;
            whatsappMessage += `*Name:* ${name}%0A`;
            whatsappMessage += `*Phone:* ${phone}%0A`;
            
            if (service) {
                const serviceText = document.querySelector(`#service option[value="${service}"]`).textContent;
                whatsappMessage += `*Service Interested In:* ${serviceText}%0A`;
            }
            
            if (message) {
                whatsappMessage += `*Message:* ${message}%0A`;
            }
            
            // Replace with your actual WhatsApp number (with country code, without + or 0)
            // Example: 1234567890 for US number (1) 234-567-890
            const whatsappNumber = "27681333036"; // CHANGE THIS TO YOUR ACTUAL NUMBER
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
        });