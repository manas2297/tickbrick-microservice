import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../utils/password';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { INTERNAL_SERVER_ERROR } from '../utils/constant';
const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid.'),
  body('password')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 and 20 characters'),
  ], 
  async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if ( userExists ) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email, password: password });
    try {
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      throw new DatabaseConnectionError(INTERNAL_SERVER_ERROR);
    }
});

export { router as signUpRouter };