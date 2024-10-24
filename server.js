const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const XLSX = require('xlsx');
const Faculty = require('./models/faculty'); // Faculty Model
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public folder

// MongoDB connection (without deprecated options)
mongoose.connect('mongodb://localhost:27017/faculty_db')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to upload Excel file with upsert logic
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        const facultyData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        // Loop through each faculty data and either insert or update (upsert)
        for (const faculty of facultyData) {
            await Faculty.updateOne(
                { facultyID: faculty.facultyID }, // Query by facultyID
                { $set: faculty }, // Update the existing fields
                { upsert: true }   // Insert a new record if facultyID does not exist
            );
        }

        fs.unlinkSync(req.file.path); // Remove the uploaded file after processing
        res.send('File uploaded and data inserted/updated!');
    } catch (err) {
        res.status(500).send(`Error while processing file: ${err.message}`);
    }
});

// Route to search faculty by name or ID
app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const faculty = await Faculty.findOne({
            $or: [
                { name: new RegExp(query, 'i') },  // Case-insensitive search by name
                { facultyID: query }  // Search by facultyID
            ]
        });

        if (!faculty) {
            return res.status(404).send('Faculty not found');
        }
        res.json(faculty);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Route to list uploaded files
app.get('/files', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            return res.status(500).send('Unable to list files');
        }
        res.json(files);
    });
});

// Route to delete a file
app.delete('/delete/:filename', (req, res) => {
    const filePath = path.join('uploads/', req.params.filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send('Error deleting file');
        }
        res.send(`File ${req.params.filename} deleted successfully`);
    });
});

// Route to download/view a file
app.get('/download/:filename', (req, res) => {
    const filePath = path.join('uploads/', req.params.filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

// Use environment variable or port 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});