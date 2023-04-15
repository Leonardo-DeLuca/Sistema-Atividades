const URL_BASE = window.location.origin;

const $tituloTeste = document.getElementById('tituloTeste');
const $numeroPerguntas = document.getElementById('numeroPerguntas')

const $botaoVoltarPergunta = document.getElementById('botaoVoltarPergunta');
const $botaoAvancarPergunta = document.getElementById('botaoAvancarPergunta');

const $tituloPergunta = document.getElementById('tituloPergunta');

const $alternativaA = document.getElementById('alternativaA');
const $alternativaB = document.getElementById('alternativaB');
const $alternativaC = document.getElementById('alternativaC');
const $alternativaD = document.getElementById('alternativaD');
const $alternativaE = document.getElementById('alternativaE');
const $alternativas = [$alternativaA, $alternativaB, $alternativaC, $alternativaD, $alternativaE];

const $tituloAlternativaA = document.getElementById('tituloAlternativaA');
const $tituloAlternativaB = document.getElementById('tituloAlternativaB');
const $tituloAlternativaC = document.getElementById('tituloAlternativaC');
const $tituloAlternativaD = document.getElementById('tituloAlternativaD');
const $tituloAlternativaE = document.getElementById('tituloAlternativaE');

const $btnFinalizar = document.getElementById('btnFinalizar');
const $porcentagemAcertos = document.getElementById('porcentagemAcertos');

let perguntasTeste = [];
let idTesteRealizando = 0;
let idPerguntaAtual = 0;
let testeFinalizado = false;
let nomeUsuario = '';
let nomeTeste = '';

window.addEventListener("load", function() {
    recuperaTeste();
});

const onClickHome = async () => {
    if (confirm("Tem certeza que quer retornar à pagina inicial?")) {
        window.location.href = `${URL_BASE}/home`;
      }  
};  

const recuperaTeste = async () => {
    idTesteRealizando = localStorage.getItem('$id_teste_realizando');

    if (!idTesteRealizando) {
        window.location.href = `${URL_BASE}`;
    }

    localStorage.removeItem('$id_teste_realizando');

    const resp = await fetch(`${URL_BASE}/testes/recuperar/${idTesteRealizando}`);

    const data = await resp.json();

    $tituloTeste.innerHTML = data.conteudo.nome;
    nomeTeste = data.conteudo.nome;

    randomizaPerguntas(data.conteudo.perguntas, executaProcedimentosAuxiliaresPerguntas);
};

const randomizaPerguntas = (perguntas, callback) => {
    for (let i = perguntas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]];
    }

    perguntasTeste = perguntas;

    callback();
};

const executaProcedimentosAuxiliaresPerguntas = () => {
    idPerguntaAtual = perguntasTeste[0].id;

    for (let i = 0; i < perguntasTeste.length; i++) {
        perguntasTeste[i].alternativaMarcada = '';
    }

    perguntaNomeDoUsuario();
    setaTitulosEAlternativaMarcadaPergunta();
    configuraBotoesNavegacaoPerguntas();
    atualizaNumeroDaPergunta();
};

const setaTitulosEAlternativaMarcadaPergunta = () => {
    const perguntaAtual = perguntasTeste.find(item => item.id === idPerguntaAtual);

    $tituloPergunta.innerHTML = perguntaAtual.titulo;

    $tituloAlternativaA.innerHTML = perguntaAtual.alternativaA;
    $tituloAlternativaB.innerHTML = perguntaAtual.alternativaB;
    $tituloAlternativaC.innerHTML = perguntaAtual.alternativaC;
    $tituloAlternativaD.innerHTML = perguntaAtual.alternativaD;
    $tituloAlternativaE.innerHTML = perguntaAtual.alternativaE;

    if (perguntaAtual.alternativaMarcada !== '' && !testeFinalizado) {
        const $alternativaMarcada = $alternativas.find(item => item.value === perguntaAtual.alternativaMarcada);

        $alternativaMarcada.checked = true;
    }   
};

