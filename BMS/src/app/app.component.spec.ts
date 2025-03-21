import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BookFormComponent } from './book-form-component/book-form-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { BookService } from './bookService/book.service';

class MockBookService {
  getBooks() {
    return of([]); // Returns an empty observable array
  }
}

describe('AppComponent', () => {

  let component : AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  

  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, ReactiveFormsModule
      ],
      declarations: [
        AppComponent, BookFormComponent
      ],
      providers: [{ provide: BookService, useClass: MockBookService }],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //dom render
  });


  it('should create the app', () => {
    expect(component).toBeTruthy(); //component should not be null
  });

  it(`should have as title 'BMS'`, () => {
    expect(component.title).toEqual('BMS');
  });

  it('should initialize with an empty books array', () => {
    expect(component.books).toEqual([]);
  });

  it('should initialize with an empty booksToDisplay array', () => {
    expect(component.booksToDisplay).toEqual([]);
  });

  it('should update booklist when onBooksChanged is called',()=>{
    const mockBooks = [
      {
        "title": "Ramayana",
        "author": "Tulsidas",
        "isbn": 1,
        "price": 211,
        "pubDate": "2025-02-25",
        "genre": "non-fiction",
        "id": 1
      }
    ];
    component.onBooksChanged(mockBooks); 
    expect(component.booksToDisplay).toEqual(mockBooks);
    expect(component.books).toEqual(mockBooks);
  })



});
