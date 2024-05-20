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

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('username');

    window.location.href = "../pagInicial/index.html";
});

async function siteInit() {
    popularCardUser();
    tipoDeAcesso()
}

async function tipoDeAcesso() {
    var url = window.location.href;
    let urlAtual = new URL(url)
    var params = new URLSearchParams(urlAtual.search);
    var tipoDeAcesso = params.get('tipoDeAcesso');

    switch (tipoDeAcesso) {
        case "planoAlimentar": {
            acessoPlanoAlimentar();
            break;
        }
        case "planoExercicio": {
            acessoPlanoExercicio()
            break;
        }
        case "post": {
            acessoCriarPost();
            break;
        }
        case "analisePost":{
            acessoAnalisePost();
            break;
        }
        case "analisePlanoAlimentar": {
            acessoAnalisePlanoAlimentar();
            break;
        }
        case "analisePlanoExercicio": {
            acessoAnalisePlanoExercicio();
            break;
        }
        case "analiseReceita": {
            acessoAnaliseReceita()
            break;
        }
        case "analiseParceria":{
            analiseParceria()
            break;
        }
    }
}

async function aceitarParceria() {
    try {
        let url = window.location.href;
        let urlAtual = new URL(url)
        let params = new URLSearchParams(urlAtual.search);
        let response = await fetch(`http://localhost:8080/clienteParceria/${parseInt(params.get("idParceria"))}`)
        let parceriaObj = await response.json()
        parceriaObj.aceito = true
        parceriaObj.nutri = await userLoggedIn()
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parceriaObj)
        }
        let putResponse = await fetch(`http://localhost:8080/clienteParceria`, options)
        
        if (putResponse.ok) {
            window.location.href = "../Profissional/indexProfissional.html"
            alert('Parceria aceita com sucesso!');
        } else {
            window.location.href = "../Profissional/indexProfissional.html"
            alert('Erro ao aceitar parceria. Tente novamente.');
        }
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
}

async function rejeitarParceria() {
    try {
        let url = window.location.href;
        let urlAtual = new URL(url)
        let params = new URLSearchParams(urlAtual.search);
        let response = await fetch(`http://localhost:8080/clienteParceria/${parseInt(params.get("idParceria"))}`)
        let parceriaObj = await response.json()
        parceriaObj.aceito = false
        parceriaObj.nutri = await userLoggedIn()
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parceriaObj)
        }
        let putResponse = await fetch(`http://localhost:8080/clienteParceria`, options)

        if (putResponse.ok) {
            window.location.href = "../Profissional/indexProfissional.html"
            alert('Parceria rejeitada com sucesso!');
        } else {
            window.location.href = "../Profissional/indexProfissional.html"
            alert('Erro ao rejeitar parceria. Tente novamente.');
        }
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
}