const configuraBotoesNavegacaoPerguntas = () => {
    const indexPergunta = perguntasTeste.findIndex(pergunta => pergunta.id === idPerguntaAtual);
    
    if (indexPergunta === 0) {
        $botaoAvancarPergunta.style.color = '#41b10e';
        $botaoAvancarPergunta.style.cursor = 'pointer';
        $botaoAvancarPergunta.style.pointerEvents = 'all';

        $botaoVoltarPergunta.style.color = '#b9b9b9';
        $botaoVoltarPergunta.style.cursor = 'default';
        $botaoVoltarPergunta.style.pointerEvents = 'none';
    } else {
        $botaoAvancarPergunta.style.color = '#41b10e';
        $botaoAvancarPergunta.style.cursor = 'pointer';
        $botaoAvancarPergunta.style.pointerEvents = 'all';

        $botaoVoltarPergunta.style.color = '#41b10e';
        $botaoVoltarPergunta.style.cursor = 'pointer';
        $botaoVoltarPergunta.style.pointerEvents = 'all';

        // Aqui verificamos se a pergunta é a última fazendo se index da atual + 1 === undefined.
        if (!perguntasTeste[indexPergunta + 1]) {
            $botaoVoltarPergunta.style.color = '#41b10e';
            $botaoVoltarPergunta.style.cursor = 'pointer';
            $botaoVoltarPergunta.style.pointerEvents = 'all';

            $botaoAvancarPergunta.style.color = '#b9b9b9';
            $botaoAvancarPergunta.style.cursor = 'default';
            $botaoAvancarPergunta.style.pointerEvents = 'none';
        }
    }
};

const atualizaNumeroDaPergunta = () => {
    const numPergunta = getIndicePerguntaAtual() + 1;
    const perguntasTotais = perguntasTeste.length;

    $numeroPerguntas.innerHTML = `Pergunta ${numPergunta}/${perguntasTotais}`;

    if (numPergunta / perguntasTotais === 1) {
        if (testeFinalizado) return;

        $btnFinalizar.style.display = 'block';
    } else {
        $btnFinalizar.style.display = 'none';
    }
};

const onChangeAlternativa = (e) => {
    for (let i = 0; i < perguntasTeste.length; i++) {
        if (perguntasTeste[i].id === idPerguntaAtual) {
            perguntasTeste[i].alternativaMarcada = e.target.value;
        }
    }
};

const perguntaNomeDoUsuario = () => {
    nomeUsuario = prompt('Digite o seu nome: ');

    if (!nomeUsuario || nomeUsuario.trim().length === 0) {
        perguntaNomeDoUsuario();
    }
};

const onClickVoltarPergunta = () => {
    const indexPerguntaAtual = getIndicePerguntaAtual();
    const perguntaAnterior = perguntasTeste.at(indexPerguntaAtual - 1);

    idPerguntaAtual = perguntaAnterior.id;

    limpaAlternativas();
    setaTitulosEAlternativaMarcadaPergunta();
    configuraBotoesNavegacaoPerguntas();
    atualizaNumeroDaPergunta();

    if (testeFinalizado) {
        configuraPerguntaTesteFinalizado();
    }
};

const onClickAvancarPergunta = () => {
    const indexPerguntaAtual = getIndicePerguntaAtual();
    const proximaPergunta = perguntasTeste.at(indexPerguntaAtual + 1);

    idPerguntaAtual = proximaPergunta.id;

    limpaAlternativas();
    setaTitulosEAlternativaMarcadaPergunta();
    configuraBotoesNavegacaoPerguntas();
    atualizaNumeroDaPergunta();

    if (testeFinalizado) {
        configuraPerguntaTesteFinalizado();
    }
};

const limpaAlternativas = () => {
    $alternativas.forEach($alternativa => $alternativa.checked = false);
};


const getIndicePerguntaAtual = () => {
    return perguntasTeste.findIndex(pergunta => pergunta.id === idPerguntaAtual);
};

