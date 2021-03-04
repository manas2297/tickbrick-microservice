

export interface CustomError {
  statusCode: Number,
  serializeErrors(): {
    message: string,
    field?: string,
  }[],
};
