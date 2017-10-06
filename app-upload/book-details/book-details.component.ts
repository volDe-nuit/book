import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  upload:any;
  imageUrl:any;
  $key:any;

  constructor(private fireSvc:FirebaseService,
              private router:Router,
              private route:ActivatedRoute
            ) { }
  bookObservable;

  ngOnInit() {
    //Get Id
    this.$key= this.route.snapshot.params['$key'];
    this.fireSvc.getBookDetails(this.$key).subscribe(upload =>{
      this.upload = upload;
    });

  }

  }
