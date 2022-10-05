import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

  @Output() changeProfilevent = new EventEmitter<any>();
  
  @Input() userDataindex:any = "";
  userData:any = "";
 /* [userData]="userData" */
  @Input() profileData:any = "";
  squadra:any = ""

  addNewItem() {

  }

  constructor() { }

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

  changeProfile() {
    this.changeProfilevent.emit(0);
    localStorage.removeItem('Sportyprofileid');
    this.userDataindex = "";
    this.userData = "";
    this.profileData = "";
   this.squadra = ""
  }

}
