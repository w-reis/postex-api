declare namespace Express {
  import { Paginate } from '../middlewares/paginateUsersResult';

  export interface Request {
    user: {
      id: number;
    };
    recipient: {
      id: number;
    };
  }

  export interface Response {
    paginatedResults: Paginate;
  }
}
