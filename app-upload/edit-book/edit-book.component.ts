import { Component, OnInit} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Upload } from '../../models/upload';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

$key:string;
title:string;
file: File;
authors:string;
description:string;
category:string;
isbn:number;
image:string;
imageUrl: string;
progress: number;
createdAt: Date = new Date();
publisher:string;
pages:number;
fileChanged: boolean = false;
/*selectedFiles: FileList;
currentUpload: Upload; */


  constructor(private fbs:FirebaseService,
              private flashMsgeService: FlashMessagesService,
              private router:Router,
              private route:ActivatedRoute
            ) { }

  ngOnInit() {
    this.$key = this.route.snapshot.params['$key'];

    this.fbs.getBookDetails(this.$key).subscribe(book => {
      this.title = book.title;
      this.authors = book.authors;
      this.description = book.description;
      this.category = book.category;
      this.isbn = book.isbn;
      this.publisher = book.publisher;
      this.pages = book.pages;
      this.imageUrl = book.imageUrl;
      this.image = book.image;
    });

  }

/*
  detectFiles(event) {
        this.selectedFiles = event.target.files;
      }
  uploadSingle() {
      let file = this.selectedFiles.item(0)
      this.currentUpload = new Upload(file);
      this.fbs.pushUpload(this.currentUpload).then(key => {
       this.$key = key
       })
       this.flashMsgeService.show("Image filed changed!", {cssClass: "alert-success", timeout: 3000});
     }
*/

  updateBook(){
      let book = {
          imageUrl: this.imageUrl,
          title: this.title,
          authors: this.authors,
          description: this.description,
          category: this.category,
          isbn: this.isbn,
          publisher: this.publisher,
          pages: this.pages,
      }
      this.fbs.updateBook(this.$key, book);
      this.flashMsgeService.show("book has been successfully updated !!", {cssClass: "alert-success", timeout: 9000});
      this.router.navigate(['/book-list']);
    }

}
