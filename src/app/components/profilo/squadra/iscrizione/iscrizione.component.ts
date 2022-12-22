import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { atleta } from 'src/app/objects/atleta';
import { StagioniComponent } from '../stagioni/stagioni.component';

@Component({
  selector: 'app-iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.css']
})
export class IscrizioneComponent implements OnInit {
  @Input() squadData: any = "";
  @Input() userData: any = "";
  
  squadraDataLocale:any
  sezione_iscrizione:number = 0;
  stagioni:any[] = [];
  corsi:any[] = [];
  documenti:any[] = [];
  galleria:any[] = [];
  stagioneScelta:any = "";
  messageError:string = "";
  sceltaStagione:number = -1;
  sceltaCorso:number = -1;
  corsoScelto:any = "";
  idprofilo:any = localStorage.getItem('Sportyprofileid')

  constructor() { }

  ngOnInit(){
    this.squadraDataLocale = this.squadData
    const db = getDatabase();
    const starCountRef2 = ref(db, 'squadre/'+this.squadraDataLocale.idsquadra+"/stagioni");
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val())
      })
    })
  }
  
  prova:any[] = [0,0,0,0,0]
  button_string:string = "Avanti"
  data_update_temporaneo:any
  changeSection(direction:string){
   if(this.stagioneScelta != ''){
      if(direction == "avanti"){
        if(this.sezione_iscrizione == 0){
          this.sezione_iscrizione = 1
          this.prova[0]= 1
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 1){
          this.sezione_iscrizione = 2
          this.prova[1]= 1
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 2){
          this.sezione_iscrizione = 3
          this.prova[2]= 1
          this.button_string = "Avanti"
          console.log(this.corsoScelto.atleti[this.idprofilo])
        }else if(this.sezione_iscrizione == 3){
          this.sezione_iscrizione = 4
          this.prova[3]= 1
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 4){
          this.sezione_iscrizione = 0
          this.prova[4]= 1
          this.button_string = "Salva"
        }
      }else if(direction == "indietro"){
        if(this.sezione_iscrizione == 4){
          this.sezione_iscrizione = 3 
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 3){
          this.sezione_iscrizione = 2
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 2){
          this.sezione_iscrizione = 1 
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 1){
          this.sezione_iscrizione = 0
          this.button_string = "Avanti"
        }
      }
    }else{
      this.messageError = "Non hai scelto la stagione"
      setTimeout(() => {
        this.messageError = ""
      }, 2000)
      
    }
  }

  public imagePath: any = "";
  imgURL: any = "";

  preview(files: any) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

  }

  message:number = 0;
  updateAtleta(nome:any, cognome:any, email:any, datadinascita:any, luogodinascita:any, codicefiscale:any, residenza:any, telefono:any){
    let atleta:atleta

    const db = getDatabase();
    try{
      if(this.userData.nome != "" && this.userData.cognome != ""){
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
          stagione:this.stagioneScelta.id,
          squadra:this.squadraDataLocale.idsquadra,
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

  stagione_set_new_atleta(){
    const db = getDatabase();
    set(ref(db, 'squadre/'+this.squadraDataLocale.idsquadra+"/stagioni/"+this.stagioneScelta.id+"/iscrittistagione/"+localStorage.getItem("Sportyprofileid")), {
      atleta:localStorage.getItem("Sportyprofileid")
    })
  }

  corso_set_new_atleta(){
    const db = getDatabase();
    set(ref(db, 'squadre/'+this.squadraDataLocale.idsquadra+"/stagioni/"+this.stagioneScelta.id+"/iscrittistagione/"+localStorage.getItem("Sportyprofileid")), {
      atleta:localStorage.getItem("Sportyprofileid")
    })
  }

  immagini_set_new_atleta(cartella:any){

  }

  documenti_set_new_atleta(documento:any){

  }

}
