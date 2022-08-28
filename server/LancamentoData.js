const Lancamento = require("./lancamento")

class LancamentoData{
    constructor(connection){
        this.connection = connection
    }

    async getLancamento(){
        const lancamentoData = await this.connection.query("select * from financas_pessoais.lancamento", [])
        console.log(lancamentoData)
        const lancamentos = []
        for(const lancamento of lancamentoData){
            lancamentos.push(new Lancamento(lancamento.id_lancamento, lancamento.mes, lancamento.categoria, lancamento.tipo ,parseFloat(lancamento.valor)))
        }
        return lancamentos
    }

    async savelancamento(lancamento){
        await this.connection.query("insert into financas_pessoais.lancamento (mes, categoria, tipo, valor) values ($1, $2, $3,$4)", [lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor ])
    }

    async deleteLancamento(idLancamento){
        console.log(idLancamento)
        await this.connection.query("delete from financas_pessoais.lancamento where id_lancamento = $1", [idLancamento])
    }
}

module.exports = LancamentoData