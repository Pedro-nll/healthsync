/*document.getElementById("logo").addEventListener("click", () => {
    window.location.href = "../pagInicial/index.html"
})
*/
function isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    const [year, month, day] = dateString.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    const minDate = new Date('1900-01-01');

    return !isNaN(parsedDate) && !(parsedDate < minDate || parsedDate > currentDate);
}


const senhaCadastro = document.getElementById("senhaCadastro");
const versenhaButton = document.getElementById("versenha");
let isPasswordVisible = false;


versenhaButton.addEventListener("click", () =>{
    if(isPasswordVisible){
    senhaCadastro.type = "password";
    isPasswordVisible = false;
    } else {
        senhaCadastro.type = "text";
        isPasswordVisible = true;
    }
})

const emailCadastro = document.getElementById("emailCadastro");
const emailError = document.getElementById("emailError");

emailCadastro.addEventListener("input", () => {
  if (!emailCadastro.value.includes("@")) {
    emailError.style.display = "block"; 
  } else {
    emailError.style.display = "none"; 
  }
});


async function cadastroFunc() {
    let dataNasc = document.getElementById("dataCadastro").value;
    let tipo = document.getElementById("tipoCadastro").value;
    let emailCadastro = document.getElementById("emailCadastro").value;
    let senhaCadastro = document.getElementById("senhaCadastro").value;
    let user = document.getElementById("usernameCadastro").value;

    if (!dataNasc || dataNasc == "" || tipo == -1 || emailCadastro == "" || senhaCadastro == "" || user == "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }


    if (!isValidDate(dataNasc)) {
        alert("Data inválida.");
        return;
    }
    let url = "http://localhost:8080/"
    switch (parseInt(tipo)) {
        case 1: {
            url += "cliente"
            break;
        } case 2: {
            url += "nutricionista"
            break
        } case 3: {
            url += "profissional"
            break;
        } default: {
            return
        }
    }
    let dados = {
        dataDeCriacaoDaConta: new Date(),
        email: emailCadastro,
        senha: senhaCadastro,
        username: user,
        dataNascimento: dataNasc,
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
    if(resposta.ok){
        alert("Usuario criado")
    }else{
        alert("Algum erro ocorreu. Tente novamente")
    }
}


async function loginFunc() {
    let username = document.getElementById("usuarioLogin").value
    let url = "http://localhost:8080/"
    let tipoLogin = parseInt(document.getElementById("tipoLogin").value)
    switch (tipoLogin) {
        case 1: {
            url += "cliente/user/"
            break;
        } case 2: {
            url += "nutricionista/user/"
            break;
        } case 3: {
            url += "profissional/user/"
            break;
        }
    }
    url += username
    let response = await fetch(url, { method: "GET" });
    let dados = await response.json();
    if (dados.senha == document.getElementById("senhaLogin").value) {
        localStorage.setItem('tipoUsuario', tipoLogin);
        localStorage.setItem('username', username);
        window.location.href = "../pagInicial/index.html";
    } else {
        alert("Senha invalida")
    }
}


document.getElementById("loginBtn").addEventListener("click", () => {
    loginFunc()
})

document.getElementById("btnSave").addEventListener("click", () => {
    cadastroFunc()
})


const dataCadastro = document.getElementById("dataCadastro");

dataCadastro.addEventListener("input", () => {
  const inputDate = dataCadastro.value;


  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!datePattern.test(inputDate)) {
    dataCadastro.setCustomValidity("Digite uma data válida no formato DD/MM/AAAA");
  } else {
    dataCadastro.setCustomValidity("");
    
    const parts = inputDate.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    dataCadastro.value = formattedDate;
  }
});
