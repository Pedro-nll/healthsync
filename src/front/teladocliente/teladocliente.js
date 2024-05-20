var pesopren = document.getElementById("Pesoatual");
var pesoatual;


// Dados estaticos para depois colocar na api
var pesoregistro;
var altura;
var datacriacao;
var usuarioLogado;
// Dados para guardar

//Numeros grandes
// var datasreg = ["13/04", "20/04", "27/04", "04/05", "11/05", "18/05", "25/05", "01/06", "08/06", "15/06", "22/06", "29/06", "06/07", "13/07", "20/07", "27/07", "03/08", "10/08", "17/08", "24/08", "31/08", "07/09", "14/09", "21/09", "28/09", "05/10", "12/10", "19/10", "26/10", "02/11", "09/11", "16/11"];
// var pesosreg = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

//Numeros Pequenos
var datasreg = [/*"20/11","15/01", "12/02", "21/03", "05/04", "18/05", "09/06", "14/07", "22/08", "02/09", "30/10"*/];
var pesosreg = [/*30,75, 85, 55, 80, 65, 90, 50, 70, 95, 60*/];
//var projreg = [];


var ctx = document.getElementById('myChart');

var dataAtual = new Date();
var diaAtual = dataAtual.getDate();
var mesAtual = dataAtual.getMonth();
var hoje = diaAtual + "/" + (mesAtual + 1);
var tamanhografico;
var imc;
var imcidealmin;
var imcidealmax;
var graficoproj;
var projeção = pesoregistro;
var contavel = pesoregistro;
var fimideal = 1;
var i = 0;
var tamanhoreg = datasreg.length;
var j = 0;
var diaconver, mesconvert, diaconver2, mesconvert2;
var dataString;
var distan = 0;
var primeraex = 1;
var valideal;
var newporj = [];
var pesosSalvos = [];
var tamanhoproj;


function calculaproj() {
  var projreg = [];
  var valideal = 24.2 * (altura * altura);
  
  var ultimoValor = pesosreg[pesosreg.length - 1];
  var provavelval;
  projreg.push(ultimoValor);

  if (ultimoValor > valideal){
  provavelval = Math.round(ultimoValor - valideal);
  }
  if (ultimoValor < valideal){
  provavelval = Math.round(valideal - ultimoValor);
}

 

  for (var i = 0; i < provavelval; i++){
    projreg[i] = ultimoValor - 1*(i+1); 
  }


  return projreg;
}

function calcularDiferencaDeDias(data1, data2) {
  var formato = "DD/MM";
  var diaAnterior = moment(data1, formato);
  var diaAtual = moment(data2, formato);

  return diaAtual.diff(diaAnterior, 'days');
}

function Criacaografico() {
  newporj = calculaproj();
  var ctx = document.getElementById('myChart').getContext('2d');

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [datacriacao],
      datasets: [{
        label: 'Seu peso',
        data: [pesoregistro],
        borderColor: 'rgba(35, 152, 152, 1)',
        backgroundColor: 'rgba(35, 152, 152, 0.5)',
        borderWidth: 1,
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  myChart.data.datasets.push({
    label: 'Peso ideal',
    data: [],
    borderColor: 'green',
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    borderWidth: 1,
    fill: false
  });

  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart.data.datasets[1].data.push(24.2 * (altura * altura));
  
    chart.update();
  }

  setInterval(function () {
    if (i < tamanhoreg) {
      var newLabel = datasreg[i];
      var newData = pesosreg[i];

      addData(myChart, newLabel, newData);
      i++;
    }

  }, 350);

  while(myChart.data.labels > myChart.data.datasets[1].data){
    myChart.data.datasets[1].data.push(24.2 * (altura * altura));
    }

  document.getElementById("Atualiagrafico").addEventListener('click', function atualizado() {
    pesoatual = pesopren.value;
    tamanhografico = myChart.data.labels.length;

    if (myChart.data.labels[tamanhografico - 1] == hoje) {
      myChart.data.datasets[0].data[tamanhografico - 1] = pesoatual;
      let ultimoPesoSalvo = pesosSalvos[pesosSalvos.length - 1]
      ultimoPesoSalvo.peso = pesoatual
      fetch("http://localhost:8080/progressao", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ultimoPesoSalvo)
      })
        .then(response => response.json())
        .then(data => {
          pesosSalvos[pesosSalvos.length - 1] = data
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
    else {
      myChart.data.datasets[0].data.push(pesoatual);
      myChart.data.labels.push(hoje);

      let requestBody = {
        id: null,
        cliente: usuarioLogado,
        data: new Date,
        peso: pesoatual
      };

      fetch("http://localhost:8080/progressao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => {
          pesosSalvos.push(data)
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
    myChart.data.datasets[1].data.push(24.2 * (altura * altura));
    myChart.update();

    pesosreg.push(pesoatual);
    datasreg.push(hoje);
    //#region COLOCAR A API AQUI
    //#endregion
  });
};

//#region API
document.getElementById("planosSaveBtn").addEventListener("click", () => {
  pedirNovosPlanos()
})

async function pedirNovosPlanos() {
  let planoAlm = await getPlanoAlimentarUser()
  let planoEx = await getPlanoExercicioUser()
  if (document.getElementById("planoExerciciosCheckbox").checked) {
    planoEx.comentarios = document.getElementById("comentariosTextarea").value
    planoEx.dataPedido = new Date
    let response = await fetch("http://localhost:8080/planoExercicio/pedirNovoPlano", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(planoEx)
    })
  }
  if (document.getElementById("planoAlimentarCheckbox").checked) {
    planoAlm.comentarios = document.getElementById("comentariosTextarea").value
    planoAlm.dataPedido = new Date
    let response = await fetch("http://localhost:8080/planoAlimentar/pedirNovoPlano", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(planoAlm)
    })
  }
  window.location.href = "../dashboardCliente/dashboardCliente.html"
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem('tipoUsuario');
  localStorage.removeItem('username');

  window.location.href = "../pagInicial/index.html";
});

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
  usuarioLogado = dados
  return dados;
}

