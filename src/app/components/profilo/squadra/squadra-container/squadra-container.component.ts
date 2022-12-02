import { Component, Input, OnInit } from '@angular/core';
import { ref, onValue, getDatabase, update, set, push, onChildAdded } from 'firebase/database';
import { atleta } from 'src/app/objects/atleta';
import { squadra } from 'src/app/objects/squadra';

@Component({
  selector: 'app-squadra-container',
  templateUrl: './squadra-container.component.html',
  styleUrls: ['./squadra-container.component.css']
})
export class SquadraContainerComponent implements OnInit {
  @Input() userData: any = "";
  sezioneSquadra: number = 0;
  arraySquadre: any[] = [];
  squadraScelta: any = "";
  sezioneIscrizione: number = 0;
  message: number = 0;
  centrovar: any = 0;
  stagionicounter: any[] = [];
  atletaBase: atleta = {
    atletaid: "",
    nome: "",
    cognome: "",
    email: "",
    datadinascita: "",
    luogodinascita: "",
    codicefiscale: "",
    residenza: "",
    telefono: "",
    immagini: "",
    conferma: "",
    stagione: "",
    squadra: "",
    datascadenza: "",
    corso: "",
    documenti: "",
    messaggi: "",
    allenamenti: "",
    tema: "",
    gestore: ""
  }

  constructor() { }

  ngOnInit() {
    this.verifica_squadra_iniziale()
  }

  verifica_squadra_iniziale() {
    if (this.userData.gestore != "") {
      const db = getDatabase();
      const starCountRef = ref(db, 'squadre/' + this.userData.gestore);
      onValue(starCountRef, (snapshot) => {
        this.squadraScelta = snapshot.val()
        this.sezioneSquadra = 4
      })
    }
  }

  cercaSquadra(squadravalue: any) {
    this.arraySquadre = [];
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

  stagione() {
    this.stagionicounter.length = 0;
    const db = getDatabase();
    const starCountRef2 = ref(db, 'squadre/' + this.squadraScelta.codicesquadra + "/stagioni");
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagionicounter.push(childSnapshot.val)
      })
    })
  }

  accediSquadra(pass: any) {
    if (pass == this.squadraScelta.passwordteam) {
      const db = getDatabase();
      const starCountRef = ref(db, 'squadre/' + this.squadraScelta.idsquadra);
      onValue(starCountRef, (snapshot) => {
        this.squadraScelta = snapshot.val()
      })

      const postData: atleta = {
        atletaid: this.userData.atletaid,
        nome: this.userData.nome,
        cognome: this.userData.cognome,
        email: this.userData.email,
        datadinascita: this.userData.datadinascita,
        luogodinascita: this.userData.luogodinascita,
        codicefiscale: this.userData.codicefiscale,
        residenza: this.userData.residenza,
        telefono: this.userData.telefono,
        immagini: this.userData.immagini,
        conferma: this.userData.conferma,
        stagione: this.userData.stagione,
        squadra: this.userData.squadra,
        datascadenza: this.userData.datascadenza,
        corso: this.userData.corso,
        documenti: this.userData.documenti,
        messaggi: this.userData.messaggi,
        allenamenti: this.userData.allenamenti,
        tema: this.userData.tema,
        gestore: this.squadraScelta.idsquadra
      }
      const updates: any = {};
      updates['utenti/' + localStorage.getItem("sportyId") + "/atleti/" + this.userData.atletaid] = postData;
      update(ref(db), updates);


      this.message = 1
      this.sezioneSquadra = 4
    } else if (pass != this.squadraScelta.passwordteam) {
      this.message = 2
    }
    console.log(this.message)
    setInterval(() => {
      this.message = 0;
    }, 2000)
  }

  creazioneSquadra(nomesquadra: string, codicesquadra: string, emailsquadra: string, sedesquadra: string, passwordteam: string) {
    this.arraySquadre = [];
    const db = getDatabase();

    if ((nomesquadra != "") && (passwordteam != "")) {
      const postListRef = ref(db, 'squadre');
      const newPostRef = push(postListRef);
      set(newPostRef, {
        idsquadra: newPostRef.key,
        codicesquadra: codicesquadra,
        creator: this.userData.atletaid,
        federazione: "",
        gestori: "",
        emailsquadra: emailsquadra,
        nomesquadra: nomesquadra,
        passwordteam: passwordteam,
        sedesquadra: sedesquadra,
        stagioni: "",
        copertina: "",
      }) 
      this.message = 6;
      let atleta: atleta
      atleta = {
        atletaid: this.userData.atletaid,
        nome: this.userData.nome,
        cognome: this.userData.cognome,
        email: this.userData.email,
        datadinascita: this.userData.datadinascita,
        luogodinascita: this.userData.luogodinascita,
        codicefiscale: this.userData.codicefiscale,
        residenza: this.userData.residenza,
        telefono: this.userData.telefono,
        immagini: this.userData.immagini,
        conferma: this.userData.conferma,
        stagione: this.userData.stagione,
        squadra: this.userData.squadra,
        datascadenza: this.userData.datascadenza,
        corso: this.userData.corso,
        documenti: this.userData.documenti,
        messaggi: this.userData.messaggi,
        allenamenti: this.userData.allenamenti,
        tema: this.userData.tema,
        gestore: newPostRef.key
      };
      const updates: any = {};
      updates['utenti/' + localStorage.getItem("sportyId") + "/atleti/" + localStorage.getItem("Sportyprofileid")] = atleta;

      update(ref(db), updates);
    } else if ((nomesquadra == "") && (passwordteam == "")) {
      this.message = 3
    } else if (passwordteam == "") {
      this.message = 4
    } else if (nomesquadra == "") {
      this.message = 5
    }
    setInterval(() => {
      this.message = 0;
    }, 2000)
    this.verifica_squadra_iniziale()
  }
}


function addCommentElement(postElement: any, key: string | null, text: any, author: any) {
  throw new Error('Function not implemented.');
}
/* 

    let arraySquadre: any[] = []
    let randomid = "sporty" + (Math.floor(Math.random() * 3) + 1);
    for (let i = 0; i < arraySquadre.length; i++) {
      if (arraySquadre[i].idsquadra != randomid) {
        randomid = randomid
      } else if (arraySquadre[i].idsquadra == randomid) {
        randomid = "sporty" + (Math.floor(Math.random() * 3) + 1);
        i = 0
      }
    }

*/