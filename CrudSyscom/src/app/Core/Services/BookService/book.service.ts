import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../../../app.config';
import { appsettings } from '../../Settings/appsetings';
import { Observable } from 'rxjs';
import { Book } from '../../Models/Book/Book';
import { AddBookDto } from '../../Models/Book/BookDTOS/AddBookDto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl: string = appsettings.apiUrl + "Book/"
  constructor(private http: HttpClient) { }

  AddBook(model:AddBookDto): Observable<HttpResponse<Response>>
  {
    console.log(model)
    return this.http.post<Response>(`${this.apiUrl}AddBook`,model,{observe:"response"});
  }

  GetAllBooks(): Observable<HttpResponse<Book[]>>
  {
    return this.http.get<Book[]>(`${this.apiUrl}GetAllBooksAndLists`, {observe:"response"})
  }

  GetBookByTitle(title: string): Observable<HttpResponse<Book[]>>
  {
    let params = new HttpParams().set("bookName",title);
    return this.http.get<Book[]>(`${this.apiUrl}GetBookByName`, {observe:"response",params})
  }

  GetBookByAuthor(authorName: string) : Observable<HttpResponse<Book[]>>
  {
    let params = new HttpParams().set("authorName",authorName);
    return this.http.get<Book[]>(`${this.apiUrl}GetBookByAuthor`,{observe:"response",params});
  }

  deleteBook(deleteBookId:number): Observable<HttpResponse<Response>>
  {
    let params = new HttpParams().set("bookId",deleteBookId);
    return this.http.delete<Response>(`${this.apiUrl}DeleteBook`, {observe:"response",params});
  }

  UpdateBook(model:AddBookDto): Observable<HttpResponse<Response>>
  {
    return this.http.put<Response>(`${this.apiUrl}UpdateBook`,model,{observe:"response"})
  }
}
