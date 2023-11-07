"use strict"

// CREATE SERVER
const express = require('express');
const app = express();

// RICHIEDO L'UTILIZZO DELLA CARTELLA STYLES
app.use(express.static('styles'));

// IMPOSTO IL MOTORE DI VISUALIZZAZIONE E LA CARTELLA DELLE VIEWS
app.set('view engine', 'ejs');
app.set('views', 'C:\\Users\\Utente\\Desktop\\project\\node-website\\views\\');

// CREO LA ROTTA
app.get('/', (req, res) => {
    res.render('index');
});

// METTO IL SERVER IN ASCOLTO
app.listen(8081, () => {
    console.log('Server running at http://myproject:8081/');
});

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // Sostituisci con l'host del tuo database MySQL
    user: 'root', // Sostituisci con il nome utente del tuo database
    password: '', // Sostituisci con la password del tuo database
    database: 'node_db', // Sostituisci con il nome del tuo database
});

// Connessione al database
connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        return;
    }
    console.log('Connessione al database riuscita!');
});

const createTableSQL = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
)
`;

connection.query(createTableSQL, (err, results) => {
    if (err) {
        console.error('Errore nella creazione della tabella:', err);
        return;
    }
    console.log('Tabella "users" creata con successo!');
});

// Query di inserimento
const insertUserSQL = `
    INSERT INTO users (username, email)
    VALUES ('alice', 'alice@example.com')
`;

connection.query(insertUserSQL, (err, results) => {
    if (err) {
        console.error('Errore nell\'inserimento dell\'utente:', err);
        return;
    }
    console.log('Nuovo utente inserito con successo!');
});

// Rotta per ottenere i dati dal database
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM `users`'; // Sostituisci con il nome della tabella
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Errore nella query:', err);
            res.status(500).json({ error: 'Errore nel recupero dei dati' });
            return;
        }
        res.json(results);
    });
});
// Installa il modulo EJS tramite npm
const ejs = require('ejs');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'C:\\Users\\Utente\\Desktop\\project\\node-website\\views\\');

// Rotta per la vista
app.get('/view', (req, res) => {
    const query = 'SELECT * FROM `users`'; // Sostituisci con il nome della tabella
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Errore nella query:', err);
            res.status(500).json({ error: 'Errore nel recupero dei dati' });
            return;
        }
        res.render('view', { data: results }); // "your-view" è il nome del file di vista EJS
    });
});
// connection.end((err) => {
//     if (err) {
//         console.error('Errore nella chiusura della connessione al database:', err);
//         return;
//     }
//     console.log('Connessione al database chiusa.');
// });





