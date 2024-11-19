export class GenreIdDto
{
    genreId: number;

    constructor(_genreId?:number) {
        
        this.genreId = _genreId?? 0;
    }
}