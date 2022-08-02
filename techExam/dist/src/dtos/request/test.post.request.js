"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPostRequestDto = void 0;
class TestPostRequestDto {
    constructor(title, author_name, publication_year, isbn, num_pages) {
        this.title = title ? title : "";
        this.author_name = author_name ? author_name : "";
        this.publication_year = publication_year ? publication_year : 0;
        this.isbn = isbn ? isbn : "";
        this.num_pages = num_pages ? num_pages : 0;
    }
}
exports.TestPostRequestDto = TestPostRequestDto;
