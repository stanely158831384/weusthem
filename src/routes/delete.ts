import { NotAuthorizedError, NotFoundError, requireAuth } from '@racoonrepublic/common';
import express, {Request, Response} from 'express';
import { User } from '../models/user';

const router = express.Router();

router.delete('/api/delete/:id',
async (req: Request, res: Response)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        throw new NotFoundError();
    }

    await User.deleteOne({id:req.params!.id});

    res.send(`user: ${req.params.id} has been deleted in the users component`);
})

export {router as deleteUserRouter }