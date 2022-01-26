import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl: string = `${environment.baseUrl}/book`;
  constructor(private httpClient: HttpClient) { }

  addBook(book: Book) : Observable<Book> {
    return this.httpClient.post<any>(this.apiUrl,book);
  }
  updateBook(bookId: string, book: Book) : Observable<Book> {
    return this.httpClient.put<any>(`${this.apiUrl}/${bookId}`,book);
  }
  saveBookImage(image) : Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/saveImage`,image);
  }
  getBooks() : Observable<Book[]> {
    return this.httpClient.get<any>(this.apiUrl).pipe(map(result=>result.data));
  }
  getBookById(id) : Observable<Book> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`).pipe(map(result=>result.data));
  }
}
