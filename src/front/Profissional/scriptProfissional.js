const mostrarPlanosButton = document.getElementById('mostrarPlanos');
const mostrarPostagensButton = document.getElementById('mostrarPostagens');
const mostrarReceitasButton = document.getElementById('mostrarReceitas');

const btnfazer = document.getElementById('btnfazer');
const btnvalidar = document.getElementById('btnvalidarPost');


const divPlanos = document.getElementById('divPlanos');
const divPostagens = document.getElementById('divPostagens');
const divReceitas = document.getElementById('divReceitas');

const tipoUser = parseInt(localStorage.getItem("tipoUsuario"))

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    return `${dia}/${mes}/${ano}`;
}
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('username');

    window.location.href = "../pagInicial/index.html";
});

btnfazer.addEventListener("click", () => {
    let nome = document.getElementById("nomeInfo").innerHTML;
    let tipoDeAcesso;
    switch (tipoUser) {
        case 2: {
            tipoDeAcesso = "planoAlimentar"
            break;
        } case 3: {
            tipoDeAcesso = "planoExercicio"
            break;
        }
    }

    if (nome != "") {
        window.location.href = `../Criar/criar.html?tipoDeAcesso=${tipoDeAcesso}&nome=${nome}`;
    }
})

async function fazerPlanoFunc(nome) {
    let url = "http://localhost:8080/cliente/user/"
    url += nome
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
}

async function getParcerias(){
    let url = `http://localhost:8080/parcerias`
    let user = await userLoggedIn()
    switch(tipoUser){
        case 2:{
            url += `/nutri/${user.id}`
            break;
        }
        case 3:{
            url += `/pe/${user.id}`
            break;
        }
    }
    let response = await fetch(url)
    let dados = await response.json()
    dados.forEach(dado => {
        document.getElementById("suasParcerias").innerHTML += `<p> Nome: ${dado.nome} - Preço: ${dado.preco}<p>`
    })
    if(tipoUser == 2){
        document.getElementById("suasParcerias").innerHTML += "<h1> Pedidos de inclusão de produtos parceiros </h1>"
        let responseParcerias = await fetch("http://localhost:8080/clienteParceria/nullNutri")
        let dadosParcerias = await responseParcerias.json()
        dadosParcerias.forEach(dado => {
            console.log(dado)
            document.getElementById("suasParcerias").innerHTML += `<p class="d-inline"> Nome: ${dado.cliente.username} - Parceria: ${dado.parceria.nome} </p> <button data-cliente-nome="${dado.cliente.username}" class="d-inline btnmanu" id="${dado.parceria.id}">Analisar</button><br>`
        })
    }
}

// Define um evento ao inicializar
async function siteInit() {
    mostrarPlanosButton.style.borderColor = 'white';
    btnfazer.style.display = 'block';
    btnvalidar.style.display = 'none';
    divPlanos.style.display = 'block';
    mostrarPostagensButton.style.borderColor = 'transparent';
    divPostagens.style.display = 'none';
    mostrarReceitasButton.style.borderColor = 'transparent';
    divReceitas.style.display = 'none';
    popularCardUser();
    await getPlanosRejeitados();
    await getPlanosProfissionalNull();
    await getPostsAvaliadorIsNull();
    await getParcerias()
    receitasLoad()
    let radios = document.querySelectorAll(".botaoClienteSemPlano")
    radios.forEach(rad => {
        rad.addEventListener("click", () => {
            carregarDadosClienteRadio(rad.value)
        })
    })

    let radiosPosts = document.querySelectorAll(".botaoPostSemAvaliador")
    radiosPosts.forEach(rad => {
        rad.addEventListener("click", () => {
            carregarDadosPostRadio(rad.value)
        })
    })
    
    let btnParcerias = document.querySelectorAll(".btnmanu")
    btnParcerias.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = `../Criar/criar.html?tipoDeAcesso=analiseParceria&nome=${btn.getAttribute("data-cliente-nome")}&idParceria=${btn.id}`
        })
    })
    
}

document.addEventListener('DOMContentLoaded', function () {
    siteInit();
});


// Define manipuladores de evento para os botões
document.getElementById("cadastrarUmaParceria").addEventListener("click", () => {
    window.location.href = "../parcerias/parcerias.html"
})

