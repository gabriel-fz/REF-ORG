const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const refs = db.get('referencias').sortBy('text').value()


function listBibliografia(){
    let b = document.querySelector('div#bibliografia')
    let mostraReferencias = ''
    for (let contador in refs) {
        mostraReferencias += '<p class="text-justify ref-bib">'
          mostraReferencias += refs[contador].text
        mostraReferencias += '</p>'
    }

    b.innerHTML = mostraReferencias
}

function listReferencias(){
  let b = document.querySelector('div#bibliografia')
  let mostraReferencias = ''
  for (let contador in refs) {
      mostraReferencias += '<p class="text-justify">'
        mostraReferencias += refs[contador].text
      mostraReferencias += '</p>'
  }

  b.innerHTML = mostraReferencias
}