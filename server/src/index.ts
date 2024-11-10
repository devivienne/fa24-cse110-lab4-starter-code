import { Request, Response } from "express";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { getBudget, updateBudget } from './budget/budget-utils';
import { createBudgetEndpoints } from './budget/budget-endpoints';
import { expenses } from "./constants"

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const budgetData = { amount: 1000 };

createBudgetEndpoints(app, budgetData);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ data: "Hello, TypeScript Express!" });
});

app.get("/expenses", (req: Request, res: Response) => {
  res.status(200).json({ data: expenses });
});

createExpenseEndpoints(app, expenses);
