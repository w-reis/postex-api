declare namespace Express {
  export interface Request {
    user: {
      id: number;
    };
    recipient: {
      id: number;
    };
  }
}
