const fs = require('fs');
const testes = require('../dados/testes.json');

const cadastroTestesView = (req, res) => {
    return res.redirect('/cadastro_testes.html');
};

const listaTestesView = (req, res) => {
    return res.redirect('/lista_testes.html');
};

const salvar = (req, res) => {
    const { nome, materia, dificuldade, perguntas } = req.body;
    const id = testes.length + 1;

    testes.push({ id, nome, materia, dificuldade, perguntas });

    let erroArquivo = false;

    fs.writeFile('./dados/testes.json', JSON.stringify(testes), 'utf-8', (err) => {
        if (err) erroArquivo = true;
    });

    if (erroArquivo) {
        return res.status(404).json({ "status": "ERRO", "descricao_erro": "Houve um problema ao cadastrar o teste no arquivo JSON!." });
    } else {
        return res.status(200).json({ "status": "OK" });
    }
};

const carregaLista = (req, res) =>{
    return res.send(testes)
}

exports.listaTestesView = listaTestesView
exports.cadastroTestesView = cadastroTestesView;
exports.salvar = salvar;
exports.carregaLista = carregaLista;