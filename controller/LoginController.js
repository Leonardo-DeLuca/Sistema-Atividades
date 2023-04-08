const fs = require('fs');
const usuarios = require('../dados/usuarios.json');

const loginView = (req, res) => {
    return res.redirect('html/login.html');
};

const registrar = (req, res) => {
    const { usuario, senha } = req.body;

    if (usuarios.some(item => item.usuario === usuario)) {
        return res.status(401).json({ "status": "ERRO", "descricao_erro": "Usuário com este nome já existe!." });
    } else {
        let erroArquivo = false;

        usuarios.push({ usuario, senha });

        fs.writeFile('./dados/usuarios.json', JSON.stringify(usuarios), 'utf-8', (err) => {
            if (err) erroArquivo = true;
        });

        if (erroArquivo) {
            return res.status(404).json({ "status": "ERRO", "descricao_erro": "Houve um problema ao cadastrar o usuário no arquivo JSON!." });
        } else {
            return res.status(200).json({ "status": "OK" });
        }
    }
};

const login = (req, res) => {
    const { usuario, senha } = req.body;

    if (usuarios.some(item => item.usuario === usuario && item.senha === senha)) {
        return res.status(200).json({ "status": "OK" });
    } else {
        return res.status(401).json({ "status": "ERRO", "descricao_erro": "Usuário não encontrado." });
    }
};

exports.loginView = loginView;
exports.registrar = registrar;
exports.login = login;