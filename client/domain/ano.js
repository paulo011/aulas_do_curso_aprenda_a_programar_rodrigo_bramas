
class Ano{
    constructor(){
        this.meses = []

    }
    adicionarMes(mes){
        this.meses.push(mes)

    }
    adicionarLancamento (nomesDoMes, Lancamento){
        if(!this.meses.some(mes => mes.nome === nomesDoMes)){
            this.adicionarMes(new Mes(nomesDoMes))
        }
        for(const mes of this.meses){
            if (mes.nome === nomesDoMes){
                mes.adicionarLacamento(Lancamento)
                break
            }
        }
    }
    deletarLancamento(mes, lancamento){
        mes.lancamentos.splice(mes.lancamentos.indexOf(lancamento), 1)
    }
    calcularSaldo(){
        let saldoInicial = 0
        for (const mes of this.meses ){
            mes.saldoInicial = saldoInicial
            mes.calcularSaldo()
            saldoInicial = mes.totalizador.saldo
        }
    }

}