const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');


const app = express();
const port = 3773;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Multer for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req, res) => {
    const htmlResponse = '<html><body><h1>Hello World 1234</h1></body></html>';
    res.send(htmlResponse);
});

app.post('/log', (req, res) => {
    const logData = JSON.stringify(req.body, null, 2);
    fs.appendFile('log.txt', logData + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.sendStatus(500);
        } else {
            console.log('Data logged successfully');
            res.sendStatus(200);
        }
    });
});

app.post('/echo', (req, res) => {
    res.json(req.body);
});

app.post('/echo-form-data-000', upload.any(), (req, res) => {
    const formData = req.body;
    console.log(formData);
    fs.appendFile('log.txt', JSON.stringify(formData, null, 2) + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.sendStatus(500);
        } else {
            console.log('Data logged successfully');
            res.sendStatus(200);
        }
    });
    // res.json(formData);
});

app.post('/echo-form-data', (req, res) => {
    const formData = req.body;
    // Handle the form data here
    console.log(formData);
    fs.appendFile('log.txt', JSON.stringify(formData, null, 2) + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.sendStatus(500);
        } else {
            console.log('Data logged successfully');
            res.sendStatus(200);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});