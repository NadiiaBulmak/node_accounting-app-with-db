'use strict';

const express = require('express');
const cors = require('cors');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Op } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', async (req, res) => {
    const result = await User.findAll();

    res.send(result);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.sendStatus(400);
    }

    const result = await User.findByPk(id);

    if (!result) {
      return res.sendStatus(404);
    }

    res.send(result);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newUser = await User.create({ name });

    res.status(201).json(newUser);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (!(await User.findByPk(id))) {
      return res.sendStatus(404);
    }

    await User.destroy({
      where: {
        id: id,
      },
    });

    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (typeof name !== 'string') {
      return res.sendStatus(422);
    }

    const [updatedCount] = await User.update({ name }, { where: { id } });

    if (updatedCount === 0) {
      return res.sendStatus(404);
    }

    const updatedUser = await User.findByPk(id);

    res.send(updatedUser);
  });

  app.get('/expenses', async (req, res) => {
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

    const result = await Expense.findAll({ where });

    res.send(result);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const userExist = await User.findByPk(userId);

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

    const currentExpense = await Expense.create(data);

    res.statusCode = 201;
    res.send(currentExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expenseToDelete = await Expense.destroy({
      where: {
        id: id,
      },
    });

    if (!expenseToDelete) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const [updatedCount] = await Expense.update(
      {
        spentAt,
        title,
        amount,
        category,
        note,
      },
      { where: { id } },
    );

    if (updatedCount === 0) {
      return res.sendStatus(404);
    }

    const currentExpense = await Expense.findByPk(id);

    res.send(currentExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
