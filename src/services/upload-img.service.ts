import { Injectable, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {

  constructor() { }

  upload_img(scadenza:any,titolo:any,image:any, atletaobj:any){
    const storage = getStorage();
    const storageRef = ref(storage, atletaobj.squadra + "/"+ atletaobj.stagione +'/' + localStorage.getItem("prova") + "/" + atletaobj.atletaid +"/" +titolo);
    const uploadTask = uploadBytesResumable(storageRef, image.files[0]);
    let imageUrl = "";
    
  }
}