async function analiseParceria(){
    document.getElementById("criarPlanoAlimentarDiv").classList.remove("d-none")
    document.getElementById("dadosEspecificosAlm").classList.remove("d-none")
    document.getElementById("enviarPlanoAlimentar").classList.add("d-none")
    document.getElementById("criarAvaliarSpan").classList.add("d-none")
    document.getElementById("planoAlimentarH1").classList.add("d-none")
    document.getElementById("aceitarParceria").addEventListener("click", aceitarParceria)
    document.getElementById("rejeitarParceria").addEventListener("click", rejeitarParceria)
    document.getElementById("aceitarParceria").classList.remove("d-none")
    document.getElementById("rejeitarParceria").classList.remove("d-none")
    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoAlimentar(cliente);

    let dataPedido = formatarData(plano.dataPedido)
    let dataNascimento = formatarData(plano.cliente.dataNascimento)
    let dataCriacaoConta = formatarData(plano.cliente.dataDeCriacaoDaConta)
    let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
    let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
    let idade = calcularDiferencaTempo(dataNascimentoAsDate)
    let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)

    document.getElementById("nomeInfo").innerHTML = plano.cliente.username
    document.getElementById("pesoInfo").innerHTML = plano.cliente.peso
    document.getElementById("alturaInfo").innerHTML = plano.cliente.altura
    document.getElementById("sexoInfo").innerHTML = plano.cliente.sexo
    document.getElementById("idadeInfo").innerHTML = " " + idade + " anos"
    document.getElementById("dataPedidoInfo").innerHTML = dataPedido
    document.getElementById("tempoAtivoInfo").innerHTML = " " + tempoAtivo + " dias"

    document.getElementById("alergiasInfo").innerHTML = plano.alergiasAlimentares
    document.getElementById("aguaInfo").innerHTML = plano.consumoAgua
    document.getElementById("alcoolTabacoInfo").innerHTML = plano.cliente.alcoolTabaco
    document.getElementById("nivelAtividadeInfo").innerHTML = plano.cliente.atividadeAtual
    if (plano.cliente.condicoesMedicas != null) {
        document.getElementById("condicoesMedicasInfo").innerHTML = plano.cliente.condicoesMedicas
    } else {
        document.getElementById("condicoesMedicasInfo").innerHTML = "Não foi informado"
    }

    if (plano.cliente.medicacoesEmUso != null) {
        document.getElementById("medicacoesEmUsoInfo").innerHTML = plano.cliente.medicacoesEmUso
    } else {
        document.getElementById("medicacoesEmUsoInfo").innerHTML = "Não foi informado"
    }

    document.getElementById("objetivoInfo").innerHTML = plano.cliente.objetivo
    document.getElementById("deficienciasVitaminasInfo").innerHTML = plano.deficienciaVitaminas
    document.getElementById("experienciaAnteriorDietaInfo").innerHTML = plano.experienciaAnteriorDieta
    document.getElementById("preferenciasAlimentaresInfo").innerHTML = plano.preferenciasAlimentares
    let response = await fetch(`http://localhost:8080/clienteParceria/${parseInt(params.get("idParceria"))}`)
    let parceriaObj = await response.json()
    let parceria = parceriaObj.parceria
    document.getElementById("planoAlimentarTxt").value =  parceria.nome + "\n" + parceria.descricao 
}

async function acessoAnalisePost(){
    document.getElementById("criarPostDiv").classList.remove("d-none")
    document.getElementById("novoAvaliarSpan").innerHTML = "Avaliar"

    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let id = params.get("id")

    let response = await fetch(`http://localhost:8080/post/${id}`)
    let dado = await response.json()
    console.log(dado)

    let tituloBox = document.getElementById("tituloTxt")
    tituloBox.value = dado.titulo
    tituloBox.readOnly = true

    let subtituloBox = document.getElementById("subtituloTxt")
    subtituloBox.value = dado.subTitulo
    subtituloBox.readOnly = true

    const categoriaInput = document.querySelectorAll('input[name="categoria"]')
    categoriaInput.forEach(rad => {
        if(rad.value == dado.categoria){
            rad.checked = true
        }
    })

    let conteudoBox = document.getElementById("conteudoPostTxt")
    conteudoBox.value = dado.conteudo
    conteudoBox.readOnly = true

    let comentarios = document.getElementById("comentariosPostTxt")
    comentarios.value = ""
    comentarios.classList.remove("d-none")

    document.getElementById("enviarPost").classList.add("d-none")
    document.getElementById("rejeitarPost").classList.remove("d-none")
    document.getElementById("aceitarPost").classList.remove("d-none")
    document.getElementById("rejeitarPost").addEventListener("click", rejeitarPost)
    document.getElementById("aceitarPost").addEventListener("click", aceitarPost)
}

