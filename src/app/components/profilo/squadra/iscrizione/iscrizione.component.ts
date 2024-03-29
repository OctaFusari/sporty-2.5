import { Component, Renderer2, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';
import { UploadImgService } from 'src/services/upload-img.service';
import heic2any from "heic2any";
import { ImpostazioniComponent } from '../../impostazioni/impostazioni.component';

import { atleta } from 'src/app/objects/atleta';
@Component({
  selector: 'app-iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.css'],
})
export class IscrizioneComponent implements OnInit {

  @Input() squadData: any = '';
  @Input() userData: any = '';

  completamento: any[] = [0, 0, 0, 0, 0];
  sezione_completamento = 0;

  sezione_iscrizione: any;
  db = getDatabase();

  squadra: any;
  stagioni: any = [];
  stagione__data: any;

  stagione__scelta: any = '';
  corso__scelta: any = '';
  galleria__scelta: any = '';
  galleria__scelta__data: any = [];

  corsi__scelti: any = [];
  documenti__scelti: any = [];
  galleria__scelti: any = [];

  documenti__approvati: any = [];

  constructor(
    private renderer: Renderer2,
    public uis: UploadImgService,
    public sc: SquadraContainerComponent
  ) { }

  open_img:number = 0;

  ngOnInit() {
    console.log(this.userData)

    if (this.userData.gestore != "") {
      
      const starCountRef = ref(this.db, 'squadre/' + this.userData.gestore);
      onValue(starCountRef, (snapshot) => {
        this.squadData = snapshot.val()
      })
    }

    const starCountRef1 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni'
    );
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val());
        if(childSnapshot.val().iscrittistagione){
          if(this.userData.atletaid in childSnapshot.val().iscrittistagione){
            this.stagione__scelta = childSnapshot.val().id;
            this.takeStagione(this.stagione__scelta);
            this.takeStagione__data__inside(this.stagione__scelta)
          }
        }
      });
    });
  }

  selectedFile: File | null = null;
  imageUrl: string | null = null;

  onFileSelected(event: Event): void {
    const inputElement: any = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }

    if (inputElement.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(inputElement.files[0]);
    }
  }

  async uploadFile(cartella: any) {
    let jpgFile:any = this.selectedFile;
    if (jpgFile && jpgFile.name.includes(".heic")){
      const blob:any = await heic2any({
        blob: jpgFile,
        toType: 'image/*',
      });
    
      jpgFile = new File([blob], `${jpgFile.name.replace('.heic', '.jpg')}`, { type: 'image/jpeg' });
      
    }
    if (this.selectedFile) {
      this.uis.uploadFile(
        jpgFile,
        this.squadData.idsquadra,
        this.userData.atletaid,
        cartella,
        this.stagione__scelta
      );
    }
  }

  part: any = 0;

  addCl(id: any) {
    let htmlText = '';
    const htmlContainer = document.getElementById(id);
    const index = this.documenti__approvati.indexOf(id);
    if (index !== -1) {
      this.documenti__approvati.splice(index, 1);
      htmlText = '<path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Z" />'
    } else {
      this.documenti__approvati.push(id);
      htmlText = '<path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z" />'
    }

    if (htmlContainer) {
      htmlContainer.innerHTML = htmlText;
    }
    
  }
  takeStagione(ids: any) {
    const starCountRef1 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + ids
    );
    onValue(starCountRef1, (snapshot) => {
      this.stagione__data = snapshot.val();
    });
    
  }

  takeStagione__data__inside(ids: any) {
    
    this.corsi__scelti = [];
    this.documenti__scelti = [];
    this.galleria__scelti = [];

    const starCountRef4 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + ids + '/iscrittistagione/' + this.userData.atletaid
    );
    onValue(starCountRef4, (snapshot) => {
      this.corso__scelta = snapshot.val().corso;
    });


    const starCountRef1 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + ids + '/corsi/'
    );
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.corsi__scelti.push(childSnapshot.val());
      });
    });

    const starCountRef2 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + ids + '/documenti/'
    );
    onValue(starCountRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.documenti__scelti.push(childSnapshot.val());
      });
    });

    const starCountRef3 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + ids + '/galleria/'
    );
    onValue(starCountRef3, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.galleria__scelti.push(childSnapshot.val());
      });
    });


    for(let i = 0; i<this.documenti__scelti.length; i++){
      if(this.documenti__scelti[i].approvazioni){
        if(this.userData.atletaid in this.documenti__scelti[i].approvazioni){
          this.documenti__approvati.push(this.documenti__scelti[i].id)
          let htmlText = '';
          const htmlContainer = document.getElementById(this.documenti__scelti[i].id);
          htmlText = '<path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z" />'
          
          if (htmlContainer) {
            htmlContainer.innerHTML = htmlText;
          }
        }
      }
    }

  }

  take__galleria__data(idi: any) {

    const starCountRef1 = ref(
      this.db,
      'squadre/' +
      this.squadData.idsquadra +
      '/stagioni/' +
      this.stagione__scelta +
      '/galleria/' +
      idi +
      '/immagini/' + this.userData.atletaid
    );
    onValue(starCountRef1, (snapshot) => {
        this.galleria__scelta__data = snapshot.val();
      });
      if(this.galleria__scelta__data ){
        if(this.galleria__scelta__data.url ){
          this.imageUrl = this.galleria__scelta__data.url;
        }
      }else{
        this.imageUrl = "";
      }
    
      this.open_img = idi;
      if(this.open_img != idi){
        this.selectedFile  = null;
        this.imageUrl  = null;
        this.uis.imageUrl = null
      }

  }

  saveIscrizione() {

    const starCountRef1 = ref(
      this.db,
      'squadre/' +
      this.squadData.idsquadra +
      '/stagioni/' +
      this.stagione__scelta +
      '/galleria/' + this.galleria__scelta
       + "/immagini/" + this.userData.atletaid
    );
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.galleria__scelta__data.push(childSnapshot.val());
      });
    });
    set(
      ref(
        this.db,
        'squadre/' +
        this.squadData.idsquadra +
        '/stagioni/' +
        this.stagione__scelta +
        '/iscrittistagione/' +
        this.userData.atletaid
      ),
      {
        id: this.userData.atletaid,
        id__account: this.userData.atletaid,
        nome:this.userData.nome,
        cognome:this.userData.cognome,
        email:this.userData.email,
        telefono:this.userData.telefono,
        codicefiscale:this.userData.codicefiscale,
        corso: this.corso__scelta
      }
    );



    for(let i = 0; i<this.documenti__scelti.length; i++){
      if(this.documenti__approvati.includes(this.documenti__scelti[i].id)){
        set(
          ref(
            this.db,
            'squadre/' +
            this.squadData.idsquadra +
            '/stagioni/' +
            this.stagione__scelta +
            '/documenti/' + this.documenti__scelti[i].id + "/approvazioni/" + 
            this.userData.atletaid
          ),
          {
            id: this.userData.atletaid
          }
        );
      }else{
        const starCountprimary = ref(this.db, 'squadre/' +this.squadData.idsquadra +'/stagioni/' +this.stagione__scelta +'/documenti/' + this.documenti__scelti[i].id + "/approvazioni/" + this.userData.atletaid);
        remove(starCountprimary);
      }
    }

    set(
      ref(
        this.db,
        'utenti/'+ localStorage.getItem("sportyId")+ "/atleti/"+ localStorage.getItem("Sportyprofileid") + "/squadre/" + this.squadData.idsquadra
      ),
      {
        id: this.squadData.idsquadra,
        nome: this.squadData.nomesquadra
      }
    );

  }

  errorMes:number = 0;
  controlStagione(sez:any){
    if(this.stagione__scelta != 0 && this.stagione__scelta != "" && this.stagione__scelta){
      this.sezione_completamento = sez
      if(sez == 2){
        this.completamento[1] = 1;
      }
    }
    else{
      this.errorMes = 1;
      setInterval(() => {
        this.errorMes = 0;
      }, 3000)
    }

  }
  
  message:number = 0;
  updateAtleta(nome:any, cognome:any, email:any, datadinascita:any, luogodinascita:any, codicefiscale:any, residenza:any, telefono:any){
    let atleta:atleta

    const db = getDatabase();
    try{
      if(nome != "" && cognome != ""){
        atleta = {
          atletaid:this.userData.atletaid,
          nome:nome,
          cognome:cognome,
          email:email,
          datadinascita:datadinascita,
          luogodinascita:luogodinascita,
          codicefiscale:codicefiscale,
          residenza:residenza,
          telefono:telefono,
          immagini:this.userData.immagini,
          conferma:this.userData.conferma,
          stagione:this.userData.stagione,
          squadra:this.userData.squadra,
          datascadenza: this.userData.datascadenza,
          corso:this.userData.corso,
          documenti:this.userData.documenti,
          messaggi:this.userData.messaggi,
          allenamenti:this.userData.allenamenti,
          tema:this.userData.tema,
          gestore:this.userData.gestore
        };
      
        const updates:any = {};
        updates['utenti/' + localStorage.getItem("sportyId")+"/atleti/"+localStorage.getItem("Sportyprofileid")] = atleta;
      
        update(ref(db), updates);
  
        this.message = 1
        setInterval(() => {
          this.message = 0;
        },2000)
      }else{
        this.message = 2
        setInterval(() => {
          this.message = 0;
        },2000)
      }
    }catch{
      this.message = 3
      setInterval(() => {
        this.message = 0;
      },2000)
    }
  }
}