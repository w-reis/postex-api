class Correspondence {
  id: number;

  recipientName: string;

  objectNumber: string;

  status: string;

  constructor(
    id: number,
    recipientName: string,
    objectNumber: string,
    status: string
  ) {
    this.id = id;
    this.recipientName = recipientName;
    this.objectNumber = objectNumber;
    this.status = status;
  }
}

export default Correspondence;
