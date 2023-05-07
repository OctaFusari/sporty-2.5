import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';
import { stagione_obj } from 'src/app/objects/stagione';
import { corso } from 'src/app/objects/corso';
import { documento } from 'src/app/objects/documento';

@Component({
  selector: 'app-stagioni',
  templateUrl: './stagioni.component.html',
  styleUrls: ['./stagioni.component.css']
})
export class StagioniComponent implements OnInit {
  @Input() squadraScelta: any = "";

  constructor(public sc: SquadraContainerComponent) { }

  stagioni: any[] = []
  iscrittiStagionevar: any[] = []
  stagioniSection: number = 0
  message = ""
  messagErrore = ""
  messagesector = 0
  stagioneData: any = "";
  stagioneData_corsi: any[] = []
  stagioneData_documenti: any[] = []
  stagioneData_galleria: any[] = []


  popup: number = -1;
  opencorso: number = -1;
  opendoc: number = -1;
  opencartella: number = -1;
  stagionesezione: number = 2;
  eliminapopup: number = 0;
  popupelimination: any[] = [-1, -1];

  ngOnInit() {
    this.sc.stagione()
    this.stagione()
  }

  eliminationFunction(valore: any, valorechild: any) {
/*     if (valore == 1) {
      this.eliminaCorso(valorechild)
    } else if (valore == 2) {
      this.elimina__documento(valorechild)
    } else if (valore == 3) {
      this.elimina__galleria(valorechild)
    }
    this.popupelimination = [-1, -1]; */
  }

  blockBodyScroll() {
    let body = Array.from(
      document.getElementsByTagName("body"),
    );
    let cssi = document.getElementById("cssi");
    if ((this.popup == -1) && (this.opendoc == -1)) {
      body.forEach(body => {
        body.style.overflowY = 'scroll';
      });
      cssi!.style.overflowY = 'scroll';
    } else {
      body.forEach(body => {
        body.style.overflowY = 'hidden';
      });
      cssi!.style.overflowY = 'hidden';
    }
  }

  stagione() {
    this.stagioni.length = 0;
    const db = getDatabase();
    const starCountRef = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val())
      })
    })

  }

  stagioneTakeData(stagione:any){
    const db = getDatabase();
    this.stagioneData_corsi = [""]
    this.stagioneData_documenti = [""]
    this.stagioneData_galleria = [""]

    let sezioni = ["corsi","documenti","galleria"]
    let sezioni__array = [this.stagioneData_corsi,this.stagioneData_documenti,this.stagioneData_galleria]
    
    for (let i=0;i <= sezioni.length; i++){
      const starCountRef_corsi = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + stagione.id+"/"+sezioni[i]);
      onValue(starCountRef_corsi, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          sezioni__array[i].push(childSnapshot.val())
        })
      })
    }
    this.stagioneData = stagione;

    console.log(this.stagioneData_corsi)
    console.log(stagione.id)
  }

  aggiungi__stagione() {
    let corsi: any[] = [""]
    let documenti: any[] = [""]
    let galleria: any[] = [""]
    const db = getDatabase();

    const creazione = new Date();
    const postListRef = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      codestagione: "",
      corsi: corsi,
      creator: "",
      datafine: "",
      datainizio: "",
      iscrittistagione: "",
      nomestagione: "Nuova stagione",
      documenti: documenti,
      galleria: galleria,
      creazione: creazione.toLocaleDateString(),
      attiva: true
    });

    this.stagioniSection = 1;
    this.stagione()
  }

  public imagePath: any = "";
  imgURL: any = "";

  preview0(files: any) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

  }

  eliminaStagione() {
    const db = getDatabase();
    const starCountprimary = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id);
    remove(starCountprimary);
    this.sc.stagione();
    this.stagione();
    this.eliminapopup = 0
    this.stagioniSection = 0;
    this.stagioneData = "";
  }

  updateData(nomemod:any, iniziomod:any, finemod:any){
    this.stagioneData.nomestagione = nomemod;
    this.stagioneData.datafine = finemod;
    this.stagioneData.datainizio = iniziomod;
    this.update_stagione_principale() 
  }

  update_stagione_principale() {
    if(this.stagioneData.nomestagione != ""){
      const db = getDatabase();
      let stagione: stagione_obj
      stagione = {
        id: this.stagioneData.id,
        codestagione: this.stagioneData.codestagione,
        corsi: this.stagioneData.corsi,
        creator: this.stagioneData.creator,
        datafine: this.stagioneData.datafine,
        datainizio: this.stagioneData.datainizio,
        iscrittistagione: this.stagioneData.iscrittistagione,
        nomestagione: this.stagioneData.nomestagione,
        documenti: this.stagioneData.documenti,
        galleria: this.stagioneData.galleria,
        creazione: this.stagioneData.creazione,
        attiva: this.stagioneData.attiva
      }
      const updates: any = {};
  
      updates['squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id] = stagione;
  
      update(ref(db), updates);
      
    }else{
      this.messagErrore = "Assegna un nome alla stagione"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }
  }

  aggiungiCorso() {
    this.messagesector = 1
    
    const db = getDatabase();

    const creazione = new Date();
    const postListRef = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/corsi/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      titolo: "Nuovo corso",
      descrizione:"",
      prezzo:"",
      creato: new Date()
    })
    this.stagione()
    this.stagioneTakeData(this.stagioneData)

    console.log(this.stagioni)
