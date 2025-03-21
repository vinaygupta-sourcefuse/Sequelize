import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/book.model'; // Adjust the import path as necessary

@Component({
  selector: 'app-book-list-component',
  templateUrl: './book-list-component.component.html',
  styleUrls: ['./book-list-component.component.css']
})
export class BookListComponent implements OnInit {

  @Input() book: Book;
  @Output() onRemoveBook = new EventEmitter<number>();
  @Output() onEditBook = new EventEmitter<number>();

  constructor() { 
    this.book = {
      title: '',
      author: '',
      isbn: 0,
      price: 0,
      pubDate: '',
      genre: ''
    };
  }
  

  ngOnInit(): void {
  }

  deleteBookClicked() {
    this.onRemoveBook.emit(this.book.isbn);
  }

  editBookClicked(){
    this.onEditBook.emit(this.book.isbn);
  }
}