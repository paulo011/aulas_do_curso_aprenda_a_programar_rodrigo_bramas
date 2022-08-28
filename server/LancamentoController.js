class LancamentoController{
    constructor(httpServer, lancamentoData){
        
        httpServer.register("get","/api/lancamentos", async function(params, body){
            const lancamentos = await lancamentoData.getLancamento()
            return lancamentos
        })

        httpServer.register("post","/api/lancamentos", async (params, body)=>{
            const lancamento = body
            console.log(lancamento)
            await lancamentoData.savelancamento(lancamento)
        })

        httpServer.register("delete", "/api/lancamentos/:idLancamento", async (params, body) => {
            await lancamentoData.deleteLancamento(params.idLancamento)
        })
    }
}

module.exports = LancamentoController