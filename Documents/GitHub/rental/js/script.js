// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

function initializeApplication() {
    // Set minimum date for move-in date to today
    const moveInDate = document.getElementById('moveInDate');
    if (moveInDate) {
        const today = new Date().toISOString().split('T')[0];
        moveInDate.min = today;
    }

    // Set maximum date for date of birth (18 years ago)
    const dob = document.getElementById('dob');
    if (dob) {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 18);
        dob.max = maxDate.toISOString().split('T')[0];
    }

    // Add property parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyParam = urlParams.get('property');
    if (propertyParam && document.getElementById('property')) {
        document.getElementById('property').value = propertyParam;
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 5px;
        z-index: 3000;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}