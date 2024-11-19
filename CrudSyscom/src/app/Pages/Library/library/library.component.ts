import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule 
} from '@angular/material/dialog';
import { Book } from '../../../Core/Models/Book/Book';
import { BookService,  } from '../../../Core/Services/BookService/book.service';
@Component({
  selector: 'app-library',
  standalone: true,
  imports: 
  [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule 
    
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  booksList: Book[] = [];
 
  constructor(private _bookService: BookService) {
    
    
  }
  ngOnInit(): void {
    this._bookService.GetAllBooks().subscribe(
      {
        next:(data)=>
          {
            if(data.status === 200)
              {
                console.log(data.body);
              }
          }
      })
  }

}
