// Initialize transactions and budget safely
let transactions = [];
let storedTransactions = localStorage.getItem("transactions");

if (storedTransactions) {
  try {
    transactions = JSON.parse(storedTransactions);
    if (!Array.isArray(transactions)) {
      throw new Error("Invalid transactions format.");
    }
  } catch (error) {
    console.error("Error parsing transactions from localStorage:", error);
    transactions = []; // Reset to an empty array if parsing fails
    localStorage.setItem("transactions", JSON.stringify([]));
  }
} else {
  localStorage.setItem("transactions", JSON.stringify([]));
}

let current_budget = JSON.parse(localStorage.getItem("budget")) || 0;
localStorage.setItem("budget", JSON.stringify(current_budget));

// Update UI with the current budget
let budget_amount = document.querySelector(".budget-amount");
budget_amount.innerText = current_budget;

// Add event listeners for buttons
let expense_button = document.querySelector(".expense-button");
let income_button = document.querySelector(".income-button");
let submit_button = document.querySelector(".submit-button");
let add_button = document.querySelector(".buttonn");
let whichbtn = 0;

expense_button.addEventListener("click", () => {
  whichbtn = -1;
  income_button.disabled = true;
  expense_button.disabled = true;
});

income_button.addEventListener("click", () => {
  whichbtn = 1;
  income_button.disabled = true;
  expense_button.disabled = true;
});

submit_button.addEventListener("click", () => {
  let cur_amount = parseInt(document.querySelector(".rupees-input").value) || 0;
  let curr_title = document.querySelector(".transaction-title-input").value.trim();

  if (whichbtn !== 0 && cur_amount > 0 && curr_title) {
    submit_button.disabled = true;

    // Update budget
    current_budget += whichbtn * cur_amount;
    budget_amount.innerText = current_budget;
    localStorage.setItem("budget", JSON.stringify(current_budget));

    // Add transaction
    const newTransaction = { type: whichbtn, amount: cur_amount, title: curr_title };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Update transaction history
    updateprevioustran();

    // Reset inputs and buttons
    document.querySelector(".rupees-input").value = "";
    document.querySelector(".transaction-title-input").value = "";
    income_button.disabled = false;
    expense_button.disabled = false;
    submit_button.disabled = false;
    whichbtn = 0;
    document.querySelector(".card").style.visibility = "hidden";
    add_button.disabled = false;
  } else {
    console.error("Invalid input. Please enter valid data.");
  }
});

add_button.addEventListener("click", () => {
  add_button.disabled = true;
  document.querySelector(".card").style.visibility = "visible";
});

function updateprevioustran() {
  let income_counter = 0;
  let expense_counter = 0;
  let i = transactions.length - 1;
  if(i+1<6) {
    console.log("not enough data");
    return;
    
  }
  while (income_counter < 3 && i >= 0) {
    if (transactions[i].type === 1) {
      let incomeTitleElement = document.querySelector(`.income-title-${income_counter}`);
      let incomeValueElement = document.querySelector(`.income-value-${income_counter}`);

      if (incomeTitleElement && incomeValueElement) {
        incomeTitleElement.innerText = transactions[i].title;
        incomeValueElement.innerText = transactions[i].amount;
        income_counter++;
      }
    }
    i--;
  }

  i = transactions.length - 1;
  while (expense_counter < 3 && i >= 0) {
    if (transactions[i].type === -1) {
      let expenseTitleElement = document.querySelector(`.expense-title-${expense_counter}`);
      let expenseValueElement = document.querySelector(`.expense-value-${expense_counter}`);

      if (expenseTitleElement && expenseValueElement) {
        expenseTitleElement.innerText = transactions[i].title;
        expenseValueElement.innerText = transactions[i].amount;
        expense_counter++;
      }
    }
    i--;
  }
}

updateprevioustran();
