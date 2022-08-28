class Tela{
    constructor(){
        this.init()
    }

    async init(){
        const response = await fetch("http://localhost:5000/api/lancamentos")
        const lancamentos = await response.json()
        const ano = new Ano()
        ano.adicionarMes(new Mes("janeiro"))
        ano.adicionarMes(new Mes("fevereiro"))
        ano.adicionarMes(new Mes("março"))
        for(const lancamento of lancamentos){
            ano.adicionarLancamento(lancamento.mes, new Lancamento(lancamento.categoria, lancamento.tipo, parseFloat(lancamento.valor), lancamento.idLancamento))
        }
        ano.calcularSaldo()
        this.ano = ano
        this.renderizar()
    }
    formatarDinheiro (valor){
        return new Intl.NumberFormat("pt-br", { currency: "BRL", style: 'currency'}).format(valor)
    }

    renderizar (){
        document.querySelector("#app").remove()
        const app = new Div("app") 

        const titulo = new H4 ("Finanças Pessoais")

        app.adicionarElementoFilho(titulo.element)

        const form = new Div('form-lancamento')
        app.adicionarElementoFilho(form.element)
        const mesSelect = new Select("mes")
        for(const mes of this.ano.meses){
            mesSelect.addOption(mes.nome)
        }
        const tipoSelect = new Select("tipo")
        tipoSelect.addOption("receita")
        tipoSelect.addOption("despesa")
        const categoriaInputText = new Input("categoria", "text", "Categoria")
        const valorInputNumber = new Input("valor", "number", "valor")
        const adicionarButton = new Button("botao", "Adicionar Lançamento")
        adicionarButton.addListener(()=> this.adicionarLacamento())
        form.adicionarElementoFilho(mesSelect.element)
        form.adicionarElementoFilho(tipoSelect.element)
        form.adicionarElementoFilho(categoriaInputText.element)
        form.adicionarElementoFilho(valorInputNumber.element)
        form.adicionarElementoFilho(adicionarButton.element)

        const grafico = new Grafico()
        for(const mes of this.ano.meses){
            grafico.adicionarColuna(mes.totalizador.saldo, mes.nome)
        }
        app.adicionarElementoFilho(grafico.element)

        for(const mes of this.ano.meses){
            const nomeDoMes = new H4(mes.nome)
            app.adicionarElementoFilho(nomeDoMes.element)
            const tabelaLancamentos = new Tabela("tabela-lancamentos")
            tabelaLancamentos.addRow("th",["Categoria", "Valor"] )

            for(const lancamento of mes.lancamentos){
                const button = new Button ("delete-lancamento", "delete")
                button.addListener(()=> {
                    this.deletarLancamento(lancamento.idLancamento)
                    this.ano.deletarLancamento(mes, lancamento)
                    this.renderizar()
                    
                })
                tabelaLancamentos.addRow("td", [lancamento.categoria, this.formatarDinheiro(lancamento.getValorString())], [button])
            }
            tabelaLancamentos.addRow("th", [ "Total", this.formatarDinheiro(mes.totalizador.saldo)])
            tabelaLancamentos.addRow("th", ["Juros", mes.totalizador.juros !== 0 ? " " + this.formatarDinheiro(mes.totalizador.juros) : "R$ 0"])
            tabelaLancamentos.addRow("th", ["Rendimentos", mes.totalizador.rendimentos !== 0 ? " " +this.formatarDinheiro(mes.totalizador.rendimentos) : "R$ 0"])
            app.adicionarElementoFilho(tabelaLancamentos.element)
        }
        const [body] = document.getElementsByTagName("body")
        body.appendChild(app.element)
    }

    adicionarLacamento(){
        const mes = document.querySelector('#mes').value
        const categoria = document.querySelector("#categoria").value
        const tipo = document.querySelector("#tipo").value
        const valor = document.querySelector('#valor').value
        this.ano.adicionarLancamento(mes, new Lancamento(categoria, tipo, parseFloat(valor)))
        fetch("http://localhost:5000/api/lancamentos", {method: "post",headers:{"content-type": "application/json"}, body: JSON.stringify({mes: mes, categoria: categoria, tipo: tipo, valor: valor})})
        this.ano.calcularSaldo()
        this.renderizar()
        document.querySelector('#valor').value = ""   
        document.querySelector('#categoria').value = "" 
        document.querySelector('#tipo').value = "receita" 
        document.querySelector('#mes').value = this.ano.meses[0].nome
    }

   // deletarLancamento (idLancamento) {
     //   console.log("metodo deletelancamento id do argumento "+ idLancamento)
		//fetch("http://localhost:5000/api/lancamentos/" + idLancamento, { method: "delete" });
	//}
    deletarLancamento(idLancamento){
        console.log(idLancamento)
        fetch(`http://localhost:5000/api/lancamentos/${idLancamento}`, {method: "delete"})
        //this.ano.calcularSaldo()
        //this.renderizar()
    }
}