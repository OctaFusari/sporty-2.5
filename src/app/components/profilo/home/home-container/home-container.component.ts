import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { ProfiloUtenteComponent } from '../../profilo-utente/profilo-utente.component';
import { SquadraContainerComponent } from '../../squadra/squadra-container/squadra-container.component';
import { atleta } from 'src/app/objects/atleta';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  
  constructor(public pu: ProfiloUtenteComponent) { }

  @Output() changeProfilevent = new EventEmitter<any>();

  @Output() scegliSquadra = new EventEmitter<any>();
  
  @Input() profileData:any = "";

  userData:any = "";
  squadre:any[]= [];
  squadraGestore:any = "";
  sezione:number = 0;

  ngOnInit(): void {
    
    const db = getDatabase();
      const starCountRef = ref(db, 'utenti/' + localStorage.getItem("sportyId") + "/atleti/" + localStorage.getItem("Sportyprofileid"));
      onValue(starCountRef, (snapshot) => {
        this.userData = snapshot.val();

      } );
      try{
        const starCountRef1 = ref(db, 'utenti/'+ localStorage.getItem("sportyId")+ "/atleti/"+ localStorage.getItem("Sportyprofileid") + "/squadre/");
        onValue(starCountRef1, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            this.squadre.push(childSnapshot.val());
          });
        });
        const starCountRef2 = ref(db, 'squadre/' + this.userData.gestore);
        onValue(starCountRef2, (snapshot) => {
          this.squadraGestore = snapshot.val();
          if(this.squadraGestore == null || this.squadre == null){
            if(this.squadraGestore == null){
              this.userData.gestore = ""
            }else if(this.squadre == null){
              this.userData.squadra = ""
            }
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
              telefono:this.userData.telefono,
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
              gestore:this.userData.squadra
            };
          
            const updates:any = {};
            updates['utenti/' + localStorage.getItem("sportyId")+"/atleti/"+localStorage.getItem("Sportyprofileid")] = atleta;
          
            update(ref(db), updates);
          }
        });
      }catch{
        this.squadre = []
        this.squadraGestore = ''
      }

  }

  scegliSquadraFunction(){
    this.scegliSquadra.emit(3);
  }

  changeProfile() {
    this.userData = "";
    this.profileData = "";
   this.squadre = []
    this.changeProfilevent.emit(0);
    localStorage.removeItem('Sportyprofileid');
   this.pu.controlloIniziale()
  }

}
