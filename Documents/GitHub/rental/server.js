const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));
app.use(express.urlencoded({ extended: true }));

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'applications.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API to save application
app.post('/api/application', (req, res) => {
    try {
        const application = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...req.body,
            status: 'pending',
            feePaid: true,
            paymentDate: new Date().toISOString()
        };

        // Read existing applications
        const applications = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        applications.push(application);
        
        // Save back to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(applications, null, 2));
        
        console.log('New application received:', {
            id: application.id,
            name: `${application.firstName} ${application.lastName}`,
            property: application.property,
            email: application.email
        });

        res.json({ 
            success: true, 
            message: 'Application submitted successfully',
            applicationId: application.id
        });
    } catch (error) {
        console.error('Error saving application:', error);
        res.status(500).json({ success: false, message: 'Error saving application' });
    }
});

// API to get all applications
app.get('/api/applications', (req, res) => {
    try {
        const applications = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        res.json(applications);
    } catch (error) {
        console.error('Error reading applications:', error);
        res.status(500).json({ error: 'Error reading applications' });
    }
});

// API to update application status
app.put('/api/application/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const applications = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const application = applications.find(app => app.id == id);
        
        if (application) {
            application.status = status;
            application.updatedAt = new Date().toISOString();
            fs.writeFileSync(DATA_FILE, JSON.stringify(applications, null, 2));
            res.json({ success: true, message: 'Application updated' });
        } else {
            res.status(404).json({ success: false, message: 'Application not found' });
        }
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ success: false, message: 'Error updating application' });
    }
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Rental Application Server running at http://localhost:${PORT}`);
    console.log(`🏠 Website: http://localhost:${PORT}`);
    console.log(`👨‍💼 Admin: http://localhost:${PORT}/admin`);
});