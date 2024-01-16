class Status {
  constructor(status, data, message) {
    this.data = { ...data };
    this.status = status;
    this.message = message;
  }

  send(response) {
    response.status(this.status);
    response.json(this.data);
  }
}

export default Status;
