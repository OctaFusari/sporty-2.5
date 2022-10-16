import { Component, OnInit} from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getDatabase, onValue, ref, set, update} from "firebase/database";
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-paginainiziale',
  templateUrl: './paginainiziale.component.html',
  styleUrls: ['./paginainiziale.component.css']
})
export class PaginainizialeComponent implements OnInit {

  constructor(public ac: AppComponent) { }

  ngOnInit(): void {
    
  }

  /* Variabili */
  section:number = 0;
  appSection:number = 0;
  errorSU:number = 0;
  errorSI:number = 0;
  userData:any = "";
  regPt1:number = 1;

  mode:number = 0
  /* Variabili */

  registrati(nome:any, cognome:any,email:any, password:any){

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const db = getDatabase();
        set(ref(db, 'utenti/' + user.uid), {
          idutente: user.uid,
          nome:nome,
          cognome:cognome,
          email:email,
          datadinascita:"",
          luogodinascita:"",
          codicefiscale:"",
          residenza:"",
          telefono:"",
          atleti:"",
          squadra:"",
          gestore:""
        });

        set(ref(db, 'utenti/' + user.uid + "/atleti/" + user.uid), {
          atletaid:user.uid,
          nome:nome,
          cognome:cognome,
          email:email,
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
        
        this.errorSU = 4;
        setInterval(() => {
          this.errorSU = 0;
        },2000)
        const starCountRef = ref(db, 'utenti/' + user.uid);
        onValue(starCountRef, (snapshot) => {
          this.userData = snapshot.val();
        });
        this.regPt1 = 0;
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode == "auth/weak-password"){
          this.errorSU = 1
        }else if(errorCode == "auth/email-already-in-use"){
          this.errorSU = 2
        }else{
          this.errorSU = 3
        }
        setInterval(() => {
          this.errorSU = 0;
        },2000)
      });
  }

  accedi(email:any, password:any){

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("sportyId", user.uid);
        this.errorSI = 2;
        this.appSection = 1;
        this.ac.appSection = 1;
        setInterval(() => {
          this.errorSI = 0;
        },2000)
      })
      .catch((error) => {
        this.errorSI = 1
        setInterval(() => {
          this.errorSI = 0;
        },2000)
      });

  }

  octimal(){
    window.location.href = "https://octimal.it/";
  }
}