//#region validação de input
function inputNumerios() {
    const numericInputs = document.querySelectorAll("[inputmode='numeric']");
    numericInputs.forEach((input) => {
        validateInput(input);
    });
}

function validateInput(el) {
    el.addEventListener("beforeinput", function (e) {
        let beforeValue = el.value;
        e.target.addEventListener(
            "input",
            function () {
                if (el.validity.patternMismatch || containsMultipleDots(el.value)) {
                    el.value = beforeValue;
                }
            },
            { once: true }
        );
    });
}

function containsMultipleDots(value) {
    const dotCount = value.split(".").length - 1;
    return dotCount > 1;
}

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    return `${dia}/${mes}/${ano}`;
}
//#endregion

//#region EventListeners

document.getElementById("botaoExHide").addEventListener("click", enviarDadosPlanoExercicio)

document.getElementById("botaoAlmHide").addEventListener("click", enviarDadosPlanoAlimentar)

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('username');

    window.location.href = "../pagInicial/index.html";
});
//#endregion

//#region inicialização da pagina
async function popularCardUserHeader() {
    let dados = await userLoggedIn()
    document.getElementById("nomeCardUser").innerHTML = dados.username
    document.getElementById("emailCardUser").innerHTML = dados.email
    let dataCriacaoArray = dados.dataDeCriacaoDaConta
    let dataCriacaoStr = formatarData(dataCriacaoArray);
    document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
}

async function userLoggedIn() {
    const username = localStorage.getItem('username');
    let url = "http://localhost:8080/cliente/user/"
    url += username
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json()
    return dados;
}


async function siteInit(){
    mulherbranca.style.display = 'flex';
    imagemHbranco.style.width = '216px';
    homembranco.style.display = 'none';
    imagemMbranco.style.width = '216px'
    regua.style.width = '0px';
    let dados = await userLoggedIn();
    if (dados.altura != 0 && dados.atividadeAtual != null && dados.sono != 0 && dados.objetivo != null && dados.peso != 0) {
        primeiraparte.style.display = 'none';
        segundaparte.style.display = 'flex';
    } else {
        primeiraparte.style.display = 'flex';
        segundaparte.style.display = 'none';
        document.getElementById("pesoInput").value = dados.peso
        document.getElementById("medicacoesInput").value = dados.medicacoesEmUso
        document.getElementById("condicoesMedicasInput").value = dados.condicoesMedicas
        document.getElementById("alturaInput").value = dados.altura
        document.getElementById("horasSonoInput").value = dados.horasDeSono
        document.getElementById("alcoolTabacoInput").value = dados.alcoolTabaco
    }
}
document.addEventListener('DOMContentLoaded', function () {
    siteInit();
    popularCardUserHeader();
    verificarSeUsuarioTemPlanoAlimentarEnviado();
    verificarSeUsuarioTemPlanoExercicioEnviado();
})
//#endregion

