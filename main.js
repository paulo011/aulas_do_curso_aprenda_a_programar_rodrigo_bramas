
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

    for(const mes of ano.meses){
        addElement(painel, "h3", mes.nome)
    
        for(const lancamento of mes.lancamentos){
            const detalhesLancamento = lancamento.categoria + " " + lancamento.tipo + " " + lancamento.valor
            addElement(painel, "p", detalhesLancamento)
        }

        addElement(painel, "h4", mes.totalizador.saldo)
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
    document.querySelector('#tipo').value = "" 
    document.querySelector('#mes').value = ""
}

const botao = document.querySelector('#botao')
botao.addEventListener("click", adicionarLacamento)