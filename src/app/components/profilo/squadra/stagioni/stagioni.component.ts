import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';

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
  popup:number = 0;

  blockBodyScroll(){
    let body = Array.from(
      document.getElementsByTagName("body"),
    );
    if(this.popup == 0){
      body.forEach(body => {
        body.style.overflowY = 'scroll';
      });
    }else{
      body.forEach(body => {
        body.style.overflowY = 'hidden';
      });
    }
    console.log(body)
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

  corsialgorithm(stagione:any){
    let corsi =  Object.keys(stagione.corsi).map(index => {
    })
    console.log(stagione.corsi)
    console.log(corsi)
  }


}
