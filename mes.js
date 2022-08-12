class Mes{
    constructor(nome, saldoInicial){
        if(nome === "") throw new Error ("Mês inivalido: O nome é obrigatório")
        this.nome = nome
        this.saldoInicial = saldoInicial
        this.totalizadorDoMes = {saldo: 0, saldoInicial, juros: 0, rendimentos: 0, receita: 0, despesas: 0, distribuicaoDeDespesas: []}
        this.lancamentos = []

    }

    adicionarLacamento(lancamento){
        this.lancamentos.push(lancamento)
    }
    calcJuros  (valor) {
        const resultado = arredondar(valor * 0.1)
        return resultado
    }

    calcRendimento (valor) {
        const resultado = arredondar(valor * 0.005)
        return resultado
    }

    apurarJurois(){
        if(this.totalizadorDoMes.saldo < 0){
            this.totalizadorDoMes.juros = this.calcJuros(this.totalizadorDoMes.saldo)
            this.totalizadorDoMes.saldo += this.totalizadorDoMes.juros
        }
 
    }

    apurarRendimentos(){
        if (this.totalizadorDoMes.saldo > 0){
            this.totalizadorDoMes.rendimentos= this.calcRendimento(this.totalizadorDoMes.saldo)
            this.totalizadorDoMes.saldo += this.totalizadorDoMes.rendimentos
        }
 
    }


    calcularSaldo () {
        this.totalizadorDoMes.saldo = this.saldoInicial
        

        this.lancamentos.forEach(lancamentos => {
            if(lancamentos.tipo == 'receita'){
                this.totalizadorDoMes.saldo += lancamentos.valor
                this.totalizadorDoMes.receita += lancamentos.valor
            } 
            if (lancamentos.tipo == 'despesa'){
                this.totalizadorDoMes.saldo -= lancamentos.valor
                this.totalizadorDoMes.despesas += lancamentos.valor
            }
        })

        this.distribuirDespesas()
        this.apurarJurois()
        this.apurarRendimentos()
       
        return this.totalizadorDoMes
    }
    distribuirDespesas () {

        const distribuicaoDeDespesas = []
        for (const lancamentos of this.lancamentos){
            if (lancamentos.tipo === 'despesa'){
                const percentual = arredondar((lancamentos.valor/this.totalizadorDoMes.despesas)*100)
                distribuicaoDeDespesas.push({categoria: lancamentos.categoria, percentual: percentual})
            }
        }
        this.totalizadorDoMes.distribuicaoDeDespesas = distribuicaoDeDespesas
    }



}