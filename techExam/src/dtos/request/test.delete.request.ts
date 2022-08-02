export class TestDeleteRequestDto {
  public isbn: string;
  constructor(isbn?: any) {
    this.isbn = isbn ? isbn : "";
  }
}
