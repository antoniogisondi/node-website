"use strict"

// CREATE SERVER
const express = require('express');
const app = express();

// Imposta il motore di visualizzazione e la directory delle viste
app.set('view engine', 'ejs');
app.set('views', 'C:\\Users\\Utente\\Desktop\\project\\node-website\\views\\');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8081, () => {
    console.log('Server running at http://myproject:8081/');
});
