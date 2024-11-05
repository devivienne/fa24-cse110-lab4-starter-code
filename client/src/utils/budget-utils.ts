// Function to get budget from the backend. Method: GET
//Similar to how Expenses is called, implement this function in a useEffect in Budget.tsx

import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`); // Use backticks here
    if (!response.ok) {
        throw new Error('Failed to fetch budget');
    }

    const jsonResponse = await response.json(); 
    console.log("data in fetchBudget", jsonResponse);

    const budgetData = jsonResponse.data;
    console.log("response in fetchBudget", budgetData);

    return budgetData; 
};