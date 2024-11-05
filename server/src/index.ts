// import { Request, Response } from "express";
// import { expenses } from "./constants";
// import { createExpenseEndpoints } from "./expenses/expense-endpoints";

// const express = require("express");
// const cors = require("cors");

// const app = express();
// const port = 8080;

// app.use(cors());
// app.use(express.json());

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// // Root endpoint to get test if the server is running
// app.get("/", (req: Request, res: Response) => {
//   res.send({ "data": "Hello, TypeScript Express!" });
//   res.status(200);
// });

// createExpenseEndpoints(app, expenses);


import { Request, Response } from "express";
import { expenses } from "./constants";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { deleteExpense } from "./expenses/expense-utils";
import { getBudget, updateBudget } from './budget/budget-utils';
import { createBudgetEndpoints } from './budget/budget-endpoints';

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const budgetData = { amount: 1000 };

createBudgetEndpoints(app, budgetData);

app.get('/budget', (req: Request, res: Response) => getBudget(res, budgetData.amount));
app.put('/budget', (req: Request, res: Response) => updateBudget(res, req.body, budgetData));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ "data": "Hello, TypeScript Express!" });
});

createExpenseEndpoints(app, expenses);

app.delete("/expenses/:id", (req: Request, res: Response) => {
  deleteExpense(req, res, expenses); 
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
