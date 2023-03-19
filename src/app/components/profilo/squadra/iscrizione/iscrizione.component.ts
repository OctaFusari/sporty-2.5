import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { atleta } from 'src/app/objects/atleta';

@Component({
  selector: 'app-iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.css']
})
export class IscrizioneComponent implements OnInit {
  @Input() squadData: any = "";
  @Input() userData: any = "";
  prova:any[] = [1,0,0,0,0];
  sezione_iscrizione:any;
  

  constructor() { }

  ngOnInit(){
    
  }

}
