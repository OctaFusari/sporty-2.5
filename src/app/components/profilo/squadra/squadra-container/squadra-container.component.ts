import { Component, Input, OnInit } from '@angular/core';
import { ref, onValue, getDatabase } from 'firebase/database';

@Component({
  selector: 'app-squadra-container',
  templateUrl: './squadra-container.component.html',
  styleUrls: ['./squadra-container.component.css']
})
export class SquadraContainerComponent implements OnInit {
  @Input() userData:any = "";
  sezioneSquadra:number = 0;
  arraySquadre: any[] = [];
  squadraScelta:any = "";
  sezioneIscrizione:number = 0;
  atletaBase:any = {
    atletaid: "",
    nome: "",
    cognome: "",
    email: "",
    datadinascita: "",
    luogodinascita: "",
    codicefiscale: "",
    residenza: "",
    telefono: "",
    doc1: "",
    doc2: "",
    doc3: "",
    immagini:"",
    conferma: "",
    stagione:"",
    squadra: "",
    datascadenza: "",
    corso: "",
    documenti:"",
    messaggi:"",
    allenamenti:""
  }

  constructor() { }

  ngOnInit(): void {
  }

  cercaSquadra(squadravalue:any){
    this.arraySquadre = [];
    this.sezioneSquadra = 1
    const db = getDatabase();
    const starCountRef2 = ref(db, 'squadre/');
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
          if (((childSnapshot.val().nomesquadra.includes(squadravalue)) || (childSnapshot.val().codicesquadra.includes(squadravalue)))) {
            this.arraySquadre.push(childSnapshot.val());
          }
      })
    })

  }

  creazioneSquadra(){

  }

  stagione(){
    const db = getDatabase();
    let stagioni:any [] = []
    const starCountRef2 = ref(db, 'squadre/'+this.squadraScelta.codicesquadra+"/stagioni");
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        stagioni.push(childSnapshot.val)
      })
    })
    console.log()
  }

}
