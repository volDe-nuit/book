import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import { FirebaseService } from '../services/firebase.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

books;
startAt = new Subject()
endAt = new Subject()
lastKeypress: number = 0;
constructor(private booksSvc: SearchService) { }
ngOnInit() {
  this.booksSvc.getBooks(this.startAt, this.endAt)
                .subscribe(books => this.books = books)
}
search($event) {
  if ($event.timeStamp - this.lastKeypress > 200) {
    let q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")}
    this.lastKeypress = $event.timeStamp
  }
}
