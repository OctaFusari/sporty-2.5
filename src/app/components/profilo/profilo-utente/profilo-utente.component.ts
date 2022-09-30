import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.css']
})
export class ProfiloUtenteComponent implements OnInit {

  constructor(public ac: AppComponent) { }

  
  userData:any =""
  atleti:any[] = [];
  preselection:number = 0;
  userDataindex:any = "";
  profileData:any = "wellavariniziale";

  ngOnInit(){
    var idutente = localStorage.getItem("sportyId")
    const db = getDatabase();
    const starCountRef = ref(db, 'utenti/' + idutente);
    onValue(starCountRef, (snapshot) => {
      this.userData = snapshot.val();
      this.atleti = Object.keys(this.userData.atleti).map(index => {
        let person = this.userData.atleti[index];
        return person;
      });
    });
    if(localStorage.getItem("SportyprofileData") == null){
      this.profileData = "wellavariniziale"
      this.preselection = 0
    }else{
      this.profileData = localStorage.getItem("SportyprofileData")
      this.preselection = 1
    }
    return this.userData
  }

  saveProfilo(var1:any, var2:any){
    this.userDataindex = var1;
    this.profileData = var2;
    localStorage.setItem("SportyuserDataindex", var2);
    localStorage.setItem("SportyprofileData", var2);
  }

  expand() {
    let element = document.getElementById('sidenav')as HTMLElement;
    element.classList.remove('is-collapsed');
  }
  
  collapse() {
    let element = document.getElementById('sidenav')as HTMLElement;
    element.classList.add('is-collapsed');
  }
  
  toggle() {
    let element = document.getElementById('sidenav')as HTMLElement;
    element.classList.toggle('is-collapsed');
  }

  section:number = 0;
  changesection(section:any){
    if(section == 0){
      this.section = 0
    }else if(section == 1){
      this.section = 1
    }else if(section == 2){
      this.section = 2
    }else if(section == 3){
      this.section = 3
    }else if(section == 4){
      this.section = 4
    }
  }

  octimal(){
    window.location.href = "https://octimal.it/";
  } 
  
  logout() {
    localStorage.removeItem('sportyId');
    localStorage.removeItem('SportyuserDataindex');
    localStorage.removeItem('SportyprofileData');
    document.documentElement.style.setProperty('--sfondo', 'url(./assets/blob-scene-haikei.svg)');
    this.ac.appSection = 2;
  }

}
