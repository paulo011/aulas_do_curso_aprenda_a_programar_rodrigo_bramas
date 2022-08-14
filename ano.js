class Ano{
    constructor(){
        this.meses = []

    }
    adicionarMes(mes){
        this.meses.push(mes)

    }
    adicionarLancamento (nomesDoMes, Lancamento){
        for(const mes of this.meses){
            if (mes.nome === nomesDoMes){
                mes.adicionarLacamento(Lancamento)
                break
            }
        }
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