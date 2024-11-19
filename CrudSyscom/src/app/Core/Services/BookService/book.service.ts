import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../../../app.config';
import { appsettings } from '../../Settings/appsetings';
import { Observable } from 'rxjs';
import { Book } from '../../Models/Book/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl: string = appsettings.apiUrl + "Book/"
  constructor(private http: HttpClient) { }

  GetAllBooks(): Observable<HttpResponse<Book[]>>
  {
    return this.http.get<Book[]>(`${this.apiUrl}GetAllBooks`, {observe:"response"})
  }
}
