# Rental Application - Firebase Hosted

A modern rental application website hosted on Firebase with Firestore database integration.

## Features

- 🏠 Property listings with detailed information
- 📝 Online rental application form
- 💳 Integrated payment processing simulation
- 🔒 Secure data storage with Firestore
- 📊 Admin dashboard for application management
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6 Modules)
- **Backend**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Database**: Cloud Firestore

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- Firebase CLI
- A Firebase project

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Firestore Database**
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location for your database

3. **Get Firebase Configuration**
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click "Add app" and select Web
   - Copy the Firebase configuration object

4. **Update Firebase Configuration**
   - Open `firebase-config.js`
   - Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 4. Deploy to Firebase

1. **Login to Firebase CLI**
   ```bash
   firebase login
   ```

2. **Initialize Firebase in your project**
   ```bash
   firebase init
   ```
   - Select "Hosting" and "Firestore"
   - Choose your Firebase project
   - Set public directory to "." (current directory)
   - Configure as single-page app: Yes
   - Set up automatic builds: No

3. **Deploy the application**
   ```bash
   firebase deploy
   ```

### 5. Access Your Application

After deployment, you'll get a URL like: `https://your-project-id.web.app`

- **Main Site**: `https://your-project-id.web.app`
- **Admin Dashboard**: `https://your-project-id.web.app/admin/dashboard.html`

## Project Structure

```
rental/
├── admin/
│   └── dashboard.html          # Admin dashboard
├── css/
│   └── style.css              # Main stylesheet
├── js/
│   ├── script.js              # Main application logic
│   └── payment.js             # Payment processing
├── application.html           # Rental application form
├── index.html                 # Homepage
├── listings.html              # Property listings
├── success.html               # Success page
├── firebase-config.js         # Firebase configuration
├── firebase.json              # Firebase hosting config
├── firestore.rules            # Firestore security rules
└── package.json               # Dependencies
```

## Data Structure

Applications are stored in Firestore with the following structure:

```javascript
{
  // Form data
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  property: "123-main-st",
  // ... other form fields
  
  // Metadata
  timestamp: "2024-01-01T00:00:00.000Z",
  status: "pending", // pending, approved, rejected
  feePaid: true,
  paymentDate: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z" // Only when updated
}
```

## Security Rules

The current Firestore rules allow read/write access to all users. For production, you should implement proper authentication and restrict access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{document} {
      allow read, write: if request.auth != null; // Require authentication
    }
  }
}
```

## Development

To run locally during development:

```bash
firebase serve
```

This will start a local server at `http://localhost:5000`

## Admin Dashboard

The admin dashboard allows you to:
- View all applications
- Update application status (pending/approved/rejected)
- Track total revenue from application fees
- View application statistics

Access it at: `https://your-project-id.web.app/admin/dashboard.html`

## Payment Processing

Currently, the payment processing is simulated. For production, integrate with a real payment processor like:
- Stripe
- PayPal
- Square
- Authorize.Net

## Support

For issues or questions, please check the Firebase documentation or create an issue in this repository.