import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = async (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    try {
      // Send DELETE request to server
      const response = await fetch(`http://localhost:8080/expenses/${currentExpense.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove expense from local state if deletion was successful
        const updatedExpenses = expenses.filter(
          (expense) => expense.id !== currentExpense.id
        );
        setExpenses(updatedExpenses);
      } else {
        console.error("Failed to delete expense:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button
          onClick={() => handleDeleteExpense(currentExpense)}
          className="btn btn-danger"
        >
          x
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
