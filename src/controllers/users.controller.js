const { UsersService } = require('./../services/users.service');

const getAll = async (req, res) => {
  const result = await UsersService.getAll();

  res.json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  const result = await UsersService.getOne(id);

  if (!result) {
    return res.sendStatus(404);
  }

  res.send(result);
};

const postUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await UsersService.postOne(name);

  res.status(201).json(newUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await UsersService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await UsersService.deleteOne(id);
  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const [updatedCount] = await UsersService.updateOne(name, id);

  if (updatedCount === 0) {
    return res.sendStatus(404);
  }

  const updatedUser = await UsersService.getOne(id);

  res.send(updatedUser);
};

module.exports = {
  UsersController: {
    getAll,
    getUserById,
    postUser,
    deleteUser,
    updateUser,
  },
};
