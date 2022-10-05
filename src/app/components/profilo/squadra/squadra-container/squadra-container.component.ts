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

}
