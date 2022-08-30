class Tela{
    constructor(lancamentoService){
        this.lancamentoService = lancamentoService
        this.init()
    }

    async init(){
        this.lancamentos = await this.lancamentoService.getLancamentos()
        this.ano = new Ano()
        for(const lancamento of this.lancamentos){
            this.ano.adicionarLancamento(lancamento.mes, new Lancamento(lancamento.categoria, lancamento.tipo, parseFloat(lancamento.valor), lancamento.idLancamento))
        }
        this.ano.calcularSaldo()
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

        const form = this.criarForm()
        app.adicionarElementoFilho(form.element)

        const grafico = this.criarGrafico()
        app.adicionarElementoFilho(grafico.element)

        for(const mes of this.ano.meses){
            this.nomeDoMes = new H4(mes.nome)
            app.adicionarElementoFilho(this.nomeDoMes.element)

            const tabelaLancamentos = this.criarTabelaLancamentos(mes)
            app.adicionarElementoFilho(tabelaLancamentos.element)
        }
        const [body] = document.getElementsByTagName("body")
        body.appendChild(app.element)
    }

    adicionarLacamento(){
        const mes = this.mesSelect.getValue() 
        const categoria = this.categoriaInputText.getValue() 
        const tipo = this.tipoSelect.getValue()
        const valor = this.valorInputNumber.getValue()
        this.ano.adicionarLancamento(mes, new Lancamento(categoria, tipo, parseFloat(valor)))
        const lancamento = {
            mes: mes,
            categoria: categoria,
            tipo: tipo,
            valor: valor
        }
        console.log(lancamento)
        this.lancamentoService.saveLancamentos(lancamento)
        this.ano.calcularSaldo()
        this.renderizar()
    }

    deletarLancamento(mes, lancamento){
        const idLancamento = lancamento.idLancamento
        this.lancamentoService.daleteLancamento(idLancamento)
            this.ano.deletarLancamento(mes, lancamento)
            this.ano.calcularSaldo()
            this.renderizar()
    }

    criarForm(){
        this.form = new Div('form-lancamento')
        this.mesSelect = new Select("mes")
        for(const mes of this.ano.meses){
            this.mesSelect.addOption(mes.nome)
        }
        this.tipoSelect = new Select("tipo")
        this.tipoSelect.addOption("receita")
        this.tipoSelect.addOption("despesa")
        this.categoriaInputText = new Input("categoria", "text", "Categoria")
        this.valorInputNumber = new Input("valor", "number", "valor")
        this.adicionarButton = new Button("botao", "Adicionar Lançamento")
        this.adicionarButton.addListener(()=> this.adicionarLacamento())
        this.form.adicionarElementoFilho(this.mesSelect.element)
        this.form.adicionarElementoFilho(this.tipoSelect.element)
        this.form.adicionarElementoFilho(this.categoriaInputText.element)
        this.form.adicionarElementoFilho(this.valorInputNumber.element)
        this.form.adicionarElementoFilho(this.adicionarButton.element)
        return this.form
    }

    criarGrafico(){
        this.grafico = new Grafico()
        for(const mes of this.ano.meses){
            this.grafico.adicionarColuna(mes.totalizador.saldo, mes.nome)
        }
        return this.grafico
    }

    criarTabelaLancamentos(mes){
        this.tabelaLancamentos = new Tabela("tabela-lancamentos")
        this.tabelaLancamentos.addRow("th",["Categoria", "Valor"] )

        for(const lancamento of mes.lancamentos){
            const button = new Button ("delete-lancamento", "delete")
            button.addListener(()=> {
                this.deletarLancamento(mes, lancamento)
            })
            this.tabelaLancamentos.addRow("td", [lancamento.categoria, this.formatarDinheiro(lancamento.getValorString())], [button])
            }
            this.tabelaLancamentos.addRow("th", [ "Total", this.formatarDinheiro(mes.totalizador.saldo)])
            this.tabelaLancamentos.addRow("th", ["Juros", mes.totalizador.juros !== 0 ? " " + this.formatarDinheiro(mes.totalizador.juros) : "R$ 0"])
            this.tabelaLancamentos.addRow("th", ["Rendimentos", mes.totalizador.rendimentos !== 0 ? " " +this.formatarDinheiro(mes.totalizador.rendimentos) : "R$ 0"])
            return this.tabelaLancamentos
    }
}