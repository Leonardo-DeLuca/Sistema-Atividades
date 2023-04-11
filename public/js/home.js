const URL_BASE = window.location.origin;

const onClickLogin = async () => {
    window.location.href = `${URL_BASE}/login`;
};

const onClickResultados = async () => {
    window.location.href = `${URL_BASE}/resultados`;
};

const onClickTestes = async () => {
    window.location.href = `${URL_BASE}/testes/lista`;
};