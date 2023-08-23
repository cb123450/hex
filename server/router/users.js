import express from 'express';

import {getUsers, deleteUser, updateUser} from '../controller/users';

export default (router) => {
    router.get('/users', getUsers);
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', updateUser);

};