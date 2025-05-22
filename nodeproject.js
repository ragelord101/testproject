const express = require('express');
const app = express();
const port = 4000;


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World! welcome to our first publicly uploaded server')
})

app.get('/about', (req, res) => {
    res.render('about')
})