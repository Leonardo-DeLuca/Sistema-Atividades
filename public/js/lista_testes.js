const URL_BASE = window.location.origin;

const onClickHome = async () => {
    window.location.href = `${URL_BASE}/home`;
};

window.addEventListener("load", function(event) {
    carregaItemsLista();
});

const carregaItemsLista = async () => {
    const resp = await fetch(`${URL_BASE}/testes/carregaLista`);

    const data = await resp.json();

    data.forEach(element => {
        adicionaItemsLista(element);
    });
};

const adicionaItemsLista = async (element) => {
    const tabela = document.getElementById("tabelaTestes");
    const listItem = document.createElement("li");

    listItem.classList = "table-row";

    for (let i = 1; i <= 5; i++) {
        window['div'+i] = document.createElement('div');
    }

    div1.classList = "col col-1";
    div1.innerHTML = element.id;

    div2.classList = "col col-2";
    div2.innerHTML = element.nome;

    div3.classList = "col col-3";
    div3.innerHTML = element.materia;

    div4.classList = "col col-4";
    div4.innerHTML = element.dificuldade;

    div5.classList = "col col-5";
    div5.innerHTML = element.perguntas.length;

    listItem.onclick = function() {
        onClickListItem(element.id);
    };
    
    tabela.appendChild(listItem);

    for (let i = 1; i <= 5; i++) {
        listItem.appendChild(window['div'+i]);
    }
};

const onClickListItem = (id) => {
    localStorage.setItem('$id_teste_realizando', id);

    window.location.href = `${URL_BASE}/testes/realizar`;
};