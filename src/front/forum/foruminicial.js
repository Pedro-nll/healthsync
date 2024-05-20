const postscomunidadebtn = document.getElementById('postcom');
const postsmeubtn = document.getElementById('postmeu');


const tiponutri = document.getElementsByClassName("nutriçãotipo");
const tipoexerci = document.getElementsByClassName("exerciciotipo");
const tipooutros = document.getElementsByClassName("outrotipo");


const postcomundiv = document.getElementById('Pcomunidade');
const postmeudiv = document.getElementById('Pmeu');

const todosbtn =document.getElementById('todosbtn');
const nutriçãobtn =document.getElementById('nutriçãobtn');
const exerciciobtn =document.getElementById('exerciciobtn');
const outrosbtn =document.getElementById('outrosbtn');

const tipoUser = parseInt(localStorage.getItem("tipoUsuario"))

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    return `${dia}/${mes}/${ano}`;
}

async function clienteLoggedIn(){
    let url = "http://localhost:8080/cliente/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    document.getElementById("nomeCardUser").innerHTML = dados.username
    document.getElementById("emailCardUser").innerHTML = dados.email
    let dataCriacaoArray = dados.dataDeCriacaoDaConta
    let dataCriacaoStr = formatarData(dataCriacaoArray);
    document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
    document.getElementById("criarPostBtn").addEventListener("click", () => {
        window.location.href = `../Criar/criar.html?tipoDeAcesso=post&nome=${dados.username}`
    })
    return dados
}

async function nutricionistaLoggedIn(){
    let url = "http://localhost:8080/nutricionista/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    document.getElementById("nomeCardUser").innerHTML = dados.username
    document.getElementById("emailCardUser").innerHTML = dados.email
    let dataCriacaoArray = dados.dataDeCriacaoDaConta
    let dataCriacaoStr = formatarData(dataCriacaoArray);
    document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
    document.getElementById("criarPostBtn").addEventListener("click", () => {
        window.location.href = `../Criar/criar.html?tipoDeAcesso=post&nome=${dados.username}`
    })
   return dados 
}

async function profissionalLoggedIn(){
    let url = "http://localhost:8080/profissional/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    document.getElementById("nomeCardUser").innerHTML = dados.username
    document.getElementById("emailCardUser").innerHTML = dados.email
    let dataCriacaoArray = dados.dataDeCriacaoDaConta
    let dataCriacaoStr = formatarData(dataCriacaoArray);
    document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
    document.getElementById("criarPostBtn").addEventListener("click", () => {
        window.location.href = `../Criar/criar.html?tipoDeAcesso=post&nome=${dados.username}`
    })
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

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('username');

    window.location.reload();
});

async function siteInit(){
    await getAllPosts()
    abrirPost()
}

document.addEventListener('DOMContentLoaded', () => {
    siteInit()
    postscomunidadebtn.classList.add("ativado");
    postmeudiv.style.display = 'none';
    todosbtn.setAttribute("checked", "checked");
    // Verificar o tipo de usuário armazenado no localStorage
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    let loginNavLink = document.getElementById("loginNavLink")
    let dashboardNavDiv = document.getElementById("dashboardNavDiv")
    let dashboardLink = document.getElementById("dashboardLink")
    let userIcon = document.getElementById("userIcon")
    // Executar ações com base no tipo de usuário
    switch (parseInt(tipoUsuario)) {
        case 1:{
            //cliente
            loginNavLink.classList.add("d-none")
            dashboardNavDiv.classList.remove("d-none")
            userIcon.classList.remove("d-none")
            dashboardLink.href = "../dashboardCliente/dashboardCliente.html"
            clienteLoggedIn();
            break;
        }
        case 2:{
            //nutricionista
            loginNavLink.classList.add("d-none")
            dashboardNavDiv.classList.remove("d-none")
            userIcon.classList.remove("d-none")
            dashboardLink.href = "../Profissional/indexProfissional.html"
            nutricionistaLoggedIn()
            break;
        }
        case 3:{
            //profissional exercicio
            loginNavLink.classList.add("d-none")
            dashboardNavDiv.classList.remove("d-none")
            userIcon.classList.remove("d-none")
            dashboardLink.href = "../Profissional/indexProfissional.html"
            profissionalLoggedIn()
            break;
        }
        default:{
            //Sem login
            loginNavLink.classList.remove("d-none")
            dashboardNavDiv.classList.add("d-none")
            userIcon.classList.add("d-none")
            break;
        }
        
    }
});
//botoes Filtros

todosbtn.addEventListener('click', function(){
    for (var i = 0; i < tiponutri.length; i++) {
        tiponutri[i].style.display = 'flex';
    }
    for (var i = 0; i < tipoexerci.length; i++) {
        tipoexerci[i].style.display = 'flex';
    }
    for (var i = 0; i < tipooutros.length; i++) {
        tipooutros[i].style.display = 'flex';
    }
})



nutriçãobtn.addEventListener('click', function(){
    for (var i = 0; i < tiponutri.length; i++) {
        tiponutri[i].style.display = 'flex';
    }
    for (var i = 0; i < tipoexerci.length; i++) {
        tipoexerci[i].style.display = 'none';
    }
    for (var i = 0; i < tipooutros.length; i++) {
        tipooutros[i].style.display = 'none';
    }
})

