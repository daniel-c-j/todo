"use strict";

import { Router } from "express";
import { Category, Todo } from "../../models";
import { Op } from "sequelize";

const todosRouter = Router();

const itemsPerPage = 10;

// List todos with pagination and optional filters
todosRouter.get("/", async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page?.toString() || "1"), 1);
    const limit = req.query.limit
      ? Math.min(
          Math.max(parseInt(req.query!.limit!.toString()) || itemsPerPage, 1),
          100
        )
      : itemsPerPage;

    let filter: any = {};
    if (req.query.title)
      filter["title"] = { [Op.iLike]: `%${req.query.title}%` };
    if (req.query.category_id) filter["category_id"] = req.query.category_id;
    if (req.query.priority && req.query.priority !== "none")
      filter["priority"] = req.query.priority;
    if (req.query.completed) filter["completed"] = req.query.completed;

    const { count, rows } = await Todo.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      attributes: [
        "id",
        "title",
        "description",
        "completed",
        "created_at",
        "updated_at",
        "priority",
      ],
      order: [
        [
          // TODO Add category model here when sorting based on category's column (advanced)
          req.query.sort_by?.toString() || "created_at",
          req.query.sort_order?.toString() || "DESC",
        ],
      ],
      include: [
        {
          model: Category,
          attributes: ["id", "name", "color"],
        },
      ],
      where: filter,
    });

    const totalPages = Math.ceil(count / limit);
    res.json({
      data: rows,
      pagination: {
        current_page: page,
        per_page: limit,
        total: count,
        total_page: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Get todo
todosRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findOne({
      attributes: [
        "id",
        "title",
        "description",
        "completed",
        "created_at",
        "updated_at",
      ],
      include: {
        model: Category,
        attributes: ["id", "name", "color"],
      },
      where: { id },
    });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// Create todo
todosRouter.post("/", async (req, res, next) => {
  try {
    req.body["updated_at"] = Date.now();
    await Todo.create(req.body);

    res.json({ message: `Todo created` });
  } catch (err) {
    next(err);
  }
});

// Update todo
todosRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Todo.update(req.body, { where: { id } });

    res.json({ message: `Todo updated` });
  } catch (err) {
    next(err);
  }
});

// Delete todo
todosRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Todo.destroy({ where: { id } });

    res.json({ message: `Todo deleted` });
  } catch (err) {
    next(err);
  }
});

// Toggle completion status
todosRouter.patch("/:id/complete", async (req, res, next) => {
  const id = req.params.id;

  try {
    await Todo.update(req.body, { where: { id } });

    res.json({ message: `Todo updated` });
  } catch (err) {
    next(err);
  }
});

export default todosRouter;
