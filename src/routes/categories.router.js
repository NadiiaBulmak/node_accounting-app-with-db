const { Router } = require('express');

const {
  categoriesController,
} = require('./../controllers/categories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAllCategories);
categoriesRouter.get('/:id', categoriesController.getCategoryById);
categoriesRouter.post('/', categoriesController.postCategory);
categoriesRouter.delete('/:id', categoriesController.deleteCategory);
categoriesRouter.patch('/:id', categoriesController.updateCategory);

module.exports = {
  categoriesRouter,
};
