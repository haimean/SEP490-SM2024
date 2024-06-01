class ValidationError extends Error {
  status: number;
  messageObject: object | string;
  constructor(message: object | string) {
    super();
    this.status = 422;
    this.messageObject = message;
  }
}
export default ValidationError;
