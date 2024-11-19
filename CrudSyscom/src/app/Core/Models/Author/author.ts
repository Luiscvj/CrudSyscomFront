import { Book } from "../Book/Book";

export class Author
{
    AuthorId: number;
    AuthorName: string;
    Birth: Date;
    Books: Book [];

    constructor(_author?:number, _authorName?:string,_birth?:Date,_books?:Book[])
    {
        this.AuthorId = _author ?? 0;
        this.AuthorName = _authorName ?? "";
        this.Birth = _birth ?? new Date();
        this.Books = _books ?? [];
    }

}