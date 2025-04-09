document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Save button functionality for internship cards
    const saveButtons = document.querySelectorAll('.save-btn');
    
    if (saveButtons.length > 0) {
        saveButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('saved');
                const icon = this.querySelector('i');
                const text = this.querySelector('span');
                
                if (this.classList.contains('saved')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    text.textContent = 'Saved';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    text.textContent = 'Save';
                }
            });
        });
    }
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Filter toggle for mobile on internships page
    const filterToggle = document.querySelector('.filter-toggle');
    const filters = document.querySelector('.filters');
    
    if (filterToggle && filters) {
        filterToggle.addEventListener('click', function() {
            filters.classList.toggle('active');
            filterToggle.classList.toggle('active');
        });
    }
});