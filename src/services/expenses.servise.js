const { Expense } = require('./../models/Expense.model');

const getAll = async (where) => {
  const result = await Expense.findAll({ where });

  return result;
};

const getOne = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const postOne = async (data) => {
  const result = await Expense.create(data);

  return result;
};

const deleteOne = async (id) => {
  const result = await Expense.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

const updateOne = async (data, id) => {
  const result = await Expense.update(data, { where: { id } });

  return result;
};

module.exports = {
  ExpensesServise: {
    getAll,
    getOne,
    postOne,
    deleteOne,
    updateOne,
  },
};
