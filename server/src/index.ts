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
//zere: importing on exercise 2, lab 5
import { createBudgetEndpoints } from './budget/budget-endpoints';


const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

//Zere: added to set up endpoints, exercise 2
const budgetData = { amount: 1000 }; 
createBudgetEndpoints(app, budgetData);

app.use(cors());
app.use(express.json());

// Root endpoint to test if the server is running
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ "data": "Hello, TypeScript Express!" });
});

// Create other expense endpoints
createExpenseEndpoints(app, expenses);

// Add DELETE endpoint for deleting an expense by ID
app.delete("/expenses/:id", (req: Request, res: Response) => {
  deleteExpense(req, res, expenses); // Pass the request, response, and expenses array to deleteExpense
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

