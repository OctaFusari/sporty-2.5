import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { atleta } from 'src/app/objects/atleta';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';

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
  stagione__data:any;

  stagione__scelta:any = "";
  corso__scelta:any = "";
  galleria__scelta:any = "";
  galleria__scelta__data:any = [];

  corsi__scelti:any = [];
  documenti__scelti:any = [];
  galleria__scelti:any = [];

  constructor(public sc: SquadraContainerComponent) { }

  ngOnInit(){
    const starCountRef1 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni");
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val())
      })
    })

  }
  takeStagione(ids:any){

    const starCountRef1 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni/" + ids);
    onValue(starCountRef1, (snapshot) => {
      this.stagione__data = snapshot.val()

    })
  }
  
  takeStagione__data__inside(ids:any){
    const starCountRef1 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni/" + ids +"/corsi/");
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      this.corsi__scelti.push(childSnapshot.val());
      })
    })

    const starCountRef2 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni/" + ids +"/documenti/");
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      this.documenti__scelti.push(childSnapshot.val());
      })
    })
    
    const starCountRef3 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni/" + ids +"/galleria/");
    onValue(starCountRef3, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      this.galleria__scelti.push(childSnapshot.val());
      })
    })
  }

  take__galleria__data(idi:any){

    const starCountRef1 = ref(this.db, 'squadre/' + this.squadData.idsquadra + "/stagioni/" + this.stagione__scelta +"/galleria/"+idi+"/immagini/");
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      this.galleria__scelta__data.push(childSnapshot.val());
      })
    })
  }

}
