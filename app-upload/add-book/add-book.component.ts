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
  key:string;
  title:string;
  authors:string;
  description:string;
  category:string;
  isbn:number;
  publisher:string;
  pages:number;


  constructor(private firebaseService:FirebaseService,
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
   console.log(key) // your key is here
})
  }

  ngOnInit() {
    }
  updateUpload(key, upload){
    let Upload = {

        title: this.title,
        authors: this.authors,
        description: this.description,
        category: this.category,
        isbn: this.isbn,
        publisher: this.publisher,
        pages: this.pages,
    }
    this.firebaseService.updateUpload(this.key,upload).then(key => {
   console.log(key)
 })
    this.router.navigate(['/book-list']);
   }

}
