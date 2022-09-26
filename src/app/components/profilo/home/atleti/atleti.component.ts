import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-atleti',
  templateUrl: './atleti.component.html',
  styleUrls: ['./atleti.component.css']
})
export class AtletiComponent implements OnInit {
  @Input() userData:any = undefined;
  atleti:any[] = [];
  atleta:any = "";
  section:number = 0;
  bottonemodifiche:number = 0;
  nav:number = 0;
  stagioneAtleta:any = "";
  aperturaPopup:number = 0;
  containerAtletaInside:number=0;
  squadreArray:any[] = [];

  constructor() { }

  ngOnInit(): void {
      this.atleti = Object.keys(this.userData.atleti).map(index => {
        let person = this.userData.atleti[index];
        return person;
    });
    const db = getDatabase();
    const starCountRef = ref(db, 'squadre');
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.squadreArray.push(childSnapshot.val())
      });
    });
  }

  close(){
    this.atleta = "";
    this.section = 0;
    this.bottonemodifiche = 0;
    this.nav = 0;
    this.emptyURL = 0
  }

  guardaAtleta(indexAtleta:any){
    for(let i=0;i<=this.atleti.length;i++){
      if(i == indexAtleta){
        this.atleta = this.atleti[i]
      }
    }
    this.section = 2
    const db = getDatabase();
    const starCountRef = ref(db, 'squadre/' + this.atleta.squadra + "/stagioni/" + this.atleta.stagione);
    onValue(starCountRef, (snapshot) => {
      this.stagioneAtleta = snapshot.val();
    });
  }

  imgURL:any;
  emptyURL:number = 0
  apriImg(docId:any){
    try{
      if((docId != undefined) || (docId != "") || (docId != 0) || (docId != null)){
        this.imgURL = docId.url
        this.emptyURL = 1
      }
    }catch{
      this.emptyURL = 2
    }
  }

}
