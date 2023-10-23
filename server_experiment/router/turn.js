import express from 'express';
import {getTurn, putTurn} from '../controllers/turn';

export default (router) => {
    router.get("/turn", getTurn);
    router.putTurn("/turn", putTurn);
};