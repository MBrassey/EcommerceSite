const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((dbCategoriesData) => {
      if (!dbCategoriesData) {
        res.status(404).json({ message: "No categories found." });
        return;
      }
      res.json(dbCategoriesData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with that id." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with that id." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Product.destroy({
    where: {
      category_id: req.params.id,
    },
  }).then(() => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCategoryData) => {
        if (!dbCategoryData) {
          res.status(404).json({ message: "No category found with that id." });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

module.exports = router;