mostrarPlanosButton.addEventListener('click', function () {
    mostrarPlanosButton.style.borderColor = 'white';
    btnfazer.style.display = 'block';
    btnvalidar.style.display = 'none';
    divPlanos.style.display = 'block';
    document.getElementById("pesoUserInfo").classList.remove("d-none")
    document.getElementById("alturaUserInfo").classList.remove("d-none")
    document.getElementById("sexoUserInfo").classList.remove("d-none")
    document.getElementById("dataPedidoInfo").classList.remove("d-none")
    document.getElementById("tituloPostInfo").classList.add("d-none")
    document.getElementById("categoriaPostInfo").classList.add("d-none")
    document.getElementById("suasParcerias").classList.add("d-none")
    mostrarPostagensButton.style.borderColor = 'transparent';
    divPostagens.style.display = 'none';
    document.getElementById("cardLateral").classList.remove("d-none")
    mostrarReceitasButton.style.borderColor = 'transparent';
    divReceitas.style.display = 'none';
    document.getElementById("btnvalidarReceita").classList.add("d-none")
    document.getElementById("cadastrarUmaParceria").classList.add("d-none")
});

document.getElementById("parceriasHide").addEventListener("click", () => {
    document.getElementById("pesoUserInfo").classList.add("d-none")
    document.getElementById("alturaUserInfo").classList.add("d-none")
    document.getElementById("sexoUserInfo").classList.add("d-none")
    document.getElementById("dataPedidoInfo").classList.add("d-none")
    document.getElementById("tituloPostInfo").classList.add("d-none")
    document.getElementById("categoriaPostInfo").classList.add("d-none")
    document.getElementById("suasParcerias").classList.remove("d-none")
    document.getElementById("cadastrarUmaParceria").classList.remove("d-none")
    document.getElementById("parceriasHide").style.borderColor = 'white'
    divReceitas.style.display = 'none';
    divPostagens.style.display = 'none';
    divPlanos.style.display = 'none';
    mostrarPlanosButton.style.borderColor = 'transparent'
    mostrarReceitasButton.style.borderColor = 'transparent'
    mostrarPostagensButton.style.borderColor = 'transparent'
    document.getElementById("cardLateral").classList.add("d-none")
    document.getElementById("btnvalidarReceita").classList.add("d-none")
})



mostrarPostagensButton.addEventListener('click', function () {
    mostrarPlanosButton.style.borderColor = 'transparent';
    btnfazer.style.display = 'none';
    btnvalidar.style.display = 'block';
    divPlanos.style.display = 'none';
    document.getElementById("pesoUserInfo").classList.add("d-none")
    document.getElementById("alturaUserInfo").classList.add("d-none")
    document.getElementById("sexoUserInfo").classList.add("d-none")
    document.getElementById("dataPedidoInfo").classList.add("d-none")
    document.getElementById("tituloPostInfo").classList.remove("d-none")
    document.getElementById("categoriaPostInfo").classList.remove("d-none")
    document.getElementById("suasParcerias").classList.add("d-none")
    document.getElementById("cardLateral").classList.remove("d-none")
    mostrarPostagensButton.style.borderColor = 'white';
    divPostagens.style.display = 'block';
    mostrarReceitasButton.style.borderColor = 'transparent';
    divReceitas.style.display = 'none';
    document.getElementById("btnvalidarReceita").classList.add("d-none")
    document.getElementById("cadastrarUmaParceria").classList.add("d-none")
});

mostrarReceitasButton.addEventListener('click', function () {
    mostrarPlanosButton.style.borderColor = 'transparent';
    btnfazer.style.display = 'none';
    btnvalidar.style.display = 'block';
    document.getElementById("cardLateral").classList.remove("d-none")
    divPlanos.style.display = 'none';
    mostrarPostagensButton.style.borderColor = 'transparent';
    divPostagens.style.display = 'none';
    document.getElementById("suasParcerias").classList.add("d-none")
    mostrarReceitasButton.style.borderColor = 'white';
    divReceitas.style.display = 'block';
    document.getElementById("cadastrarUmaParceria").classList.add("d-none")
});


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
        case 2: {
            dados = await nutricionistaLoggedIn()
            break;
        } case 3: {
            dados = await profissionalLoggedIn()
            break;
        }
    }
    return dados
}