const configuraPerguntaTesteFinalizado = () => {
    const $alternativaMarcadaPergunta = $alternativas.find($alternativa => $alternativa.value === perguntasTeste[getIndicePerguntaAtual()].alternativaMarcada);
    const $alternativaCorretaPergunta = $alternativas.find($alternativa => $alternativa.value === perguntasTeste[getIndicePerguntaAtual()].alternativaCorreta);

    atualizaAlternativasTesteFinalizado();

    if ($alternativaMarcadaPergunta.value !== $alternativaCorretaPergunta.value) {
        $alternativaMarcadaPergunta.nextElementSibling.style.backgroundColor = '#eb4034';
        $alternativaCorretaPergunta.nextElementSibling.style.backgroundColor = '#41b10e';
        $alternativaMarcadaPergunta.nextElementSibling.style.color = '#fff';
        $alternativaCorretaPergunta.nextElementSibling.style.color = '#fff';
    } else {
        $alternativaMarcadaPergunta.nextElementSibling.style.backgroundColor = '#41b10e';
        $alternativaMarcadaPergunta.nextElementSibling.style.color = '#fff';
    }
};

const atualizaAlternativasTesteFinalizado = () => {
    $alternativas.forEach($alternativa => {
        $alternativa.nextElementSibling.style.backgroundColor = '#f9f9f9';
        $alternativa.nextElementSibling.style.color = '#b9b9b9';
    })
};

const onClickFinalizarTeste = () => {
    if (!executaValidacoesAntesDeFinalizar()) return;

    executaMetodosFinalizar();
};

const executaValidacoesAntesDeFinalizar = () => {
    for (let i = 0; i < perguntasTeste.length; i++) {
        if (perguntasTeste[i].alternativaMarcada === '') {
            alert('Responda todas as perguntas antes de finalizar!');
            return false;
        }
    }

    return true;
};

const executaMetodosFinalizar = () => {
    testeFinalizado = true;

    criaRegistroNoBack();
    configuraTelaAposFinalizar();
};

const criaRegistroNoBack = async () => {
    const resultadoSalvar = getResultadosParaSalvar();

    const resp = await fetch(`${URL_BASE}/resultados/salvar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resultadoSalvar)
    });

    const objResponse = await resp.json();
    
    if (objResponse.status !== "OK") {
        alert(objResponse.descricao_erro);
    } else {
        alert('Resultado submetido com sucesso! Agora você pode ver as perguntas que acertou!');
    }
};

const configuraTelaAposFinalizar = () => {
    const $alternativaMarcadaUltimaPergunta = $alternativas.find($alternativa => $alternativa.value === perguntasTeste[getIndicePerguntaAtual()].alternativaMarcada);
    const $alternativaCorretaUltimaPergunta = $alternativas.find($alternativa => $alternativa.value === perguntasTeste[getIndicePerguntaAtual()].alternativaCorreta);

    if ($alternativaMarcadaUltimaPergunta.value !== $alternativaCorretaUltimaPergunta.value) {
        $alternativaMarcadaUltimaPergunta.nextElementSibling.style.backgroundColor = '#eb4034';
        $alternativaCorretaUltimaPergunta.nextElementSibling.style.backgroundColor = '#41b10e';
        $alternativaMarcadaUltimaPergunta.nextElementSibling.style.color = '#fff';
        $alternativaCorretaUltimaPergunta.nextElementSibling.style.color = '#fff';
    } else {
        $alternativaMarcadaUltimaPergunta.nextElementSibling.style.backgroundColor = '#41b10e';
        $alternativaMarcadaUltimaPergunta.nextElementSibling.style.color = '#fff';
    }

    $porcentagemAcertos.style.display = 'block';
    $porcentagemAcertos.innerHTML = `Porcentagem de acertos: ${getPorcentagemAcertos()}`
    $btnFinalizar.style.display = 'none';

    $alternativas.forEach($alternativa => {
        $alternativa.disabled = 'true';
    });
};

const getResultadosParaSalvar = () => {
    return {
        idTeste: idTesteRealizando,
        nomeTeste,
        nomeUsuario,
        perguntasTotais: perguntasTeste.length,
        respostasCorretas: getRespostasCorretas(),
        porcentagemAcertos: getPorcentagemAcertos()
    }
};

const getRespostasCorretas = () => {
    return perguntasTeste.reduce((acc, item) => { 
        if (item.alternativaMarcada === item.alternativaCorreta) {
            acc++
        }
    
        return acc;
    }, 0)
};

const getPorcentagemAcertos = () => {
    return ((getRespostasCorretas() / perguntasTeste.length) * 100).toFixed(2) + '%';
};