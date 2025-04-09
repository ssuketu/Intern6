document.addEventListener('DOMContentLoaded', function() {
    // Debug information
    console.log('Script loaded successfully');
    
    // Check if CSS is loaded
    const styleSheets = document.styleSheets;
    let cssLoaded = false;
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            if (styleSheets[i].href && styleSheets[i].href.includes('styles.css')) {
                cssLoaded = true;
                console.log('CSS loaded successfully');
                break;
            }
        } catch (e) {
            console.error('Error checking stylesheet:', e);
        }
    }
    
    if (!cssLoaded) {
        console.error('styles.css not loaded!');
        // Apply emergency inline styles
        const emergencyStyles = document.createElement('style');
        emergencyStyles.textContent = `
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .container { width: 90%; max-width: 1200px; margin: 0 auto; }
            nav { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; }
            .nav-menu { display: flex; list-style: none; }
            .nav-menu li { margin: 0 15px; }
            .nav-menu a { text-decoration: none; color: #333; }
            .auth-buttons a { margin-left: 10px; text-decoration: none; }
            .btn { padding: 8px 20px; border-radius: 5px; }
            .btn-primary { background-color: #4CAF50; color: white; }
            .form-container { max-width: 500px; margin: 40px auto; padding: 30px; background: #fff; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
            .form-group { margin-bottom: 20px; }
            .form-group label { display: block; margin-bottom: 8px; }
            .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
            .account-type-selector { display: flex; margin-bottom: 25px; gap: 15px; }
            .account-type { flex: 1; padding: 15px; text-align: center; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; }
            .account-type.active { border-color: #4CAF50; background-color: rgba(76, 175, 80, 0.1); }
            footer { background-color: #333; color: #fff; padding: 50px 0 20px; margin-top: 50px; }
        `;
        document.head.appendChild(emergencyStyles);
        console.log('Emergency styles applied');
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        console.log('Menu toggle found');
        menuToggle.addEventListener('click', function() {
            console.log('Menu toggle clicked');
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    } else {
        console.error('Menu toggle not found!');
    }
    
    // Account type selector for signup page
    const accountTypes = document.querySelectorAll('.account-type');
    if (accountTypes.length > 0) {
        console.log('Account type selector found');
        const studentFields = document.querySelector('.student-fields');
        const employerFields = document.querySelector('.employer-fields');
        
        accountTypes.forEach(type => {
            type.addEventListener('click', function() {
                console.log('Account type clicked:', this.dataset.type);
                // Remove active class from all types
                accountTypes.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked type
                this.classList.add('active');
                
                // Show/hide appropriate fields
                if (this.dataset.type === 'student') {
                    if (studentFields) studentFields.style.display = 'block';
                    if (employerFields) employerFields.style.display = 'none';
                } else {
                    if (studentFields) studentFields.style.display = 'none';
                    if (employerFields) employerFields.style.display = 'block';
                }
            });
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        console.log('Forms found:', forms.length);
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                console.log('Form submitted');
                e.preventDefault();
                
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (!isValid) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // For signup form
                if (form.id === 'signup-form') {
                    const password = document.getElementById('password');
                    const confirmPassword = document.getElementById('confirm-password');
                    
                    if (password && confirmPassword && password.value !== confirmPassword.value) {
                        alert('Passwords do not match!');
                        return;
                    }
                    
                    alert('Account created successfully!');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    alert('Form submitted successfully!');
                }
            });
        });
    }
});