import { Component, ViewChild } from '@angular/core';
import { Book } from './models/book.model';
import { BookFormComponent } from './book-form-component/book-form-component.component';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(BookFormComponent) bookFormComponent!: BookFormComponent;

  title : string= 'BMS';
  booksToDisplay: Book[] = [];
  books: Book[]=[];

  // this method emits the updated books list from the child component
  onBooksChanged(updatedBooks: Book[]) {
    this.booksToDisplay = updatedBooks;
    this.books = updatedBooks;
  }

  constructor(private router: Router) {}
  isRouterActive(): boolean {
    return this.router.url !== '/'; // If URL is NOT "/", show router-outlet
  }
  
  EditBook(bookId: number) {
    const bookToEdit = this.books.find(book => book.isbn === bookId);
    if (bookToEdit) {
      this.bookFormComponent.editBook(bookToEdit); // Pass the book object
    }
  }

  RemoveBook(bookId: number) {
    this.bookFormComponent.removeBook(bookId); // Call removeBook from the child
  }

  searchBooks(event: any) {
    let filteredBooks: Book[] = [];

    if (event === '') {
      this.booksToDisplay = this.books;
    } else {
      filteredBooks = this.books.filter((val, index) => {
        let targetKey = val.title.toLowerCase() + '' + val.author.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.booksToDisplay = filteredBooks;
    }
  }
}