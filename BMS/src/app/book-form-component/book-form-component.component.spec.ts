import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form-component.component';
import { BookService } from '../bookService/book.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Book } from '../models/book.model';

class MockBookService {
  private books: Book[] = [
    { id: 1, title: 'Ramayana', author: 'Tulsidas', isbn: 123, price: 200, pubDate: '2025-02-25', genre: 'Epic' }
  ];

  getBooks = jasmine.createSpy('getBooks').and.returnValue(of([...this.books]));
  postBook = jasmine.createSpy('postBook').and.callFake((book: Book) => {
    this.books.push(book);
    return of(book);
  });
  deleteBook = jasmine.createSpy('deleteBook').and.callFake((id: string) => {
    this.books = this.books.filter(book => book.id !== +id);
    return of(null);
  });
}

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let mockBookService: MockBookService;

  beforeEach(async () => {
    mockBookService = new MockBookService();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BookFormComponent],
      providers: [{ provide: BookService, useValue: mockBookService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.bookForm.value).toEqual({
      title: '',
      author: '',
      isbn: 0,
      price: 0,
      pubDate: '',
      genre: ''
    });
  });

  it('should load books on initialization', () => {
    spyOn(component.booksChanged, 'emit');
    component.ngOnInit();
    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(component.booksChanged.emit).toHaveBeenCalled();
  });

  it('should call postBook and refresh books when addBook is called', () => {
    spyOn(component.booksChanged, 'emit');
    component.bookForm.setValue({
      title: 'Mahabharata',
      author: 'Vyasa',
      isbn: 456,
      price: 300,
      pubDate: '2025-03-10',
      genre: 'Epic'
    });

    component.addBook();
    expect(mockBookService.postBook).toHaveBeenCalled();
    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(component.booksChanged.emit).toHaveBeenCalled();
  });

  it('should call deleteBook and refresh books when removeBook is called', () => {
    spyOn(component.booksChanged, 'emit');
    component.removeBook(1);
    expect(mockBookService.deleteBook).toHaveBeenCalledWith('1');
    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(component.booksChanged.emit).toHaveBeenCalled();
  });

  it('should edit a book correctly', () => {
    const bookToEdit: Book = {
      id: 1, title: 'Ramayana', author: 'Tulsidas', isbn: 123, price: 200, pubDate: '2025-02-25', genre: 'Epic'
    };
    spyOn(component, 'removeBook');
    spyOn(component, 'toggleModal');

    component.editBook(bookToEdit);
    expect(component.bookForm.value).toEqual({
      title: 'Ramayana',
      author: 'Tulsidas',
      isbn: 123,
      price: 200,
      pubDate: '2025-02-25',
      genre: 'Epic'
    });
    expect(component.removeBook).toHaveBeenCalledWith(1);
    expect(component.toggleModal).toHaveBeenCalled();
  });

  it('should clear the form when clearForm is called', () => {
    component.bookForm.setValue({
      title: 'Some Book',
      author: 'Some Author',
      isbn: 789,
      price: 500,
      pubDate: '2025-05-05',
      genre: 'Fiction'
    });

    component.clearForm();
    expect(component.bookForm.value).toEqual({
      title: '',
      author: '',
      isbn: 0,
      price: 0,
      pubDate: '',
      genre: ''
    });
  });

  it('should toggle the modal when toggleModal is called', () => {
    const mockElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(mockElement);

    component.toggleModal();
    expect(mockElement.classList.contains('hidden')).toBeTrue(); // Initial state
  });

  it('should unsubscribe in ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.unsubscribe$, 'next');
    const completeSpy = spyOn(component.unsubscribe$, 'complete');

    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
