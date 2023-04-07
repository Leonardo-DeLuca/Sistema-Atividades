const express = require('express');
const app = express();
const porta = 3000;

const { LoginController } = require('./controller/index');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('html/home.html');
});

app.get('/login', (req, res) => {
    res.redirect('html/login.html');
});

app.post('/login', (req, res) => {
    LoginController.login(req, res);
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});