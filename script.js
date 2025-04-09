document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-toggle') && !event.target.closest('.nav-menu')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Create a simple image placeholder for the hero section
    // This is a fallback in case the actual image is missing
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && heroImage.getAttribute('src') === 'images/hero-image.svg') {
        // Create a folder for images if it doesn't exist
        const createImageFolder = async () => {
            try {
                // This is just a placeholder - you'll need to create the folder manually
                console.log('Please create an "images" folder in your project root');
            } catch (error) {
                console.error('Error creating image folder:', error);
            }
        };
        
        createImageFolder();
    }
});