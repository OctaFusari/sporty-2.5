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
  bottonemodifiche:number = 0;
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
    this.bottonemodifiche = 0;
    this.emptyURL = 0
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
