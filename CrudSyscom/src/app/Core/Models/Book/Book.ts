import { Author } from "../Author/author";
import { Genre } from "../Genre/Genre";

export class Book
{
    bookId: number;
    bookTitle: string;
    publicationDate : Date;
    genres: Genre[];
    authors: Author[];

    constructor(_bookId?: number, _bookTitle?:string,_publicationDate?:Date, _genres?: Genre[],_authors?:Author[])
    {
        this.bookId= _bookId ?? 0;
        this.bookTitle= _bookTitle ?? "";
        this.publicationDate= _publicationDate ?? new Date();
        this.genres= _genres ?? [];
        this.authors= _authors ?? [];
    }
}