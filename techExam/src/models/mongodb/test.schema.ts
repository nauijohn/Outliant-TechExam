import mongoose from "mongoose";

export class TestSchema {
  private testSchema: mongoose.Schema;
  public testSchemaModel: mongoose.Model<any>;
  constructor() {
    this.testSchema = new mongoose.Schema({
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
    this.testSchemaModel = mongoose.model("test", this.testSchema);
  }
}
