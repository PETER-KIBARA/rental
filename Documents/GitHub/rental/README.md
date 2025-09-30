# Rental Application Website

A complete web application for managing rental property applications with integrated payment processing.

## Features

- Property listings display
- Online rental application form
- $60 application fee payment integration
- Admin dashboard for managing applications
- Responsive design for all devices
- Secure form validation

## Setup Instructions

1. **Download all files** to a single folder
2. **Update business information** in all HTML files:
   - Company name
   - Contact information
   - Property details
   - Legal notices

3. **For production use**:
   - Replace demo payment processing with real payment gateway (Stripe recommended)
   - Implement backend server for data storage
   - Add SSL certificate
   - Consult with legal professional for compliance

## File Structure

- `index.html` - Homepage
- `listings.html` - Property listings
- `application.html` - Rental application form
- `success.html` - Confirmation page
- `css/style.css` - All styles
- `js/script.js` - Form validation and handling
- `admin/dashboard.html` - Admin panel

## Legal Compliance

⚠️ **Important**: Before going live:
- Consult with real estate attorney
- Verify local application fee laws
- Ensure proper data protection measures
- Add privacy policy and terms of service

## Payment Integration

To accept real payments:
1. Sign up for Stripe/PayPal merchant account
2. Replace demo payment processing in `js/script.js`
3. Implement server-side payment verification
4. Set up webhooks for payment notifications

## Support

For technical assistance or customization, contact your web developer.