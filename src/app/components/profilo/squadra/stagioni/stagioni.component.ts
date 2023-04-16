import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';
import { stagione_obj } from 'src/app/objects/stagione';

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
  popupdocs: number = -1;
  opencartella: number = -1;
  stagionesezione: number = 2;
  eliminapopup: number = 0;
  popupelimination: any[] = [-1, -1];

  ngOnInit() {
    this.sc.stagione()
    this.stagione()
  }

  eliminationFunction(valore: any, valorechild: any) {
    if (valore == 1) {
      this.eliminaCorso(valorechild)
    } else if (valore == 2) {
      this.elimina__documento(valorechild)
    } else if (valore == 3) {
      this.elimina__galleria(valorechild)
    }
    this.popupelimination = [-1, -1];
  }

  blockBodyScroll() {
    let body = Array.from(
      document.getElementsByTagName("body"),
    );
    let cssi = document.getElementById("cssi");
    if ((this.popup == -1) && (this.popupdocs == -1)) {
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

  stagioneTakeData(){
    const db = getDatabase();

    let sezioni = ["corsi","documenti","galleria"]
    let sezioni__array = [this.stagioneData_corsi,this.stagioneData_documenti,this.stagioneData_galleria]
    
    for (let i=0;i <= sezioni.length; i++){
      const starCountRef_corsi = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/"+sezioni[i]);
      onValue(starCountRef_corsi, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          sezioni__array[i].push(childSnapshot.val())
        })
      })
    }
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

  aggiungicorso() {
    this.messagesector = 1
    
    const db = getDatabase();

    const creazione = new Date();
    const postListRef = ref(db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/corsi/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      titolo: "Nuovo corso",
      descrizione:"",
      creato: creazione
    })
    this.stagione()

    if (this.stagioneData.corsi.length < 20) {
      this.message = "Corso aggiunto"
    } else {
      this.messagErrore = "Hai raggiunto il numero massimo di corsi"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  modificacorso(corso: any, val1: any, val2: any, val3: any) {
    this.messagesector = 1
    for (let i = 0; i < this.stagioneData.corsi.length; i++) {
      if (corso == i) {
        this.stagioneData.corsi[corso]["titolo"] = val1;
        this.stagioneData.corsi[corso]["descrizione"] = val2;
        this.stagioneData.corsi[corso]["prezzo"] = val3;
      }
    }
    this.update_stagione_principale()
    this.opencorso = -1
    this.message = "Corso modificato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  elimina__documento(documento: any) {
    this.messagesector = 2
    this.stagioneData.documenti.splice(documento, 1)
    this.update_stagione_principale()
    this.message = "Documento eliminato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
    this.popup = -1
    this.popupdocs = -1
  }

  aggiungi__documento() {
    this.messagesector = 2
    /* this.stagioneData.corsi.push({titolo:"",descriione:"",prezzo:""}) */
    if (this.stagioneData.documenti.length < 10) {
      this.stagioneData.documenti.push(
        {
          titolo: "Nuovo documento",
          descrizione: "",
          filter: [""],
          atleti: [""]
        })
      this.update_stagione_principale()
      this.message = "Documento aggiunto"
    } else {
      this.messagErrore = "Hai raggiunto il numero massimo di Documenti"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  modifica__documento(documento: any, val1: any, val2: any) {
    this.messagesector = 2
    for (let i = 0; i < this.stagioneData.documenti.length; i++) {
      if (documento == i) {
        this.stagioneData.documenti[documento]["titolo"] = val1;
        this.stagioneData.documenti[documento]["descrizione"] = val2;
      }
    }
    this.update_stagione_principale()
    this.message = "Documento modificato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
    this.popupdocs = -1
    this.popup = -1
  }


  elimina__galleria(cartella: any) {
    this.messagesector = 2
    this.stagioneData.galleria.splice(cartella, 1)
    this.update_stagione_principale()
    this.message = "cartella eliminata"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
    this.popup = -1
    this.popupdocs = -1
  }

  aggiungi__galleria() {
    this.messagesector = 2
    /* this.stagioneData.corsi.push({titolo:"",descriione:"",prezzo:""}) */
    if (this.stagioneData.galleria.length < 10) {
      this.stagioneData.galleria.push(
        {
          titolo: "Nuova cartella immagini",
          descrizione: "",
          filter: [""],
          atleti: [""]
        })
      /* this.update_stagione_principale() */
      this.update_stagione_principale()
      this.message = "Nuova cartella aggiunta"
    } else {
      this.messagErrore = "Hai raggiunto il numero massimo di cartelle"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  modifica__galleria(immagine: any, val1: any, val2: any) {
    this.messagesector = 2
    for (let i = 0; i < this.stagioneData.galleria.length; i++) {
      if (immagine == i) {
        this.stagioneData.galleria[immagine]["titolo"] = val1;
        this.stagioneData.galleria[immagine]["descrizione"] = val2;
      }
    }
    this.update_stagione_principale()
    this.message = "Documento modificato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
    this.popupdocs = -1
    this.popup = -1
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
  }
}
