import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list-component.component';
import { Book } from '../models/book.model';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize book with default values', () => {
    expect(component.book).toEqual({
      title: '',
      author: '',
      isbn: 0,
      price: 0,
      pubDate: '',
      genre: ''
    });
  });

  it('should accept book input correctly', () => {
    const mockBook: Book = {
      title: 'Test Book',
      author: 'Test Author',
      isbn: 12345,
      price: 99.99,
      pubDate: '2025-02-25',
      genre: 'Fiction',
      id: 1
    };

    component.book = mockBook;
    fixture.detectChanges(); // Trigger change detection

    expect(component.book).toEqual(mockBook);
  });

  it('should emit onRemoveBook when deleteBookClicked is called', () => {
    spyOn(component.onRemoveBook, 'emit');

    component.book.id = 1; // Set a valid book ID
    component.deleteBookClicked();

    expect(component.onRemoveBook.emit).toHaveBeenCalledWith(1);
  });

  it('should emit onEditBook when editBookClicked is called', () => {
    spyOn(component.onEditBook, 'emit');

    component.book.id = 2; // Set a valid book ID
    component.editBookClicked();

    expect(component.onEditBook.emit).toHaveBeenCalledWith(2);
  });
});
