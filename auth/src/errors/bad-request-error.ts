import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode;

  constructor( public message: string ) {
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }]
  }
}