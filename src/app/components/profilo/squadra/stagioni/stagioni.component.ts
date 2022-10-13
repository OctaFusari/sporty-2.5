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

  ngOnInit(): void {
    this.sc.stagione()
    this.stagione()
  }
  stagioni:any [] = []

  iscrittiStagionevar:any [] = []
  stagione(){
    this.stagioni = []
    const db = getDatabase();
    const starCountRef = ref(db, 'squadre/'+this.squadraScelta.codicesquadra+"/stagioni");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
          this.iscrittiStagionevar = Object.keys(childSnapshot.val().iscrittistagione).map(function(personNamedIndex){
            childSnapshot.val().iscrittistagione[personNamedIndex];
        });
        childSnapshot.val().iscrittistagione = this.iscrittiStagionevar
        this.stagioni.push(childSnapshot.val())
        console.log(this.iscrittiStagionevar)
      })
    })
  }

}
