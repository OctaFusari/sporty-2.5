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
    if(localStorage.getItem("sportyDataTheme") == "light"){
      document.documentElement.style.setProperty("--background","#ffffff")
      document.documentElement.style.setProperty("--background-text","#f7f7f7")
      document.documentElement.style.setProperty("--text","#141414")
      document.documentElement.style.setProperty("--text-minor","#292929")
      document.documentElement.style.setProperty("--container","#f3f3f3")
      document.documentElement.style.setProperty("--card","#e4e4e4")
      document.documentElement.style.setProperty("--card-little","#d6d6d6")
      document.documentElement.style.setProperty("--container-trasparent","#f3f3f3ad")
      document.documentElement.style.setProperty("--card-trasparent","#8a8a8a88")
      document.documentElement.style.setProperty("--sfondo","url(./assets/blob-scene-haikei1.svg)")
      document.documentElement.style.setProperty("--sfondo-squadra","url(./assets/bg-squadra2.svg)")
    }else{
      document.documentElement.style.setProperty("--background","#141414")
      document.documentElement.style.setProperty("--background-text","#121212")
      document.documentElement.style.setProperty("--text","#d6d6d6")
      document.documentElement.style.setProperty("--text-minor","#8a8a8a")
      document.documentElement.style.setProperty("--container","#181818")
      document.documentElement.style.setProperty("--card","#1d1d1d")
      document.documentElement.style.setProperty("--card-little","#242424")
      document.documentElement.style.setProperty("--container-trasparent","#1818189d")
      document.documentElement.style.setProperty("--card-trasparent","#20202085")
      document.documentElement.style.setProperty("--sfondo","url(./assets/blob-scene-haikei.svg)")
      document.documentElement.style.setProperty("--sfondo-squadra","url(./assets/bg-squadra1.svg)")
    }
  }

  /* Variabili */
  section:number = 0;
  appSection:number = 0;
  errorSU:number = 0;
  errorSI:number = 0;
  userData:any = "";

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
          console.log(this.userData)
        });
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