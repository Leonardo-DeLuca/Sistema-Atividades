const cadastroTestesView = (req, res) => {
    return res.redirect('/cadastro_testes.html');
};

const listaTestesView = (req, res) => {
    return res.redirect('/lista_testes.html');
};

exports.cadastroTestesView = cadastroTestesView;
exports.listaTestesView = listaTestesView