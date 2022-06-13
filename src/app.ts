import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import { errorHandler , NotFoundError} from '@racoonrepublic/common';
import { createUserRouter } from './routes/create';
import { deleteUserRouter } from './routes/delete';
import { showUserRouter } from './routes/show';
import { updateUserRouter } from './routes/update';


const app = express();
let secure: boolean = process.env.NODE_ENV === 'development';
app.use(json());


app.use(createUserRouter);
app.use(deleteUserRouter);
app.use(showUserRouter);
app.use(updateUserRouter);

app.all('*',async()=>{
  throw new NotFoundError();
})

app.use(errorHandler);


export { app }