import { Component, Input, OnInit } from '@angular/core';
import { ref, onValue, getDatabase, update, set } from 'firebase/database';
import { atleta } from 'src/app/objects/atleta';

@Component({
  selector: 'app-squadra-container',
  templateUrl: './squadra-container.component.html',
  styleUrls: ['./squadra-container.component.css']
})
export class SquadraContainerComponent implements OnInit {
  @Input() userData:any = "";
  sezioneSquadra:number = 0;
  arraySquadre: any[] = [];
  squadraScelta:any = "";
  sezioneIscrizione:number = 0;
  message:number = 0;
  centrovar:any = 0;
  atletaBase:atleta = {
    atletaid: "",
    nome: "",
    cognome: "",
    email: "",
    datadinascita: "",
    luogodinascita: "",
    codicefiscale: "",
    residenza: "",
    telefono: "",
    doc1: "",
    doc2: "",
    doc3: "",
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
  }

  constructor() { }

  ngOnInit(): void {
    if(this.userData.gestore != ""){
      const db = getDatabase();
      console.log(this.userData)
      const starCountRef = ref(db, 'squadre/'+this.userData.gestore);
      onValue(starCountRef, (snapshot) => {
          this.squadraScelta = snapshot.val()
      })
      this.sezioneSquadra = 4
    }
  }

  cercaSquadra(squadravalue:any){
    this.arraySquadre = [];
    this.sezioneSquadra = 1
    const db = getDatabase();
    const starCountRef2 = ref(db, 'squadre/');
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
          if (((childSnapshot.val().nomesquadra.includes(squadravalue)) || (childSnapshot.val().codicesquadra.includes(squadravalue)))) {
            this.arraySquadre.push(childSnapshot.val());
          }
      })
    })

  }

  creazioneSquadra(){
    
  }

  stagione(){
    const db = getDatabase();
    let stagioni:any [] = []
    const starCountRef2 = ref(db, 'squadre/'+this.squadraScelta.codicesquadra+"/stagioni");
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        stagioni.push(childSnapshot.val)
      })
    })
    console.log()
  }

  accediSquadra(pass:any){
    if(pass == this.squadraScelta.passwordteam){
      const db = getDatabase();
      const starCountRef = ref(db, 'squadre/'+this.squadraScelta.idsquadra);
      onValue(starCountRef, (snapshot) => {
          this.squadraScelta = snapshot.val()
      })

        const postData = {
          atletaid:this.userData.atletaid,
          nome:this.userData.nome,
          cognome:this.userData.cognome,
          email:this.userData.email,
          datadinascita: this.userData.datadinascita,
          luogodinascita: this.userData.luogodinascita,
          codicefiscale: this.userData.codicefiscale,
          residenza: this.userData.residenza,
          telefono: this.userData.telefono,
          doc1:this.userData.doc1,
          doc2:this.userData.doc2,
          doc3:this.userData.doc3,
          immagini:this.userData.immagini,
          conferma: this.userData.conferma,
          stagione:this.userData.stagione,
          squadra: this.userData.squadra,
          datascadenza: this.userData.datascadenza,
          corso: this.userData.corso,
          documenti:this.userData.documenti,
          messaggi:this.userData.messaggi,
          allenamenti:this.userData.allenamenti,
          tema:this.userData.tema,
          gestore:this.squadraScelta.idsquadra
        }
        const updates: any = {};
        updates['utenti/' + localStorage.getItem("sportyId") + "/atleti/" + this.userData.atletaid] = postData;
        update(ref(db), updates);
  
      
      this.message = 1
      this.sezioneSquadra = 4
    }else if(pass != this.squadraScelta.passwordteam){
      this.message = 2
    }
    console.log(this.message)
    setInterval(() => {
      this.message = 0;
    }, 2000)
  }

}
