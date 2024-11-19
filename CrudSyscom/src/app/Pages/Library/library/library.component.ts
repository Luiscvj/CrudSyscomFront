import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule 
} from '@angular/material/dialog';
import { Book } from '../../../Core/Models/Book/Book';
import { BookService,  } from '../../../Core/Services/BookService/book.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddBookComponent } from '../../Dialogs/add-book/add-book.component';
import { AddBookDto } from '../../../Core/Models/Book/BookDTOS/AddBookDto';
import { Genre } from '../../../Core/Models/Genre/Genre';
import { GenreIdDto } from '../../../Core/Models/Genre/GenreDTOS/GenreIdDto';
import { UpdateBookComponent } from '../../Dialogs/update-book/update-book.component';
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
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule, 
    
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  booksList: Book[] = [];
  displayedColumns: string[] =['BookTitle','Authors','Genres','Accion'];
  public formBuild = inject(FormBuilder)
  readonly keyWord  = new FormControl();
  readonly typeOfSearch = new FormControl();
 readonly options = this.formBuild.group(
  {
    _keyWord: this.keyWord,
    _typeOfSearch: this.typeOfSearch
  })

  protected readonly _typeOfSearch =toSignal(
    this.typeOfSearch.valueChanges.pipe(map(x => x || 'title')),
    {
      initialValue:'title'
    }
  )
  constructor(private _bookService: BookService, private cdr:ChangeDetectorRef,public dialog:MatDialog,) {
    
    
  }

 


  ngOnInit(): void 
  {
    this.getAllBooks();
  }

  getAllBooks(): void
  {
    this._bookService.GetAllBooks().subscribe(
      {
        next:(data)=>
          {
            if(data.status === 200 && data.body)
              {
              this.booksList = data.body;
              this.cdr.detectChanges();
              }
          }
      })
      console.log(this._typeOfSearch())
  }
  searchBook():void 
  {
    if(this._typeOfSearch()=="title")
      {
        this._bookService.GetBookByTitle(this.keyWord.value).subscribe(
          {
           
              next:(data)=>
                {
                  
                  if(data.status == 200 && data.body)
                    {
                      this.booksList = data.body;
                      console.log(data.body)
                    }else
                    {
                      alert("Book not found");
                    }
                }
          })
      }
      else if(this._typeOfSearch()=="author")
        {
          this._bookService.GetBookByAuthor(this.keyWord.value).subscribe(
            {
              next:(data)=>
                {
                  if(data.status === 200 && data.body)
                    {
                      this.booksList = data.body;
                      console.log(data.body)
                    }
                }
            })
        }

  }


  deleteBook(bookId:number):void
  {
    console.log(bookId);
    if(bookId > 0)
      {
        this._bookService.deleteBook(bookId).subscribe(
          {
            next:(response)=>
              {
                if(response.status === 204)
                  {
                    alert("Record deleted")
                    this.getAllBooks();


                  }
                  else{
                    alert(`${response.body}`);
                  }
              }
          })
      } 
  }


  addBook(): void
  { 
      const newBook: AddBookDto =
      {
        bookId: 0,
        bookTitle: "",
        genres: [],
        authors:[],
      }
      
      const dialogRef = this.dialog.open(AddBookComponent,
        {
          data: {bookId:newBook.bookId,bookTitle:newBook.bookTitle,genres: newBook.genres, authors: newBook.authors}
        })

        dialogRef.afterClosed().subscribe(
          {
            next:(data:AddBookDto)=>
              {
                let bookToAdd: AddBookDto = {
                  bookId: data.bookId,
                  bookTitle: data.bookTitle,
                  genres: Array.isArray(data.genres)
                    ? data.genres.map(genre => ({ genreId: genre.genreId }))
                    : [{ genreId: data.genres }],
                  authors: Array.isArray(data.authors)
                    ? data.authors.map(author => ({ authorId: author.authorId }))
                    : [{ authorId: data.authors }]
                };

                this._bookService.AddBook(bookToAdd).subscribe(
                  {
                    next:(response)=>
                      {
                        if(response.status == 201)
                          {
                            alert("Book created succesfully")
                            this.getAllBooks();
                            this.cdr.detectChanges();
                          }
                          else
                          {
                            alert(`${response.body}`);
                          }

                      }
                     
                  })
                 
              }
          })
  }


  updateBook(bookData: Book)
  {
    const dialogRef = this.dialog.open(UpdateBookComponent,
      {
        data:
        {
          bookId: bookData.bookId,
          bookTitle: bookData.bookTitle,
          genres: bookData.genres,
          authors:bookData.authors
        }
      })

      dialogRef.afterClosed().subscribe(
        {
          next:(data:AddBookDto)=>
            {
              let bookToUpdate: AddBookDto = {
                bookId: data.bookId,
                bookTitle: data.bookTitle,
                genres: Array.isArray(data.genres)
                  ? data.genres.map(genre => ({ genreId: genre.genreId }))
                  : [{ genreId: data.genres }],
                authors: Array.isArray(data.authors)
                  ? data.authors.map(author => ({ authorId: author.authorId }))
                  : [{ authorId: data.authors }]
              };

              this._bookService.UpdateBook(bookToUpdate).subscribe(
                {
                  next:(response)=>
                    {
                      if(response.status === 204){
                        alert("Record updated succesfully");
                        this.getAllBooks();
                        this.cdr.detectChanges();
                      }
                      else
                      {
                        alert(`${response.body}`);
                      }
                    }
                })
            }
        })
  }

}
