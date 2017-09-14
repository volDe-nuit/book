import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import{ Subscription } from 'rxjs/Subscription'
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule,ActivatedRoute,Routes,Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(private db:AngularFireDatabase, private AppRouting: ActivatedRoute, private router: Router) { }

  /// unwrapped arrays from firebase
  books: any;
  filteredBooks: any;

  /// filter-able properties
  category:  string;

  /// Active filter rules
  filters = {}

  ngOnInit() {
    this.db.list('/books')
    .subscribe(books => {
      this.books = books;
      this.applyFilters()
    })
  }

  private applyFilters() {
    this.filteredBooks = _.filter(this.books, _.conforms(this.filters) )
  }

    /// filter property by equality to rule
  filterExact(property: string, rule: any) {
   this.filters[property] = val => val == rule
   this.applyFilters()
 }
      /// removes filter
  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }
}