//#region Envio de dados pela API
async function enviarDadosGerais() {
    let url = "http://localhost:8080/cliente/dadosGerais/" + localStorage.getItem("username")
    let peso = document.getElementById("pesoInput").value
    let sexo = document.getElementById("sexoInput").value
    let medicacoesEmUso = document.getElementById("medicacoesInput").value
    let condicoesMedicas = document.getElementById("condicoesMedicasInput").value
    let altura = document.getElementById("alturaInput").value
    let horasSonoInput = document.getElementById("horasSonoInput").value
    let alcoolTabaco = document.getElementById("alcoolTabacoInput").value
    let opcoesDeObjetivo = document.querySelectorAll(".objetivoOpcao")
    let objetivoCliente;
    opcoesDeObjetivo.forEach(opt => {
        if (opt.checked) {
            switch (parseInt(opt.value)) {
                case 1: {
                    objetivoCliente = "Perder peso"
                    break
                } case 2: {
                    objetivoCliente = "Ganhar massa magra"
                    break;
                } case 3: {
                    objetivoCliente = " Ter uma vida mais saudável"
                }
            }
        }
    })
    let opcoesAtividade = document.querySelectorAll(".opcaoAtividade")
    let nivelAtividadeInput;
    opcoesAtividade.forEach(opt => {
        if (opt.checked) {
            switch (parseInt(opt.value)) {
                case 1: {
                    nivelAtividadeInput = " 0x por semana"
                    break;
                } case 2: {
                    nivelAtividadeInput = "2-3x por semana"
                    break;
                } case 3: {
                    nivelAtividadeInput = "4x ou mais por semana"
                }
            }
        }
    })
    if (!peso || !sexo || !altura || !horasSonoInput || !alcoolTabaco) {
        alert("Preencha todos os campos obrigatórios.")
        return false;
    }


    let dadosAtuais = await userLoggedIn();
    let novosDados = {
        "id": parseInt(dadosAtuais.id),
        "dataDeCriacaoDaConta": dadosAtuais.dataDeCriacaoDaConta,
        "username": dadosAtuais.username,
        "senha": dadosAtuais.senha,
        "email": dadosAtuais.email,
        "dataNascimento": dadosAtuais.dataNascimento,
        "peso": parseFloat(peso),
        "altura": parseFloat(altura),
        "sexo": sexo,
        "horasDeSono": parseFloat(horasSonoInput),
        "medicacoesEmUso": medicacoesEmUso || null,
        "condicoesMedicas": condicoesMedicas || null,
        "alcoolTabaco": alcoolTabaco,
        "objetivo": objetivoCliente,
        "atividadeAtual": nivelAtividadeInput
    }
    const response = await fetch(url, {
        method: "PUT", // Assuming you want to update the data using a PUT request
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novosDados)
    });

    if (response.ok) {
        console.log("Data updated successfully:", novosDados);
    } else {
        console.error("Failed to update data:", response.statusText);
    }
    primeiraparte.style.display = 'none';
    segundaparte.style.display = 'flex';
    
    alert("Dados salvos com sucesso!")
    return true
}
async function enviarDadosPlanoAlimentar() {
    let url = "http://localhost:8080/planoAlimentar"
    let alergiasInput = document.getElementById("alergiasInput").value
    let deficienciasVitInput = document.getElementById("deficienciasVit").value
    let experienciasAnterioresInput = document.getElementById("experienciaAnteriorInput").value
    let consumoAguaInput = document.getElementById("consumoAgua").value
    let preferenciasInput = document.getElementById("preferenciasAlimentares").value
    if (
        alergiasInput === "" ||
        deficienciasVitInput === "" ||
        experienciasAnterioresInput === "" ||
        consumoAguaInput === "" ||
        preferenciasInput === ""
    ) {
        alert("Todos os campos são obrigatórios. Por favor, preencha-os.");
        return false
    }

    let usuarioAtual = await userLoggedIn();
    let dados = {
        alergiasAlimentares: alergiasInput,
        cliente: usuarioAtual,
        consumoAgua: consumoAguaInput,
        dataPedido: new Date(),
        deficienciaVitaminas: deficienciasVitInput,
        experienciaAnteriorDieta: experienciasAnterioresInput,
        preferenciasAlimentares: preferenciasInput
    };

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
        alert("Plano enviado! Espere a resposta de um nutricionista para avalia-lo")
        document.getElementById("planoAlm").style.display = "none"
        document.getElementById("planoAlmEnviado").style.display = "block"
    } else {
        alert("Algum erro ocorreu. Tente novamente")
    }
    return true;
}

async function enviarDadosPlanoExercicio() {
    let url = "http://localhost:8080/planoExercicio"
    let qntsVezesInput = document.getElementById("qntsVezesInput").value
    let tempoDiarioInput = document.getElementById("tempoDiarioInput").value
    let experienciaExercicioInput = document.getElementById("experienciaExercicioInput").value
    let estabelecimentosInput = document.getElementById("estabelecimentosInput").value
    let deficienciasFisicasInput = document.getElementById("deficienciasFisicasInput").value
    if (
        qntsVezesInput === "" ||
        tempoDiarioInput === "" ||
        experienciaExercicioInput === "" ||
        estabelecimentosInput === "" ||
        deficienciasFisicasInput === ""
    ) {
        alert("Todos os campos são obrigatórios. Por favor, preencha-os.");
        return false
    }
    let usuarioAtual = await userLoggedIn();
    let dados = {
        cliente: usuarioAtual,
        dataPedido: new Date(),
        deficienciasFisicas: deficienciasFisicasInput,
        estabelecimentosDisponiveis: estabelecimentosInput,
        experienciaAnteriorExercicio: experienciaExercicioInput,
        quantidadeDeExercicioDesejada: qntsVezesInput,
        tempoDiarioParaAtividades: tempoDiarioInput
    };
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
        alert("Plano enviado! Espere a resposta de um profissional para avalia-lo")
        document.getElementById("planoex").style.display = "none"
        document.getElementById("planoExEnviado").style.display = "block"
    } else {
        alert("Algum erro ocorreu. Tente novamente")
    }
    return true;
}

