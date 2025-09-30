// Form validation and handling
function validateForm() {
    const form = document.getElementById('rentalApplication');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    // Check all required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });

    // Validate SSN format
    const ssn = document.getElementById('ssn');
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    if (ssn.value && !ssnRegex.test(ssn.value)) {
        alert('Please enter a valid SSN in XXX-XX-XXXX format');
        ssn.style.borderColor = '#e74c3c';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        alert('Please enter a valid email address');
        email.style.borderColor = '#e74c3c';
        isValid = false;
    }

    if (isValid) {
        // In a real application, you would process payment here
        // For demo purposes, we'll simulate successful submission
        processPayment();
        return false; // Prevent actual form submission for demo
    }

    return false; // Prevent form submission if validation fails
}

function processPayment() {
    // Simulate payment processing
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Processing Payment...';
    submitBtn.disabled = true;

    // Simulate API call to payment processor
    setTimeout(() => {
        // Store application data (in real app, send to server)
        const formData = new FormData(document.getElementById('rentalApplication'));
        const applicationData = {};
        for (let [key, value] of formData.entries()) {
            applicationData[key] = value;
        }
        
        // Store in localStorage for demo (in real app, send to backend)
        localStorage.setItem('lastApplication', JSON.stringify(applicationData));
        
        // Redirect to success page
        window.location.href = 'success.html';
    }, 2000);
}

// Format SSN input
document.addEventListener('DOMContentLoaded', function() {
    const ssnInput = document.getElementById('ssn');
    if (ssnInput) {
        ssnInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 3) {
                value = value.substring(0, 3) + '-' + value.substring(3);
            }
            if (value.length > 6) {
                value = value.substring(0, 6) + '-' + value.substring(6, 10);
            }
            e.target.value = value;
        });
    }

    // Format card number
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value.substring(0, 19);
        });
    }

    // Format expiry date
    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
});