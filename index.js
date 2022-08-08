console.log('programa para monitorar as finanças pessoais')

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

const calcularSaldo = (lancamentos) => {
    let saldo = 0
    lancamentos.forEach(lancamentos => {
        if(lancamentos.tipo == 'receita'){
            saldo += lancamentos.valor
        }else if (lancamentos.tipo == 'despesa'){
            saldo -= lancamentos.valor
        }else{
            console.log("erro ao ler um dos lançamentos")
        }
    })

    const estaNegativo = saldo < 0

    if(estaNegativo){
        const juros = calcJuros(saldo)
        saldo = saldo + juros
    }else {
        const rendimentos = calcRendimento(saldo)
        saldo = saldo + rendimentos
    }
    return saldo
}

console.log('janeiro')

const lancamentosJaneiro  =[{categoria: 'salário',tipo: 'receita', valor: 3000},
{categoria: 'aluguel',tipo: 'despesa' ,valor: 1000}, 
{categoria: 'conta de luz',tipo: 'despesa' ,valor: 200},
{categoria: 'conta de água',tipo: 'despesa' ,valor: 100},
{categoria: 'internet',tipo: 'despesa' ,valor: 100},
{categoria: 'transporte',tipo: 'despesa' ,valor: 300},
{categoria: 'lazer',tipo: 'despesa' ,valor: 300},
{categoria: 'alimentação',tipo: 'despesa' ,valor: 500}]

const saldoJaneiro = calcularSaldo (lancamentosJaneiro)

console.log(`entre entradas e saidas do mes de janeiro o saldo é de ${saldoJaneiro}`)

