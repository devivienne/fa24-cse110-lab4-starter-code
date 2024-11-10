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


//Zere: removing this line because we are not using expenses array from constannts.ts anymore
//import { expenses } from "../constants";
//Zere: importing Database from sqlite3 instead
//import { Database } from "sqlite3";
//import { Expense } from "../types";
//import { Request, Response } from "express";

/*
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
*/

import { Database } from "sqlite"; // or import from "sqlite" if you use it
import { Request, Response } from "express";
import { Expense } from "../types";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const newExpense: Expense = { id, description, cost };
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send(newExpense);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, ${error}` });
    }
}

export async function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params;

    try {
        const result = await db.run('DELETE FROM expenses WHERE id = ?;', [id]);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        } else {
            res.status(200).json({ message: 'Expense successfully deleted' });
        }
    } catch (error) {
        return res.status(400).send({ error: `Could not delete expense, ${error}` });
    }
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const rows = await db.all('SELECT * FROM expenses;');
        res.status(200).send({ data: rows });
    } catch (error) {
        return res.status(400).send({ error: `Could not retrieve expenses, ${error}` });
    }
}

