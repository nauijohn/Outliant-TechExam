"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class TestSchema {
    constructor() {
        this.testSchema = new mongoose_1.default.Schema({
            title: {
                type: String,
                required: true,
            },
            author_name: {
                type: String,
                required: true,
            },
            publication_year: {
                type: Number,
                required: true,
            },
            isbn: {
                type: String,
                required: true,
            },
            num_pages: {
                type: Number,
                required: true,
            },
        });
        this.testSchemaModel = mongoose_1.default.model("test", this.testSchema);
    }
}
exports.TestSchema = TestSchema;
