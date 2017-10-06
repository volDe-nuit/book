import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class SearchService {
  constructor(private db: AngularFireDatabase) { }
  getBooks(start, end): FirebaseListObservable<any> {
    return this.db.list('/books', {
      query: {
        orderByChild: 'Title',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  }
}