async function popularCardUser() {
    let dados = await userLoggedIn()
    document.getElementById("nomeCardUser").innerHTML = dados.username
    document.getElementById("emailCardUser").innerHTML = dados.email
    let dataCriacaoArray = dados.dataDeCriacaoDaConta
    let dataCriacaoStr = formatarData(dataCriacaoArray);
    document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
}

function formatarDataAsDate(dataStr) {
    const partes = dataStr.split('/');
    return new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
}

function calcularDiferencaTempo(data) {
    const dataAtual = new Date();
    const diferencaAnos = dataAtual.getFullYear() - data.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const mesDesejado = data.getMonth();
    const diaAtual = dataAtual.getDate();
    const diaDesejado = data.getDate();

    let diferenca = diferencaAnos;

    if (diferenca == 0) {
        const diferencaEmDias = Math.floor((dataAtual - data) / (1000 * 60 * 60 * 24));
        return diferencaEmDias;
    }
    if (mesDesejado > mesAtual || (mesDesejado === mesAtual && diaDesejado > diaAtual)) {
        diferenca--;
    }
    return diferenca
}

async function getPlanosRejeitados() {
    let url = "http://localhost:8080/"
    switch (tipoUser) {
        case 2: {
            url += "planoAlimentar/rejeitadoNutricionista"
            break;
        } case 3: {
            url += "planoExercicio/rejeitadoProfissional"
            break;
        }
    }

    let response = await fetch(url, { method: "GET" })
    let dados = await response.json()

    let i;
    dados.forEach(dado => {
        i = dado.cliente.id
        let dataPedido = formatarData(dado.dataPedido)
        let dataNascimento = formatarData(dado.cliente.dataNascimento)
        let dataCriacaoConta = formatarData(dado.cliente.dataDeCriacaoDaConta)
        let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
        let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
        let idade = calcularDiferencaTempo(dataNascimentoAsDate)
        let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)
        let novaDiv = `<li class="list-group-item bg-transparent">
        <div class="form-check align-bottom ">
            <input class="form-check-input check botaoClienteSemPlano" type="radio" name="cliente" id="cliente${i}" value="${i}">
            <label class="form-check-label text-danger" for="cliente${i}">
            <span id="nomeDadoId${i}">${dado.cliente.username}</span> - <span id="sexoDadoID${i}">${dado.cliente.sexo}</span> - <span id="idadeDadoId${i}">${idade}</span> anos - <span id="dataPedidoDadoId${i}">${dataPedido}</span> - <span id="tempoAtivoDadoId${i}">${tempoAtivo}</span> dias
            </label>
        </div>
    </li>`
        document.getElementById("planosParaFazer").innerHTML += novaDiv;
    });
}

async function getPlanosProfissionalNull() {
    let url = "http://localhost:8080/"
    switch (tipoUser) {
        case 2: {
            url += "planoAlimentar/nullNutricionista"
            break;
        } case 3: {
            url += "planoExercicio/nullProfissional"
            break;
        }
    }
    let response = await fetch(url, { method: "GET" })
    let dados = await response.json();

    let i;
    dados.forEach(dado => {
        i = dado.cliente.id
        let dataPedido = formatarData(dado.dataPedido)
        let dataNascimento = formatarData(dado.cliente.dataNascimento)
        let dataCriacaoConta = formatarData(dado.cliente.dataDeCriacaoDaConta)
        let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
        let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
        let idade = calcularDiferencaTempo(dataNascimentoAsDate)
        let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)
        let novaDiv = `<li class="list-group-item bg-transparent">
        <div class="form-check align-bottom">
            <input class="form-check-input check botaoClienteSemPlano" type="radio" name="cliente" id="cliente${i}" value="${i}">
            <label class="form-check-label" for="cliente${i}">
            <span id="nomeDadoId${i}">${dado.cliente.username}</span> - <span id="sexoDadoID${i}">${dado.cliente.sexo}</span> - <span id="idadeDadoId${i}">${idade}</span> anos - <span id="dataPedidoDadoId${i}">${dataPedido}</span> - <span id="tempoAtivoDadoId${i}">${tempoAtivo}</span> dias
            </label>
        </div>
    </li>`
        document.getElementById("planosParaFazer").innerHTML += novaDiv;
    });
}



