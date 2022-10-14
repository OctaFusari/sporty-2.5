import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, ref, onValue, set } from "firebase/database";
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
  idsporty:any = localStorage.getItem('sportyId')
  profileData:any = "wellavariniziale";

  changeProfile(changeProfilevent: any) {
    this.preselection = changeProfilevent;
  }

  ngOnInit(){
    const db = getDatabase();
    let verificautente:any =""

    if(localStorage.getItem("Sportyprofileid") == null){
      this.profileData = "wellavariniziale"
      this.preselection = 0
      const starCountRef = ref(db, 'utenti/' + localStorage.getItem("sportyId"));
      onValue(starCountRef, (snapshot) => {
        this.userData = snapshot.val();
        try{
          const starCountRef2 = ref(db, 'utenti/' + localStorage.getItem("sportyId")+"/atleti/"+localStorage.getItem("sportyId"));
          onValue(starCountRef2, (snapshot) => {
            verificautente = snapshot.val();
          });
          console.log(verificautente)
            this.atleti = Object.keys(this.userData.atleti).map(index => {
              let person = this.userData.atleti[index];
              return person;
            });
        }catch{
          set(ref(db, 'utenti/' + localStorage.getItem("sportyId") + "/atleti/"+localStorage.getItem("sportyId")), {
            atletaid: localStorage.getItem("sportyId"),
            nome: this.userData.nome,
            cognome: this.userData.cognome,
            email: this.userData.email,
            datadinascita: "",
            luogodinascita: "",
            codicefiscale: "",
            residenza: "",
            telefono: "",
            doc1:"",
            doc2:"",
            doc3:"",
            immagini:"",
            conferma: "",
            stagione:"",
            squadra: "",
            datascadenza: "",
            corso: "",
            documenti:"",
            messaggi:"",
            allenamenti:"",
            tema:"",
            gestore:""
          });     
          const starCountRef = ref(db, 'utenti/' + localStorage.getItem("sportyId"));
          onValue(starCountRef, (snapshot) => {
            this.userData = snapshot.val();
    
            this.atleti = Object.keys(this.userData.atleti).map(index => {
              let person = this.userData.atleti[index];
              return person;
            });
          });
        }
      }); 
    }else{
      this.profileData = localStorage.getItem("Sportyprofileid")
      const starCountRef = ref(db, 'utenti/' + localStorage.getItem("sportyId")+"/atleti/"+localStorage.getItem("Sportyprofileid"));
      onValue(starCountRef, (snapshot) => {
        this.userData = snapshot.val();
      });
      this.preselection = 1
    }
    return this.userData
  }

  saveProfilo(var1:any, var2:any){
    this.userDataindex = var1;
    this.profileData = var2;
    localStorage.setItem("Sportyprofileid", var2);
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
    localStorage.removeItem('Sportyprofileid');
    document.documentElement.style.setProperty('--sfondo', 'url(./assets/blob-scene-haikei.svg)');
    this.ac.appSection = 2;
  }

  message:number = 0
  creaAtleta(
    val1:string,
    val2:string,
    val3:string,
    val4:any,
    val5:string,
    val6:string,
    val7:string,
    val8:string){
      if(val1 == ""){
        this.message = 2
      }else if(val2 == ""){
        this.message = 3
      }else if(val1 == "" && val2 == ""){
        this.message = 4
      }else if(val1 != "" && val2 != ""){
        const db = getDatabase();
        let insideAtleti: any[] = []
        const starCountRef1 = ref(db, 'utenti/' + localStorage.getItem("sportyId") + "/atleti/");
        onValue(starCountRef1, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            insideAtleti.push(childSnapshot.val())
          });
        });
  
        let id: any = localStorage.getItem("sportyId")
          let randomid = id + "atleta" + (Math.floor(Math.random() * 450) + 1);
          for (let i = 0; i < insideAtleti.length; i++) {
            if (insideAtleti[i].atletaid == randomid) {
              randomid = id + "atleta"+(Math.floor(Math.random() * 450) + 1);
            }else{
              randomid = randomid 
            }
          }
          set(ref(db, 'utenti/' + localStorage.getItem("sportyId") + "/atleti/"+randomid), {
            atletaid: randomid,
            nome: val1,
            cognome: val2,
            email: val3,
            datadinascita: val4,
            luogodinascita: val5,
            codicefiscale: val6,
            residenza: val7,
            telefono: val8,
            doc1:"",
            doc2:"",
            doc3:"",
            immagini:"",
            conferma: "",
            stagione:"",
            squadra: "",
            datascadenza: "",
            corso: "",
            documenti:"",
            messaggi:"",
            allenamenti:"",
            tema:"",
            gestore:""
          });
          this.message = 1
      }
      setInterval(() => {
        this.message = 0;
      }, 2000)
  }

}
