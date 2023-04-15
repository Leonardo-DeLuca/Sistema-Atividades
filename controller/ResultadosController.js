const resultados = require('../dados/resultados.json');

const resultadosView = (req, res) => {
    return res.redirect('/resultados.html');
};

const carregaLista = (req, res) =>{
    return res.send(resultados)
};

exports.resultadosView = resultadosView
exports.carregaLista = carregaLista