async function planosAlimentaresPorDia() {
    let response = await fetch("http://localhost:8080/planoAlimentar/all");
    let planos = await response.json();
    
    // Encontrar a data mais antiga e a data atual
    let dataMaisAntiga = new Date();
    let dataAtual = new Date();

    planos.forEach(plano => {
        let dataPedido = plano.dataPedido;

        let dataPedidoObj = new Date(dataPedido[0], dataPedido[1] - 1, dataPedido[2]);

        if (dataPedidoObj < dataMaisAntiga) {
            dataMaisAntiga = dataPedidoObj;
        }

        if (dataPedidoObj > dataAtual) {
            dataAtual = dataPedidoObj;
        }
    });

    let diferencaDias = Math.ceil((dataAtual - dataMaisAntiga) / (1000 * 60 * 60 * 24));

    let mediaDiaria = planos.length / diferencaDias;

    document.getElementById("planosAlmCriadosPorDia").innerHTML = `${mediaDiaria.toFixed(2)} planos por dia em média`;
}



async function planosExercicioPorDia() {
    let response = await fetch("http://localhost:8080/planoExercicio/all");
    let planos = await response.json();
    let dataMaisAntiga = new Date();
    let dataAtual = new Date();

    planos.forEach(plano => {
        let dataPedido = plano.dataPedido;
        let dataPedidoObj = new Date(dataPedido[0], dataPedido[1] - 1, dataPedido[2]);

        if (dataPedidoObj < dataMaisAntiga) {
            dataMaisAntiga = dataPedidoObj;
        }

        if (dataPedidoObj > dataAtual) {
            dataAtual = dataPedidoObj;
        }
    });

    let diferencaDias = Math.ceil((dataAtual - dataMaisAntiga) / (1000 * 60 * 60 * 24));
    let mediaDiaria = planos.length / diferencaDias;

    document.getElementById("planosExCriadosPorDia").innerHTML = `${mediaDiaria.toFixed(2)} planos de exercício por dia em média`;
}


async function postsAindaNaoAvaliados() {
    let response = await fetch("http://localhost:8080/post/getAll");
    let posts = await response.json();
    let postsNaoAvaliados = posts.filter(post => post.postAceito === null);
    let quantidadeRelativa = postsNaoAvaliados.length / posts.length * 100;
    document.getElementById("postsNaoAvaliados").innerHTML = `${quantidadeRelativa.toFixed(2)}% dos posts ainda não foram avaliados`;
}


async function percentualDeCadaCategoriaDePosts() {
    let response = await fetch("http://localhost:8080/post/getAll");
    let posts = await response.json();

    let quantidadeNutricao = posts.filter(post => post.categoria === "nutricao").length;
    let quantidadeExercicio = posts.filter(post => post.categoria === "exercicio").length;
    let quantidadeOutras = posts.filter(post => post.categoria === "outras").length;

    let totalPosts = posts.length;
    let percentualNutricao = (quantidadeNutricao / totalPosts) * 100;
    let percentualExercicio = (quantidadeExercicio / totalPosts) * 100;
    let percentualOutras = (quantidadeOutras / totalPosts) * 100;

    document.getElementById("percentualPorCategoria").innerHTML = `
        Nutrição: ${percentualNutricao.toFixed(2)}%<br>
        Exercício: ${percentualExercicio.toFixed(2)}%<br>
        Outras: ${percentualOutras.toFixed(2)}%
    `;
}


async function progressoClientes(){
    let response = await fetch("http://localhost:8080/progressao/all")
    let dados = await response.json()
    console.log(dados)
    let clientesPositivos = dados.filter(dado => {
        let objetivo = dado.cliente.objetivo;
        let peso = dado.peso;
        let pesoInicial = dado.cliente.peso;

        if (objetivo === "Perder peso") {
            return pesoInicial > peso;
        } else if (objetivo === "Ganhar massa magra") {
            return pesoInicial < peso;
        } else if (objetivo === "Ter uma vida mais saudável") {
            // Calcula o IMC ideal do cliente
            let altura = cliente.cliente.altura;
            let imcIdealMin = 18.5 * altura * altura;
            let imcIdealMax = 24.9 * altura * altura;

            // Verifica se o último peso está dentro do IMC ideal
            return peso >= imcIdealMin && peso <= imcIdealMax;
        }

        return false;
    });
    let percentualPositivos = (clientesPositivos.length / dados.length) * 100;
    document.getElementById("percentualDeClientesPositivos").innerHTML = percentualPositivos + "%"
}


async function siteInit(){
    planosAlimentaresPorDia()
    planosExercicioPorDia()
    postsAindaNaoAvaliados()
    percentualDeCadaCategoriaDePosts()
    progressoClientes()
}

document.addEventListener("DOMContentLoaded", () => {
    siteInit()
})