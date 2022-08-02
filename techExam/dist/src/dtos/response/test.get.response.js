"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestGetResponseDto = void 0;
class TestGetResponseDto {
    constructor(statusCode, data) {
        this.statusCode = statusCode ? statusCode : 0;
        this.data = data ? data : [];
    }
}
exports.TestGetResponseDto = TestGetResponseDto;