async function aceitarPost(){
    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let id = params.get("id")
    let avaliador = await userLoggedIn()

    let response = await fetch(`http://localhost:8080/post/${id}`)
    let post = await response.json()

    post.postAceito = true
    switch(tipoUser){
        case 2:{
            post.avaliadorNutri = avaliador
            break;
        }
        case 3:{
            post.avaliadorPE = avaliador
            break;
        }
    }

    let config = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }
    
    let resposta = await fetch(`http://localhost:8080/post/avaliarPost`, config)
    if (resposta.ok) {
        alert("Post avaliado!")
        window.location.href = "../Profissional/indexProfissional.html";
    } else {
        alert("Algum erro ocorreu. Tente novamente")
    }
    return true;
}

async function rejeitarPost(){
    if (document.getElementById("comentariosPostTxt").value != "") {
        let url = window.location.href;
        let urlAtual = new URL(url)
        let params = new URLSearchParams(urlAtual.search);
        let id = params.get("id")
        let avaliador = await userLoggedIn()

        let response = await fetch(`http://localhost:8080/post/${id}`)
        let post = await response.json()

        post.postAceito = false
        switch(tipoUser){
            case 2:{
                post.avaliadorNutri = avaliador
                break;
            }
            case 3:{
                post.avaliadorPE = avaliador
                break;
            }
        }
        post.comentarios = document.getElementById("comentariosPostTxt").value

        let config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }
        
        let resposta = await fetch(`http://localhost:8080/post/avaliarPost`, config)
        if (resposta.ok) {
            alert("Post avaliado!")
            window.location.href = "../Profissional/indexProfissional.html";
        } else {
            alert("Algum erro ocorreu. Tente novamente")
        }
        return true;
    } else {
        alert("Adicione um comentário para orientar seu profissional quanto ao motivo de recusa!")
    }
}

async function acessoCriarPost() {
    document.getElementById("criarPostDiv").classList.remove("d-none")
    document.getElementById("enviarPost").addEventListener("click", enviarPost)
    document.getElementById("reenviarPost").addEventListener("click", reenviarPost)
    var url = window.location.href;
    let urlAtual = new URL(url)
    var params = new URLSearchParams(urlAtual.search);
    var idPost = params.get('id')
    if(idPost != null){
        let response = await fetch(`http://localhost:8080/post/${idPost}`)
        let post = await response.json()
        document.getElementById("tituloTxt").value = post.titulo
        document.getElementById("subtituloTxt").value = post.subTitulo
        document.getElementById("conteudoPostTxt").value = post.conteudo 
        const categoriaInput = document.querySelectorAll('input[name="categoria"]')
        categoriaInput.forEach(rad => {
            if(rad.value == post.categoria){
                rad.checked = true
            }
        })
        document.getElementById("enviarPost").classList.add("d-none")
        document.getElementById("reenviarPost").classList.remove("d-none")
        document.getElementById("novoAvaliarSpan").innerHTML = "Revisar"
        document.getElementById("comentariosPostTxt").classList.remove("d-none")
        document.getElementById("comentariosPostTxt").readOnly = true
        document.getElementById("comentariosPostTxt").value = post.comentarios
    }
}

async function reenviarPost(){
    var url = window.location.href;
    let urlAtual = new URL(url)
    var params = new URLSearchParams(urlAtual.search);
    var idPost = params.get('id')
    if(idPost != null){
        let response = await fetch(`http://localhost:8080/post/${idPost}`)
        let post = await response.json()
        const tituloInput = document.getElementById("tituloTxt").value;
        const subtituloInput = document.getElementById("subtituloTxt").value;
        const categoriaInput = document.querySelector('input[name="categoria"]:checked').value;
        const conteudoInput = document.getElementById("conteudoPostTxt").value;
        post.conteudo = conteudoInput
        post.categoria = categoriaInput
        post.subTitulo = subtituloInput
        post.titulo = tituloInput
        post.postAceito = null
        post.avaliadorNutri=null
        post.avaliadorPE=null
        let config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }
    
        let resposta = await fetch(`http://localhost:8080/post/atualizarPost`, config)
        if (resposta.ok) {
            alert("Post atualizado!")
            window.location.href = "../forum/forumInicial.html";
        } else {
            alert("Algum erro ocorreu. Tente novamente")
        }
        return true;
    }
}

