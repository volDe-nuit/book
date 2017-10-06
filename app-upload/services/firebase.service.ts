
import { Injectable } from '@angular/core';
import {  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from '../../models/upload';
import * as _ from 'lodash';


@Injectable()

export class FirebaseService {

  private basePath: string = '/books';

  uploads: FirebaseListObservable<Upload[]> = null; //  list of objects
  upload: FirebaseObjectObservable<any> = null; //   single object
  folder:any;


  constructor(private db: AngularFireDatabase ) {

}

  getBookList(query={}) {

    this.uploads = this.db.list(this.basePath, {
      query: query
    });
    return this.uploads
  }


  // Return a single observable item

  getBookDetails(key: string){

    const bookPath =  `${this.basePath}/${key}`;

    this.upload = this.db.object(bookPath)
    return this.upload

  }

  //upload images

    pushUpload(upload: Upload) {
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
        .put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        // three observers
        // 1.) state_changed observer
        (snapshot) => {
          // upload in progress
          upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
          console.log(upload.progress);
        },
        // 2.) error observer
        (error) => {
          // upload failed
          console.log(error);
        },
        // 3.) success observer
        (): any => {
          upload.imageUrl = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload)
          return undefined
        }
      );
    }
    private saveFileData(upload: Upload) {
      this.db.list(`${this.basePath}/`).push(upload).key;
    }


    updateUpload(key, upload){
         return this.db.list(`${this.basePath}/`).update(key,upload);
       }

}
