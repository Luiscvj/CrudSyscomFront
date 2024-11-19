import { AuthorIdDto } from "../../Author/AuthorDTOS/AuthorIdDto";
import { GenreIdDto } from "../../Genre/GenreDTOS/GenreIdDto";

export class AddBookDto{

    bookId:number;
    bookTitle:string;
    genres: GenreIdDto[];
    authors: AuthorIdDto[];

    constructor(_bookId?: number,_bookTitle?:string, _genres?:GenreIdDto[],_authors?:AuthorIdDto[])
    {
        this.bookId = _bookId?? 0;
        this.bookTitle = _bookTitle ?? "";
        this.genres = _genres ?? [];
        this.authors  = _authors ?? [];
    }
}