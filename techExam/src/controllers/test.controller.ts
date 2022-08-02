import mongoose from "mongoose";

import { TestDeleteRequestDto } from "../dtos/request/test.delete.request";
import { TestPostRequestDto } from "../dtos/request/test.post.request";
import { TestDeleteResponseDto } from "../dtos/response/test.delete.response";
import { TestGetResponseDto } from "../dtos/response/test.get.response";
import { TestPostResponseDto } from "../dtos/response/test.post.response";
import { TestSchema } from "../models/mongodb/test.schema";

export class TestController {
  private testSchema: TestSchema;
  constructor() {
    this.testSchema = new TestSchema();
  }

  public async testPost(
    params: TestPostRequestDto
  ): Promise<TestPostResponseDto> {
    try {
      const { title, author_name, publication_year, isbn, num_pages } = params;
      const Test = this.testSchema.testSchemaModel;
      const findTest = await Test.findOne({ isbn: isbn });
      console.log(findTest);
      const response: TestPostResponseDto = new TestPostResponseDto();
      if (!findTest) {
        const test = new Test({
          title: title,
          author_name: author_name,
          publication_year: publication_year,
          isbn: isbn,
          num_pages: num_pages,
        });
        const saveTest = await test.save();
        console.log(saveTest);
        response.message = "Record successfully saved!";
        response.statusCode = 200;
      } else {
        response.message = "There is already a record with that existing isbn.";
        response.statusCode = 500;
        throw response;
      }

      return response;
    } catch (err: any) {
      throw err;
    }
  }

  public async testGet(): Promise<TestGetResponseDto> {
    try {
      const Test = this.testSchema.testSchemaModel;
      const tests: any[] = await Test.find({}, "-__v").sort({
        num_pages: 1,
      });
      const response: TestGetResponseDto = new TestGetResponseDto(200, tests);
      return response;
    } catch (err: any) {
      throw err;
    }
  }

  public async testDelete(
    params: TestDeleteRequestDto
  ): Promise<TestDeleteResponseDto> {
    try {
      const { isbn } = params;
      const Test = this.testSchema.testSchemaModel;
      const findTest = await Test.findOne({ isbn: isbn });
      const response: TestDeleteResponseDto = new TestDeleteResponseDto();
      if (findTest) {
        const test = await Test.deleteOne({ isbn: isbn });

        if (test.deletedCount == 1) {
          response.statusCode = 200;
          response.message = "Delete successful!";
        } else {
          response.statusCode = 500;
          response.message = "Delete failed!";
        }
      } else {
        response.statusCode = 500;
        response.message = "No document with that isbn to be deleted!";
      }

      return response;
    } catch (err: any) {
      throw err;
    }
  }
}
