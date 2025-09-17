const { Op } = require('sequelize');
const { ExpensesServise } = require('./../services/expenses.servise');

const getExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  if (categories) {
    where.category = categories;
  }

  const result = await ExpensesServise.getAll(where);

  res.send(result);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const expense = await ExpensesServise.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const postExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userExist = await ExpensesServise.getOne(userId);

  if (!userExist) {
    res.sendStatus(400);

    return;
  }

  const data = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const currentExpense = await ExpensesServise.postOne(data);

  res.statusCode = 201;
  res.send(currentExpense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expenseToDelete = await ExpensesServise.deleteOne(id);

  if (!expenseToDelete) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const [updatedCount] = await ExpensesServise.updateOne(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    id,
  );

  if (updatedCount === 0) {
    return res.sendStatus(404);
  }

  const currentExpense = await ExpensesServise.getOne;

  res.send(currentExpense);
};

module.exports = {
  ExpensesController: {
    getExpenses,
    getExpenseById,
    postExpense,
    deleteExpense,
    updateExpense,
  },
};
