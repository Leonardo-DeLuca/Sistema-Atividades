const onClickLogin = async () => {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario.trim().length === 0 || senha.trim().length === 0) return;

    const data = { usuario, senha };

    const resp = await fetch('http://localhost:3000/login/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const objResponse = await resp.json();
    
    if (objResponse.status !== "OK") {
        alert(objResponse.descricao_erro);
    }
};