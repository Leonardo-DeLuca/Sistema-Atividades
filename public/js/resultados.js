const URL_BASE = window.location.origin;

const onClickHome = async () => {
    window.location.href = `${URL_BASE}/home`;
};

window.addEventListener("load", function(event) {
    carregaItemsLista();
});

const carregaItemsLista = async () =>{
    const resp = await fetch(`${URL_BASE}/resultados/carregaLista`)

    const data = await resp.json()

    data.sort((a, b) => {
        return b.perguntasTotais - a.perguntasTotais || b.respostasCorretas - a.respostasCorretas
    });

    data.forEach(element => {
        adicionaItemsLista(element);
    });
}

const adicionaItemsLista = async (element) => {
    const tabela = document.getElementById("tabelaResultados");
    const listItem = document.createElement("li");

    listItem.classList = "table-row";

    for (let i = 1; i <= 5; i++) {
        window['div'+i] = document.createElement('div');
    }

    div1.classList = "col col-1";
    div1.innerHTML = element.id;

    div2.classList = "col col-2";
    div2.innerHTML = element.nomeUsuario;

    div3.classList = "col col-3";
    div3.innerHTML = element.nomeTeste;

    div4.classList = "col col-4";
    div4.innerHTML = `${element.respostasCorretas} / ${element.perguntasTotais}`;

    div5.classList = "col col-5";
    div5.innerHTML = element.porcentagemAcertos;
    
    tabela.appendChild(listItem);

    for (let i = 1; i <= 5; i++) {
        listItem.appendChild(window['div'+i]);
    }
}