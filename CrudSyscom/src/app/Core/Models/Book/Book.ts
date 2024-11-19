import { Author } from "../Author/author";
import { Genre } from "../Genre/Genre";

export class Book
{
    BookId: number;
    BookTitle: string;
    PublicationDate : Date;
    Genres: Genre[];
    Authors: Author[];

    constructor(_bookId?: number, _bookTitle?:string,_publicationDate?:Date, _genres?: Genre[],_authors?:Author[])
    {
        this.BookId= _bookId ?? 0;
        this.BookTitle= _bookTitle ?? "";
        this.PublicationDate= _publicationDate ?? new Date();
        this.Genres= _genres ?? [];
        this.Authors= _authors ?? [];
    }
}