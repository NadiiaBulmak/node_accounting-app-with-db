const { User } = require('./../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getOne = async (id) => {
  const result = await User.findByPk(id);

  return result;
};

const postOne = async (name) => {
  const result = await User.create({ name });

  return result;
};

const deleteOne = async (id) => {
  const result = await User.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

const updateOne = async (name, id) => {
  const result = await User.update({ name }, { where: { id } });

  return result;
};

module.exports = {
  UsersServise: {
    getAll,
    getOne,
    postOne,
    deleteOne,
    updateOne,
  },
};
