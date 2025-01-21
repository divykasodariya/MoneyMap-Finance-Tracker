let expense_button = document.querySelector(".expense-button");
let card = document.querySelector(".card");
let transactions = JSON.parse(localStorage.getItem("transactions" || "[]"));

// let jsontransactions= JSON.stringify(transactions);
if (transactions.length === 0) {
  localStorage.setItem("transactions", JSON.stringify([]));
}

if (transactions.length > 15) {
  // Remove excess elements from the top
  transactions = transactions.slice(transactions.length - 15);
}

// Save the updated array back to local storage
localStorage.setItem("transactions", JSON.stringify(transactions));
transactions = JSON.parse(localStorage.getItem("transactions" || "[]"));
updateprevioustran();
// console.log("Updated transactions:", transactions);
// localStorage.setItem("transactions",jsontransactions);
let current_budget = JSON.parse(localStorage.getItem("budget" || "0"));
let whichbtn = 0;
console.log(current_budget);
let budget_amount = document.querySelector(".budget-amount");

budget_amount.innerText = current_budget;


expense_button.addEventListener("click", () => {
  whichbtn = -1;
  income_button.disabled = true;
  expense_button.disabled = true;
})
let income_button = document.querySelector(".income-button");
income_button.addEventListener("click", () => {
  whichbtn = 1;
  income_button.disabled = true;
  expense_button.disabled = true;
})
let submit_button = document.querySelector(".submit-button");
submit_button.addEventListener("click", () => {
  let cur_amount = document.querySelector(".rupees-input").value;
  if (whichbtn != 0) {
    submit_button.disabled = true;
    console.log(cur_amount);
    // current_budget+=cur_amount;
    // localStorage.setItem("budget",JSON.stringify(current_budget));

    let curr_tittle = document.querySelector(".transaction-title-input").value;
    console.log(curr_tittle);
    let budget_amount_number = parseInt(document.querySelector(".budget-amount").innerText);
    const total_budget = parseInt(budget_amount_number + (whichbtn * cur_amount));
    budget_amount.innerText = total_budget;
    console.log(total_budget);
    localStorage.setItem("budget", JSON.stringify(total_budget));
    const cur_transactions = [
      { type: whichbtn, amount: cur_amount, title: curr_tittle }

    ];
    addTransaction(cur_transactions);
    console.log(JSON.parse(localStorage.getItem("transactions" || "[]")));
    transactions = JSON.parse(localStorage.getItem("transactions" || "[]"));
    updateprevioustran(); 
    // for(let i =transactions.lenght-1 ; i>transactions.lenght-6;i--)
    // {
    //   if(transactions[i].type==1)
    //   {
    //     document.querySelector(".first-income-title").innerText=transactions[i].title;
    //     document.querySelector(".first-income-value").innerText=transactions[i].amount;
    //   }
    //   else {
    //     document.querySelector(".first-income-title").innerText=transactions[i].title;
    //     document.querySelector(".first-income-value").innerText=transactions[i].amount;
    //   }
    // }
    // Save to localStorage
    // localStorage.setItem("transactions", JSON.stringify(transactions));
    // console.log(transactions);
    card.style.visibility = "hidden";
    add_button.visibility = "visible";
    income_button.disabled = !true;
    expense_button.disabled = !true;
    submit_button.disabled = !true;
    add_button.disabled = !true;

  }
  else {
    console.error("enter a valid number or select the transaction type");
    income_button.disabled = !true;
    expense_button.disabled = !true;
    submit_button.disabled = !true;
    add_button.disabled = !true;
  }
})



let add_button = document.querySelector(".buttonn");
add_button.addEventListener("click", () => {
  add_button.disabled = true;

  if (card) {
    card.style.visibility = "visible";
  }

});
function addTransaction(newtran) {
  let transacts = JSON.parse(localStorage.getItem("transactions") || "[]");

  if (!Array.isArray(transacts)) {
    console.error("Error: `transacts` is not an array. Resetting to an empty array.");
    transacts = []; // Reset to an empty array if corrupted
  }

  transacts.push(...newtran); // Add the new transaction(s)
  localStorage.setItem("transactions", JSON.stringify(transacts));
}
function updateprevioustran() {
  transactions = JSON.parse(localStorage.getItem("transactions" || "[]"));

  let income_counter = 0;
  let expense_counter = 0;
  let i = transactions.length - 1;

  if (i + 1 < 6) {
    console.log("Not enough history");
    return;
  }

  while (income_counter < 3 && i >= 0) {
    if (transactions[i].type == 1) { // Income transaction
      console.log(transactions[i].title);
      console.log(transactions[i].type);

      let incomeTitleElement = document.querySelector(`.income-title-${income_counter}`);
      let incomeValueElement = document.querySelector(`.income-value-${income_counter}`);

      if (incomeTitleElement && incomeValueElement) {
        incomeTitleElement.innerText = transactions[i].title;
        incomeValueElement.innerText = transactions[i].amount;
        income_counter++;
      } else {
        console.error(`Income elements not found for counter ${income_counter}`);
      }
    }
    i--; // Decrement `i` to move to the previous transaction
  }

  i = transactions.length - 1; // Reset `i` for expense transactions
  while (expense_counter < 3 && i >= 0) {
    if (transactions[i].type == -1) { // Expense transaction
      let expenseTitleElement = document.querySelector(`.expense-title-${expense_counter}`);
      let expenseValueElement = document.querySelector(`.expense-value-${expense_counter}`);

      if (expenseTitleElement && expenseValueElement) {
        expenseTitleElement.innerText = transactions[i].title;
        expenseValueElement.innerText = transactions[i].amount;
        expense_counter++;
      } else {
        console.error(`Expense elements not found for counter ${expense_counter}`);
      }
    }
    i--; // Decrement `i` to move to the previous transaction
  }
}
