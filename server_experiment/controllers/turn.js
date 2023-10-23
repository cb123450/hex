import express from 'express';
import {getTurn, updateTurn} from "../db/turn";

export const getTurn = async (req, res) => {
    try {

        const turn = await getTurn();

        return res.status(200).json(turn);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateTurn = async (req, res) => {
    try {
        const t = 0;
    }
    catch (error){
        pass
    }
};