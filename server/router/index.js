import express from 'express';
import users from './user';

const router = express.Router()

export default () => {

    users(router);

    return router; 
}