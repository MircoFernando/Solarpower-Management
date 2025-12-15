import express from 'express';
import { authenticationMiddleware } from './middleware/authentication-middleware';
import { authorizaztionMiddleware } from './middleware/authorization-middleware';
import { CreateRegisteredUserValidator, getAllUsers } from '../application/users';
import { getAllRegisteredUsers, CreateRegisteredUser } from '../application/users';

const userRouter = express.Router();

userRouter.route("/").get(authenticationMiddleware, authorizaztionMiddleware, getAllUsers);
userRouter.route("/registered-users").get(authenticationMiddleware, authorizaztionMiddleware, getAllRegisteredUsers).
post(authenticationMiddleware, CreateRegisteredUserValidator ,CreateRegisteredUser);

export default userRouter;