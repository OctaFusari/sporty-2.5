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

  stagioni:any [] = []
  iscrittiStagionevar:any [] = []
  
  ngOnInit(){
    this.sc.stagione()
    this.stagione()
  }
  stagione(){
    this.stagioni = []
    const db = getDatabase();
    const starCountRef = ref(db, 'squadre/'+this.squadraScelta.codicesquadra+"/stagioni");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val())
        console.log(childSnapshot.val())
      })
    })
  }

}
