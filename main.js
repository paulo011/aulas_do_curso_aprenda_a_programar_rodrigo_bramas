
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