const URL_BASE = `http://${window.location.hostname}:${window.location.port}`;

const onClickHome = async () => {
    window.location.href = `${URL_BASE}/home`;
};

window.addEventListener("load", function(event) {
    carregaItemsLista()
});

const carregaItemsLista = async () => {
    const resp = await fetch(`${URL_BASE}/testes/carregaLista`);

    const data = await resp.json();

    let obj = {}

    data.forEach(element =>{
        obj = {id: element.id}
    });

    console.log(obj)

}

const adicionaItemsLista = async (data) =>{

    const tabela = document.getElementById("tabelaTestes")
    const listItem = document.createElement("li")
    listItem.classList = "table-row"
    const div1 = document.createElement("div")
    div1.classList = "col col-1"
    div1.innerHTML = 'id'

    tabela.appendChild(listItem)
    listItem.appendChild(div1)
}