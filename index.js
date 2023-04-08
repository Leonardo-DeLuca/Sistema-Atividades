const express = require('express');
const app = express();
const porta = 3000;
const rotas = require('./rotas/_rotas');

app.use(express.static('public'));

app.use(express.json());
app.use(rotas);

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});