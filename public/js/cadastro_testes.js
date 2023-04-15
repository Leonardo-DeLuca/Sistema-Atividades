const URL_BASE = window.location.origin;

const $containerFormTeste = document.getElementById('containerFormTeste');
const $formTestes = document.getElementById('formTestes');
const $containerFormPergunta = document.getElementById('containerFormPergunta');
const $tituloPergunta = document.getElementById('tituloPergunta');

let perguntasTeste = [];
let isEditandoPergunta = false;
let perguntaEditando = {};

const onClickHome = async () => {
    window.location.href = `${URL_BASE}/home`;
};

const abreFormPerguntas = () => {
    $containerFormTeste.style.display = 'none';
    $containerFormPergunta.style.display = 'block';
    $tituloPergunta.focus();
};

const fechaFormPerguntas = () => {
    $containerFormTeste.style.display = 'block';
    $containerFormPergunta.style.display = 'none';
};

const onClickAdicionarPergunta = () => {
    abreFormPerguntas();
};

const onClickVoltarTeste = () => {
    fechaFormPerguntas();
    setaOuLimpaCamposPergunta();
};

const onClickSalvarPergunta = () => {
    if (!isEditandoPergunta) {
        criarPergunta();
    } else {
        editarPergunta();
    }
};

const criarPergunta = () => {
    const novaPergunta = getPergunta();
    const isAlgumAtributoVazio = Object.values(novaPergunta).some(item => item === '');

    if (isAlgumAtributoVazio) return;

    const novaDivPergunta = criaNovaDivPergunta(novaPergunta);

    $formTestes.insertBefore(novaDivPergunta, $formTestes.lastElementChild);

    perguntasTeste.push(novaPergunta);
    
    fechaFormPerguntas();
    setaOuLimpaCamposPergunta();
};

const editarPergunta = () => {
    const elementoInputPerguntaEditando = document.getElementById(`inputPergunta${perguntaEditando.id}`);

    perguntaEditando = getPergunta(perguntaEditando.id);

    elementoInputPerguntaEditando.placeholder = perguntaEditando.titulo
    
    for (let i = 0; i < perguntasTeste.length; i++) {
        if (perguntasTeste[i].id === perguntaEditando.id) {
            perguntasTeste[i] = perguntaEditando;
        }
    }

    isEditandoPergunta = false;
    perguntaEditando = {};

    fechaFormPerguntas();
    setaOuLimpaCamposPergunta();
};

const onClickEditarPergunta = (idPergunta) => {
    const pergunta = perguntasTeste.find(pergunta => pergunta.id === idPergunta);
    setaOuLimpaCamposPergunta(pergunta);

    isEditandoPergunta = true;
    perguntaEditando = pergunta;

    abreFormPerguntas();
};

const onClickExcluirPergunta = (idPergunta) => {
    const perguntasRestantes = perguntasTeste.filter(item => item.id !== idPergunta);

    perguntasTeste.forEach(pergunta => {
        const elementoPergunta = document.getElementById(`pergunta${pergunta.id}`);
        
        elementoPergunta.remove();
    });

    perguntasTeste = [];

    if (perguntasRestantes.length === 0) return;
    
    for (let i = 0; i < perguntasRestantes.length; i++) {
        perguntasRestantes[i].id = i + 1;
        perguntasTeste[i] = perguntasRestantes[i];
        
        const novaDivPergunta = criaNovaDivPergunta(perguntasRestantes[i]);
        
        $formTestes.insertBefore(novaDivPergunta, $formTestes.lastElementChild);
    }
};


const getPergunta = (id) => {
    return {
        id: id || perguntasTeste.length + 1,
        titulo: document.getElementById('tituloPergunta').value,
        alternativaA: document.getElementById('alternativaA').value,
        alternativaB: document.getElementById('alternativaB').value,
        alternativaC: document.getElementById('alternativaC').value,
        alternativaD: document.getElementById('alternativaD').value,
        alternativaE: document.getElementById('alternativaE').value,
        alternativaCorreta: document.getElementById('selectAlternativaCorreta').value
    }
};