async function carregarDadosClienteRadio(valor) {

    let url = "http://localhost:8080/"
    switch (tipoUser) {
        case 2: {
            url += `planoAlimentar/cliente/${valor}`
            break;
        } case 3: {
            url += `planoExercicio/cliente/${valor}`
            break;
        }
    }

    let response = await fetch(url, { method: "GET" })
    let dados = await response.json();

    let dataPedido = formatarData(dados.dataPedido)
    let dataNascimento = formatarData(dados.cliente.dataNascimento)
    let dataCriacaoConta = formatarData(dados.cliente.dataDeCriacaoDaConta)
    let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
    let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
    let idade = calcularDiferencaTempo(dataNascimentoAsDate)
    let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)

    document.getElementById("nomeInfo").innerHTML = dados.cliente.username
    document.getElementById("pesoInfo").innerHTML = dados.cliente.peso
    document.getElementById("alturaInfo").innerHTML = dados.cliente.altura
    document.getElementById("sexoInfo").innerHTML = dados.cliente.sexo
    document.getElementById("idadeInfo").innerHTML = " " + idade + " anos"
    document.getElementById("dataPedidoInfo").innerHTML = dataPedido
    document.getElementById("tempoAtivoInfo").innerHTML = " " + tempoAtivo + " dias"
}

async function carregarDadosPostRadio(value) {
    let response = await fetch(`http://localhost:8080/post/${value}`)
    let dado = await response.json()

    let dataCriacaoConta;
    let dataNasc;
    let nomeAutor;
    if (dado.autorCliente != null) {
        nomeAutor = dado.autorCliente.username
        dataCriacaoConta = formatarData(dado.autorCliente.dataDeCriacaoDaConta)
        dataNasc = formatarData(dado.autorCliente.dataNascimento)

    } else if (dado.autorNutri != null) {
        nomeAutor = dado.autorNutri.username
        dataCriacaoConta = formatarData(dado.autorNutri.dataDeCriacaoDaConta)
        dataNasc = formatarData(dado.autorNutri.dataNascimento)
    } else if (dado.autorPE != null) {
        nomeAutor = dado.autorPE.username
        dataCriacaoConta = formatarData(dado.autorPE.dataDeCriacaoDaConta)
        dataNasc = formatarData(dado.autorPE.dataNascimento)
    }
    let categoria;
    switch (dado.categoria) {
        case "nutricao": {
            categoria = "Nutrição"
            break;
        }
        case "exercicio": {
            categoria = "Exercício"
            break;
        }
        case "outras": {
            categoria = "Outras"
            break;
        }
    }

    let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
    let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)

    let dataNascimentoAsDate = formatarDataAsDate(dataNasc)
    let idade = calcularDiferencaTempo(dataNascimentoAsDate)

    document.getElementById("tituloInfo").innerHTML = dado.titulo
    document.getElementById("nomeInfo").innerHTML = nomeAutor
    document.getElementById("nomeInfo").setAttribute("idPost", dado.id)
    document.getElementById("categoriaInfo").innerHTML = categoria
    document.getElementById("tempoAtivoInfo").innerHTML = " " + tempoAtivo + " dias"
    document.getElementById("idadeInfo").innerHTML = " " + idade + " anos"
}

btnvalidar.addEventListener("click", () => {
    let id = document.getElementById("nomeInfo").getAttribute("idPost")
    window.location.href = `../Criar/criar.html?tipoDeAcesso=analisePost&id=${id}`
})

