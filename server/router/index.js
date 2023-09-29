import express from 'express';
import users from './users';
import turn from './turn'

const router = express.Router()

export default () => {

    users(router);
    turn(router);
    
    return router; 
}