async function enviarPost() {
    let url = "http://localhost:8080/post"

    const tituloInput = document.getElementById("tituloTxt").value;
    const subtituloInput = document.getElementById("subtituloTxt").value;
    const categoriaInput = document.querySelector('input[name="categoria"]:checked').value;
    const conteudoInput = document.getElementById("conteudoPostTxt").value;
    if (tituloInput === "") {
        alert("O campo título não pode estar vazio");
    } else if (subtituloInput === "") {
        alert("O campo subtitulo não pode estar vazio");
    } else if (categoriaInput === "") {
        alert("Selecione uma categoria");
    } else if (conteudoInput === "") {
        alert("O campo conteúdo não pode estar vazio");
    } else {
        let autor = await userLoggedIn();


        let dados = {
            autorCliente: null,
            autorNutri: null,
            autorPE: null,
            avaliadorNutri: null,
            avaliadorPE: null,
            titulo: tituloInput,
            subTitulo: subtituloInput,
            conteudo: conteudoInput,
            categoria: categoriaInput
        }

        switch (tipoUser) {
            case 1: {
                dados.autorCliente = autor
                break;
            }
            case 2: {
                dados.autorNutri = autor
                break;
            }
            case 3: {
                dados.autorPE = autor
                break;
            }
        }

        let dadosJsonStr = JSON.stringify(dados)
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: dadosJsonStr
        }

        let resposta = await fetch(url, config)
        if (resposta.ok) {
            alert("Post enviado! Espere a resposta de um avaliador para a postagem dele")
            window.location.href = "../forum/forumInicial.html"
        } else {
            alert("Algum erro ocorreu. Tente novamente")
        }
        return true;
    }
}

async function acessoAnalisePlanoExercicio() {
    document.getElementById("criarPlanoExercicioDiv").classList.remove("d-none")
    document.getElementById("comentariosTxtPE").classList.remove("d-none")
    document.getElementById("rejeitarPlanoExercicio").classList.remove("d-none")
    document.getElementById("aceitarPlanoExercicio").classList.remove("d-none")
    document.getElementById("criarAvaliarSpanPE").innerHTML = "Avaliar"
    document.getElementById("aceitarPlanoExercicio").addEventListener("click", aceitarPlanoExercicio)
    document.getElementById("rejeitarPlanoExercicio").addEventListener("click", rejeitarPlanoExercicio)

    document.getElementById("dadosEspecificosPE").classList.remove("d-none")
    document.getElementById("enviarPlanoExercicio").classList.add("d-none")

    if(parseInt(tipoUser) == 1){
        document.getElementById("hideAcessAnaliseUserPE").classList.add("d-none")
        document.getElementById("divisoriaDadosEspecificosPeHide").classList.add("d-none")
    }
    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoExercicio(cliente);

    let dataPedido = formatarData(plano.dataPedido)
    let dataNascimento = formatarData(plano.cliente.dataNascimento)
    let dataCriacaoConta = formatarData(plano.cliente.dataDeCriacaoDaConta)
    let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
    let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
    let idade = calcularDiferencaTempo(dataNascimentoAsDate)
    let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)

    document.getElementById("nomeInfoPE").innerHTML = plano.cliente.username
    document.getElementById("pesoInfoPE").innerHTML = plano.cliente.peso
    document.getElementById("alturaInfoPE").innerHTML = plano.cliente.altura
    document.getElementById("sexoInfoPE").innerHTML = plano.cliente.sexo
    document.getElementById("idadeInfoPE").innerHTML = " " + idade + " anos"
    document.getElementById("dataPedidoInfoPE").innerHTML = dataPedido
    document.getElementById("tempoAtivoInfoPE").innerHTML = " " + tempoAtivo + " dias"

    var textArea = document.getElementById("planoExercicioTxt");
    textArea.value = plano.plano;
    textArea.readOnly = true;
}

