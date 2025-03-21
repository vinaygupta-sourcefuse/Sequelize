import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';

//fdescribe() is used to run only the tests within the fdescribe block

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController; // control fake HTTP requests

  beforeEach(() => {
    //create a fake testing environment for angular
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule], // to mock Http requests (so we don't make real requests)
      providers: [BookService] // Provides the BookService
    });
  
    service = TestBed.inject(BookService); 
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify(); // Ensures no outstanding requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve books from API via GET', () => {
    const mockBooks: Book[] = [
      {  
        "title": "Ramayana",
        "author": "Tulsidas",
        "isbn": 1,
        "price": 211,
        "pubDate": "2025-02-25",
        "genre": "non-fiction",
        "id": 1740655557766
       }
    ];

    service.getBooks().subscribe((books) => {
      expect(books.length).toBe(1);
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks); // flush means to return the mockBooks array as the response
  });

  it('should add a new book via POST', () => {
    const newBook: Book =  {
      "title": "Ramayana",
      "author": "Tulsidas",
      "isbn": 1,
      "price": 211,
      "pubDate": "2025-02-25",
      "genre": "non-fiction",
      "id": 1
    };

    service.postBook(newBook).subscribe((book) => {
      expect(book).toEqual(newBook);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newBook);
    req.flush(newBook);
  });

  it('should delete a book via DELETE', () => {
    const bookId = '1';

    service.deleteBook(bookId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/${bookId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush([]);
  });
});
