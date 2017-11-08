import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Upload } from '../../models/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

export class AddBookComponent {


  selectedFiles: FileList;
  currentUpload: Upload;
  key:string;
  title:string;
  authors:string;
  description:string;
  category:string;
  isbn:number;
  publisher:string;
  pages:number;

  constructor(private firebaseService:FirebaseService,
              private flashMsgeService: FlashMessagesService,
              private router:Router,
              private route:ActivatedRoute
            ) { }

detectFiles(event) {
      this.selectedFiles = event.target.files;
    }
uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.firebaseService.pushUpload(this.currentUpload).then(key => {
     this.key = key
   })
}

  updateBook (){
    let book = {
        title: this.title,
        authors: this.authors,
        description: this.description,
        category: this.category,
        isbn: this.isbn,
        publisher: this.publisher,
        pages: this.pages,
    }
    this.firebaseService.updateBook(book, this.key);
    this.flashMsgeService.show("New book has been successfully added !!", {cssClass: "alert-success", timeout: 9000});
    this.router.navigate(['/book-list']);
   }
}
