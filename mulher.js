const express = require("express")
const router = express.Router()

const conectaBancoDeDados = require('./bancodedados')
conectaBancoDeDados()

const app = express()
const porta = 3333

function mostraMulher (request, response) {
    response.json({
        nome: 'Silmara Conceição',
        imagem: 'http://guthub.com/silmaracoceicao.png',
        minibio: 'Desenvolvedora e Instrutora'
    })
}

function mostraPorta () {
    console.log ("Servidor criado e rodando na porta ", porta)
}


app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)