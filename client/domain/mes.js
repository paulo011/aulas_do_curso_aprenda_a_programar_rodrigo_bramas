class Mes{
    constructor(nome, saldoInicial){
        if(nome === "") throw new Error ("Mês inivalido: O nome é obrigatório")
        this.nome = nome
        this.saldoInicial = saldoInicial
        this.totalizador = {saldo: 0, juros: 0, rendimentos: 0, receita: 0, despesas: 0, distribuicaoDeDespesas: []}
        this.lancamentos = []
    }

    arredondar (valor) {
    return Math.round(parseFloat(valor) * 100)/ 100
    }

    adicionarLacamento(lancamento){
        this.lancamentos.push(lancamento)
    }
    calcJuros  (valor) {
        const resultado = this.arredondar(valor * 0.1)
        return resultado
    }

    calcRendimento (valor) {
        const resultado = this.arredondar(valor * 0.005)
        return resultado
    }

    apurarJurois(){
        if(this.totalizador.saldo < 0){
            this.totalizador.juros = this.calcJuros(this.totalizador.saldo)
            this.totalizador.saldo += this.totalizador.juros
        }
 
    }

    apurarRendimentos(){
        if (this.totalizador.saldo > 0){
            this.totalizador.rendimentos= this.calcRendimento(this.totalizador.saldo)
            this.totalizador.saldo += this.arredondar(this.totalizador.rendimentos)
        }
 
    }

    calcularSaldo () {
        this.totalizador = {saldo: 0, juros: 0, rendimentos: 0, receita: 0, despesas: 0, distribuicaoDeDespesas: []}
        this.totalizador.saldo = this.saldoInicial

        this.lancamentos.forEach(lancamentos => {
            if(lancamentos.tipo == 'receita'){
                this.totalizador.saldo += lancamentos.valor
                this.totalizador.receita += lancamentos.valor
            } 
            if (lancamentos.tipo == 'despesa'){
                this.totalizador.saldo -= lancamentos.valor
                this.totalizador.despesas += lancamentos.valor
            }
        })

        this.distribuirDespesas()
        this.apurarJurois()
        this.apurarRendimentos()
       
        return this.totalizador
    }
    distribuirDespesas () {

        const distribuicaoDeDespesas = []
        for (const lancamentos of this.lancamentos){
            if (lancamentos.tipo === 'despesa'){
                const percentual = this.arredondar((lancamentos.valor/this.totalizador.despesas)*100)
                distribuicaoDeDespesas.push({categoria: lancamentos.categoria, percentual: percentual})
            }
        }
        this.totalizador.distribuicaoDeDespesas = distribuicaoDeDespesas
    }



}