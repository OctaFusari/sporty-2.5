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
  iscritti:any[] =[];
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

  }

}