async function aceitarPlanoExercicio() {
    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoExercicio(cliente);

    plano.planoAceito = true
    let config = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plano)
    }

    let resposta = await fetch(`http://localhost:8080/planoExercicio/avaliarPlano`, config)
    if (resposta.ok) {
        alert("Plano avaliado!")
        window.location.href = "../dashboardCliente/dashboardCliente.html";
    } else {
        alert("Algum erro ocorreu. Tente novamente")
    }
    return true;
}

async function rejeitarPlanoExercicio() {
    if (document.getElementById("comentariosTxtPE").value != "") {
        let url = window.location.href;
        let urlAtual = new URL(url)
        let params = new URLSearchParams(urlAtual.search);
        let nome = params.get('nome');
        let cliente = await buscarCliente(nome);
        let plano = await buscarPlanoExercicio(cliente);

        plano.planoAceito = false
        plano.comentarios = document.getElementById("comentariosTxtPE").value

        let config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plano)
        }

        let resposta = await fetch(`http://localhost:8080/planoExercicio/avaliarPlano`, config)
        if (resposta.ok) {
            alert("Plano avaliado!")
            window.location.href = "../dashboardCliente/dashboardCliente.html";
        } else {
            alert("Algum erro ocorreu. Tente novamente")
        }
        return true;
    } else {
        alert("Adicione um comentário para orientar seu profissional quanto ao motivo de recusa!")
    }
}

async function acessoAnalisePlanoAlimentar() {
    document.getElementById("criarPlanoAlimentarDiv").classList.remove("d-none")
    document.getElementById("comentariosTxtAlm").classList.remove("d-none")
    document.getElementById("dadosEspecificosAlm").classList.add("d-none")
    document.getElementById("enviarPlanoAlimentar").classList.add("d-none")
    document.getElementById("criarAvaliarSpan").innerHTML = "Avaliar"
    document.getElementById("aceitarPlanoAlimentar").addEventListener("click", aceitarPlanoAlimentar)
    document.getElementById("rejeitarPlanoAlimentar").addEventListener("click", rejeitarPlanoAlimentar)
    document.getElementById("aceitarPlanoAlimentar").classList.remove("d-none")
    document.getElementById("rejeitarPlanoAlimentar").classList.remove("d-none")

    if(parseInt(tipoUser) == 1 ){
        document.getElementById("hideAcessAnaliseUser").classList.add("d-none")
        document.getElementById("divisoriaDadosEspecificosPeHide").classList.add("d-none")
    }
    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoAlimentar(cliente);

    let dataPedido = formatarData(plano.dataPedido)
    let dataNascimento = formatarData(plano.cliente.dataNascimento)
    let dataCriacaoConta = formatarData(plano.cliente.dataDeCriacaoDaConta)
    let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
    let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
    let idade = calcularDiferencaTempo(dataNascimentoAsDate)
    let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)

    document.getElementById("nomeInfo").innerHTML = plano.cliente.username
    document.getElementById("pesoInfo").innerHTML = plano.cliente.peso
    document.getElementById("alturaInfo").innerHTML = plano.cliente.altura
    document.getElementById("sexoInfo").innerHTML = plano.cliente.sexo
    document.getElementById("idadeInfo").innerHTML = " " + idade + " anos"
    document.getElementById("dataPedidoInfo").innerHTML = dataPedido
    document.getElementById("tempoAtivoInfo").innerHTML = " " + tempoAtivo + " dias"
    var textArea = document.getElementById("planoAlimentarTxt");
    textArea.value = plano.plano;
    textArea.readOnly = true;
}

async function aceitarPlanoAlimentar() {
    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoAlimentar(cliente);

    plano.planoAceito = true
    let config = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plano)
    }

    let resposta = await fetch(`http://localhost:8080/planoAlimentar/avaliarPlano`, config)
    if (resposta.ok) {
        alert("Plano avaliado!")
        window.location.href = "../dashboardCliente/dashboardCliente.html";
    } else {
        alert("Algum erro ocorreu. Tente novamente")
    }
    return true;
}

