// ==========================================================================
// 1. Tab switching navigation logic
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const tabFinder = document.getElementById('tab-finder');
  const tabCart = document.getElementById('tab-cart');
  const finderContainer = document.getElementById('finder-container');
  const cartContainer = document.getElementById('cart-container');

  tabFinder.addEventListener('click', () => {
    tabFinder.classList.add('active');
    tabCart.classList.remove('active');
    finderContainer.classList.add('active');
    cartContainer.classList.remove('active');
  });

  tabCart.addEventListener('click', () => {
    tabCart.classList.add('active');
    tabFinder.classList.remove('active');
    cartContainer.classList.add('active');
    finderContainer.classList.remove('active');
  });
});


// ==========================================================================
// 2. Array Min & Max Finder Logic
// ==========================================================================
let numbers = [];

// DOM Elements
const numberInput = document.getElementById('number-input');
const addNumberBtn = document.getElementById('add-number-btn');
const addRandomBtn = document.getElementById('add-random-btn');
const resetBtn = document.getElementById('reset-btn');
const pillsContainer = document.getElementById('array-pills-container');

const maxValDisplay = document.getElementById('max-val-display');
const minValDisplay = document.getElementById('min-val-display');
const totalElementsDisplay = document.getElementById('total-elements-display');

// Event Listeners
addNumberBtn.addEventListener('click', addNumber);
addRandomBtn.addEventListener('click', addRandom);
resetBtn.addEventListener('click', resetArray);

// Allow Enter key to trigger adding number
numberInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addNumber();
  }
});

function addNumber() {
  const valStr = numberInput.value.trim();
  if (valStr === "") {
    alert("Please enter a valid number.");
    return;
  }

  const val = Number(valStr);
  if (isNaN(val)) {
    alert("Please enter a valid number.");
    return;
  }

  numbers.push(val);
  numberInput.value = '';
  numberInput.focus();

  updateFinderUI();
}

function addRandom() {
  // Generate random number between 1 and 100
  const randomNum = Math.floor(Math.random() * 100) + 1;
  numbers.push(randomNum);
  updateFinderUI();
}

function resetArray() {
  numbers = [];
  updateFinderUI();
}

function updateFinderUI() {
  // 1. Render array element badges/pills
  pillsContainer.innerHTML = '';
  numbers.forEach(num => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.textContent = num;
    pillsContainer.appendChild(pill);
  });

  // 2. Loop search for min/max
  if (numbers.length === 0) {
    maxValDisplay.textContent = '-';
    minValDisplay.textContent = '-';
    totalElementsDisplay.textContent = '0';
    return;
  }

  let min = numbers[0];
  let max = numbers[0];

  // Using standard for-loop to search minimum and maximum values
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  // Update display values
  maxValDisplay.textContent = max;
  minValDisplay.textContent = min;
  totalElementsDisplay.textContent = numbers.length;
}


// ==========================================================================
// 3. Shopping Cart Calculator Logic
// ==========================================================================
let cart = [];

// DOM Elements
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQtyInput = document.getElementById('product-qty');
const addProductBtn = document.getElementById('add-product-btn');
const cartTableBody = document.querySelector('#cart-table tbody');

const totalAmountEl = document.getElementById('total-amount');
const discountPercentEl = document.getElementById('discount-percent');
const discountAmountEl = document.getElementById('discount-amount');
const finalAmountEl = document.getElementById('final-amount');

const itemSummaryList = document.getElementById('item-summary-list');
const expensiveProductsList = document.getElementById('expensive-products-list');

// Add Product Event Listener
addProductBtn.addEventListener('click', addProduct);

// Allow pressing Enter key inside input fields to add a product
[productNameInput, productPriceInput, productQtyInput].forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addProduct();
    }
  });
});

function addProduct() {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);
  const qty = parseInt(productQtyInput.value);

  // Validation checking
  if (!name) {
    alert("Please enter a valid product name.");
    return;
  }
  if (isNaN(price) || price <= 0) {
    alert("Please enter a valid price (greater than 0).");
    return;
  }
  if (isNaN(qty) || qty <= 0) {
    alert("Please enter a valid quantity (1 or more).");
    return;
  }

  // Create new product item object
  const item = {
    id: cart.length + 1,
    name: name,
    price: price,
    qty: qty,
    total: price * qty
  };

  // Push object to state array (Array Method: push)
  cart.push(item);

  // Reset Input fields
  productNameInput.value = '';
  productPriceInput.value = '';
  productQtyInput.value = '';
  productNameInput.focus();

  // Update UI Elements
  updateCartUI();
}

function updateCartUI() {
  // 1. Render Table Rows (Array Method: forEach)
  cartTableBody.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>${item.total.toFixed(2)}</td>
    `;
    cartTableBody.appendChild(row);
  });

  // 2. Calculations (Array Method: reduce)
  const totalAmount = cart.reduce((accumulator, item) => {
    return accumulator + item.total;
  }, 0);

  // Discount percentage rates
  let discountRate = 0;
  if (totalAmount >= 5000 && totalAmount < 20000) {
    discountRate = 0.05; // 5% discount
  } else if (totalAmount >= 20000) {
    discountRate = 0.10; // 10% discount
  }

  const discountAmount = totalAmount * discountRate;
  const finalAmount = totalAmount - discountAmount;

  // Format currencies
  totalAmountEl.textContent = `₹${totalAmount.toFixed(2)}`;
  discountPercentEl.textContent = `${(discountRate * 100).toFixed(0)}%`;
  discountAmountEl.textContent = `-₹${discountAmount.toFixed(2)}`;
  finalAmountEl.textContent = `₹${finalAmount.toFixed(2)}`;

  // 3. Render Item Summary (Array Method: forEach)
  itemSummaryList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} : ${item.total.toFixed(2)}`;
    itemSummaryList.appendChild(li);
  });

  // 4. Filter and Render Expensive Products where Unit Price > 1000 (Array Method: filter & forEach)
  expensiveProductsList.innerHTML = '';
  const expensiveItems = cart.filter(item => item.price > 1000);
  expensiveItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (${item.price.toFixed(2)})`;
    expensiveProductsList.appendChild(li);
  });
}
