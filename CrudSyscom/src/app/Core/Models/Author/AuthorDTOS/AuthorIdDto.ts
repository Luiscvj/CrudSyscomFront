export class AuthorIdDto
{
    authorId: number;

    constructor(_authorId?:number) {
        
        this.authorId = _authorId?? 0;
    }
}