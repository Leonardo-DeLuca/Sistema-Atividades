const URL_BASE = window.location.origin;

const onClickBtnRegistrarSlide = (e) => {
    const loginBtn = document.getElementById('btnLoginSlide'),
        elPai = e.target.parentNode;

	Array.from(e.target.parentNode.classList).find(item => {
		if (item !== "slide-up") {
			elPai.classList.add('slide-up')
		} else {
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			elPai.classList.remove('slide-up')
		}
	});
};

const onClickBtnLoginSlide = (e) => {
    const signupBtn = document.getElementById('btnRegistrarSlide'),
        elPai = e.target.parentNode.parentNode;

	Array.from(e.target.parentNode.parentNode.classList).find(item => {
        if (item !== "slide-up") {
            elPai.classList.add('slide-up')
        } else {
            signupBtn.parentNode.classList.add('slide-up')
            elPai.classList.remove('slide-up')
        }
	});
};

const onClickRegistrar = async () => {
    const usuario = document.getElementById('usuarioRegistrar').value,
        senha = document.getElementById('senhaRegistrar').value;

    if (usuario.trim().length === 0 || senha.trim().length === 0) return;

    const data = { usuario, senha };

    const resp = await fetch(`${URL_BASE}/registrar/`, {
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

const onClickLogin = async () => {
    const usuario = document.getElementById('usuarioLogin').value,
        senha = document.getElementById('senhaLogin').value;

    if (usuario.trim().length === 0 || senha.trim().length === 0) return;

    const data = { usuario, senha };

    const resp = await fetch(`${URL_BASE}/login/`, {
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