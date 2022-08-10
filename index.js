console.log('programa para monitorar as finanças pessoais')

class Lancamento {
    constructor(categoria, tipo, valor){
        if(tipo !== "receita" && tipo !== "despesa"){
            throw new Error ("Lançamento Inválido: Tipo deve ser receita ou despesa")
        }

        if(valor <= 0 ){
            throw new Error ("lançamento Inválido: Valor deve ser maior que zero")
        }

        if(categoria === ""){
            throw new Error ("Lançamento Inválido: A categoria é obrigatória")
        }

        this.categoria = categoria
        this.tipo = tipo
        this.valor = valor
    }
}

const arredondar = (valor) => {
    return Math.round((valor * 100)/ 100)
}

const calcJuros = (valor) => {
    let resultado = arredondar(valor) * 0.1
    return resultado
}

const calcRendimento = (valor) => {
    let resultado = arredondar(valor) * 0.005
    return resultado
}

const distribuirDespesas = (lancamentos, total) => {

    let distribuicaoDeDespesas = []
    for (lancamentos of lancamentos){
        if (lancamentos.tipo === 'despesa'){
            let percentual = arredondar((lancamentos.valor/total.despesas)*100)
            distribuicaoDeDespesas.push({categoria: lancamentos.categoria, percentual: percentual})
        }
    }
    return distribuicaoDeDespesas
}

const encontraValores = (lancamentos, categoriaDaDespesa) => {
    let receita = 0
    let despesa = 0

    lancamentos.forEach(lancamentos => {
        if(lancamentos.tipo == 'receita'){
            receita += lancamentos.valor
        }
    })

    for(encontrarDespesa of lancamentos){
        if(encontrarDespesa.categoria == categoriaDaDespesa){
            despesa = encontrarDespesa.valor
            break
        }
    }

    const valoresEncontrados = [receita, despesa]
    return valoresEncontrados
}

const calcPorcentagem = (lancamentos, categoriaDaDespesa) => {
    let valores = encontraValores(lancamentos, categoriaDaDespesa)
    let resultado = 0

    resultado = (valores[1] / valores[0]) * 100 
    resultado = arredondar(resultado)

    return resultado
}

const calcularSaldo = (saldoInicial, lancamentos) => {
    let totalizadorDoMes = {saldo: 0,saldoInicial, juros: 0, rendimentos: 0, receita: 0, despesas: 0, distribuicaoDeDespesas: []}
    totalizadorDoMes.saldo = saldoInicial

    lancamentos.forEach(lancamentos => {
        if(lancamentos.tipo == 'receita'){
            totalizadorDoMes.saldo += lancamentos.valor
            totalizadorDoMes.receita += lancamentos.valor
        }else if (lancamentos.tipo == 'despesa'){
            totalizadorDoMes.saldo -= lancamentos.valor
            totalizadorDoMes.despesas += lancamentos.valor
        }else{
            console.log("erro ao ler um dos lançamentos")
        }
    })

    totalizadorDoMes.distribuicaoDeDespesas = distribuirDespesas(lancamentos, totalizadorDoMes)
    const estaNegativo = totalizadorDoMes.saldo < 0

    if(estaNegativo){
        totalizadorDoMes.juros = calcJuros(totalizadorDoMes.saldo)
        totalizadorDoMes.saldo += totalizadorDoMes.juros
    }else {
        totalizadorDoMes.rendimentos= calcRendimento(totalizadorDoMes.saldo)
        totalizadorDoMes.saldo += totalizadorDoMes.rendimentos
    }
    return totalizadorDoMes
}

console.log('janeiro')

const lancamentosJaneiro  =[ new Lancamento('salário','receita', 3000),
new Lancamento('aluguel','despesa' ,1000), 
new Lancamento('conta de luz', 'despesa' ,200),
new Lancamento('conta de água','despesa' ,100),
new Lancamento('internet','despesa' ,100),
new Lancamento('transporte','despesa' ,300),
new Lancamento('lazer','despesa' ,300),
new Lancamento('alimentação','despesa' ,500)
]

const saldoJaneiro = calcularSaldo (0, lancamentosJaneiro)

console.log(`entre entradas e saidas do mes de janeiro o saldo é de ${saldoJaneiro.saldo}`)
console.log(saldoJaneiro)

console.log(`o alugel corespode a ${calcPorcentagem(lancamentosJaneiro, "aluguel")}% do valor do salário do usúario`)
