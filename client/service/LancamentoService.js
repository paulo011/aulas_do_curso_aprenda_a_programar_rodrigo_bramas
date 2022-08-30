class LancamentoService{
    constructor(httpClient, baseUrl){
        this.httpClient = httpClient
        this.baseUrl = baseUrl
    }
    async getLancamentos(){
        return this.httpClient.get(`${this.baseUrl}/api/lancamentos`)
    }

    async saveLancamentos(lancamento){
        return this.httpClient.post(`${this.baseUrl}/api/lancamentos`, lancamento)
    }

    async daleteLancamento(idLancamento){
        return this.httpClient.delete(`${this.baseUrl}/api/lancamentos/${idLancamento}`)
    }
}