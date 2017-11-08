import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book:any;
  imageUrl:any;
  $key:any;

  constructor(private fbs:FirebaseService,
              private flashMsgeService: FlashMessagesService,
              private router:Router,
              private route:ActivatedRoute
            ) { }
  bookObservable;

  ngOnInit() {
    //Get Id
    this.$key= this.route.snapshot.params['$key'];
    this.fbs.getBookDetails(this.$key).subscribe(book =>{
      this.book = book;
    });
  }

deleteBook(){
  if (confirm('Do you really want to delete book?')) {
    this.fbs.deleteBook(this.$key);
      this.flashMsgeService.show("Book has been successfully deleted", {cssClass: "alert-danger", timeout: 9000});
      this.router.navigate(['/book-list']);
    }
  }

}
