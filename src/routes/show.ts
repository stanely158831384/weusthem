import { NotAuthorizedError, NotFoundError, requireAuth } from '@racoonrepublic/common';
import express, {Request, Response} from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/show',
async (req: Request, res: Response)=>{
    const user = await User.find({});

    if(!user){
        throw new NotFoundError();
    }

    res.send(user);
})

export {router as showUserRouter }