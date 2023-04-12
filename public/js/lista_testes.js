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
        console.log(element)
        adicionaItemsLista(element)
    });

    console.log(obj)

}

const adicionaItemsLista = async (element) =>{

    const tabela = document.getElementById("tabelaTestes")
    const listItem = document.createElement("li")
    listItem.classList = "table-row"

    for(let i = 1; i <= 5; i++){
        window['div'+i] = document.createElement('div')
    }

    // const [div1, div2, div3, div4, div5] = document.createElement("div")
    div1.classList = "col col-1"
    div1.innerHTML = element.id

    div2.classList = "col col-2"
    div2.innerHTML = element.nome

    div3.classList = "col col-3"
    div3.innerHTML = element.materia

    div4.classList = "col col-4"
    div4.innerHTML = element.dificuldade

    div5.classList = "col col-5"
    div5.innerHTML = element.perguntas.length
    
    tabela.appendChild(listItem)
    for(let i = 1; i <= 5; i++){
        listItem.appendChild( window['div'+i])
    }
    
}