import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';
import { documento } from 'src/app/objects/documento';

@Component({
  selector: 'app-stagioni',
  templateUrl: './stagioni.component.html',
  styleUrls: ['./stagioni.component.css']
})
export class StagioniComponent implements OnInit {
  @Input() squadraScelta:any = "";

  constructor(public sc:SquadraContainerComponent) { }

  stagioni:any [] = [""]
  iscrittiStagionevar:any [] = []
  stagioniSection:number = 0
  message= ""
  messagErrore= ""
  messagesector= 0
  stagioneData:any = "";
  popup:number = -1;
  opencorso:number = -1;
  popupdocs:number = -1;

  blockBodyScroll(){
    let body = Array.from(
      document.getElementsByTagName("body"),
    );
    let cssi = document.getElementById("cssi");
    if((this.popup == -1) && (this.popupdocs == -1)){
      body.forEach(body => {
        body.style.overflowY = 'scroll';
      });
        cssi!.style.overflowY = 'scroll';
    }else{
      body.forEach(body => {
        body.style.overflowY = 'hidden';
      });
        cssi!.style.overflowY = 'hidden';
    }
  }
  
  ngOnInit(){
    this.sc.stagione()
    this.stagione()
  }
  stagione(){
    this.stagioni.length = 0;
    const db = getDatabase();
    const starCountRef = ref(db, 'squadre/'+this.squadraScelta.codicesquadra+"/stagioni");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val())
      })
    })
  }

  eliminaCorso(corso:any){
    this.messagesector = 1
    this.stagioneData.corsi.splice(corso,1)
    this.message = "Corso eliminato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  aggiungicorso(){
    this.messagesector = 1
    /* this.stagioneData.corsi.push({titolo:"",descriione:"",prezzo:""}) */
    if(this.stagioneData.corsi.length < 10){
      this.stagioneData.corsi.push(["nuovo corso","descrizione","prezzo"])
      this.message = "Corso aggiunto"
    }else{
      this.messagErrore = "Hai raggiunto il numero massimo di corsi"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  modificacorso(corso:any, val1:any, val2:any, val3:any){
    this.messagesector = 1
    for(let i=0; i<this.stagioneData.corsi.length; i++){
      if(corso == i){
        this.stagioneData.corsi[corso][0] = val1;
        this.stagioneData.corsi[corso][1] = val2;
        this.stagioneData.corsi[corso][2] = val3;
      }
    }
    this.opencorso = -1
    this.message = "Corso modificato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  elimina__documento(documento:any){
    this.messagesector = 2
    this.stagioneData.documenti.splice(documento,1)
    this.message = "Documento eliminato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
    this.popup = -1
    this.popupdocs = -1
  }

  aggiungi__documento(){
    this.messagesector = 2
    /* this.stagioneData.corsi.push({titolo:"",descriione:"",prezzo:""}) */
    if(this.stagioneData.documenti.length < 10){
      this.stagioneData.documenti.push(
        {
          titolo:"Nuovo documento",
          descrizione:"",
          approvazioni:[],
          filter:[]
        })
      this.message = "Documento aggiunto"
    }else{
      this.messagErrore = "Hai raggiunto il numero massimo di Documenti"
    }
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
  }

  modifica__documento(documento:any, val1:any, val2:any){
    this.messagesector = 2
    for(let i=0; i<this.stagioneData.documenti.length; i++){
      if(documento == i){
        this.stagioneData.documenti[documento]["titolo"] = val1;
        this.stagioneData.documenti[documento]["descrizione"] = val2;
      }
    }
    this.message = "Documento modificato"
    setTimeout(() => {
      this.message = "";
      this.messagErrore = "";
    }, 1000);
    this.popupdocs = -1
    this.popup = -1
  }

  aggiungi__stagione(){
    let corsi: any[] = []
    let documenti: any[] = []
    this.stagioneData = {
      codestagione:"",
      corsi:corsi,
      creator:"",
      datafine:"",
      datainizio:"",
      iscrittistagione: "",
      nomestagione:"Nuova stagione",
      documenti:documenti
    }
    this.stagioniSection = 1;
  }
}
