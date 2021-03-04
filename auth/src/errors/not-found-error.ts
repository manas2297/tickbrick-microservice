import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode;
  constructor() {
    super();
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}