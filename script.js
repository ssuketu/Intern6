// Simple script to ensure basic functionality works
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully');
    
    // Basic mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});