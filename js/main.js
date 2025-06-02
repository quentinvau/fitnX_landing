// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Main function to join waitlist
function joinWaitlist(inputId) {
    const emailInput = document.getElementById(inputId);
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    // Disable the button to prevent double submission
    const button = emailInput.nextElementSibling;
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Adding...';
    
    // For now, we'll simulate the signup process
    // Replace this with your actual email service integration
    simulateSignup(email, button, originalText, inputId);
}

// Simulate signup process (replace with real integration)
function simulateSignup(email, button, originalText, inputId) {
    // Simulate API call delay
    setTimeout(() => {
        // Store email in localStorage for demo purposes
        let emails = JSON.parse(localStorage.getItem('physiqx-waitlist') || '[]');
        
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('physiqx-waitlist', JSON.stringify(emails));
            
            showSuccessMessage(inputId);
            trackSignup(email);
        } else {
            alert('This email is already on our waitlist!');
            button.disabled = false;
            button.textContent = originalText;
        }
    }, 1000);
}

// Show success message
function showSuccessMessage(inputId) {
    const input = document.getElementById(inputId);
    const form = input.parentElement;
    
    form.innerHTML = `
        <div class="success-message">
            <h3>🎉 You're on the list!</h3>
            <p>We'll notify you as soon as beta access opens.</p>
            <p><small>Check your email for confirmation details.</small></p>
        </div>
    `;
}

// Track signup for analytics
function trackSignup(email) {
    // Google Analytics event (if GA is set up)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'signup', {
            'event_category': 'engagement',
            'event_label': 'beta_waitlist',
            'value': 1
        });
    }
    
    // Console log for development
    console.log('New signup:', email);
    
    // You can also send to other analytics services here
}

// Smooth scrolling for any anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('PhysiqX landing page loaded');
    
    // Optional: Add some interactive elements
    addScrollEffects();
});

// Add scroll effects (optional enhancement)
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.feature, .audience, .benefit').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Real email service integration examples (uncomment and configure as needed)

/*
// Example 1: Mailchimp integration
async function addToMailchimp(email) {
    try {
        const response = await fetch('YOUR_MAILCHIMP_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed'
            })
        });
        
        if (response.ok) {
            return true;
        } else {
            throw new Error('Subscription failed');
        }
    } catch (error) {
        console.error('Mailchimp error:', error);
        return false;
    }
}
*/

/*
// Example 2: ConvertKit integration
async function addToConvertKit(email) {
    try {
        const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: 'YOUR_API_KEY',
                email: email,
                tags: ['physiqx-beta']
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('ConvertKit error:', error);
        return false;
    }
}
*/

/*
// Example 3: Google Sheets integration (using Google Apps Script)
async function addToGoogleSheets(email) {
    try {
        const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                timestamp: new Date().toISOString(),
                source: 'landing_page'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Google Sheets error:', error);
        return false;
    }
}
*/