async function rejeitarPlanoAlimentar() {
    if (document.getElementById("comentariosTxtAlm").value != "") {
        let url = window.location.href;
        let urlAtual = new URL(url)
        let params = new URLSearchParams(urlAtual.search);
        let nome = params.get('nome');
        let cliente = await buscarCliente(nome);
        let plano = await buscarPlanoAlimentar(cliente);

        plano.planoAceito = false
        plano.comentarios = document.getElementById("comentariosTxtAlm").value

        let config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plano)
        }

        let resposta = await fetch(`http://localhost:8080/planoAlimentar/avaliarPlano`, config)
        if (resposta.ok) {
            alert("Plano avaliado!")
            window.location.href = "../dashboardCliente/dashboardCliente.html";
        } else {
            alert("Algum erro ocorreu. Tente novamente")
        }
        return true;
    } else {
        alert("Adicione um comentário para orientar seu nutricionista quanto ao motivo de recusa!")
    }
}

async function buscarCliente(nome) {
    let cliente = await fetch(`http://localhost:8080/cliente/user/${nome}`)
    return cliente.json();
}

async function buscarPlanoAlimentar(cliente) {
    let plano = await fetch(`http://localhost:8080/planoAlimentar/cliente/${cliente.id}`)
    return plano.json();
}

async function buscarPlanoExercicio(cliente) {
    let plano = await fetch(`http://localhost:8080/planoExercicio/cliente/${cliente.id}`)
    return plano.json();
}

async function acessoPlanoExercicio() {
    document.getElementById("criarPlanoExercicioDiv").classList.remove("d-none")
    document.getElementById("enviarPlanoExercicio").addEventListener("click", enviarPlanoExercicio)

    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoExercicio(cliente);

    let dataPedido = formatarData(plano.dataPedido)
    let dataNascimento = formatarData(plano.cliente.dataNascimento)
    let dataCriacaoConta = formatarData(plano.cliente.dataDeCriacaoDaConta)
    let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
    let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
    let idade = calcularDiferencaTempo(dataNascimentoAsDate)
    let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)

    document.getElementById("nomeInfoPE").innerHTML = plano.cliente.username
    document.getElementById("pesoInfoPE").innerHTML = plano.cliente.peso
    document.getElementById("alturaInfoPE").innerHTML = plano.cliente.altura
    document.getElementById("sexoInfoPE").innerHTML = plano.cliente.sexo
    document.getElementById("idadeInfoPE").innerHTML = " " + idade + " anos"
    document.getElementById("dataPedidoInfoPE").innerHTML = dataPedido
    document.getElementById("tempoAtivoInfoPE").innerHTML = " " + tempoAtivo + " dias"

    document.getElementById("alcoolTabacoInfoPE").innerHTML = plano.cliente.alcoolTabaco
    document.getElementById("nivelAtividadeInfoPE").innerHTML = plano.cliente.atividadeAtual
    document.getElementById("objetivoInfoPE").innerHTML = plano.cliente.objetivo
    document.getElementById("exercicioDesejadoInfo").innerHTML = plano.quantidadeDeExercicioDesejada
    document.getElementById("horasDisponiveisInfo").innerHTML = plano.tempoDiarioParaAtividades
    document.getElementById("deficienciasFisicasInfo").innerHTML = plano.deficienciasFisicas
    document.getElementById("experienciaAnteriorExercicioInfo").innerHTML = plano.experienciaAnteriorExercicio
    document.getElementById("estabelecimentosInfo").innerHTML = plano.estabelecimentosDisponiveis

    if (plano.cliente.condicoesMedicas != null) {
        document.getElementById("condicoesMedicasInfoPE").innerHTML = plano.cliente.condicoesMedicas
    } else {
        document.getElementById("condicoesMedicasInfoPE").innerHTML = "Não foi informado"
    }
    if (plano.cliente.medicacoesEmUso != null) {
        document.getElementById("medicacoesEmUsoInfoPE").innerHTML = plano.cliente.medicacoesEmUso
    } else {
        document.getElementById("medicacoesEmUsoInfoPE").innerHTML = "Não foi informado"
    }

    if (plano.plano != null) {
        document.getElementById("planoExercicioTxt").value = plano.plano
        let coments = document.getElementById("comentariosTxtPE")
        coments.classList.remove("d-none")
        coments.value = plano.comentarios
        coments.readOnly = true
    }
}

