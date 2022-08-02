export class TestPostRequestDto {
  public title: string;
  public author_name: string;
  public publication_year: number;
  public isbn: string;
  public num_pages: number;
  constructor(
    title?: any,
    author_name?: any,
    publication_year?: any,
    isbn?: any,
    num_pages?: any
  ) {
    this.title = title ? title : "";
    this.author_name = author_name ? author_name : "";
    this.publication_year = publication_year ? publication_year : 0;
    this.isbn = isbn ? isbn : "";
    this.num_pages = num_pages ? num_pages : 0;
  }
}
