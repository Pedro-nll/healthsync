const tipoUser = parseInt(localStorage.getItem("tipoUsuario"))

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    return `${dia}/${mes}/${ano}`;
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

async function clienteLoggedIn() {
    let url = "http://localhost:8080/cliente/user/"
    const nomeUser = localStorage.getItem("username")
    url += nomeUser
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    return dados
}

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    return `${dia}/${mes}/${ano}`;
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
    return dados;
}

async function popularCardUser() {
    let dados = await userLoggedIn()
    document.getElementById("nomeCardUser").innerHTML = dados.username
    document.getElementById("emailCardUser").innerHTML = dados.email
    let dataCriacaoArray = dados.dataDeCriacaoDaConta
    let dataCriacaoStr = formatarData(dataCriacaoArray);
    document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
}

function show(parcerias) {

    let tab = `<thead>
                <th scope ="col">#</th>
                <th scope ="col">Nome</th>
                <th scope ="col">Descrição</th>
                <th scope ="col">Preço</th>
                <th scope ="col">Adicionar</th>
                </thead>`;


    for (let parceria of parcerias) {
        tab += `
                    <tr> <td scope="row">${parceria.id} </td>
                    <td>${parceria.nome} </td> 
                    <td>${parceria.descricao} </td> 
                    <td>${parceria.preco} </td>
                    <td><button class="btnmanu" id="${parceria.id}">Pedir para adicionar ao seu plano alimentar!</button></td>
                    </tr>`
    }


    document.getElementById("parcerias").innerHTML = tab;
}

async function getAPI() {
    const url = ("http://localhost:8080/parcerias/todasParcerias");
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();
    show(data);
}

async function pedirParaIncluir(id) {
    if (tipoUser != 1) {
        alert("Apenas clientes têm acesso a planos alimentares");
        return;
    }

    let url = "http://localhost:8080/clienteParceria";
    let requestBody = {
        parceriaId: id,
        cliente: await userLoggedIn(),
    };

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            alert("Pedido enviado com sucesso!");
        } else {
           alert(`Erro no pedido: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        // Lidar com falhas
        alert(`Erro ao enviar pedido: ${error.message}`);
    }
}


async function siteInit() {
    await getAPI();
    let botoes = document.querySelectorAll(".btnmanu")
    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            pedirParaIncluir(btn.id)
        })
    })
    popularCardUser();
}

document.addEventListener("DOMContentLoaded", siteInit)