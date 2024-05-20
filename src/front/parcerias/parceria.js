const tipoUser = parseInt(localStorage.getItem("tipoUsuario"))

async function criarParceria() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;

    const novaParceria = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        autorNutri: null,
        autorPE: null
    };

    switch(tipoUser){
        case 2:{
            novaParceria.autorNutri = await userLoggedIn()
            break;
        }
        case 3:{
            novaParceria.autorPE = await userLoggedIn()
            break;
        }
    }

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novaParceria)
    };

    try {
        let response = await fetch("http://localhost:8080/parcerias", options);
        let dados = await response.json();
        alert("Parceria cadastrada com sucesso")
        window.location.href = "../Profissional/indexProfissional.html"
    } catch (error) {
        alert("Ocorreu um erro. Tente novamente")
        console.error("Erro ao criar parceria:", error);
    }
}

async function nutricionistaLoggedIn() {
    let url = "http://localhost:8080/nutricionista/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    return dados
}

async function profissionalLoggedIn() {
    let url = "http://localhost:8080/profissional/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    return dados;
}

async function userLoggedIn() {
    let dados
    switch (tipoUser) {
        case 1: {
            dados = await clienteLoggedIn();
            break;
        }
        case 2: {
            dados = await nutricionistaLoggedIn()
            break;
        } case 3: {
            dados = await profissionalLoggedIn()
            break;
        }
    }
    usuarioLogado = dados
    return dados;
}

document.getElementById("criarbtn").addEventListener("click", criarParceria)