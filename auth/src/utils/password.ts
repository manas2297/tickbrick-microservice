import {genSalt, hash, compare} from 'bcryptjs';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { INTERNAL_SERVER_ERROR } from './constant';

export class Password {
  static async toHash ( password: string ) {
    try{
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      return hashedPassword;
    } catch (err) {
      throw new DatabaseConnectionError(INTERNAL_SERVER_ERROR);
    }
  }

  static async compare ( storedString: string, inputPassword: string ) {
    try {
      const compareResult = await compare(inputPassword, storedString);
      return compareResult;
    } catch (err) {
      throw new DatabaseConnectionError(INTERNAL_SERVER_ERROR);
    }
  }
}