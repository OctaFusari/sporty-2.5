import { Component, Renderer2, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {

  @Input() squadData: any = '';
  @Input() userData: any = '';
  db = getDatabase();
  stagioni:any[] =[];
  stagione:any;
  iscritti:any[] =[];
  corsi:any[] =[];
  newestElement:any

  constructor() { }

  ngOnInit(): void {
    const starCountRef1 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + "/stagioni/"
    );
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val());
      });
    });


    this.newestElement = this.stagioni.reduce((latest, current) => {
      if (!latest || current.creazione > latest.creazione) {
          return current;
      }
      return latest;
  }, null);

  }

  takeStagioneData(id:any){
    const starCountRef1 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + "/stagioni/"+id+"/iscrittistagione/"
    );
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.iscritti.push(childSnapshot.val());
      });
    });

    const starCountRef2 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + "/stagioni/" + id + "/corsi/"
    );
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.corsi.push(childSnapshot.val());
      });
    });

    this.stagione = id;

  }

  utente:any[] = [];
  documenti:any[] = [];
  galleria:any[] = [];
  corso_per:string = "";
  openAt:any;
  takeUtenteData(id:any){
    this.utente = [];
    this.documenti = [];
    this.galleria = [];
    this.corso_per = "";
    this.openAt = id;
    const starCountRef4 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + this.stagione + '/iscrittistagione/'+id
    );
    onValue(starCountRef4, (snapshot) => {
      this.corso_per = snapshot.val().corso;
    });

    const starCountRef2 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + this.stagione + '/documenti/'
    );
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.val().approvazioni){
          if(id in childSnapshot.val().approvazioni){
            this.documenti.push([childSnapshot.val().id, childSnapshot.val().titolo, childSnapshot.val().descrizione]);
          }
        }
      });
    });

    const starCountRef3 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + this.stagione + '/galleria/'
    );
    onValue(starCountRef3, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.val().immagini){
          if(id in childSnapshot.val().immagini){
            this.galleria.push([childSnapshot.val().immagini[id].url,childSnapshot.val().titolo]);
            }
          }
      });
    });

    let prova = "";
    const starCountRef5 = ref(
      this.db,
      'utenti/'
    );
    onValue(starCountRef5, (snapshot) => {
      prova = snapshot.val();
    });

    console.log(prova)

  }

  openpopupgalleria:number = 0;
  openpupupdoc:number = 0;

}