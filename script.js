// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display user name
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-name').textContent = user.name;
    }
}

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Check authentication when page loads
checkAuth();

const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const form = document.getElementById('expense-form');
const transactionList = document.getElementById('transaction-list');
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
function updateUI() {
    const { balance, income, expense } = calculateTotals();
    balanceEl.textContent = formatAmount(balance);
    incomeEl.textContent = formatAmount(income);
    expenseEl.textContent = formatAmount(expense);
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const div = document.createElement('div');
        div.classList.add('transaction-item');
        div.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <p>${transaction.type}</p>
            </div>
            <div>
                <span class="${transaction.type}">${formatAmount(transaction.amount)}</span>
                <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
            </div>
        `;
        transactionList.appendChild(div);
    });
}
function calculateTotals() {
    let income = 0;
    let expense = 0;
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    return {
        balance: income - expense,
        income,
        expense
    };
}
function formatAmount(amount) {
    return '₹' + amount.toFixed(2);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const transaction = {
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    form.reset();
    updateUI();
});
function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateUI();
}
updateUI();
