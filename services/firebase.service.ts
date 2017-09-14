import { Injectable } from '@angular/core';
import {  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Book } from '../services/book';

@Injectable()

export class FirebaseService {

  private basePath: string = '/books';

  books: FirebaseListObservable<Book[]> = null; //  list of objects
  book: FirebaseObjectObservable<Book> = null; //   single object


  constructor(private af: AngularFireDatabase,
              private db: AngularFireDatabase) {}

  getBookList(query={}): FirebaseListObservable<Book[]> {
    this.books = this.db.list(this.basePath, {
      query: query
    });
    return this.books
  }

  // Return a single observable item
  getBookDetails(key: string): FirebaseObjectObservable<Book> {
    const bookPath =  `${this.basePath}/${key}`;
    this.book = this.db.object(bookPath)
    return this.book
  }

  createBook(book: string): void  {
     this.books.push({ content: book, done: false })
       .catch(error => this.handleError(error))
   }

   // Update an existing item
   updateBook(key: string, value: any): void {
     this.books.update(key, value)
       .catch(error => this.handleError(error))
   }

   // Deletes a single item
   deleteBook(key: string): void {
       this.books.remove(key)
         .catch(error => this.handleError(error))
   }

 // Default error handling for all actions
 private handleError(error) {
   console.log(error)
 }

}