function formatarDataAsMonthDay(dataArray) {
  const [ano, mes, dia] = dataArray;
  return `${dia}/${mes}`;
}

async function popularCardUser() {
  let dados = await userLoggedIn()
  document.getElementById("nomeCardUser").innerHTML = dados.username
  document.getElementById("emailCardUser").innerHTML = dados.email
  let dataCriacaoArray = dados.dataDeCriacaoDaConta
  let dataCriacaoStr = formatarData(dataCriacaoArray);
  document.getElementById("dataCriacaoContaUser").innerHTML = dataCriacaoStr
  altura = dados.altura
  pesoregistro = dados.peso
  datacriacao = formatarDataAsMonthDay(dados.dataDeCriacaoDaConta)
  await popularPesosSalvos(dados.id)
}

async function getPlanoAlimentarUser() {
  let url = "http://localhost:8080/planoAlimentar/cliente/";
  let dadosCliente = await userLoggedIn();
  let idCliente = dadosCliente.id;
  url += idCliente;

  let response = await fetch(url, { method: "GET" });
  let planoAlm = await response.json()

  if (planoAlm.planoAceito == true) {
    const planoAlimentarHTML = planoAlm.plano.replace(/\n/g, "<br>");
    document.getElementById("txtPlanoAlimentarAPI").innerHTML = planoAlimentarHTML;
    getReceitas(planoAlm.id)
  }
  return planoAlm;
}

async function getPlanoExercicioUser() {
  let url = "http://localhost:8080/planoExercicio/cliente/";
  let dadosCliente = await userLoggedIn();
  let idCliente = dadosCliente.id;
  url += idCliente;

  let response = await fetch(url, { method: "GET" });
  let planoEx = await response.json()

  if (planoEx.planoAceito == true) {
    const planoAlimentarHTML = planoEx.plano.replace(/\n/g, "<br>");
    document.getElementById("txtPlanoExercicioAPI").innerHTML = planoAlimentarHTML;

  }
  return planoEx
}

async function getReceitas(id){
  let response = await fetch(`http://localhost:8080/receitas/plano/${id}`)
  let dados = await response.json()
  dados.forEach(dado => {
    if(dado.avaliador != null){
      document.getElementById("txtReceitasApi").innerHTML += `
      <p>Nome da receita: ${dado.nomeDaReceita}</p>
      <p>Kcal: ${dado.kcal}</p>
      <p>Proteinas: ${dado.proteinas}</p>
      <p>Ingredientes: ${dado.ingredientes}</p>
      <p>Modo de preparo: ${dado.modoDePreparo}</p>
      `
    }

  })
}
async function addReceita() {
  let _nomeReceita = document.getElementById("nomeReceitaInput").value;
  let _kcal = document.getElementById("kcalInput").value;
  let _proteina = document.getElementById("proteinaInput").value;
  let _ingredientes = document.getElementById("ingredientesTextarea").value;
  let _modoDePreparo = document.getElementById("modoPreparoTextarea").value;

  if (_nomeReceita === "" || _kcal === "" || _proteina === "" || _ingredientes === "" || _modoDePreparo === "") {
    alert("Por favor, preencha todos os campos.");
  } else {
    let url = "http://localhost:8080/planoAlimentar/cliente/";
    let dadosCliente = await userLoggedIn();
    let idCliente = dadosCliente.id;
    url += idCliente;

    let response = await fetch(url, { method: "GET" });
    let planoAlm = await response.json();

    let receitaBody = {
      nomeDaReceita: _nomeReceita,
      kcal: _kcal,
      proteinas: _proteina,
      ingredientes: _ingredientes,
      modoDePreparo: _modoDePreparo,
      planoAlimentar: planoAlm,
      avaliador: null
    };

    await fetch("http://localhost:8080/receitas/adicionarReceita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(receitaBody),
    });

    alert("Receita enviada para um nutricionista!");
  }
}
document.getElementById("receitaSaveBtn").addEventListener("click", addReceita)

async function popularPesosSalvos(id) {
  let response = await fetch(`http://localhost:8080/progressao/${id}`)
  let dados = await response.json()
  dados.forEach(dado => {
    datasreg.push(formatarDataAsMonthDay(dado.data))
    pesosreg.push(dado.peso)
  })
  tamanhoreg = datasreg.length;
  pesosSalvos = dados
  Criacaografico();
}

async function addParcerias(){
  let user = await userLoggedIn()
  let response = await fetch(`http://localhost:8080/clienteParceria/cliente/${user.id}`)
  let dados = await response.json()
  console.log(dados)
  document.getElementById("txtReceitasApi").innerHTML += "<h1> Parcerias </h1>"
  dados.forEach(dado => {
    if(dado.aceito){
      let parceria = dado.parceria
      document.getElementById("txtReceitasApi").innerHTML += `
        <p>${parceria.nome} - ${parceria.descricao} - R$${parceria.preco}</p>
      `
    }
  })
}

async function siteInit() {
  getPlanoAlimentarUser()
  getPlanoExercicioUser()
  await popularCardUser()
  addParcerias()
}

document.addEventListener("DOMContentLoaded", () => {
  //calcularimc();
  //atualizado();
  siteInit();
  //Criacaografico();
})
