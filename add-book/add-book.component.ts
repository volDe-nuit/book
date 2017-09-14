import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  title:any;
  authors:any;
  category:any;
  description:any;
  isbn:any;
  publisher:any;
  pages:any;

  constructor(private firebaseService:FirebaseService,
              private router:Router
            ) { }

  ngOnInit() {
  }

}
