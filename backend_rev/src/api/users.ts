import express from 'express';
import { authenticationMiddleware } from './middleware/authentication-middleware';
import { authorizaztionMiddleware } from './middleware/authorization-middleware';
import { getAllUsers } from '../application/users';

const userRouter = express.Router();

userRouter.route("/").get(authenticationMiddleware, authorizaztionMiddleware, getAllUsers);


export default userRouter;