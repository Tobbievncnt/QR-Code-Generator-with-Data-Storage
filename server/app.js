const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const router = require('./routes'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(router);


app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html')); 
});

app.post('/submit', (req, res) => {
    const { firstName, lastName, otherNames, email, contact, gender } = req.body;

    const userInformation = {
        firstName: firstName,
        lastName: lastName,
        otherNames: otherNames,
        email: email,
        phone: contact,
        gender: gender
    };

    append(userInformation)
        .then(() => {
            res.status(200).send('Your information has been saved successfully');
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error');
        });
});

function append(data) {
    return new Promise((resolve, reject) => {
        const dbPath = path.join(__dirname, 'database.json'); 
        fs.readFile(dbPath, (err, fileData) => {
            let database = [];

            if (err && err.code !== 'ENOENT') {
                console.error('Error reading database file:', err);
                reject(err);
                return;
            }

            if (!err && fileData.length > 0) {
                try {
                    database = JSON.parse(fileData);
                } catch (e) {
                    console.error('Error parsing database file:', e);
                    reject(e);
                    return;
                }
            }

            database.push(data);

            fs.writeFile(dbPath, JSON.stringify(database, null, 2), err => {
                if (err) {
                    console.error('Error writing to database file:', err);
                    reject(err);
                    return;
                }
                console.log('Form data appended to database successfully.');
                resolve();
            });
        });
    });
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