/* 
    if (this.stagioneData.corsi.length < 20) {
      this.message = "Corso aggiunto"
    } else {
      this.messagErrore = "Hai raggiunto il numero massimo di corsi"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000); */
  }
  
  aggiungiDocumento() {
    this.messagesector = 1
    
    const db = getDatabase();

    const creazione = new Date();
    const postListRef = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/documenti/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      titolo:"Nuovo documento",
      descrizione:"",
      approvazioni:"",
      filter:"",
      creazione: creazione
    })
    this.stagione()

    if (this.stagioneData.documento.length < 20) {
      this.message = "Documento aggiunto"
    } else {
      this.messagErrore = "Hai raggiunto il numero massimo di documenti"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  aggiungiCartella() {
    this.messagesector = 1
    
    const db = getDatabase();

    const creazione = new Date();
    const postListRef = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/galleria/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      titolo:"Nuovo documento",
      descrizione:"",
      immagini:"",
      filter:"",
      creazione: creazione
    })
    this.stagione()

    if (this.stagioneData.cartella.length < 20) {
      this.message = "Cartella aggiunta"
    } else {
      this.messagErrore = "Hai raggiunto il numero massimo di cartella"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  modificaCorso(id:any, titolo:any, descrizione:any, prezzo:any, creazione:any){
    if(titolo != ""){
      const db = getDatabase();
      let corso: corso
      corso = {
        id: id,
        titolo: titolo,
        descrizione:descrizione,
        prezzo: prezzo,
        creazione: creazione
      }
      const updates: any = {};
  
      updates['squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/corsi/"+id] = corso;
  
      update(ref(db), updates);
      
    }else{
      this.messagErrore = "Assegna un titolo al corso"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }
    this.update_stagione_principale()
  }

  modificaDocumento(id:any, titolo:any, descrizione:any, approvazioni:any, filter:any, creazione:any){
    if(titolo != ""){
      const db = getDatabase();
      let documento: documento
      documento = {
        id: id,
        titolo: titolo,
        descrizione:descrizione,
        approvazioni:approvazioni,
        filter: filter,
        creazione: creazione
      }
      const updates: any = {};
  
      updates['squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/documenti/"+id] = documento;
  
      update(ref(db), updates);
      
    }else{
      this.messagErrore = "Assegna un titolo al documento"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }
    this.update_stagione_principale()
  }

  eliminaCorso(corso: any) {
    this.messagesector = 1
    this.stagioneData.corsi.splice(corso, 1)
    this.update_stagione_principale()
    this.message = "stagione eliminata"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }



}

/* 

      this.eliminaCorso(valorechild)
    } else if (valore == 2) {
      this.elimina__documento(valorechild)
    } else if (valore == 3) {
      this.elimina__galleria(valorechild)

*/