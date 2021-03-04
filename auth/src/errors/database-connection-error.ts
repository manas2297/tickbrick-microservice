import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode;
  reason;
  constructor(){
    super();
    this.statusCode = 500;
    this.reason = 'Error connecting to database';
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.reason },
    ];
  }
}