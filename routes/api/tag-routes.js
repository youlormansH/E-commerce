const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag,
        as: "products",
      },
    ],
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag,
        as: "products",
      },
    ],
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    where: {
      tag_name: req.params.tag_name
    }
  })
  .then(tagData => res.json(tagData)) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      tag_name: req.params.tag_name
    }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({message: 'no tag found'});
      return;
    }
    res.json(tagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({message: 'no tag found'});
      return;
    }
    res.json(tagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
