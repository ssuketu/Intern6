document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('.menu-toggle') && 
            !event.target.closest('.nav-menu')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Save internship functionality
    const saveButtons = document.querySelectorAll('.save-btn');
    if (saveButtons) {
        saveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.querySelector('span').textContent = 'Saved';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.querySelector('span').textContent = 'Save';
                }
            });
        });
    }
    
    // Filter functionality for internships page
    const filterButton = document.querySelector('.filters .btn-primary');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            alert('Filters applied! In a real application, this would filter the internship results.');
        });
    }
    
    // Search functionality
    const searchBox = document.querySelector('.search-box button');
    if (searchBox) {
        searchBox.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-box input').value;
            if (searchInput.trim() !== '') {
                window.location.href = 'internships.html';
            } else {
                alert('Please enter a search term');
            }
        });
        
        // Also trigger search on Enter key
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchBox.click();
                }
            });
        }
    }
    
    // Popular search links
    const popularSearches = document.querySelectorAll('.popular-searches a');
    if (popularSearches) {
        popularSearches.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'internships.html';
            });
        });
    }
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards) {
        categoryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'internships.html';
            });
        });
    }
    
    // Employer CTA button
    const ctaButton = document.querySelector('.cta-content .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'post-internship.html';
        });
    }
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (navLinks) {
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
                link.classList.add('active');
            } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
                link.classList.add('active');
            }
        });
    }
    
    // Form validation for login and signup
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login success
            alert('Login successful! Welcome back.');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (fullname.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate signup success
            alert('Account created successfully! Welcome to EmployeIntern.');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission success
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});