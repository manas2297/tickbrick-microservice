import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';
const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all('*', async (req, res) => {
  console.log("here")
  throw new NotFoundError()
})
app.use(errorHandler);

const start = async () => {
  try {
      await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
  }
  
}
start();

app.listen(3000, () => {
  console.log("Listening on 30000");
});