import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { atleta } from 'src/app/objects/atleta';

@Component({
  selector: 'app-iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.css']
})
export class IscrizioneComponent implements OnInit {
  @Input() squadData: any = "";
  @Input() userData: any = "";

  completamento:any[] = [0,0,0,0,0];
  sezione_completamento = 0;

  sezione_iscrizione:any;
  db = getDatabase();

  squadra:any;
  stagioni:any = [];
  stagioneScelta:any;
  corsi:any = [];
  documenti:any = [];
  galleria:any = [];

  constructor() { }

  ngOnInit(){

    const starCountRef1 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni");
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val())
      })
    })

  }

  takeSquadra(){

  }

  takeStagione(ids:any){

    console.log(ids)

    const starCountRef1 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni/" + ids);
    onValue(starCountRef1, (snapshot) => {
      this.stagioneScelta = snapshot.val()
    })

    console.log(this.stagioneScelta)

  }

  takeCorsi(){
    
  }

  takeGalleria(){
    
  }

}
