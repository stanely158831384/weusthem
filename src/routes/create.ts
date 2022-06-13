import express, {Request,Response} from 'express';
import {body} from 'express-validator';
import {User} from '../models/user'
import { BadRequestError,validateRequest } from '@racoonrepublic/common';

const router = express.Router();

router.post('/api/create',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('phoneNumber')
        .isMobilePhone('en-CA')
        .withMessage('phone number must be valid'),
    body('lastName')
        .isString()
        .notEmpty()
        .withMessage('last name must be valid'),
    body('firstName')
        .isString()
        .notEmpty()
        .withMessage('last name must be valid'),
],
validateRequest,
async (req: Request,res: Response)=>{
    const {email,phoneNumber,lastName,firstName} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new BadRequestError('the user has been created');
    }
    const user = User.build({email,phoneNumber,lastName,firstName});
    await user.save();

    res.status(201).send(user);
})

export {router as createUserRouter};