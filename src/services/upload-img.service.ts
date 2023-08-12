import { Injectable, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, FirebaseStorage } from "firebase/storage";
import { UpdateImgIscrittoService } from './update-img-iscritto.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadImgService {
  constructor(public uiis:UpdateImgIscrittoService) { }

  imageUrl: string | null = null;
  uploadstatus:any;
  uploadFile(file: File, squadra:any, id:any, cartella:any, stagione:any){
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, squadra+`/`+stagione+`/`+cartella+`/`+id);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