async function enviarPlanoExercicio() {
    var url = window.location.href;
    let urlAtual = new URL(url)
    var params = new URLSearchParams(urlAtual.search);
    var nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoExercicio(cliente);
    let profissional = await profissionalLoggedIn();

    plano.plano = document.getElementById("planoExercicioTxt").value;
    plano.profissionalExercicio = profissional;
    plano.planoAceito = null

    let config = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plano)
    }
    let resposta = await fetch(`http://localhost:8080/planoExercicio/enviarPlano`, config)

    if (resposta.ok) {
        alert("Plano enviado! Espere o feedback do usuário")
        window.location.href = "../Profissional/indexProfissional.html";
    } else {
        alert("Algum erro ocorreu. Tente novamente")
    }
    return true;
}

async function acessoPlanoAlimentar() {
    document.getElementById("criarPlanoAlimentarDiv").classList.remove("d-none")
    document.getElementById("enviarPlanoAlimentar").addEventListener("click", enviarPlanoAlimentar)

    let url = window.location.href;
    let urlAtual = new URL(url)
    let params = new URLSearchParams(urlAtual.search);
    let nome = params.get('nome');
    let cliente = await buscarCliente(nome);
    let plano = await buscarPlanoAlimentar(cliente);

    let dataPedido = formatarData(plano.dataPedido)
    let dataNascimento = formatarData(plano.cliente.dataNascimento)
    let dataCriacaoConta = formatarData(plano.cliente.dataDeCriacaoDaConta)
    let dataNascimentoAsDate = formatarDataAsDate(dataNascimento)
    let dataCriacaoContaAsDate = formatarDataAsDate(dataCriacaoConta)
    let idade = calcularDiferencaTempo(dataNascimentoAsDate)
    let tempoAtivo = calcularDiferencaTempo(dataCriacaoContaAsDate)

    document.getElementById("nomeInfo").innerHTML = plano.cliente.username
    document.getElementById("pesoInfo").innerHTML = plano.cliente.peso
    document.getElementById("alturaInfo").innerHTML = plano.cliente.altura
    document.getElementById("sexoInfo").innerHTML = plano.cliente.sexo
    document.getElementById("idadeInfo").innerHTML = " " + idade + " anos"
    document.getElementById("dataPedidoInfo").innerHTML = dataPedido
    document.getElementById("tempoAtivoInfo").innerHTML = " " + tempoAtivo + " dias"

    document.getElementById("alergiasInfo").innerHTML = plano.alergiasAlimentares
    document.getElementById("aguaInfo").innerHTML = plano.consumoAgua
    document.getElementById("alcoolTabacoInfo").innerHTML = plano.cliente.alcoolTabaco
    document.getElementById("nivelAtividadeInfo").innerHTML = plano.cliente.atividadeAtual
    if (plano.cliente.condicoesMedicas != null) {
        document.getElementById("condicoesMedicasInfo").innerHTML = plano.cliente.condicoesMedicas
    } else {
        document.getElementById("condicoesMedicasInfo").innerHTML = "Não foi informado"
    }

    if (plano.cliente.medicacoesEmUso != null) {
        document.getElementById("medicacoesEmUsoInfo").innerHTML = plano.cliente.medicacoesEmUso
    } else {
        document.getElementById("medicacoesEmUsoInfo").innerHTML = "Não foi informado"
    }

    document.getElementById("objetivoInfo").innerHTML = plano.cliente.objetivo
    document.getElementById("deficienciasVitaminasInfo").innerHTML = plano.deficienciaVitaminas
    document.getElementById("experienciaAnteriorDietaInfo").innerHTML = plano.experienciaAnteriorDieta
    document.getElementById("preferenciasAlimentaresInfo").innerHTML = plano.preferenciasAlimentares

    if (plano.plano != null) {
        document.getElementById("planoAlimentarTxt").value = plano.plano
        let coments = document.getElementById("comentariosTxtAlm")
        coments.classList.remove("d-none")
        coments.value = plano.comentarios
        coments.readOnly = true
    }

    let pesos = await fetch(`http://localhost:8080/progressao/${cliente.id}`)
    let pesosDados = await pesos.json()
    console.log(plano)
    if(pesosDados.size != 0){
        pesosDados.forEach(dado => {
            document.getElementById("historicoDePesoInfo").innerHTML += `${dado.peso} Kg em ${formatarData(dado.data)}<br>`
        })
        console.log(pesosDados) //TODO MOSTRAR PESOS AQ E NO EXERCICIOS
    }
}

