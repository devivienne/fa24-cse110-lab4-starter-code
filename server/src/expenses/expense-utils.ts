// import { Expense } from "../types";
// import { Request, Response } from "express";
// import { expenses } from "../constants";

// export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
//     const { id, cost, description } = req.body;

//     if (!description || !id || !cost) {
//         return res.status(400).send({ error: "Missing required fields" });
//     }

//     const newExpense: Expense = {
//         id: id,
//         description,
//         cost,
//     };

//     expenses.push(newExpense);
//     res.status(201).send(newExpense);
// }

// export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
//     // TO DO: Implement deleteExpense function
//     const { id } = req.params;

//     const expenseIndex = expenses.findIndex(expense => expense.id === id);

//     if (expenseIndex === -1) {
//         return res.status(404).json({ message: 'Expense not found' });
//     }

//     expenses.splice(expenseIndex, 1);
//     res.status(200).json({ message: 'Expense deleted successfully' });
// }

// export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
//     res.status(200).send({ "data": expenses });
// }


// import { Expense } from "../types";
// import { Request, Response } from "express";
// import { expenses } from "../constants"; // Import the shared `expenses` array

// // Function to create an expense
// export function createExpenseServer(req: Request, res: Response) {
//     const { id, cost, description } = req.body;

//     if (!description || !id || !cost) {
//         return res.status(400).send({ error: "Missing required fields" });
//     }

//     const newExpense: Expense = {
//         id: id,
//         description,
//         cost,
//     };

//     expenses.push(newExpense); // Directly modify the shared `expenses` array
//     res.status(201).send(newExpense);
// }

// // Function to delete an expense
// export function deleteExpense(req: Request, res: Response) {
//     const { id } = req.params;

//     const expenseIndex = expenses.findIndex(expense => expense.id === id); // Find by ID

//     if (expenseIndex === -1) {
//         return res.status(404).json({ message: 'Expense not found' });
//     }

//     expenses.splice(expenseIndex, 1); // Directly modify the shared `expenses` array
//     res.status(200).json({ message: 'Expense deleted successfully' });
// }

// // Function to get all expenses
// export function getExpenses(req: Request, res: Response) {
//     res.status(200).send({ data: expenses }); // Return the current `expenses` array
// }


import { expenses } from "../constants";
import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expense: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id,
        description,
        cost,
    };

    expenses.push(newExpense);
    
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const { id } = req.params;

    const expenseIndex = expenses.findIndex((expense) => expense.id === id);

    if (expenseIndex === -1) {
        return res.status(404).json({ message: 'Expense not found' });
    }
    else {
        expenses.splice(expenseIndex, 1);
        res.status(200).json({ message: 'Expense successfully deleted' });

    }
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}

