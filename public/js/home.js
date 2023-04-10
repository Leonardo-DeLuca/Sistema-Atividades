const URL_BASE = window.location.href.substring(0, 21);

const onClickLogin = async () => {
    window.location.href = `${URL_BASE}/login`;
};

const onClickResultados = async () => {
    window.location.href = `${URL_BASE}/resultado`;
};

const onClickTestes = async () => {
    window.location.href = `${URL_BASE}/testes`;
};