import { Book } from "../Book/Book";

export class Genre
{
    GenreId: number;
    GenreName: string;
    Books: Book[]; 

    
    constructor(_genreId?:number, _genreName?:string, _books?:Book[]) 
    {
        this.GenreId = _genreId ?? 0;
        this.GenreName = _genreName ?? "";
        this.Books = _books ?? [];
        
    }
}