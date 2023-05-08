const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
  const category = await Category.findAll({
    include: [Product]
  });
  res.status(200).json(category);
} catch (err){
  res.status(500).json(err);
}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category']
      }
    ]
  })
  .then(rgCategoryData => {
    if (!rgCategoryData) {
      res.status(404).json({ message: 'no category found'});
      return;
    }
    res.json(rgCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', async(req, res) => {
  // create a new category
  try {
  const category = await Category.create(req.body);
  res.status(200).json(category);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const locationData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!locationData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
