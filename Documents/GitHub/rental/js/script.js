// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();

    // Attach form submission handler
    const appForm = document.getElementById('rentalApplication');
    if (appForm) {
        appForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitApplication(new FormData(appForm));
        });
    }
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

// ===== FIREBASE INTEGRATION =====
import { db } from '../firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore';

async function submitApplication(formData) {
    try {
        // Convert FormData → plain object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add metadata
        const application = {
            ...data,
            timestamp: new Date().toISOString(),
            status: 'pending',
            feePaid: true,
            paymentDate: new Date().toISOString()
        };

        // Save to Firestore
        const docRef = await addDoc(collection(db, 'applications'), application);

        console.log('✅ New application saved:', {
            id: docRef.id,
            name: `${application.firstName} ${application.lastName}`,
            property: application.property,
            email: application.email
        });

        showNotification('Application submitted successfully ✅', 'success');
        // Redirect to success page with ID
        window.location.href = `success.html?id=${docRef.id}`;
    } catch (error) {
        console.error('Error submitting application:', error);
        showNotification('Error submitting application ❌', 'error');
    }
}

async function fetchApplications() {
    try {
        const q = query(collection(db, 'applications'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const applications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Applications:', applications);
        return applications;
    } catch (error) {
        console.error('Error fetching applications:', error);
        showNotification('Error loading applications ❌', 'error');
    }
}

async function updateApplicationStatus(applicationId, status) {
    try {
        const appRef = doc(db, 'applications', applicationId);
        await updateDoc(appRef, {
            status: status,
            updatedAt: new Date().toISOString()
        });
        console.log('✅ Application status updated:', applicationId, status);
        return true;
    } catch (error) {
        console.error('Error updating application:', error);
        return false;
    }
}

// ===== UTILITIES =====
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
