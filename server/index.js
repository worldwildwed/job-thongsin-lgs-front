const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const port = 3773;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//! MONGO CONNECT
// mongoose.connect('mongodb://localhost:27017/LogService', { user: 'nodeJS', pass: 'nodejs.1234' })
mongoose.connect('mongodb://localhost:27017', { dbName: 'LogService', user: 'nodejs', pass: 'nodejs.1234' })
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Current database:', mongoose.connection.name);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

// Define a Mongoose schema for the data
const LogSchema = new mongoose.Schema({
    // Define the structure of the data to be saved
    name: String,
    phone: String,
    email: String,
    company_name: String,
    purpose: String,
    message: String,
    date_string: String,
}, { timestamps: true });
// Create a Mongoose model based on the schema
const Log = mongoose.model('Log', LogSchema);


// DUMMY DATA
const dummyData = new Log({
    name: 'dave',
    phone: '0950462222',
    email: 'dave@mail.com',
    company_name: 'worldwild.co',
    purpose: '1_general',
    message: 'Hello World From Dave....',
    // ca: Date.now(),
    date_string: Date.now().toString()
})
const reqDummyData = {
    form: {
        id: 'fc516d0', name: 'Contact Us Form'
    },
    fields: {
        name: {
            id: 'name',
            type: 'text',
            title: 'ชื่อ-นามสกุล',
            value: 'fuss',
            raw_value: 'fuss',
            required: '1'
        },
        phone: {
            id: 'phone',
            type: 'text',
            title: 'เบอร์โทร',
            value: '1231231234',
            raw_value: '1231231234',
            required: '1'
        },
        email: {
            id: 'email',
            type: 'email',
            title: 'Email',
            value: 'fuss@gmail.com',
            raw_value: 'fuss@gmail.com',
            required: '1'
        },
        company_name: {
            id: 'company_name',
            type: 'text',
            title: 'Company Name',
            value: 'Fussu Tech',
            raw_value: 'Fussu Tech',
            required: '1'
        },
        purpose: {
            id: 'purpose',
            type: 'radio',
            title: 'จุดประสงค์ในการติดต่อ',
            value: '2_quotation_request',
            raw_value: '2_quotation_request',
            required: '1'
        },
        message: {
            id: 'message',
            type: 'textarea',
            title: 'รายละเอียด',
            value: 'sdsdsdsdsds',
            raw_value: 'sdsdsdsdsds',
            required: '1'
        }
    },
    meta: {
        date: {
            title: 'Date', value: 'พฤศจิกายน 26, 2023'
        },
        time: {
            title: 'Time', value: '3: 28 pm'
        },
        page_url: { title: 'Page URL', value: 'https: //www.fussu.tech/contact-us/' },
        user_agent: {
            title: 'User Agent',
            value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        remote_ip: {
            title: 'Remote IP',
            value: '2001:fb1: 62: 9466: 8065: 70c2:b146:c9d2'
        },
        credit: {
            title: 'Powered by', value: 'Elementor'
        }
    }
}

//! ROUTE HANDLER
app.get('/', (req, res) => {
    const htmlResponse = '<html><body><h1>Hello World :)</h1></body></html>';
    res.send(htmlResponse);
});

// app.post('/echo-form-data', (req, res) => {
//     // Can handle JSON & x-www-form-urlencoded request body
//     const formData = req.body;
//     // Handle the form data here
//     console.log(formData);
//     fs.appendFile('log.txt', JSON.stringify(formData, null, 2) + '\n', (err) => {
//         if (err) {
//             console.error('Error writing to log file:', err);
//             res.sendStatus(500);
//         } else {
//             console.log('Data logged successfully');
//             res.sendStatus(200);
//         }
//     });
// });

// app.post('/insert-mongo', (req, res) => {
//     const newData = dummyData
//     newData.save().then(() => {
//         res.send('Data saved to MongoDB');
//     }).catch((error) => {
//         console.log(error)
//         res.status(500).send('Error saving data to MongoDB');
//     })
// })

app.post('/webhook', (req, res) => {
    // Can handle JSON & x-www-form-urlencoded request body
    const formData = req.body;
    // const formData = reqDummyData
    const name = formData.fields.name.value
    const phone = formData.fields.phone.value
    const email = formData.fields.email.value
    const company_name = formData.fields.company_name.value
    const purpose = formData.fields.purpose.value
    const message = formData.fields.message.value
    const date_string = formData.meta.date.value + ' | ' + formData.meta.time.value
    console.log(`[ /webhook ] New Form Submit @${Date.now()}: ${email}`)
    // console.log('[ webhook ]', name, phone, email, company_name, purpose, message, date_string)
    const insertLog = new Log({ name, phone, email, company_name, purpose, message, date_string })
    insertLog.save().then(() => {
        res.status(200).send('Data saved to MongoDB');
    }).catch((error) => {
        fs.appendFile('log-error.txt', error.toString() + '\n', (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            } else {
                console.log('Save Error To [log-error]');
            }
        });
        res.status(500).send('Error saving data to MongoDB');
    })
})

app.get('/allLogs', async (req, res) => {
    try {
        // Use the find method with sorting to retrieve all documents from the Col1 collection
        const data = await Log.find({}).sort({ createdAt: -1 });
        res.json(data); // Send the retrieved data as a JSON response
    } catch (error) {
        res.status(500).send('Error retrieving data from MongoDB');
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});