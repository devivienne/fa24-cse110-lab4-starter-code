import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here

  // Exercise: Create name and cost to state variables
  const { expenses, setExpenses } = useContext(AppContext);

  // Implement state management for form inputs using useState
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");

  // Function to handle form submission
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Exercise: Add add new expense to expenses context array
    event.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(), 
      name,
      cost: parseFloat(cost),
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setCost("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost} 
            onChange={(e) => setCost(e.target.value)} 
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
