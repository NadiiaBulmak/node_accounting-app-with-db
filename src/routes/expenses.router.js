const { Router } = require('express');

const { ExpensesController } = require('./../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', ExpensesController.getExpenses);
expensesRouter.get('/:id', ExpensesController.getExpenseById);
expensesRouter.post('/', ExpensesController.postExpense);
expensesRouter.delete('/:id', ExpensesController.deleteExpense);
expensesRouter.patch('/:id', ExpensesController.updateExpense);

module.exports = {
  expensesRouter,
};
