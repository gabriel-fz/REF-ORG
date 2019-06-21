/* 

Link da documentação no github do banco de dados LowDB:
https://github.com/typicode/lowdb

*/


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//criar
db.set('server1', []).write()

//postar (armazenar)
db.get('server1').push({
    id: "001",
    nick: "gabriel",
}).write()

//printar na tela uma pesquisa pelo id
console.log(
    db.get('server1').find({id: "001"}).value()
)

//editar
db.get('server1').find({id: "001"}).assign({nick: "Gabriel Fiorese", teste: "testando"}).write()

//atribuindo uma pesquisa a uma variavel
let pesquisa = db.get('server1').find({id: "001"}).value()
console.log(pesquisa)

//removendo algo
//db.get('server1').remove({id: "001"}).write()

//quantidade de itens no banco de dados:
db.get('server1').size().value()

console.log("dados no banco:")
console.log(
    db.get('server1').size().value()
)

console.log("------- teste: ---------")
let pessoa = db.get('server1').find({id: "001"}).value()
console.log(pessoa.nick)