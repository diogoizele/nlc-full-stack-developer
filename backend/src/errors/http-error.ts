export class HttpError extends Error {
  statusCode: number;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }

  static BAD_REQUEST(message: string = "Bad Request") {
    return new HttpError(400, message);
  }

  static UNAUTHORIZED(message: string = "Unauthorized") {
    return new HttpError(401, message);
  }

  static NOT_FOUND(message: string = "Not Found") {
    return new HttpError(404, message);
  }
}