const criaNovaDivPergunta = (pergunta) => {
    const divRow = document.createElement('div');
    divRow.classList = 'row';
    divRow.style.flexDirection = 'row';
    divRow.id = `pergunta${pergunta.id}`;

    const div89Porcento = document.createElement('div');
    div89Porcento.classList = 'col-89-porcento';
    
    const divInputGroup = document.createElement('div');
    divInputGroup.classList = 'input-group input-group-icon';
    
    const inputResposta = document.createElement('input');
    inputResposta.id = `inputPergunta${pergunta.id}`;
    inputResposta.placeholder = pergunta.titulo;
    inputResposta.style.cursor = 'pointer';
    inputResposta.disabled = true;
    
    const divInputIcon = document.createElement('div');
    divInputIcon.classList = 'input-icon';
    
    const icone = document.createElement('b');
    icone.innerHTML = pergunta.id;

    const div11Porcento = document.createElement('div');
    div11Porcento.classList = 'col-11-porcento';
    div11Porcento.style.cursor = 'pointer';
    
    const divInputGroupExcluir = document.createElement('div');
    divInputGroupExcluir.classList = 'input-group input-group-icon';

    const divInputIconExcluir = document.createElement('div');
    divInputIconExcluir.classList = 'input-icon';

    const iconeExcluir = document.createElement('i');
    iconeExcluir.classList = 'fa fa-trash';

    divInputIcon.appendChild(icone);
    divInputGroup.appendChild(inputResposta);
    divInputGroup.appendChild(divInputIcon);
    div89Porcento.appendChild(divInputGroup);

    divInputIconExcluir.appendChild(iconeExcluir);
    divInputGroupExcluir.appendChild(divInputIconExcluir);
    div11Porcento.appendChild(divInputGroupExcluir);

    div11Porcento.onclick = function() {
        onClickExcluirPergunta(pergunta.id);
    };

    div89Porcento.onclick = function() {
        onClickEditarPergunta(pergunta.id);
    };

    divRow.appendChild(div89Porcento);
    divRow.appendChild(div11Porcento);

    return divRow;
};

const setaOuLimpaCamposPergunta = (pergunta) => {
    const titulo = document.getElementById('tituloPergunta'),
        alternativaA = document.getElementById('alternativaA'),
        alternativaB = document.getElementById('alternativaB'),
        alternativaC = document.getElementById('alternativaC'),
        alternativaD = document.getElementById('alternativaD'),
        alternativaE = document.getElementById('alternativaE'),
        alternativaCorreta = document.getElementById('selectAlternativaCorreta');

    titulo.value = pergunta ? pergunta.titulo : '';
    alternativaA.value = pergunta ? pergunta.alternativaA : '';
    alternativaB.value = pergunta ? pergunta.alternativaB : '';
    alternativaC.value = pergunta ? pergunta.alternativaC : '';
    alternativaD.value = pergunta ? pergunta.alternativaD : '';
    alternativaE.value = pergunta ? pergunta.alternativaE : '';
    alternativaCorreta.value = pergunta ? pergunta.alternativaCorreta : 'A';
};

const onClickSalvarTeste = async () => {
    if (!executaValidacoesAntesDeSalvar()) return;

    const testeSalvar = getTesteParaSalvar();

    const resp = await fetch(`${URL_BASE}/testes/salvar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(testeSalvar)
    });

    const objResponse = await resp.json();
    
    if (objResponse.status !== "OK") {
        alert(objResponse.descricao_erro);
    } else {
        alert('Teste cadastrado com sucesso!');
        limparFormAposSalvar();
    }
};

const getTesteParaSalvar = () => {
    const nomeTeste = document.getElementById('nomeTeste').value,
        materiaTeste = document.getElementById('materiaTeste').value,
        dificuldades = [document.getElementById('dificuldade-facil'), document.getElementById('dificuldade-media'), document.getElementById('dificuldade-dificil'), document.getElementById('dificuldade-expert')],
        dificuldadeTeste = dificuldades.find(dificuldade => dificuldade.checked);

    return {
        nome: nomeTeste,
        materia: materiaTeste,
        dificuldade: dificuldadeTeste.value,
        perguntas: perguntasTeste
    }
};

const executaValidacoesAntesDeSalvar = () => {
    const nomeTeste = document.getElementById('nomeTeste'),
        materiaTeste = document.getElementById('materiaTeste'),
        dificuldadeFacil = document.getElementById('dificuldade-facil'),
        dificuldadeMedia = document.getElementById('dificuldade-media'),
        dificuldadeDificil = document.getElementById('dificuldade-dificil'),
        dificuldadeExpert = document.getElementById('dificuldade-expert');

    if (nomeTeste.value === '') {
        alert('Insira um nome válido para o teste!');
        return false;
    }

    if (materiaTeste.value === '') {
        alert('Insira uma matéria ou assunto válido para o teste!');
        return false;
    }

    if (!dificuldadeFacil.checked && !dificuldadeMedia.checked && !dificuldadeDificil.checked && !dificuldadeExpert.checked) {
        alert('Insira uma dificuldade válida para o teste!');
        return false;
    }

    if (perguntasTeste.length === 0) {
        alert('Insira ao menos uma pergunta para o teste!');
        return false;
    }

    return true;
};

const limparFormAposSalvar = () => {
    const nomeTeste = document.getElementById('nomeTeste'),
        materiaTeste = document.getElementById('materiaTeste'),
        dificuldades = [document.getElementById('dificuldade-facil'), document.getElementById('dificuldade-media'), document.getElementById('dificuldade-dificil'), document.getElementById('dificuldade-expert')];

    nomeTeste.value = '';
    materiaTeste.value = '';
    dificuldades.forEach(dif => dif.checked = false);

    perguntasTeste.forEach(pergunta => {
        const elementoPergunta = document.getElementById(`pergunta${pergunta.id}`);
        
        elementoPergunta.remove();
    });

    perguntasTeste = [];
};