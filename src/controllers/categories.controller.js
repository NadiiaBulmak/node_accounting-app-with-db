const { categoriesService } = require('../services/categories.servise');

const getAllCategories = async (req, res) => {
  const result = await categoriesService.getAll();

  res.send(result);
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  const result = await categoriesService.getOne(id);

  if (!result) {
    return res.sendStatus(404);
  }

  res.send(result);
};

const postCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await categoriesService.postOne(name);

  res.status(201).json(newUser);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!(await categoriesService.getOne(id))) {
    return res.sendStatus(404);
  }

  categoriesService.deleteOne(id);

  res.sendStatus(204);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const [updatedCount] = await categoriesService.updateOne(name, id);

  if (updatedCount === 0) {
    return res.sendStatus(404);
  }

  const updatedUser = await categoriesService.getOne(id);

  res.send(updatedUser);
};

module.exports = {
  categoriesController: {
    getAllCategories,
    getCategoryById,
    postCategory,
    deleteCategory,
    updateCategory,
  },
};
