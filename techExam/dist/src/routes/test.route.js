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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoute = void 0;
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("../controllers/test.controller");
const test_delete_request_1 = require("../dtos/request/test.delete.request");
const test_post_request_1 = require("../dtos/request/test.post.request");
const error_model_1 = require("../models/error.model");
const payload_model_1 = require("../models/payload.model");
class TestRoute {
    constructor() {
        this.router = express_1.default.Router();
        // this.userSchema = new UserSchema();
        this.testController = new test_controller_1.TestController();
        this.routes();
    }
    routes() {
        this.router.post("/test", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, author_name, publication_year, isbn, num_pages } = req.body;
                const params = new test_post_request_1.TestPostRequestDto(title, author_name, publication_year, isbn, num_pages);
                if (!title)
                    throw new error_model_1.ErrorModel(500, "title is required");
                if (!author_name)
                    throw new error_model_1.ErrorModel(500, "author_name is required");
                if (!publication_year)
                    throw new error_model_1.ErrorModel(500, "publication_year is required");
                if (!isbn)
                    throw new error_model_1.ErrorModel(500, "isbn is required");
                if (!num_pages)
                    throw new error_model_1.ErrorModel(500, "num_pages is required");
                const response = yield this.testController.testPost(params);
                const payload = new payload_model_1.Payload(response.statusCode, response.message);
                res.status(payload.statusCode).send(payload);
            }
            catch (err) {
                res.send(err);
            }
        }));
        this.router.get("/test", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.testController.testGet();
                const payload = new payload_model_1.Payload(200, response);
                res.status(payload.statusCode).send(payload.data);
            }
            catch (err) {
                res.send(err);
            }
        }));
        this.router.delete("/test/:isbn", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { isbn } = req.params;
                const params = new test_delete_request_1.TestDeleteRequestDto(isbn);
                const response = yield this.testController.testDelete(params);
                const payload = new payload_model_1.Payload(response.statusCode, response.message);
                res.status(payload.statusCode).send(payload.data);
            }
            catch (err) {
                res.send(err);
            }
        }));
    }
}
exports.TestRoute = TestRoute;
