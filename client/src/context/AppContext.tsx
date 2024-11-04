import { createContext, useState, ReactNode } from "react";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 1000, // Initial budget value
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider value={{ expenses, setExpenses, budget, setBudget }}>
      {children}
    </AppContext.Provider>
  );
};