const express = require('express');
const resultados = require('./dados/resultados.json');
const app = express();
const porta = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('html/home.html');
});

app.get('/resultados', (req, res) => {
    res.json(resultados);
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});