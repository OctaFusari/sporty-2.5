import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, update } from 'firebase/database';
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
    let sezione_iscrizione_0 = document.getElementById('sezione_iscrizione_0') as HTMLElement;
    let sezione_iscrizione_1 = document.getElementById('sezione_iscrizione_1') as HTMLElement;
    let sezione_iscrizione_2 = document.getElementById('sezione_iscrizione_2') as HTMLElement;
    let sezione_iscrizione_3 = document.getElementById('sezione_iscrizione_3') as HTMLElement;
    let sezione_iscrizione_4 = document.getElementById('sezione_iscrizione_4') as HTMLElement;
    sezione_iscrizione_0.style.setProperty("display", "block")
    sezione_iscrizione_1.style.setProperty("display", "none")
    sezione_iscrizione_2.style.setProperty("display", "none")
    sezione_iscrizione_3.style.setProperty("display", "none")
    sezione_iscrizione_4.style.setProperty("display", "none") 
  }
  
  prova:any[] = [0,0,0,0,0]
  button_string:string = "Avanti"
  data_update_temporaneo:any
  changeSection(direction:string){
    let sezione_iscrizione_0 = document.getElementById('sezione_iscrizione_0') as HTMLElement;
    let sezione_iscrizione_1 = document.getElementById('sezione_iscrizione_1') as HTMLElement;
    let sezione_iscrizione_2 = document.getElementById('sezione_iscrizione_2') as HTMLElement;
    let sezione_iscrizione_3 = document.getElementById('sezione_iscrizione_3') as HTMLElement;
    let sezione_iscrizione_4 = document.getElementById('sezione_iscrizione_4') as HTMLElement;
    if(this.stagioneScelta != ''){
      if(direction == "avanti"){
        if(this.sezione_iscrizione == 0){
          this.sezione_iscrizione = 1
          sezione_iscrizione_0.style.setProperty("display", "none")
          sezione_iscrizione_1.style.setProperty("display", "block")
          sezione_iscrizione_2.style.setProperty("display", "none")
          sezione_iscrizione_3.style.setProperty("display", "none")
          sezione_iscrizione_4.style.setProperty("display", "none")
          this.userData.stagione = this.stagioneScelta.id
          this.userData.squadra = this.squadraDataLocale.idsquadra
          this.prova[0]= 1
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 1){
          this.sezione_iscrizione = 2
          sezione_iscrizione_0.style.setProperty("display", "none")
          sezione_iscrizione_1.style.setProperty("display", "none")
          sezione_iscrizione_2.style.setProperty("display", "block")
          sezione_iscrizione_3.style.setProperty("display", "none")
          sezione_iscrizione_4.style.setProperty("display", "none") 
          this.prova[1]= 1
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 2){
          this.sezione_iscrizione = 3
          sezione_iscrizione_0.style.setProperty("display", "none")
          sezione_iscrizione_1.style.setProperty("display", "none")
          sezione_iscrizione_2.style.setProperty("display", "none")
          sezione_iscrizione_3.style.setProperty("display", "block")
          sezione_iscrizione_4.style.setProperty("display", "none") 
          this.prova[2]= 1
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 3){
          this.sezione_iscrizione = 4
          sezione_iscrizione_0.style.setProperty("display", "none")
          sezione_iscrizione_1.style.setProperty("display", "none")
          sezione_iscrizione_2.style.setProperty("display", "none")
          sezione_iscrizione_3.style.setProperty("display", "none")
          sezione_iscrizione_4.style.setProperty("display", "block")
          this.prova[3]= 1
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 4){
          this.sezione_iscrizione = 0
          sezione_iscrizione_0.style.setProperty("display", "block")
          sezione_iscrizione_1.style.setProperty("display", "none")
          sezione_iscrizione_2.style.setProperty("display", "none")
          sezione_iscrizione_3.style.setProperty("display", "none")
          sezione_iscrizione_4.style.setProperty("display", "none")
          this.prova[4]= 1
          this.button_string = "Salva"
          this.updateAtleta()
        }
      }else if(direction == "indietro"){
        if(this.sezione_iscrizione == 4){
          this.sezione_iscrizione = 3
          sezione_iscrizione_0.style.setProperty("display", "none")
          sezione_iscrizione_1.style.setProperty("display", "none")
          sezione_iscrizione_2.style.setProperty("display", "none")
          sezione_iscrizione_3.style.setProperty("display", "block")
          sezione_iscrizione_4.style.setProperty("display", "none")  
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 3){
          this.sezione_iscrizione = 2
          sezione_iscrizione_0.style.setProperty("display", "none")
          sezione_iscrizione_1.style.setProperty("display", "none")
          sezione_iscrizione_2.style.setProperty("display", "block")
          sezione_iscrizione_3.style.setProperty("display", "none")
          sezione_iscrizione_4.style.setProperty("display", "none") 
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 2){
          this.sezione_iscrizione = 1
          sezione_iscrizione_0.style.setProperty("display", "none")
          sezione_iscrizione_1.style.setProperty("display", "block")
          sezione_iscrizione_2.style.setProperty("display", "none")
          sezione_iscrizione_3.style.setProperty("display", "none")
          sezione_iscrizione_4.style.setProperty("display", "none")  
          this.button_string = "Avanti"
        }else if(this.sezione_iscrizione == 1){
          this.sezione_iscrizione = 0
          sezione_iscrizione_0.style.setProperty("display", "block")
          sezione_iscrizione_1.style.setProperty("display", "none")
          sezione_iscrizione_2.style.setProperty("display", "none")
          sezione_iscrizione_3.style.setProperty("display", "none")
          sezione_iscrizione_4.style.setProperty("display", "none") 
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

  updateAtletaTemporaneo(nome:any, cognome:any, email:any, datadinascita:any, luogodinascita:any, codicefiscale:any, residenza:any, telefono:any){    
    this.userData.nome = nome
    this.userData.cognome = cognome
    this.userData.email = email
    this.userData.datadinascita = datadinascita
    this.userData.luogodinascita = luogodinascita
    this.userData.codicefiscale = codicefiscale
    this.userData.residenza = residenza
    this.userData.telefono = telefono
    console.log(this.userData.telefono)
  }

  message:number = 0;
  updateAtleta(){
    let atleta:atleta

    const db = getDatabase();
    try{
      if(this.userData.nome != "" && this.userData.cognome != ""){
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

  changeData(section:number, data:any){

  }

}
