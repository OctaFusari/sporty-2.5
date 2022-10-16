import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { ProfiloUtenteComponent } from '../../profilo-utente/profilo-utente.component';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  
  constructor(public pu: ProfiloUtenteComponent) { }

  @Output() changeProfilevent = new EventEmitter<any>();
  @Output() scegliSquadra = new EventEmitter<any>();
  userData:any = "";
  @Input() profileData:any = "";
  squadra:any = "";

  ngOnInit(): void {
    const db = getDatabase();
    if(localStorage.getItem("Sportyprofileid") == localStorage.getItem("sportyId")){
      const starCountRef = ref(db, 'utenti/' + localStorage.getItem("Sportyprofileid"));
      onValue(starCountRef, (snapshot: { val: () => any; }) => {
        this.userData = snapshot.val();
      });
    }else{
      const starCountRef = ref(db, 'utenti/' + localStorage.getItem("sportyId") + "/atleti/" + localStorage.getItem("Sportyprofileid"));
      onValue(starCountRef, (snapshot: { val: () => any; }) => {
        this.userData = snapshot.val();
      });
    }

    try{
      const starCountRef = ref(db, 'squadre/' + this.userData.squadra);
      onValue(starCountRef, (snapshot: { val: () => any; }) => {
        this.squadra = snapshot.val();
      });
    }catch{
      this.squadra = ''
    }
  }

  scegliSquadraFunction(){
    this.scegliSquadra.emit(3);
  }

  changeProfile() {
    this.changeProfilevent.emit(0);
    localStorage.removeItem('Sportyprofileid');
    this.userData = "";
    this.profileData = "";
   this.squadra = ""
   this.pu.controlloIniziale()
  }

}
