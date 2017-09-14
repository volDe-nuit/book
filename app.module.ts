import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import { environment } from '../environments/environment';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { FirebaseService } from './services/firebase.service';
import {SearchService} from './services/search.service';
import { Subject } from 'rxjs/Subject';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
export const firebaseConfig = environment.firebaseConfig;


const appRoutes : Routes = [
  {path:'home', component:HomeComponent},
  {path:'book-list', component:BookListComponent},
  {path:'book-details/:isbn', component:BookDetailsComponent},
  {path:'add-book', component:AddBookComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    BookSearchComponent,
    NavbarComponent,
    AddBookComponent,
    EditBookComponent,
    HomeComponent,
    LoginComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ FirebaseService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
