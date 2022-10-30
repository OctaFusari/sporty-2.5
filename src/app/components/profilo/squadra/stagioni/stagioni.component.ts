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
    this.stagioneData.corsi.splice(corso,1)
  }

  aggiungicorso(){
    /* this.stagioneData.corsi.push({titolo:"",descriione:"",prezzo:""}) */
    this.stagioneData.corsi.push(["nuovo corso","descrizione","prezzo"])
  }

  modificacorso(corso:any, val1:any, val2:any, val3:any){
    for(let i=0; i<this.stagioneData.corsi.length; i++){
      if(corso == i){
        this.stagioneData.corsi[corso][0] = val1;
        this.stagioneData.corsi[corso][1] = val2;
        this.stagioneData.corsi[corso][2] = val3;
      }
    }
    this.opencorso = -1
  }


}
