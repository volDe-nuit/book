import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Upload } from '../../models/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

export class AddBookComponent implements OnInit {


  selectedFiles: FileList;
  currentUpload: Upload;
  key;
  title;
  authors;
  description;
  category;
  isbn;
  publisher;
  pages;

  constructor(private firebaseService:FirebaseService,
              private router:Router,
              private route:ActivatedRoute
            ) { }


  ngOnInit() {
    this.key = this.route.snapshot.params['key'];

    this.firebaseService.getBookDetails(this.key).subscribe(upload => {
      this.title = upload.title;
      this.authors = upload.authors;
      this.description = upload.description;
      this.category = upload.category;
      this.isbn = upload.isbn;
      this.publisher = upload.publisher;
      this.pages = upload.pages;
    });
}
  updateUpload(){
    let upload = {
        title: this.title,
        authors: this.authors,
        description: this.description,
        category: this.category,
        isbn: this.isbn,
        publisher: this.publisher,
        pages: this.pages
    }
    this.firebaseService.updateUpload(this.key, Upload);
    this.router.navigate(['/book-list']);
   }

detectFiles(event) {
      this.selectedFiles = event.target.files;
    }
uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.firebaseService.pushUpload(this.currentUpload);
  }
}
