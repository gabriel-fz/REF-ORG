const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

//---------Funções para a tela de bibliografia---------
function listBibliografia(){
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
  let a = document.querySelector('textarea#txtReferencia').value
  db.get('referencias').push({
    id: `${db.get('referencias').size().value()+1}`,
    text: `${a}`
  }).write()
}

function listReferencias(){
  const refs = db.get('referencias').value()
  let b = document.querySelector('div#referencias')
  let mostraReferencias = ''
  for (let contador in refs) {
      mostraReferencias += `<div class="card my-2">
                              <div class="row no-gutters">
                                <div class="col-2 texto-centro">
                                  <button class="btn btn-two btn-lg mx-2"><i class="fas fa-pen fa-sm"></i></button>
                                  <button class="btn btn-two btn-lg mx-2" onclick="excluir()"><i
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
                            </div>`
  }
  b.innerHTML = mostraReferencias
}