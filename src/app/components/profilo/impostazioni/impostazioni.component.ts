import { Component, Input, OnInit } from '@angular/core';
import { deleteUser, getAuth } from 'firebase/auth';
import { getDatabase, ref, remove, update } from 'firebase/database';
import { AppComponent } from 'src/app/app.component';
import { atleta } from 'src/app/objects/atleta';
import { ProfiloUtenteComponent } from '../profilo-utente/profilo-utente.component';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.css']
})
export class ImpostazioniComponent implements OnInit {
  @Input() userData:any = "";
  sportyId = localStorage.getItem("sportyId");
  Sportyprofileid = localStorage.getItem("Sportyprofileid");

  constructor(public ac: AppComponent, public pu: ProfiloUtenteComponent) { }

  ngOnInit(): void {
  }
  message:number = 0;
  updateAtleta(nome:any, cognome:any, email:any, datadinascita:any, luogodinascita:any, codicefiscale:any, residenza:any, telefono:any){
    let atleta:atleta

    const db = getDatabase();
    try{
      if(nome != "" && cognome != ""){
        atleta = {
          atletaid:this.userData.atletaid,
          nome:nome,
          cognome:cognome,
          email:email,
          datadinascita:datadinascita,
          luogodinascita:luogodinascita,
          codicefiscale:codicefiscale,
          residenza:residenza,
          telefono:telefono,
          immagini:this.userData.immagini,
          conferma:this.userData.conferma,
          stagione:this.userData.stagione,
          squadra:this.userData.squadra,
          datascadenza: this.userData.datascadenza,
          corso:this.userData.corso,
          documenti:this.userData.documenti,
          messaggi:this.userData.messaggi,
          allenamenti:this.userData.allenamenti,
          tema:this.userData.tema,
          gestore:this.userData.gestore
        };
      
        const updates:any = {};
        updates['utenti/' + localStorage.getItem("sportyId")+"/atleti/"+localStorage.getItem("Sportyprofileid")] = atleta;
      
        update(ref(db), updates);
  
        this.message = 1
        setInterval(() => {
          this.message = 0;
        },2000)
      }else{
        this.message = 2
        setInterval(() => {
          this.message = 0;
        },2000)
      }
    }catch{
      this.message = 3
      setInterval(() => {
        this.message = 0;
      },2000)
    }
  }

  changecolor(mode:any){
    if(mode == 0){
      localStorage.setItem("sportyDataTheme", "light")
      document.documentElement.style.setProperty("--background","#ffffff")
      document.documentElement.style.setProperty("--background-text","#f7f7f7")
      document.documentElement.style.setProperty("--text","#141414")
      document.documentElement.style.setProperty("--text-minor","#292929")
      document.documentElement.style.setProperty("--container","#f3f3f3")
      document.documentElement.style.setProperty("--card","#e4e4e4")
      document.documentElement.style.setProperty("--card-little","#d6d6d6")
      document.documentElement.style.setProperty("--container-trasparent","#a7a7a781")
      document.documentElement.style.setProperty("--card-trasparent","#8a8a8a88")
      document.documentElement.style.setProperty("--sfondo","#ffffff")
      document.documentElement.style.setProperty("--sfondo-squadra","url(./assets/bg-squadra2.svg)")
    }else if(mode == 1){
      localStorage.setItem("sportyDataTheme", "dark")
      document.documentElement.style.setProperty("--background","#141414")
      document.documentElement.style.setProperty("--background-text","#121212")
      document.documentElement.style.setProperty("--text","#d6d6d6")
      document.documentElement.style.setProperty("--text-minor","#8a8a8a")
      document.documentElement.style.setProperty("--container","#181818")
      document.documentElement.style.setProperty("--card","#1d1d1d")
      document.documentElement.style.setProperty("--card-little","#242424")
      document.documentElement.style.setProperty("--container-trasparent","#1818189d")
      document.documentElement.style.setProperty("--card-trasparent","#20202085")
      document.documentElement.style.setProperty("--sfondo","#141414")
      document.documentElement.style.setProperty("--sfondo-squadra","url(./assets/bg-squadra1.svg)")
    }
  }
  eliminaAccountpopup:number = 0
  eliminaAccount(conferma:any){
    const auth = getAuth();
    const user:any = auth.currentUser;

    if(conferma == 1){
      const db = getDatabase();
      if(this.sportyId == this.Sportyprofileid){

        const starCountRefprincipale = ref(db, 'utenti/' + localStorage.getItem("sportyId"));
        remove(starCountRefprincipale);
        deleteUser(user).then(() => {
          localStorage.removeItem("sportyId");
          localStorage.removeItem("Sportyprofileid");
          localStorage.removeItem("sportyDataTheme");
        })
        this.ac.appSection = 2;
      }else{
        const starCountRefsecondario = ref(db, 'utenti/' + localStorage.getItem("sportyId") + "/atleti/" + localStorage.getItem("Sportyprofileid"));
        remove(starCountRefsecondario);
        localStorage.removeItem("Sportyprofileid");
        localStorage.removeItem("sportyDataTheme");
        this.pu.preselection = 0
      }
    }else if(conferma == 2){
      this.eliminaAccountpopup = 0
    }
  }

}
