class CustomError extends Error {
  status: number;
  messageObject: object | string;
  constructor(message: object | string, status: number) {
    super();
    this.status = status;
    this.messageObject = message;
  }
}
export default CustomError;