async function getPostsAvaliadorIsNull() {
    let url = "http://localhost:8080/"
    switch (tipoUser) {
        case 2: {
            url += "post/nullNutricionista"
            break;
        } case 3: {
            url += "post/nullProfissional"
            break;
        }
    }
    let response = await fetch(url, { method: "GET" })
    let usuario = await userLoggedIn();
    let dados = await response.json();


    let i;
    dados.forEach(dado => {
        i = dado.id
        let nomeAutor;
        if (dado.autorCliente != null) {
            nomeAutor = dado.autorCliente.username
        } else if (dado.autorNutri != null) {
            nomeAutor = dado.autorNutri.username
        } else if (dado.autorPE != null) {
            nomeAutor = dado.autorPE.username
        }
        let categoria;
        switch (dado.categoria) {
            case "nutricao": {
                categoria = "Nutrição"
                break;
            }
            case "exercicio": {
                categoria = "Exercício"
                break;
            }
            case "outras": {
                categoria = "Outras"
                break;
            }
        }
        if (nomeAutor != usuario.username) {
            switch (tipoUser) {
                case 2: {
                    if (dado.categoria != "exercicio") {
                        let novaDiv = `<li class="list-group-item bg-transparent">
        <div class="form-check align-bottom">
        <input class="form-check-input botaoPostSemAvaliador" type="radio" name="post" id="post${i}" value="${i}">
        <label class="form-check-label" for="post${i}">
            Autor: <span id="nomeAutorId${i}">${nomeAutor}</span> - Título: <span id="tituloPost${i}">${dado.titulo}</span> - Subtitulo: <span id="subtitulo${i}">${dado.subTitulo}</span> - Categoria: <span id="categoria${i}">${categoria}</span>
        </label>
        </div>
    </li>`
                        document.getElementById("postsParaAnalisar").innerHTML += novaDiv;
                    }
                    break;
                }
                case 3: {
                    if (dado.categoria != "nutricao") {
                        let novaDiv = `<li class="list-group-item bg-transparent">
                                            <div class="form-check align-bottom">
                                            <input class="form-check-input botaoPostSemAvaliador" type="radio" name="post" id="post${i}" value="${i}">
                                            <label class="form-check-label" for="post${i}">
                                                Autor: <span id="nomeAutorId${i}">${nomeAutor}</span> - Título: <span id="tituloPost${i}">${dado.titulo}</span> - Subtitulo: <span id="subtitulo${i}">${dado.subTitulo}</span> - Categoria: <span id="categoria${i}">${categoria}</span>
                                            </label>
                                            </div>
                                        </li>`
                        document.getElementById("postsParaAnalisar").innerHTML += novaDiv;
                    }
                    break;
                }
            }

        }

    });
}

async function receitasLoad() {
    switch (tipoUser) {
        case 2: {
            getReceitasAvaliadorNull()
            break;
        }
        case 3: {
            document.getElementById("mostrarReceitasHide").classList.add("d-none")
            break;
        }
    }
}

async function getReceitasAvaliadorNull() {
    let url = "http://localhost:8080/receitas/nullAvaliador"
    let response = await fetch(url)
    let dados = await response.json()
    
    dados.forEach(dado => {
        let i = dado.id
        let div = `<li class="list-group-item bg-transparent">
                        <div class="form-check align-bottom">
                            <input class="form-check-input check botaoReceitaSemAvaliador" type="radio" name="opcao"
                                id="opcao${i}" value="${i}">
                            <label class="form-check-label" for="opcao${i}">
                                Nome da receita: ${dado.nomeReceita} - Nome do autor da receita: ${dado.nomeAutor}
                            </label>
                        </div>
                    </li>`
        document.getElementById("receitasParaAnalisar").innerHTML += div
    })

    let radioReceitas = document.querySelectorAll(".botaoReceitaSemAvaliador")
    radioReceitas.forEach(rad => {
        console.log(rad)
        rad.addEventListener("click", () => {
            carregarDadosReceitaRadio(rad.value)
        })
    })
}

async function carregarDadosReceitaRadio(valor){
    let url = `http://localhost:8080/receitas/${valor}`
    let response = await fetch(url)
    let dados = await response.json()
    let nomeAutor = dados.nomeAutor
    let nomeReceita = dados.nomeReceita
    document.getElementById("nomeInfo").innerHTML = nomeAutor
    document.getElementById("alturaUserInfo").classList.add("d-none")
    document.getElementById("sexoUserInfo").classList.add("d-none")
    document.getElementById("pesoUserInfo").classList.add("d-none")
    document.getElementById("alturaUserInfo").classList.add("d-none")
    document.getElementById("dataCard").classList.add("d-none")
    document.getElementById("tempoCard").classList.add("d-none")
    document.getElementById("idadeCard").classList.add("d-none")
    document.getElementById("categoriaPostInfo").classList.add("d-none")
    document.getElementById("tituloInfo").classList.remove("d-none")
    document.getElementById("tituloPostInfo").classList.remove("d-none")
    document.getElementById("tituloInfo").innerHTML += nomeReceita
    document.getElementById("nomeInfo").setAttribute("id-receita", dados.id)
    btnvalidar.classList.add("d-none")
    document.getElementById("btnvalidarReceita").classList.remove("d-none")
}
document.getElementById("btnvalidarReceita").addEventListener("click", ()=>{
    let id = document.getElementById("nomeInfo").getAttribute("id-receita")
    window.location.href = `../Criar/criar.html?tipoDeAcesso=analiseReceita&id=${id}`
})
