import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let budget = 1000;

  //const totalExpenses = expenses.reduce((total, item) => {
 //   return (total = total + item.cost);
  //}, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.cost, 0);
  const remaining = budget - totalExpenses;

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Keeps track of going over remaining budget and pops up an alert
  useEffect(() => {
    if (remaining < 0) {
        alert('localhost:3000 says: You have exceeded your budget!');
    }
}, [remaining]);

  // Exercise: Create an alert when Remaining is less than 0.

  


  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
