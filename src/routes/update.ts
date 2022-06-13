import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError,
    BadRequestError
} from '@racoonrepublic/common'
import { User } from '../models/user';
import mongoose from 'mongoose';


const router = express.Router();

router.put('/api/update/:id',[
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
async (req: Request, res: Response) =>{
    console.log(req.params.id);
    const ticket = await User.findById(req.params.id);

    if(!ticket){
        throw new NotFoundError();
    }

    ticket.set({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    })

    await ticket.save();

    res.send(ticket);
})

export {router as updateUserRouter};