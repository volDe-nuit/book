import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

export class Book {
  title:any;
  authors:any;
  category:any;
  description:any;
  isbn:any;
  publisher:any;
  pages:any;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  book: Book = new Book()

  constructor(private firebaseService:FirebaseService,
              private router:Router
            ) { }

  ngOnInit() {
  }

  createBook() {
    this.firebaseService.createBook(this.book)
  }



}
