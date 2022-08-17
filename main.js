
console.log('programa para monitorar as finanças pessoais')

const janeiro = new Mes("janeiro")

janeiro.adicionarLacamento(new Lancamento('salário','receita', 3000))
janeiro.adicionarLacamento(new Lancamento('aluguel','despesa' ,1000)) 
janeiro.adicionarLacamento(new Lancamento('conta de luz', 'despesa' ,200))
janeiro.adicionarLacamento(new Lancamento('conta de água','despesa' ,100))
janeiro.adicionarLacamento(new Lancamento('internet','despesa' ,100))
janeiro.adicionarLacamento(new Lancamento('transporte','despesa' ,300))
janeiro.adicionarLacamento(new Lancamento('lazer','despesa' ,300))
janeiro.adicionarLacamento(new Lancamento('alimentação','despesa' ,500))
janeiro.adicionarLacamento(new Lancamento("condomínio", "despesa", 300))
janeiro.adicionarLacamento(new Lancamento("Farmácia", "despesa", 100))

const fevereiro = new Mes("fevereiro")

fevereiro.adicionarLacamento(new Lancamento('salário','receita', 3000))
fevereiro.adicionarLacamento(new Lancamento('aluguel','despesa' ,1200)) 
fevereiro.adicionarLacamento(new Lancamento('conta de luz', 'despesa' ,250))
fevereiro.adicionarLacamento(new Lancamento('conta de água','despesa' ,100))
fevereiro.adicionarLacamento(new Lancamento('internet','despesa' ,100))
fevereiro.adicionarLacamento(new Lancamento('transporte','despesa' ,500))
fevereiro.adicionarLacamento(new Lancamento('lazer','despesa' ,1000))
fevereiro.adicionarLacamento(new Lancamento('alimentação','despesa' ,400))

const ano = new Ano()
ano.adicionarMes(janeiro)
ano.adicionarMes(fevereiro)
ano.calcularSaldo()

const addElement = (parent, elementType, text) => {

    const element = document.createElement(elementType)

    if(text){
        element.innerText = text
    }

    parent.appendChild(element)
}

function renderizar (){
    const app = document.querySelector("#app")
    if(app.firstChild){
        app.firstChild.remove()
    }

    const painel = document.createElement("div")

    const cores = ["red", "red", "red", "blue"]
    const grafico = document.createElement("div")
    grafico.className = "grafico"
    painel.appendChild(grafico)
    for(const mes of ano.meses){
        const coluna = document.createElement("div")
        coluna.className = 'grafico-coluna'
        const cor = document.createElement("div")
        let width = (mes.totalizador.saldo * 100) /100
        cor.style.height =  width + "px"
        cor.style.width = '150px'
        cor.style.background = cores.pop()
        const nomeDoMes = document.createElement("div")
        nomeDoMes.innerText = mes.nome
        nomeDoMes.style.textAlign = "center"
        coluna.appendChild(cor)
        coluna.appendChild(nomeDoMes)

        grafico.appendChild(coluna)
    }


    for(const mes of ano.meses){
        addElement(painel, "h3", mes.nome)
        const tabelaLancamentos = document.createElement("table")   
        tabelaLancamentos.className = "tabela-lancamentos"

        const linhaTitulo = document.createElement("tr")

        addElement(linhaTitulo, "th", "Categoria")
        addElement(linhaTitulo, "th", "Valor")
        tabelaLancamentos.appendChild(linhaTitulo)

        for(const lancamento of mes.lancamentos){
            const linhalancamentos = document.createElement("tr")
            addElement(linhalancamentos, "td", lancamento.categoria)
            addElement(linhalancamentos, "td", lancamento.tipo === "receita"? "+ "+ formatarDinheiro(lancamento.valor) : "- "+ formatarDinheiro(lancamento.valor))
            tabelaLancamentos.appendChild(linhalancamentos)
        }

        const linhaSaldo = document.createElement("tr")

        addElement(linhaSaldo, "th", "Total")
        addElement(linhaSaldo, "th", formatarDinheiro(mes.totalizador.saldo))
        tabelaLancamentos.appendChild(linhaSaldo)
        
        const linhaJuros = document.createElement("tr")

        addElement(linhaJuros, "th", "Jutros")
        addElement(linhaJuros, "th",mes.totalizador.juros !== 0 ? " " + formatarDinheiro(mes.totalizador.juros) : "R$ 0")
        tabelaLancamentos.appendChild(linhaJuros)
        
        const linhaRendementos = document.createElement("tr")

        addElement(linhaRendementos, "th", "Rendimentos")
        addElement(linhaRendementos, "th", mes.totalizador.rendimentos !== 0 ? " " +formatarDinheiro(mes.totalizador.rendimentos) : "R$ 0")
        tabelaLancamentos.appendChild(linhaRendementos)

        painel.appendChild(tabelaLancamentos)
        addElement(painel, "hr")

    }

    app.appendChild(painel)
    
}

renderizar()

function adicionarLacamento(){
    const mes = document.querySelector('#mes').value
    const categoria = document.querySelector("#categoria").value
    const tipo = document.querySelector("#tipo").value
    const valor = document.querySelector('#valor').value
    ano.adicionarLancamento(mes, new Lancamento(categoria, tipo, parseFloat(valor)))
    ano.calcularSaldo()
    renderizar()
    document.querySelector('#valor').value = ""   
    document.querySelector('#categoria').value = "" 
    document.querySelector('#tipo').value = "receita" 
    document.querySelector('#mes').value = ano.meses[0].nome
}

const botao = document.querySelector('#botao')
botao.addEventListener("click", adicionarLacamento)


const mesSelect = document.getElementById("mes")
for (const mes of ano.meses){
    const option = document.createElement("option")
    option.text = mes.nome
    mesSelect.add(option)

}