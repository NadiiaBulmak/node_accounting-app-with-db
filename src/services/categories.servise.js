const { Category } = require('../models/Category.model');

const getAll = async () => {
  const result = await Category.findAll();

  return result;
};

const getOne = async (id) => {
  const result = await Category.findByPk(id);

  return result;
};

const postOne = async (name) => {
  const result = await Category.create({ name });

  return result;
};

const deleteOne = async (id) => {
  await Category.destroy({
    where: {
      id: id,
    },
  });
};

const updateOne = async (name, id) => {
  const result = await Category.update({ name }, { where: { id } });

  return result;
};

module.exports = {
  categoriesService: {
    getAll,
    getOne,
    postOne,
    deleteOne,
    updateOne,
  },
};
