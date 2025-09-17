const { Router } = require('express');

const { UsersController } = require('./../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', UsersController.getAll);
usersRouter.get('/:id', UsersController.getUserById);
usersRouter.post('/', UsersController.postUser);
usersRouter.delete('/:id', UsersController.deleteUser);
usersRouter.patch('/:id', UsersController.updateUser);

module.exports = {
  usersRouter,
};
