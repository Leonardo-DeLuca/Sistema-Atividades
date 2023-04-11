const URL_BASE = `http://${window.location.hostname}:${window.location.port}`;

const onClickLogin = async () => {
    window.location.href = `${URL_BASE}/login`;
};

const onClickResultados = async () => {
    window.location.href = `${URL_BASE}/resultados`;
};

const onClickTestes = async () => {
    window.location.href = `${URL_BASE}/cadastro_testes`;
};