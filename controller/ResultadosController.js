const fs = require('fs');
const resultados = require('../dados/resultados.json');

const resultadosView = (req, res) => {
    return res.redirect('/resultados.html');
};

const carregaLista = (req, res) => {
    return res.send(resultados)
};

const salvar = (req, res) => {
    const { idTeste, nomeTeste, nomeUsuario, perguntasTotais, respostasCorretas, porcentagemAcertos } = req.body;
    const id = resultados.length + 1;
    
    resultados.push({ id, idTeste, nomeTeste, nomeUsuario, perguntasTotais, respostasCorretas, porcentagemAcertos });
    
    let erroArquivo = false;
    
    fs.writeFile('./dados/resultados.json', JSON.stringify(resultados), 'utf-8', (err) => {
        if (err) erroArquivo = true;
    });
    
    if (erroArquivo) {
        return res.status(404).json({ "status": "ERRO", "descricao_erro": "Houve um problema ao cadastrar o resultado no arquivo JSON!" });
    } else {
        return res.status(200).json({ "status": "OK" });
    }
};

exports.resultadosView = resultadosView;
exports.salvar = salvar;
exports.carregaLista = carregaLista;
