import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode;
  constructor(message: string){
    super(message);
    this.statusCode = 500;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message},
    ];
  }
}