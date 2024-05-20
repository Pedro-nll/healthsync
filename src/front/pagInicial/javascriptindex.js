var counter = 1;
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 5) {
        counter = 1;
    }
}, 5000);

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
}


document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('username');

    window.location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
    // Verificar o tipo de usuário armazenado no localStorage
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    let loginNavLink = document.getElementById("loginNavLink")
    let dashboardNavDiv = document.getElementById("dashboardNavDiv")
    let dashboardLink = document.getElementById("dashboardLink")
    let monteSuaFichaLink = document.getElementById("monteSuaFichaId")
    let userIcon = document.getElementById("userIcon")
    // Executar ações com base no tipo de usuário
    switch (parseInt(tipoUsuario)) {
        case 1:{
            //cliente
            loginNavLink.classList.add("d-none")
            dashboardNavDiv.classList.remove("d-none")
            userIcon.classList.remove("d-none")
            dashboardLink.href = "../dashboardCliente/dashboardCliente.html"
            monteSuaFichaLink.href = "../dashboardCliente/dashboardCliente.html"
            clienteLoggedIn();
            break;
        }
        case 2:{
            //nutricionista
            loginNavLink.classList.add("d-none")
            dashboardNavDiv.classList.remove("d-none")
            userIcon.classList.remove("d-none")
            dashboardLink.href = "../Profissional/indexProfissional.html"
            monteSuaFichaLink.href = "../Profissional/indexProfissional"
            nutricionistaLoggedIn()
            break;
        }
        case 3:{
            //profissional exercicio
            loginNavLink.classList.add("d-none")
            dashboardNavDiv.classList.remove("d-none")
            userIcon.classList.remove("d-none")
            dashboardLink.href = "../Profissional/indexProfissional.html"
            monteSuaFichaLink.href = "../Profissional/indexProfissional"
            profissionalLoggedIn()
            break;
        }
        default:{
            //Sem login
            loginNavLink.classList.remove("d-none")
            dashboardNavDiv.classList.add("d-none")
            userIcon.classList.add("d-none")
            monteSuaFichaLink.href = "../pagLogin/Login.html"
            break;
        }
        
    }
});

document.getElementById("parceriaBtn").addEventListener("click", () => {
    window.location.href = "../Indicadores/indicadores.html"
})