exerciciobtn.addEventListener('click', function(){
    for (var i = 0; i < tiponutri.length; i++) {
        tiponutri[i].style.display = 'none';
    }
    for (var i = 0; i < tipoexerci.length; i++) {
        tipoexerci[i].style.display = 'flex';
    }
    for (var i = 0; i < tipooutros.length; i++) {
        tipooutros[i].style.display = 'none';
    }
})

outrosbtn.addEventListener('click', function(){
    for (var i = 0; i < tiponutri.length; i++) {
        tiponutri[i].style.display = 'none';
    }
    for (var i = 0; i < tipoexerci.length; i++) {
        tipoexerci[i].style.display = 'none';
    }
    for (var i = 0; i < tipooutros.length; i++) {
        tipooutros[i].style.display = 'flex';
    }
})



    //Botoes de postcomunidade/meupost

postscomunidadebtn.addEventListener('click', function(){
    postscomunidadebtn.classList.add("ativado");
    postsmeubtn.classList.remove("ativado");
    postcomundiv.style.display = 'block';
    postmeudiv.style.display = 'none';
})


postsmeubtn.addEventListener('click', function(){
    postscomunidadebtn.classList.remove("ativado");
    postsmeubtn.classList.add("ativado");
    postcomundiv.style.display = 'none';
    postmeudiv.style.display = 'block';
})

async function getAllPosts(){
    let url = "http://localhost:8080/post/getAll"

    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()

    dados.forEach(dado => {
        let tipo;
        let tipoTxt;
        let autor;
        switch(dado.categoria){
            case "nutricao":{
                tipo = "nutriçãotipo"
                tipoTxt = "Nutrição"
                break;
            }
            case "exercicio":{
                tipo = "exerciciotipo"
                tipoTxt = "Exercício"
                break;
            }
            case "outras": {
                tipo = "outrotipo"
                tipoTxt = "Outros"
                break;
            }
        }

        if(dado.autorCliente != null){
            autor = dado.autorCliente.username
        } else if(dado.autorNutri != null){
            autor = dado.autorNutri.username
        } else if(dado.autorPE != null){
            autor = dado.autorPE.username
        }
        if(dado.postAceito == true){
            document.getElementById("Pcomunidade").innerHTML += `
            <div class = "postagem ${tipo}" data-post-id=${dado.id}>
                <button class="postescolido ">
                <h1>${dado.titulo}</h1>
                <div class = "row">
                    <div class = "col-10">
                        <h4>${dado.subTitulo}</h4>
                    </div>
                    <div class="col-2 type">
                        <h4">Tipo: ${tipoTxt}</h4>
                    </div>
                </div>
                <p> ${dado.conteudo} </p>
                <div class="creditos">
                      <h5>Escrito por ${autor}</h5>
                    </div>
                  </button>
                </div>
            `
        }
    })
}

document.getElementById("postmeu").addEventListener("click", getMyPosts)

async function getMyPosts(){
    let url = "http://localhost:8080/post/getAll"
    document.getElementById("Pmeu").innerHTML = ""

    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()

    let user = await userLoggedIn();

    dados.forEach(dado => {
        let tipo;
        let tipoTxt;
        let autor;
        switch(dado.categoria){
            case "nutricao":{
                tipo = "nutriçãotipo"
                tipoTxt = "Nutrição"
                break;
            }
            case "exercicio":{
                tipo = "exerciciotipo"
                tipoTxt = "Exercício"
                break;
            }
            case "outras": {
                tipo = "outrotipo"
                tipoTxt = "Outros"
                break;
            }
        }
        console.log(dado)
        if(dado.autorCliente != null){
            autor = dado.autorCliente.username
        } else if(dado.autorNutri != null){
            autor = dado.autorNutri.username
        } else if(dado.autorPE != null){
            autor = dado.autorPE.username
        }
        let textColor;
        if(dado.postAceito == false){
            textColor = "text-danger"
        }else{
            textColor = "text-white"
        }
        console.log(textColor)
        if(autor == user.username && dado.postAceito != null ){
            document.getElementById("Pmeu").innerHTML += `
            <div class = "postagem ${tipo} ${textColor}" data-post-id=${dado.id}>
                <button class="postescolido ">
                <h1 class = "${textColor}">${dado.titulo}</h1>
                <div class = "row">
                    <div class = "col-10">
                        <h4 class = "${textColor}">${dado.subTitulo}</h4>
                    </div>
                    <div class="col-2 type">
                        <h4" class = "${textColor}">Tipo: ${tipoTxt}</h4>
                    </div>
                </div>
                <p class = "${textColor}"> ${dado.conteudo} </p>
                <div class="creditos">
                      <h5 class = "${textColor}">Escrito por ${autor}</h5>
                    </div>
                  </button>
                </div>
            `
        }
        abrirPost()
    })
}

async function abrirPost(){
    let posts = document.querySelectorAll(".postagem")
    posts.forEach(post => {
        post.addEventListener("click", () => {
            let postId = post.getAttribute("data-post-id")
            if(post.classList.contains("text-danger")){
                window.location.href = `../Criar/criar.html?tipoDeAcesso=post&id=${postId}`
            }else{
                window.location.href = `../Viwpost/viwpost.html?id=${postId}`
            }
        })
    })
}