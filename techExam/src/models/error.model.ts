export class ErrorModel {
  public statusCode: number;
  public message: any;
  constructor(statusCode: number, message: any) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
