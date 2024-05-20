let tipoUser = parseInt(localStorage.getItem("tipoUsuario"))

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    return `${dia}/${mes}/${ano}`;
}

function formatarDataAsDate(dataStr){
    const partes = dataStr.split('/');
    return new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
}

function calcularDiferencaTempo(data){
    const dataAtual = new Date();
    const diferencaAnos = dataAtual.getFullYear() - data.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const mesDesejado = data.getMonth();
    const diaAtual = dataAtual.getDate();
    const diaDesejado = data.getDate();

    let diferenca = diferencaAnos;

    if(diferenca == 0){
        const diferencaEmDias = Math.floor((dataAtual - data) / (1000 * 60 * 60 * 24));
        return diferencaEmDias;
    }
    if (mesDesejado > mesAtual || (mesDesejado === mesAtual && diaDesejado > diaAtual)) {
        diferenca--;
    }
    return diferenca
}

async function popularCardUser(){
    let dados = await userLoggedIn()
    if(dados){
        document.getElementById("loginNavLink").classList.add("d-none")
        document.getElementById("dashboardNavDiv").classList.remove("d-none")
        document.getElementById("userIcon").classList.remove("d-none")
        document.getElementById("nomeCardUser").innerHTML = dados.username
        document.getElementById("emailCardUser").innerHTML = dados.email
        let dataCriacaoArray = dados.dataDeCriacaoDaConta
        let dataCriacaoStr = formatarData(dataCriacaoArray);
        document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
    }  
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('username');

    window.location.href = "../pagInicial/index.html";
});

async function clienteLoggedIn(){
    let url = "http://localhost:8080/cliente/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    return dados
}

async function nutricionistaLoggedIn(){
    let url = "http://localhost:8080/nutricionista/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
   return dados 
}

async function profissionalLoggedIn(){
    let url = "http://localhost:8080/profissional/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    return dados
}

async function userLoggedIn(){
    let dados
    switch (tipoUser){
        case 1:{
            dados = await clienteLoggedIn();
            break;
        }
        case 2:{
            dados = await nutricionistaLoggedIn()
            break;
        }case 3:{
            dados = await profissionalLoggedIn()
            break;
        }
    }
    return dados
}

async function findPost(){
    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let postId = params.get("id")
    let response = await fetch(`http://localhost:8080/post/${postId}`)
    let post = await response.json()
    console.log(post)
    let categoria;
    let autor;
    switch(post.categoria){
        case "nutricao":{
            categoria = "Nutrição"
            break;
        }
        case "exercicio":{
            categoria = "Exercício"
            break;
        }
        case "outras":{
            categoria = "Outros"
            break;
        }
    }
    if(post.autorCliente != null){
        autor = post.autorCliente.username
    }else if(post.autorNutri != null){
        autor = post.autorNutri.username
    }else if(post.autorPE != null){
        autor = post.autorPE.username
    }

    document.getElementById("spanTipo").innerHTML = categoria
    document.getElementById("titulo").innerHTML = post.titulo
    document.getElementById("subtitulo").innerHTML = post.subTitulo
    document.getElementById("conteudoPost").innerHTML = post.conteudo
    document.getElementById("autorPost").innerHTML = autor
}

async function siteInit(){
    popularCardUser()
    findPost()
}

document.addEventListener("DOMContentLoaded", () => {
    siteInit()
})