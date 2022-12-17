import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';

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
  changeSection(direction:string){
    if(this.stagioneScelta != ''){
      if(direction == "avanti"){
        if(this.sezione_iscrizione == 0){
          this.sezione_iscrizione = 1
          this.prova[0]= 1
        }else if(this.sezione_iscrizione == 1){
          this.sezione_iscrizione = 2
          this.prova[1]= 1
        }else if(this.sezione_iscrizione == 2){
          this.sezione_iscrizione = 3
          this.prova[2]= 1
        }else if(this.sezione_iscrizione == 3){
          this.sezione_iscrizione = 4
          this.prova[3]= 1
        }else if(this.sezione_iscrizione == 4){
          this.sezione_iscrizione = 0
          this.prova[4]= 1
        }
      }else if(direction == "indietro"){
        if(this.sezione_iscrizione == 4){
          this.sezione_iscrizione = 3
        }else if(this.sezione_iscrizione == 3){
          this.sezione_iscrizione = 2
        }else if(this.sezione_iscrizione == 2){
          this.sezione_iscrizione = 1
        }else if(this.sezione_iscrizione == 1){
          this.sezione_iscrizione = 0
        }
      }
    }else{
      this.messageError = "Non hai scelto la stagione"
      setTimeout(() => {
        this.messageError = ""
      }, 2000)
      
    }
  }

}
