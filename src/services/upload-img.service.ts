import { Injectable, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UpdateImgIscrittoService } from './update-img-iscritto.service';

import heic2any from "heic2any";

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {
  constructor(public uiis:UpdateImgIscrittoService) { }

  imageUrl: string | null = null;
  uploadstatus:any;
  jpgFile:any;

  async uploadFile(file: File, squadra:any, id:any, cartella:any, stagione:any){

    const storage = getStorage();

    /** @type {any} */
    const metadata = {
      contentType: 'image/*'
    };
    this.jpgFile = file;

/* 
    let control = file.name;
    if(control.includes(".heic")){
      const blob:any = await heic2any({
        blob: file,
        toType: 'image/*',
      });
    
      console.log(file.name)
      this.jpgFile = new File([blob], `${file.name.replace('.heic', '.jpg')}`, { type: 'image/jpeg' });
    } */

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, squadra+`/`+stagione+`/`+cartella+`/`+id);
    const uploadTask = uploadBytesResumable(storageRef, this.jpgFile, metadata);

     uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.uploadstatus = 'Percentuale caricamento ' + progress;
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.imageUrl = downloadURL;
          
          this.uiis.changeData(downloadURL, squadra, id, cartella, stagione)

        });
      }
    );
  }
  
}
