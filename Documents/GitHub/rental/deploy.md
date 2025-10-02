# Deployment Guide

## Quick Deployment Steps

### 1. Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase in your project
```bash
firebase init
```

When prompted:
- ✅ **Hosting**: Configure files for Firebase Hosting
- ✅ **Firestore**: Configure security rules and indexes files for Firestore
- Select your Firebase project
- **Public directory**: `.` (current directory)
- **Single-page app**: `Yes`
- **Overwrite index.html**: `No`
- **Firestore rules file**: `firestore.rules`
- **Firestore indexes file**: `firestore.indexes.json`

### 4. Update Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > General
4. Scroll to "Your apps" section
5. Click "Add app" > Web
6. Copy the configuration object
7. Update `firebase-config.js` with your actual values

### 5. Deploy
```bash
firebase deploy
```

### 6. Access Your Application
After deployment, you'll get URLs like:
- **Main Site**: `https://your-project-id.web.app`
- **Admin Dashboard**: `https://your-project-id.web.app/admin/dashboard.html`

## Troubleshooting

### Common Issues

1. **Firebase CLI not found**
   - Make sure Node.js is installed
   - Run: `npm install -g firebase-tools`

2. **Permission denied**
   - Run: `firebase login` again
   - Make sure you have access to the Firebase project

3. **Build errors**
   - Check that all files are in the correct location
   - Verify `firebase.json` configuration

4. **Database connection issues**
   - Verify Firestore is enabled in your Firebase project
   - Check that `firebase-config.js` has correct values
   - Ensure Firestore rules allow read/write access

### Testing Locally
```bash
firebase serve
```
Visit `http://localhost:5000` to test before deploying.

## Next Steps After Deployment

1. **Set up proper security rules** for production
2. **Integrate real payment processing** (Stripe, PayPal, etc.)
3. **Add user authentication** if needed
4. **Set up monitoring and analytics**
5. **Configure custom domain** (optional)
