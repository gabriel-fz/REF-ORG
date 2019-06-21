const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

//---------Funções para a tela de bibliografia---------
function listaBibliografia(){
    const refs = db.get('referencias').sortBy('text').value()
    let b = document.querySelector('div#bibliografia')
    let mostraReferencias = ''
    for (let contador in refs) {
        mostraReferencias += `<p class="text-justify ref-bib"> ${refs[contador].text} </p>`
    } 
    b.innerHTML = mostraReferencias
}

//---------Funções para a tela de referências bibliográficas---------

function adicionarReferencias(){
  let txta = document.querySelector('textarea#txtReferencia').value
  txta ?  db.get('referencias').push({id: `${db.get('referencias').size().value()+1}`, text: `${txta}`}).write()
  : alert("Campo não preenchido")
}

function editarReferencias(idRef){
  let txta = document.querySelector(`textarea#novaReferencia${idRef}`).value
  txta  ? db.get('referencias').find({id: `${idRef}`}).assign({text: `${txta}`}).write()
  : alert("Campo não preenchido")
}

function excluirReferencias(idRef){
  decisao = confirm("Você deseja mesmo deletar esta citação?")
  if(decisao){
    db.get('referencias').remove({id: `${idRef}`}).write()
  }
}

function listaReferencias(){
  const refs = db.get('referencias').value()
  let r = document.querySelector('div#referencias')
  let mostraReferencias = ''
  for (let contador in refs) {
      mostraReferencias += `<div class="card my-2">
                              <div class="row no-gutters">
                                <div class="col-2 texto-centro">
                                  <button class="btn btn-two btn-lg mx-2" data-toggle="modal" data-target="#Modal${refs[contador].id}"><i class="fas fa-pen fa-sm"></i></button>
                                  <button class="btn btn-two btn-lg mx-2" onclick="excluirReferencias(${refs[contador].id})"><i
                                      class="fas fa-trash-alt fa-sm"></i></button>
                                </div>
                                <div class="col-10">
                                  <div class="card-body">
                                    <p class="card-text">
                                      ${refs[contador].text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div class="modal fade" id="Modal${refs[contador].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title">Editar</h5>
                                </div>
                                <div class="modal-body">
                                  <textarea class="form-control mt-2" id="novaReferencia${refs[contador].id}" rows="3">${refs[contador].text}</textarea>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-one" onclick="editarReferencias(${refs[contador].id})">Salvar</button>
                                  <button type="button" class="btn btn-one" data-dismiss="modal">Cancelar</button>
                                </div>
                              </div>
                            </div>
                          </div>`
  }
  r.innerHTML = mostraReferencias
}

//---------Funções para a tela de citações---------

function listaCitacoes(){
  const cits = db.get('citacoes').value()
  let c = document.querySelector('div#citacoes')
  let mostraCitacoes = ''
  for (let contador in cits) {
      mostraCitacoes += `<div class="card my-2">
                              <div class="row no-gutters">
                                <div class="col-2 texto-centro">
                                  <button class="btn btn-two btn-lg mx-2" data-toggle="modal" ><i class="fas fa-pen fa-sm"></i></button>
                                  <button class="btn btn-two btn-lg mx-2" ><i
                                      class="fas fa-trash-alt fa-sm"></i></button>
                                </div>
                                <div class="col-10">
                                  <div class="card-body">
                                    <div id="Citacao"></div>
                                    <p class="card-text">
                                      ${cits[contador].textCitacao}
                                    </p>
                                    <div class="dropdown-divider"></div>
                                    <div id="referenciaCitacao"></div>
                                    <p class="card-text">
                                      ${cits[contador].textReferencia}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>`
  }
  c.innerHTML = mostraCitacoes
}

function adicionarCitacoes(){
  let txtar = document.querySelector('textarea#txtReferenciac').value
  let txtac = document.querySelector('textarea#txtCitacao').value
  txtar && txtac ?  db.get('citacoes').push({id: `${db.get('citacoes').size().value()+1}`, textCitacao: `${txtac}`, textReferencia: `${txtar}`}).write()
  : alert("Campos não preenchidos")
}