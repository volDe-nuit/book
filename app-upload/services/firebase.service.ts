
import { Injectable } from '@angular/core';
import {  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from '../../models/upload';
import * as _ from 'lodash';


@Injectable()

export class FirebaseService {

  private basePath: string = '/books';

  books: FirebaseListObservable<Upload[]> = null; //  list of objects
  book: FirebaseObjectObservable<any> = null; //   single object
  folder:any;


  constructor(private db: AngularFireDatabase ) {

}

  getBookList(query={}){
    this.books = this.db.list(this.basePath, {
      query: query
    });
    return this.books
  }


  // Return a single observable item

  getBookDetails(key: string){
    const bookPath =  `${this.basePath}/${key}`;
    this.book = this.db.object('/books/'+key)
    return this.book;
  }

  //upload images

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
pushUpload(upload: Upload) {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  const sub = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) =>  {
      // upload in progress
      const snap = snapshot as firebase.storage.UploadTaskSnapshot
      upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
    },
    (error) => {
      // upload failed
      console.log(error)
    },
    ():any => {
      // upload success
      upload.imageUrl = uploadTask.snapshot.downloadURL
      upload.name = upload.file.name
      // this.saveFileData(upload)
      return upload.file.name
    }
  );

  return uploadTask.then(snap => this.saveFileData(upload).key )
}


// Writes the file details to the realtime db
private saveFileData(upload: Upload) {
  return this.db.list(`${this.basePath}/`).push(upload);
}

// Update an existing book

/* updateUpload (upload: Upload){
        //Create Root Ref
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

        const sub = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>  {
            // upload in progress
            const snap = snapshot as firebase.storage.UploadTaskSnapshot
            upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
          },
          (error) => {
            // upload failed
            console.log(error)
          },
          ():any => {
            // upload success
            upload.imageUrl = uploadTask.snapshot.downloadURL
            upload.name = upload.file.name
            // this.saveFileData(upload)
            return upload.file.name
          }
        );

        return uploadTask.then(snap => this.saveFileData(upload).key )
      }


      // Writes the file details to the realtime db
      private updateFileData(upload: Upload, key: string){
        return this.db.list(`${this.basePath}/${key}`).push(upload);
      } */

   updateBook(book, key){
     return this.db.object('books/'+ key).update(book);
   }

// Delete an existing book
   deleteBook(key){
     return this.db.object('books/'+ key).remove();
   }

}
