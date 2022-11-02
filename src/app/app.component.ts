import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sporty';

  constructor(private router:Router){

  }

  appSection:any = 0
  ngOnInit(): void {
    this.appSection = 2
      const db = getDatabase();
      let utenti: string[] = []
        if(localStorage.getItem("sportyId") != null || undefined || ""){
          const starCountRef1 = ref(db, 'utenti/');
          onValue(starCountRef1, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              utenti.push(childSnapshot.val().idutente)
            });
            console.log(utenti)
            for(let i = 0; i < utenti.length; i++){
              if(utenti[i] == localStorage.getItem("sportyId")){
                this.appSection = 1;
                break
              }else if(i == utenti.length){
                if(utenti[i] == localStorage.getItem("sportyId")){
                  this.appSection = 1;
                  break
                }else{
                  localStorage.removeItem("sportyId")
                  this.appSection = 2;
                  console.log("ciaso")
                }
              }
            }
          });
        }else{         
          this.appSection = 2
        }
  }
}
