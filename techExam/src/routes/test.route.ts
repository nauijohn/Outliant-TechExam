import express from "express";

import { TestController } from "../controllers/test.controller";
import { TestDeleteRequestDto } from "../dtos/request/test.delete.request";
import { TestPostRequestDto } from "../dtos/request/test.post.request";
import { TestDeleteResponseDto } from "../dtos/response/test.delete.response";
import { TestPostResponseDto } from "../dtos/response/test.post.response";
import { ErrorModel } from "../models/error.model";
import { Payload } from "../models/payload.model";

export class TestRoute {
  public router: express.Router;
  //   public userSchema: UserSchema;
  public testController: TestController;
  constructor() {
    this.router = express.Router();
    // this.userSchema = new UserSchema();
    this.testController = new TestController();
    this.routes();
  }
  private routes() {
    this.router.post(
      "/test",
      async (req: express.Request, res: express.Response) => {
        try {
          const { title, author_name, publication_year, isbn, num_pages } =
            req.body;
          const params: TestPostRequestDto = new TestPostRequestDto(
            title,
            author_name,
            publication_year,
            isbn,
            num_pages
          );
          if (!title) throw new ErrorModel(500, "title is required");
          if (!author_name)
            throw new ErrorModel(500, "author_name is required");
          if (!publication_year)
            throw new ErrorModel(500, "publication_year is required");
          if (!isbn) throw new ErrorModel(500, "isbn is required");
          if (!num_pages) throw new ErrorModel(500, "num_pages is required");
          const response: TestPostResponseDto =
            await this.testController.testPost(params);
          const payload: Payload = new Payload(
            response.statusCode,
            response.message
          );
          res.status(payload.statusCode).send(payload);
        } catch (err: any) {
          res.send(err);
        }
      }
    );

    this.router.get(
      "/test",
      async (req: express.Request, res: express.Response) => {
        try {
          const response = await this.testController.testGet();
          const payload: Payload = new Payload(200, response);
          res.status(payload.statusCode).send(payload.data);
        } catch (err: any) {
          res.send(err);
        }
      }
    );

    this.router.delete(
      "/test/:isbn",
      async (req: express.Request, res: express.Response) => {
        try {
          const { isbn } = req.params;
          const params: TestDeleteRequestDto = new TestDeleteRequestDto(isbn);
          const response: TestDeleteResponseDto =
            await this.testController.testDelete(params);
          const payload: Payload = new Payload(
            response.statusCode,
            response.message
          );
          res.status(payload.statusCode).send(payload.data);
        } catch (err: any) {
          res.send(err);
        }
      }
    );
  }
}