async function verificarSeUsuarioTemPlanoAlimentarEnviado() {
    try {
        let url = "http://localhost:8080/planoAlimentar/cliente/";
        let dadosCliente = await userLoggedIn();
        let idCliente = dadosCliente.id;
        url += idCliente;
        
        let response = await fetch(url, { method: "GET" });
        
        if (response.status === 200) {
            let dados = await response.json();
            if (dados.nutricionista === null || (dados.planoAceito != null && !dados.planoAceito)) {
                document.getElementById("planoAlm").style.display = "none";
                document.getElementById("planoAlmEnviado").style.display = "block";
            } else if((dados.planoAceito != null && dados.planoAceito)){
                document.getElementById("planoAlmForm").classList.add("d-none")
                document.getElementById("planoAlimentarFeito").classList.remove("d-none")
                document.getElementById("continuarBtn").classList.remove("d-none")
            }else{
                document.getElementById("planoAlmForm").classList.add("d-none")
                document.getElementById("planoRecebido").classList.remove("d-none")
            }
        } else {
            console.error("Erro ao obter dados do plano alimentar. Código de resposta: " + response.status);
        }
    } catch (error) {
        console.error("Erro ao verificar se o usuário tem um plano alimentar:", error);
    }
}

async function verificarSeUsuarioTemPlanoExercicioEnviado() {
    try {
        let url = "http://localhost:8080/planoExercicio/cliente/";
        let dadosCliente = await userLoggedIn();
        let idCliente = dadosCliente.id;
        url += idCliente;
        
        let response = await fetch(url, { method: "GET" });

        if (response.status === 200) {
            let dados = await response.json();
            
            if (dados.profissionalExercicio === null|| (dados.planoAceito != null && !dados.planoAceito)) {
                document.getElementById("planoex").style.display = "none";
                document.getElementById("planoExEnviado").style.display = "block";
            } else if(dados.planoAceito != null && dados.planoAceito){
                document.getElementById("PEForm").classList.add("d-none")
                document.getElementById("planoEXFeito").classList.remove("d-none")
                document.getElementById("continuarBtn").classList.remove("d-none")
            } else {
                document.getElementById("PEForm").classList.add("d-none")
                document.getElementById("planoEXRecebido").classList.remove("d-none")
            }
        } else {
            console.error("Erro ao obter dados do plano de exercícios. Código de resposta: " + response.status);
        }
    } catch (error) {
        console.error("Erro ao verificar se o usuário tem um plano de exercícios:", error);
    }
}

//#endregion


//Mudar pessoa
document.getElementById("salvarDadosGerais").addEventListener("click", () => {
    enviarDadosGerais()
})

document.getElementById("continuarBtn").addEventListener("click", () => {
    window.location.href = "../teladocliente/teladocliente.html"
})

const mulherbranca = document.getElementById("mulherbranca");
const homembranco = document.getElementById("homembranco");
const regua = document.getElementById("regua");
const imagemHbranco = document.getElementById("imagemHbranco");
const imagemMbranco = document.getElementById("imagemMbranco");
const primeiraparte = document.getElementById("primeiraparte");
const segundaparte = document.getElementById("segundaparte");

const speed = 200;

document.getElementById("sexoInput").addEventListener("change", function () {
    var selectElement = document.getElementById("sexoInput");
    var selectedValue = selectElement.value;
    if (selectedValue == "feminino") {
        mulherbranca.style.display = 'flex';
        homembranco.style.display = 'none';
    } else if (selectedValue == "masculino") {
        mulherbranca.style.display = 'none';
        homembranco.style.display = 'flex';
    }
})

document.getElementById("pesoInput").addEventListener("input", function () {
    var peso = document.getElementById("pesoInput");
    var valorpeso = peso.value;
    mostrarpeso(valorpeso);
})

function mostrarpeso(valorpeso) {

    var escreverpeso = document.getElementById("pesopreviw");
    if (valorpeso == "") {
        escreverpeso.style.display = 'none';
        imagemHbranco.style.width = '216px';
        imagemMbranco.style.width = '216px'
    } else {
        escreverpeso.style.display = 'flex';
        escreverpeso.innerHTML = `<h4>Peso:<h4 class="count" data-count="${valorpeso}">0</h4></h4>`;
        const myNum = escreverpeso.querySelector('.count');
        const target_count = parseInt(valorpeso, 10);
        let init_count = 0;

        let new_increment_num = Math.floor(((target_count + 200) / speed));

        const updateNumber = () => {
            init_count += new_increment_num;
            myNum.innerText = init_count;

            if (init_count < target_count) {
                setTimeout(() => { updateNumber() }, 25)
            }
        }

        updateNumber();


        calculaIMC();
    }
}

