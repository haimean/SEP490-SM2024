class NotFoundError extends Error {
  status: number;
  messageObject: string | object;
  constructor(message: object | string) {
    super();
    this.status = 400;
    this.messageObject = message;
  }
}
export default NotFoundError;
