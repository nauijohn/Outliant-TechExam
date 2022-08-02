"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDeleteResponseDto = void 0;
class TestDeleteResponseDto {
    constructor(statusCode, message) {
        this.statusCode = statusCode ? statusCode : 0;
        this.message = message ? message : "";
    }
}
exports.TestDeleteResponseDto = TestDeleteResponseDto;
