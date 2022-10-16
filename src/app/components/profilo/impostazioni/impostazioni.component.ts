import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, ref, update } from 'firebase/database';
import { atleta } from 'src/app/objects/atleta';
import { ProfiloUtenteComponent } from '../profilo-utente/profilo-utente.component';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.css']
})
export class ImpostazioniComponent implements OnInit {
  @Input() userData:any = "";

  constructor() { }

  ngOnInit(): void {
  }

  updateAtleta(){
    let atleta:atleta

    const db = getDatabase();

    atleta = {
      atletaid:this.userData.atletaid,
      nome:this.userData.nome,
      cognome:this.userData.cognome,
      email:this.userData.email,
      datadinascita:this.userData.datadinascita,
      luogodinascita:this.userData.luogodinascita,
      codicefiscale:this.userData.codicefiscale,
      residenza:this.userData.residenza,
      telefono: this.userData.telefono,
      doc1:this.userData.doc1,
      doc2:this.userData.doc2,
      doc3:this.userData.doc3,
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
  
    return update(ref(db), updates);
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
    }
  }

}
