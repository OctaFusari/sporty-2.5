import { Component, Renderer2, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';
import { SquadraContainerComponent } from '../squadra-container/squadra-container.component';
import { UploadImgService } from 'src/services/upload-img.service';

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

  oiFun(id:any){
    this.open_img = id;
    if(this.open_img != id){
      this.selectedFile  = null;
      this.imageUrl  = null;
      this.uis.imageUrl = null
    }
  }

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

  uploadFile(cartella: any): void {
    if (this.selectedFile) {
      this.uis.uploadFile(
        this.selectedFile,
        this.squadData.idsquadra,
        this.userData.atletaid,
        cartella,
        this.stagione__scelta
      );
    }
  }

  part: boolean = false;
  open__doc(id: any) {
    /* open__doc__{{documento.id}} */
    this.part = !this.part;
    let styleText = '';
    if (this.part == true) {
      styleText = `
      #open__doc__${id}{
        display: block !important; 
      }
      `;
    } else {
      styleText = `
      #open__doc__${id}{
        display: none !important; 
      }
      `;
    }
    const style = this.renderer.createElement('style');
    style.innerHTML = styleText;
    this.renderer.appendChild(document.head, style);
  }

  approve__doc:any = 2;

  addCl(id: any) {

    let styleText = `
        #${id}{
          border: 1px solid var(--text) !important;
          background-color: var(--sporty-blue) !important;
          color: var(--text-white) !important;
        }
        `;
      
    const index = this.documenti__approvati.indexOf(id);
    if (index !== -1) {
      this.documenti__approvati.splice(index, 1);
      styleText = `
        #${id}{
          border: 1px solid var(--text) !important;
          background-color: var(--card) !important;
          color: var(--text) !important;
        }
        `;
    } else {
      this.documenti__approvati.push(id);
      styleText = `
        #${id}{
          border: 1px solid var(--text) !important;
          background-color: var(--sporty-blue) !important;
          color: var(--text-white) !important;
        }
        `;
    }

    const style = this.renderer.createElement('style');
    style.innerHTML = styleText;
    this.renderer.appendChild(document.head, style);

    /* 
          #${id}:checked+.check svg {
        stroke: var(--sporty-blue);
      }
    
      #${id}:checked+.check svg path {
          stroke-dashoffset: 60;
          transition: all 0.3s linear;
      }
    
      #${id}:checked+.check svg polyline {
          stroke-dashoffset: 42;
          transition: all 0.2s linear;
          transition-delay: 0.15s;
      }
    */
  }
  takeStagione(ids: any) {
    const starCountRef1 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + ids
    );
    onValue(starCountRef1, (snapshot) => {
      this.stagione__data = snapshot.val();
    });

/*     onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.stagioni.push(childSnapshot.val());
        if(this.userData.atletaid in childSnapshot.val().iscrittistagione){
          this.stagione__scelta = childSnapshot.val().id;
        }
      });
    }); */
    
  }

  takeStagione__data__inside(ids: any) {
    
    this.corsi__scelti = [];
    this.documenti__scelti = [];
    this.galleria__scelti = [];

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

    console.log(this.galleria__scelti)

    const starCountRef4 = ref(
      this.db,
      'squadre/' + this.squadData.idsquadra + '/stagioni/' + ids + '/iscrittistagione/'
    );
    onValue(starCountRef4, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      this.corso__scelta = childSnapshot.val().corso;
        
      });
    });

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
      '/immagini/'
    );
    onValue(starCountRef1, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.galleria__scelta__data.push(childSnapshot.val());
      });
    });

    console.log(this.galleria__scelta__data)
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
        nome:this.userData.nome,
        cognome:this.userData.cognome,
        corso: this.corso__scelta
      }
    );

    for(let i = 0; i<this.documenti__approvati.length; i++){
      set(
        ref(
          this.db,
          'squadre/' +
          this.squadData.idsquadra +
          '/stagioni/' +
          this.stagione__scelta +
          '/documenti/' + this.documenti__approvati + "/approvazioni/" + 
          this.userData.atletaid
        ),
        {
          id: this.userData.atletaid
        }
      );
    }
  }
}
