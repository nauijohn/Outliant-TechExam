"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPostResponseDto = void 0;
class TestPostResponseDto {
    constructor(statusCode, message) {
        this.statusCode = statusCode ? statusCode : 0;
        this.message = message ? message : "";
    }
}
exports.TestPostResponseDto = TestPostResponseDto;
