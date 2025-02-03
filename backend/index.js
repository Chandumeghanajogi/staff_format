// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Extended Staff Schema with default values
const staffSchema = new mongoose.Schema({
    staffId: { type: String, required: true, unique: true },
    surname: { type: String, default: "" },
    name: { type: String, default: "" },
    gender: { type: String, default: "" },
    dob: { type: String, default: "" },
    fatherName: { type: String, default: "" },
    motherName: { type: String, default: "" },
    address: {
        street: { type: String, default: "" },
        area: { type: String, default: "" },
        mandal: { type: String, default: "" },
        district: { type: String, default: "" }
    },
    contact: { type: String, default: "" },
    email: { type: String, default: "" },
    maritalStatus: { type: String, default: "" },
    bloodGroup: { type: String, default: "" },
    aadharNo: { type: String, default: "" },
    panNo: { type: String, default: "" },
    dateOfJoin: { type: String, default: "" },
    department: { type: String, default: "" },
    bankDetails: {
        accountNo: { type: String, default: "" },
        ifscCode: { type: String, default: "" }
    },
    salary: { type: String, default: "" },
    totalExperience: { type: String, default: "" },
    designation: { type: String, default: "" },
    industryExperience: { type: String, default: "" },
    education: {
        ssc: {
            htno: { type: String, default: "" },
            percentage: { type: String, default: "" },
            schoolName: { type: String, default: "" },
            location: { type: String, default: "" },
            medium: { type: String, default: "" },
            passYear: { type: String, default: "" }
        },
        inter: {
            htno: { type: String, default: "" },
            percentage: { type: String, default: "" },
            collegeName: { type: String, default: "" },
            location: { type: String, default: "" },
            medium: { type: String, default: "" },
            passYear: { type: String, default: "" }
        },
        ug: {
            htno: { type: String, default: "" },
            percentage: { type: String, default: "" },
            collegeName: { type: String, default: "" },
            location: { type: String, default: "" },
            branch: { type: String, default: "" },
            specialization: { type: String, default: "" },
            medium: { type: String, default: "" },
            passYear: { type: String, default: "" }
        },
        pg1: {
            htno: { type: String, default: "" },
            percentage: { type: String, default: "" },
            collegeName: { type: String, default: "" },
            location: { type: String, default: "" },
            branch: { type: String, default: "" },
            specialization: { type: String, default: "" },
            medium: { type: String, default: "" },
            passYear: { type: String, default: "" }
        }
        // Add more education fields (pg2, pg3, etc.) as necessary
    },
    subjectsTeach: { type: String, default: "" },
    experience: [
        {
            organizationName: { type: String, default: "" },
            designation: { type: String, default: "" },
            joinDate: { type: String, default: "" },
            relieveDate: { type: String, default: "" },
            department: { type: String, default: "" },
            location: { type: String, default: "" }
        }
    ]
});

// Create Staff model
const Staff = mongoose.model('Staff', staffSchema);

// Routes

// Add staff details
app.post('/staff', async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).json({ message: 'Staff details added successfully', staff });
    } catch (err) {
        console.error('Error in POST /staff:', err);
        res.status(400).json({ error: err.message });
    }
});

// Get staff details by staffId
app.get('/staff/:staffId', async (req, res) => {
    try {
        console.log('Requested staffId:', req.params.staffId); // Log the staffId
        const staff = await Staff.findOne({ staffId: req.params.staffId });
        console.log('Staff fetched from DB:', staff); // Log the result
        if (!staff) return res.status(404).json({ message: 'Staff not found' });
        res.json(staff);
    } catch (err) {
        console.error('Error in GET /staff/:staffId:', err);
        res.status(500).json({ error: err.message });
    }
});


// Update staff details by staffId
app.put('/staff/:staffId', async (req, res) => {
    try {
        const staff = await Staff.findOneAndUpdate(
            { staffId: req.params.staffId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!staff) return res.status(404).json({ message: 'Staff not found' });
        res.json({ message: 'Staff details updated successfully', staff });
    } catch (err) {
        console.error('Error in PUT /staff/:staffId:', err);
        res.status(400).json({ error: err.message });
    }
});

// Start server
app.listen(1000, () => console.log('Server is up and running on port 1000'));
