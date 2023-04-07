const usuarios = require('../dados/usuarios.json');

const login = (req, res) => {
    const { usuario, senha } = req.body;

    if (usuarios.some(item => item.usuario === usuario && item.senha === senha)) {
        return res.status(200).json({ "status": "OK" });
    } else {
        return res.status(401).json({ "status": "ERRO", "descricao_erro": "Usuário não encontrado." });
    }
};

exports.login = login;