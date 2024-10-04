const express = require("express") //iniciando express
const router = express.Router() // configurando primeira parte da rota 
const cors = require('cors') //trazendo o pacote cors

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require('./mulherModel')
const app = express() //iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333   //criando a porta



//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao

    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json (mulherCriada)
    }catch (erro) {
        console.log(erro)
    }
}

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch(erro) {
        console.log(erro)

    } 
}

//PATCH
async function corrigeMulher(request, response){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados)
    } }catch (erro){
        console.log(erro)
    }
}



//DELETE
async function deletaMulher(request, response){
    try{
        await Mulher.findIdAndDelete (reques.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso!'})

    } catch(erro){
        console.log(erro)
    }

}


app.use(router.get('/mulheres', mostraMulheres)) // rota get/ mulheres
app.use(router.post('/mulheres', criaMulher)) //rota post/mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //rota patch - corrige item da lista 
app.use(router.delete('/mulheres/:id',deletaMulher)) //rota delete - excluir um item da

//Porta
function mostraPorta() {
    console.log ("Servidor criado e rodando na porta ", porta)
}



app.listen(porta, mostraPorta) // seridor ouvindo a porta