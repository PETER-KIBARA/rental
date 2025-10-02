// Payment processing and form handling
class PaymentProcessor {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
                this.showPaymentDetails(method.dataset.method);
            });
        });

        // Form submission
        const form = document.getElementById('rentalApplication');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    setupFormValidation() {
        // Real-time validation
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });

        // SSN formatting
        const ssnInput = document.getElementById('ssn');

if (ssnInput) {
    ssnInput.addEventListener('input', (e) => {
        const raw = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

        // Limit to 9 digits max
        if (raw.length > 9) return;

        let formatted = '';
        if (raw.length > 0) formatted += raw.slice(0, 3);
        if (raw.length >= 4) formatted += '-' + raw.slice(3, 5);
        if (raw.length >= 6) formatted += '-' + raw.slice(5, 9);

        e.target.value = formatted;
    });
}


        // Card number formatting
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                this.formatCardNumber(e.target);
            });
        }

        // Expiry date formatting
        const expiry = document.getElementById('expiry');
        if (expiry) {
            expiry.addEventListener('input', (e) => {
                this.formatExpiry(e.target);
            });
        }
    }

    formatSSN(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        if (value.length > 6) {
            value = value.substring(0, 6) + '-' + value.substring(6, 9);
        }
        input.value = value;
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        input.value = value.substring(0, 19);
    }

    formatExpiry(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }

    validateField(field) {
        const value = field.value.trim();
        
        switch(field.type) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    this.showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'tel':
                if (value && !this.isValidPhone(value)) {
                    this.showFieldError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;
                
            case 'text':
                if (field.id === 'ssn' && value && !this.isValidSSN(value)) {
                    this.showFieldError(field, 'Please enter a valid SSN (XXX-XX-XXXX)');
                    return false;
                }
                if (field.id === 'cardNumber' && value && !this.isValidCardNumber(value)) {
                    this.showFieldError(field, 'Please enter a valid card number');
                    return false;
                }
                if (field.id === 'expiry' && value && !this.isValidExpiry(value)) {
                    this.showFieldError(field, 'Please enter a valid expiry date (MM/YY)');
                    return false;
                }
                if (field.id === 'cvv' && value && !this.isValidCVV(value)) {
                    this.showFieldError(field, 'Please enter a valid CVV');
                    return false;
                }
                break;
        }
        
        this.clearFieldError(field);
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\D/g, ''));
    }

    isValidSSN(ssn) {
        return /^\d{3}-\d{2}-\d{4}$/.test(ssn);
    }

    isValidCardNumber(card) {
        const cleanCard = card.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleanCard);
    }

    isValidExpiry(expiry) {
        return /^\d{2}\/\d{2}$/.test(expiry);
    }

    isValidCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.style.borderColor = '#e74c3c';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    showPaymentDetails(method) {
        const details = document.querySelectorAll('.payment-details');
        details.forEach(detail => detail.style.display = 'none');
        
        const targetDetail = document.getElementById(`${method}Details`);
        if (targetDetail) {
            targetDetail.style.display = 'block';
        }
    }

    async handleFormSubmission() {
        const form = document.getElementById('rentalApplication');
        const submitBtn = document.getElementById('submitBtn');
        const loadingModal = document.getElementById('loadingModal');

        // Validate all fields
        if (!this.validateForm()) {
            alert('Please fix the errors in the form before submitting.');
            return;
        }

        // Show loading modal
        loadingModal.style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';

        try {
            // Simulate payment processing
            console.log('💳 Processing payment of $60.00...');
            await this.processPayment();
            
            // Submit application data
            const formData = new FormData(form);
            const applicationData = Object.fromEntries(formData.entries());
            
            console.log('📝 Submitting application data...', {
                name: `${applicationData.firstName} ${applicationData.lastName}`,
                property: applicationData.property,
                email: applicationData.email
            });

            // Import Firebase functions
            const { db } = await import('../firebase-config.js');
            const { collection, addDoc } = await import('firebase/firestore');

            // Add metadata to application data
            const application = {
                ...applicationData,
                timestamp: new Date().toISOString(),
                status: 'pending',
                feePaid: true,
                paymentDate: new Date().toISOString()
            };

            // Save to Firestore
            const docRef = await addDoc(collection(db, 'applications'), application);

            console.log('✅ Application submitted successfully');
            // Redirect to success page with application ID
            window.location.href = `success.html?id=${docRef.id}`;

        } catch (error) {
            console.error('❌ Error submitting application:', error);
            alert('Error submitting application: ' + error.message);
        } finally {
            loadingModal.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application & Pay $60.00';
        }
    }

    async processPayment() {
        // Simulate API call to payment processor
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() < 0.95) {
                    console.log('✅ Payment processed successfully - $60.00');
                    resolve({ success: true, transactionId: 'TXN_' + Date.now() });
                } else {
                    reject(new Error('Payment declined. Please check your card details and try again.'));
                }
            }, 3000);
        });
    }

    validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Check all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"][required]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                isValid = false;
                this.showFieldError(checkbox, 'This agreement is required');
            }
        });

        return isValid;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PaymentProcessor();
});