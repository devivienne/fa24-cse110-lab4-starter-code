import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewBudget(budget);
  };

  const handleSaveClick = async () => {
    try {
      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update budget:", error);
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            className="form-control mr-2"
          />
          <button onClick={handleSaveClick} className="btn btn-primary">Save</button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <span>Budget: ${budget}</span>
          <button onClick={handleEditClick} className="btn btn-primary ml-2">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Budget;