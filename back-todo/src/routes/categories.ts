"use strict";

import { Router } from "express";
import { Category } from "../../models";

const categoriesRouter = Router();

// List all categories
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const catg = await Category.findAll({ order: [["id", "ASC"]] });
    res.json(catg);
  } catch (err) {
    next(err);
  }
});

// Create new catg
categoriesRouter.post("/", async (req, res, next) => {
  try {
    const category = req.body;
    await Category.create(category);

    res.json({ message: `New category added` });
  } catch (err) {
    next(err);
  }
});

// Update catg
categoriesRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Category.update(req.body, { where: { id } });

    res.json({ message: `Category updated` });
  } catch (err) {
    next(err);
  }
});

// Delete catg
categoriesRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await Category.destroy({ where: { id } });
    res.json({ message: `Category deleted` });
  } catch (err) {
    next(err);
  }
});

export default categoriesRouter;

// { "data": [
// { "id": 1, "title": "Complete coding challenge",
// "description": "Build a full-stack todo application", "completed":
// false, "category": { "id": 2, "name": "Work", "color": "#3B82F6" },
// "created_at": "2024-07-31T10:00:00Z", "updated_at":
// "2024-07-31T10:00:00Z" }
//  ],
//
// "pagination": { "current_page": 1,
// "per_page": 10, "total": 25, "total_pages": 3 } }