async function enviarPlanoAlimentar() {
    if (document.getElementById("planoAlimentarTxt").value != "") {
        var url = window.location.href;
        let urlAtual = new URL(url)
        var params = new URLSearchParams(urlAtual.search);
        var nome = params.get('nome');
        let cliente = await buscarCliente(nome);
        let plano = await buscarPlanoAlimentar(cliente);
        let nutricionista = await nutricionistaLoggedIn();

        plano.plano = document.getElementById("planoAlimentarTxt").value;
        plano.nutricionista = nutricionista;
        plano.planoAceito = null

        let config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plano)
        }

        let resposta = await fetch(`http://localhost:8080/planoAlimentar/enviarPlano`, config)
        if (resposta.ok) {
            alert("Plano enviado! Espere o feedback do usuário")
            window.location.href = "../Profissional/indexProfissional.html";
        } else {
            alert("Algum erro ocorreu. Tente novamente")
        }
        return true;
    } else {
        alert("Escreva o plano antes de envia-lo!")
    }
}

async function acessoAnaliseReceita(){
    var url = window.location.href;
    let urlAtual = new URL(url)
    var params = new URLSearchParams(urlAtual.search);
    let id = params.get("id")
    let response = await fetch("http://localhost:8080/receitas/full/" + id)
    let dados = await response.json()
    console.log(dados)
    document.getElementById("analisarReceitaDiv").classList.remove("d-none")
    document.getElementById("nomeReceita").value = dados.nomeDaReceita
    document.getElementById("KcalTxt").value = dados.kcal
    document.getElementById("proteinasTxt").value = dados.proteinas
    document.getElementById("ingredientesTxt").value = dados.ingredientes
    document.getElementById("modoPreparoTxt").value = dados.modoDePreparo
}

async function enviarReceita(){
    var url = window.location.href;
    let urlAtual = new URL(url)
    var params = new URLSearchParams(urlAtual.search);
    let id = params.get("id")
    let nutri = await userLoggedIn()
    console.log(nutri)
    let requestBody = {
        id: parseInt(id),
        kcal: document.getElementById("KcalTxt").value ,
        proteinas: document.getElementById("proteinasTxt").value ,
        ingredientes: document.getElementById("ingredientesTxt").value,
        modoDePreparo: document.getElementById("modoPreparoTxt").value,
        idNutri: nutri.id,
        nomeDaReceita: document.getElementById("nomeReceita").value
    }
    fetch(`http://localhost:8080/receitas/aceitarReceita`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    alert("Receita adicionada as receitas do usuário!")
    window.location.href = "../Profissional/indexProfissional.html";
}
document.getElementById("aceitarReceita").addEventListener("click", () => {
    enviarReceita()
})


document.addEventListener('DOMContentLoaded', function () {
    siteInit();
});