document.getElementById("alturaInput").addEventListener("input", function () {

    var altura = document.getElementById("alturaInput");
    var valoralutra = altura.value;
    if (valoralutra == "") {
        regua.style.width = '0px';
        regua.style.display = 'none';
        imagemHbranco.style.scale = 1;
        imagemMbranco.style.scale = 1;
        var escreveraltura = document.getElementById("alturapreviw");
        escreveraltura.style.display = 'none';
    } else if (valoralutra < 3 && valoralutra > 0) {
        valoralutra *= 100;
        var aux = valoralutra;
        valoralutra = (120 * valoralutra) / 200
        regua.style.display = 'flex';
        regua.style.width = valoralutra + 'px';
        aux = (1 * aux) / 216;
        imagemHbranco.style.scale = aux;
        imagemMbranco.style.scale = aux;
        valoralutra = altura.value;
        // valoralutra *= 100;
        if (valoralutra < 3) {
            mostraraltura(valoralutra);
        }

    }
})

const alturaInput = document.getElementById("alturaInput");
const alturaError = document.getElementById("alturaError");

alturaInput.addEventListener("input", () => {
    let inputValue = alturaInput.value;

    
    inputValue = inputValue.replace(/(\.\d*\.)/, ".$1");

    if (/^\d+(\.\d*)?$/.test(inputValue)) {
        if (inputValue.length === 2 && inputValue.indexOf(".") === -1) {
            inputValue = inputValue.substr(0, 1) + "." + inputValue.substr(1);
        }

        alturaInput.value = inputValue;

        if (parseFloat(inputValue) < 1.1 || parseFloat(inputValue) > 2.5) {
            alturaError.style.display = "block";
            alturaInput.setCustomValidity("A altura deve estar entre 1.1 e 2.5 metros.");
        } else {
            alturaError.style.display = "none";
            alturaInput.setCustomValidity("");
        }
    } else {
        alturaError.style.display = "block";
        alturaInput.setCustomValidity("A entrada deve ser um número válido.");
    }
});





function mostraraltura(valoralutra) {

    var escreveraltura = document.getElementById("alturapreviw");
    if (valoralutra == "") {
        escreveraltura.style.display = 'none';
    } else {
        escreveraltura.style.display = 'flex';
        escreveraltura.innerHTML = `<h4>Altura: <h4 class="count" data-count="${valoralutra}">0</h4></h4>`;
        const myNum = escreveraltura.querySelector('.count');
        const target_count = parseFloat(valoralutra, 10);
        let init_count = 0;

        let new_increment_num = (target_count);

        const updateNumber = () => {
            init_count += new_increment_num;
            myNum.innerText = init_count;

            if (init_count < target_count) {
                setTimeout(() => { updateNumber() }, 25)
            }
        }

        updateNumber();

        calculaIMC();
    }

}

function calculaIMC() {
    var altura = document.getElementById("alturaInput");
    var valoralutra = altura.value;
    var peso = document.getElementById("pesoInput");
    var valorpeso = peso.value;
    var escreverimc = document.getElementById("imcpreviw");
    var imc = 0;

    if (valoralutra && valorpeso != "") {
        imc = valorpeso / (valoralutra * valoralutra);
        imc = imc.toFixed(2);
        if (imc < 17) {
            escreverimc.innerHTML = `<h4>IMC: ${imc} muito abaixo do peso</h4>`
        } else if (imc >= 17 && imc <= 18.5) {
            escreverimc.innerHTML = `<h4>IMC: ${imc} abaixo do peso ideal</h4>`
        } else if (imc > 18.5 && imc <= 24.9) {
            escreverimc.innerHTML = `<h4>IMC: ${imc} peso ideal</h4>`
        } else if (imc > 24.9 && imc <= 25.9) {
            escreverimc.innerHTML = `<h4>IMC: ${imc} acima do peso ideal</h4>`
        } else if (imc > 25.9 && imc <= 34.9) {
            escreverimc.innerHTML = `<h4>IMC: ${imc} obesidade I</h4>`
        } else if (imc > 34.9 && 39.9) {
            escreverimc.innerHTML = `<h4>IMC: ${imc} obesidade II (Severa)</h4>`
        } else if (imc > 40) {
            escreverimc.innerHTML = `<h4>IMC: ${imc} obesidade III (mórbida)</h4>`
        }
    }
}

document.getElementById("analisarBtnPlanoAlm").addEventListener("click", analisarPlanoAlimentar)
async function analisarPlanoAlimentar(){
    let cliente = await userLoggedIn();
    window.location.href = `../Criar/criar.html?tipoDeAcesso=analisePlanoAlimentar&nome=${cliente.username}`
}

document.getElementById("analisarPE").addEventListener("click", analisarPlanoExercicio)
async function analisarPlanoExercicio(){
    let cliente = await userLoggedIn();
    window.location.href = `../Criar/criar.html?tipoDeAcesso=analisePlanoExercicio&nome=${cliente.username}`
}
