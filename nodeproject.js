const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const path = require('path');



app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var newalpha = '';

function alphabetShift(key) {
    key = parseInt(key);
    for (let i = 0; i < alphabet.length; i++) {
        let offset = (i + key) % alphabet.length;
        newalpha += alphabet[offset];
    }
}

function encode(message) {
    let result = '';
    message = message.toLowerCase();
    for (let i = 0; i < message.length; i++) {
        let index = alphabet.indexOf(message[i]);
        result += newalpha[index];
    }

    return result;
}

function decode(message) {
    let result = '';
    message = message.toLowerCase();
    for (let i = 0; i < message.length; i++) {
        let index = newalpha.indexOf(message[i]);
        result += alphabet[index];
    }
    
    return result;
}

app.get('/', (req, res) => {
    res.render('startnav')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/encryptform', (req, res) => {
    res.render('encryptform')
})

app.post('/encrypt', (req, res) => {
    const { inputtext, key } = req.body;
    newalpha = '';
    alphabetShift(key);
    const encryptedText = encode(inputtext);
    res.render('encryptform', { encryptedText, inputtext, key });

})

app.get('/decryptform', (req, res) => {
    res.render('decryptform')
})

app.post('/decrypt', (req, res) => {
    const { inputtext, key } = req.body;
    newalpha = '';
    alphabetShift(key);
    const decryptedText = decode(inputtext);
    console.log(decryptedText);
    res.render('decryptform', { decryptedText, inputtext, key });

})

app.listen(
    port,
    () => console.log(`system is now operational`)
)

