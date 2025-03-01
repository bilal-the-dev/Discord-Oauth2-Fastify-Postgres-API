export default class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, code: number) {
    super(message);

    this.statusCode = code;
    this.isOperational = true;
  }
}
