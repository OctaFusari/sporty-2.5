import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';
import { stagione_obj } from 'src/app/objects/stagione';
import { corso } from 'src/app/objects/corso';
import { documento } from 'src/app/objects/documento';
import { galleria_folder } from 'src/app/objects/galleria_folder';

@Component({
  selector: 'app-stagioni',
  templateUrl: './stagioni.component.html',
  styleUrls: ['./stagioni.component.css']
})
export class StagioniComponent implements OnInit {
  @Input() squadraScelta: any = "";

  constructor(public sc: SquadraContainerComponent) { }
  db = getDatabase();
  stagioni: any[] = [];
  stagioniSection: number = 0;
  message = "";
  messagErrore = "";
  messagesector = 0;
  stagioneData: any = "";
  stagioneData_corsi: any[] = [];
  stagioneData_documenti: any[] = [];
  stagioneData_galleria: any[] = [];

  popup: number = -1;
  opencorso: number = -1;
  opendoc: number = -1;
  opencartella: number = -1;
  stagionesezione: number = 2;
  eliminapopup: number = 0;
  popupelimination: any = 0;

  closeOpen(){
    this.popup = -1;
    this.opencorso = -1;
    this.opendoc = -1;
    this.opencartella = -1;
  }

  ngOnInit() {
    this.sc.stagione()
    this.stagione()
  }

  eliminationFunction(valore: any, id: any) {
    this.popupelimination=0
    if (valore == 1) {
      const starCountprimary = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/corsi/"+id);
      remove(starCountprimary);
    } else if (valore == 2) {
      const starCountprimary = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/documenti/"+id);
      remove(starCountprimary);
    } else if (valore == 3) {
      const starCountprimary = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/galleria/"+id);
      remove(starCountprimary);
    }

    this.stagione()
    this.stagioneTakeData(this.stagioneData)

    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
    onValue(starCountRef, (snapshot) => {
        this.stagioneData = snapshot.val();
      
    })

    this.message = "eliminato con successo"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
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
    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val())
      })
    })

  }

  stagioneTakeData(stagione:any){
    this.stagioneData_corsi = [""]
    this.stagioneData_documenti = [""]
    this.stagioneData_galleria = [""]

    let sezioni = ["corsi","documenti","galleria"]
    let sezioni__array = [this.stagioneData_corsi,this.stagioneData_documenti,this.stagioneData_galleria]
    
    for (let i=0;i <= sezioni.length; i++){
      const starCountRef_corsi = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + stagione.id+"/"+sezioni[i]);
      onValue(starCountRef_corsi, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          sezioni__array[i].push(childSnapshot.val())
        })
      })
    }
    this.stagioneData = stagione;
    
  }

  aggiungi__stagione() {
    const db = getDatabase();

    const creazione = new Date();
    const postListRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      codestagione: "",
      corsi: "",
      creator: "",
      datafine: "",
      datainizio: "",
      iscrittistagione: "",
      nomestagione: "Nuova stagione",
      documenti: "",
      galleria: "",
      creazione: creazione.toLocaleDateString(),
      attiva: true
    });

    this.stagione()

    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
    onValue(starCountRef, (snapshot) => {
        this.stagioneData = snapshot.val();
    })
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
    const starCountprimary = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id);
    remove(starCountprimary);
    this.sc.stagione();
    this.stagione();
    this.stagioneData_corsi = [];
    this.stagioneData_documenti = [];
    this.stagioneData_galleria = [];
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
    this.stagione()
    this.stagioneTakeData(this.stagioneData);

    if(this.stagioneData.nomestagione != ""){
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
  
      update(ref(this.db), updates);
      
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

    const creazione = new Date();
    const postListRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/corsi/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      titolo: "Nuovo corso",
      descrizione:"",
      prezzo:"",
      creazione: creazione.toLocaleDateString()
    })

      this.stagione()
      this.stagioneTakeData(this.stagioneData)

      const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
      onValue(starCountRef, (snapshot) => {
          this.stagioneData = snapshot.val();
        
      })

  }
  
  aggiungiDocumento() {
    this.messagesector = 1;
    const creazione = new Date();
    const postListRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/documenti/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      titolo:"Nuovo documento",
      descrizione:"",
      approvazioni:"",
      filter:"",
      creazione: creazione.toLocaleDateString()
    })
    this.stagione()
    this.stagioneTakeData(this.stagioneData)

    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
    onValue(starCountRef, (snapshot) => {
        this.stagioneData = snapshot.val();
      
    })
  }

  aggiungiCartella() {
    this.messagesector = 1
    const creazione = new Date();
    const postListRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/galleria/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      id: newPostRef.key,
      titolo:"Nuovo documento",
      descrizione:"",
      immagini:"",
      filter:"",
      creazione: creazione.toLocaleDateString()
    })
    this.stagione()
    this.stagioneTakeData(this.stagioneData)
    
    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
    onValue(starCountRef, (snapshot) => {
        this.stagioneData = snapshot.val();
    })
  }

  modificaCorso(id:any, titolo:any, descrizione:any, prezzo:any, creazione:any, iscritti:any){
    console.log(iscritti) 
    if(titolo != ""){
      let corso: corso
      corso = {
        id: id,
        titolo: titolo.value,
        descrizione:descrizione.value,
        prezzo: prezzo.value,
        creazione: creazione
      }
      const updates: any = {};
  
      updates['squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/corsi/"+id] = corso;
  
      update(ref(this.db), updates);

      this.message = "Corso modificato"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
      
    }else{
      this.messagErrore = "Assegna un titolo al corso"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }
    this.stagione()
    this.stagioneTakeData(this.stagioneData)
    
    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
    onValue(starCountRef, (snapshot) => {
        this.stagioneData = snapshot.val();
      
    })
  }

  modificaDocumento(id:any, titolo:any, descrizione:any, approvazioni:any, filter:any, creazione:any, iscritti:any){
    if(titolo != ""){
      let documento: documento
      documento = {
        id: id,
        titolo: titolo.value,
        descrizione:descrizione.value,
        approvazioni:approvazioni,
        filter: filter,
        creazione: creazione
      }
      const updates: any = {};
  
      updates['squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/documenti/"+id] = documento;
  
      update(ref(this.db), updates);
      
      this.message = "Documento modificato"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }else{
      this.messagErrore = "Assegna un titolo al documento"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }
    this.stagione()
    this.stagioneTakeData(this.stagioneData)

    
    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
    onValue(starCountRef, (snapshot) => {
        this.stagioneData = snapshot.val();
      
    })
  }

  modificaCartella(id:any, titolo:any, descrizione:any, cartella__reach:any){
    if(titolo != ""){
      let cartella: galleria_folder
      cartella = {
        id: id,
        titolo: titolo.value,
        descrizione:descrizione.value,
        immagini: cartella__reach.immagini,
        creazione: cartella__reach.creazione
      }
      const updates: any = {};
  
      updates['squadre/' + this.squadraScelta.idsquadra + "/stagioni/" + this.stagioneData.id+"/galleria/"+id] = cartella;
  
      update(ref(this.db), updates);
      
      this.message = "Cartella modificato"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }else{
      this.messagErrore = "Assegna un titolo alla cartella"
      setTimeout(() => {
        this.message = "";
        this.messagErrore = "";
      }, 1000);
    }
    this.stagione()
    this.stagioneTakeData(this.stagioneData)
    
    const starCountRef = ref(this.db, 'squadre/' + this.squadraScelta.idsquadra + "/stagioni/"+this.stagioneData.id);
    onValue(starCountRef, (snapshot) => {
        this.stagioneData = snapshot.val();
      
    })


  }
}