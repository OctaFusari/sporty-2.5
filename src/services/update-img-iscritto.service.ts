import { Injectable, Renderer2, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class UpdateImgIscrittoService {
  db = getDatabase();

  constructor() { }

  changeData(url: any, squadra:any,id:any, cartella:any, stagione:any){
    set(
      ref(
        this.db,
        'squadre/' +
        squadra +
        '/stagioni/' +
        stagione +
        '/galleria/' +
        cartella + "/immagini/" + id
      ),
      {
        url: url
      }
    );
  }
}
