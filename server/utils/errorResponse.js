export class ErrorApi extends Error {
  status;
  message;
  constructor(status, message) {
    super(message);

    this.message = message;
    this.status = status;
  }
}
