"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const test_delete_response_1 = require("../dtos/response/test.delete.response");
const test_get_response_1 = require("../dtos/response/test.get.response");
const test_post_response_1 = require("../dtos/response/test.post.response");
const test_schema_1 = require("../models/mongodb/test.schema");
class TestController {
    constructor() {
        this.testSchema = new test_schema_1.TestSchema();
    }
    testPost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, author_name, publication_year, isbn, num_pages } = params;
                const Test = this.testSchema.testSchemaModel;
                const findTest = yield Test.findOne({ isbn: isbn });
                console.log(findTest);
                const response = new test_post_response_1.TestPostResponseDto();
                if (!findTest) {
                    const test = new Test({
                        title: title,
                        author_name: author_name,
                        publication_year: publication_year,
                        isbn: isbn,
                        num_pages: num_pages,
                    });
                    const saveTest = yield test.save();
                    console.log(saveTest);
                    response.message = "Record successfully saved!";
                    response.statusCode = 200;
                }
                else {
                    response.message = "There is already a record with that existing isbn.";
                    response.statusCode = 500;
                    throw response;
                }
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
    testGet() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Test = this.testSchema.testSchemaModel;
                const tests = yield Test.find({}, "-__v").sort({
                    num_pages: 1,
                });
                const response = new test_get_response_1.TestGetResponseDto(200, tests);
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
    testDelete(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { isbn } = params;
                const Test = this.testSchema.testSchemaModel;
                const findTest = yield Test.findOne({ isbn: isbn });
                const response = new test_delete_response_1.TestDeleteResponseDto();
                if (findTest) {
                    const test = yield Test.deleteOne({ isbn: isbn });
                    if (test.deletedCount == 1) {
                        response.statusCode = 200;
                        response.message = "Delete successful!";
                    }
                    else {
                        response.statusCode = 500;
                        response.message = "Delete failed!";
                    }
                }
                else {
                    response.statusCode = 500;
                    response.message = "No document with that isbn to be deleted!";
                }
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TestController = TestController;
