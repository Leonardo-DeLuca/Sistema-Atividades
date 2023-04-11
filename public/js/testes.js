const URL_BASE = `http://${window.location.hostname}:${window.location.port}`;

const onClickHome = async () => {
    window.location.href = `${URL_BASE}/home`;
};

const onClickTeste = () =>{
    console.log('teste')
}