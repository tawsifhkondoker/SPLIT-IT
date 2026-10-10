// Get all the elements 
const billForm = document.getElementById('billForm');
const billAmountInput = document.getElementById('billAmount');
const peopleCountInput = document.getElementById('peopleCount');
const taxPercentInput = document.getElementById('taxPercent');
const tipPercentInput = document.getElementById('tipPercent');
const currencySelect = document.getElementById('currency');
const billError = document.getElementById('billError');
const peopleError = document.getElementById('peopleError');
const taxError = document.getElementById('taxError');
const tipError = document.getElementById('tipError');
const emptyState = document.getElementById('emptyState');
const resultsContent = document.getElementById('resultsContent');
const subtotalOutput = document.getElementById('subtotalOutput');
const taxOutput = document.getElementById('taxOutput');
const tipOutput = document.getElementById('tipOutput');
const totalOutput = document.getElementById('totalOutput');
const perPersonOutput = document.getElementById('perPersonOutput');
const resetButton = document.getElementById('resetButton');
const themeToggle = document.getElementById('themeToggle');
const tipButtons = document.querySelectorAll('.tip-button');

// currency symbol 
function getCurrencySymbol() {
  const currency = currencySelect.value;
  if (currency === 'USD') return '$';
  if (currency === 'EUR') return '€';
  if (currency === 'GBP') return '£';
  if (currency === 'BDT') return '৳';
  if (currency === 'INR') return '₹';
  return '$';
}

//  format money 
function formatMoney(amount) {
  return getCurrencySymbol() + amount.toFixed(2);
}

// clear all errors
function clearErrors() {
  billError.textContent = '';
  peopleError.textContent = '';
  taxError.textContent = '';
  tipError.textContent = '';
  billAmountInput.classList.remove('invalid');
  peopleCountInput.classList.remove('invalid');
  taxPercentInput.classList.remove('invalid');
  tipPercentInput.classList.remove('invalid');
}

// Validate inputs
function validateInputs(bill, people, taxPercent, tipPercent) {
  let isValid = true;

  if (isNaN(bill) || bill <= 0) {
    billError.textContent = 'Please enter a bill amount.';
    billAmountInput.classList.add('invalid');
    isValid = false;
  }

  if (isNaN(people) || people < 1) {
    peopleError.textContent = 'Number of people must be at least 1.';
    peopleCountInput.classList.add('invalid');
    isValid = false;
  }

  if (isNaN(taxPercent) || taxPercent < 0) {
    taxError.textContent = 'Tax cannot be negative.';
    taxPercentInput.classList.add('invalid');
    isValid = false;
  }

  if (isNaN(tipPercent) || tipPercent < 0) {
    tipError.textContent = 'Tip cannot be negative.';
    tipPercentInput.classList.add('invalid');
    isValid = false;
  }

  return isValid;
}

// Main calculate function
function calculateBill(event) {
  event.preventDefault();

  clearErrors();

  const bill = parseFloat(billAmountInput.value);
  const people = parseInt(peopleCountInput.value);
  const taxPercent = parseFloat(taxPercentInput.value);
  const tipPercent = parseFloat(tipPercentInput.value);

  const safeTax = isNaN(taxPercent) ? 0 : taxPercent;
  const safeTip = isNaN(tipPercent) ? 0 : tipPercent;

  if (!validateInputs(bill, people, safeTax, safeTip)) {
    return;
  }

  const subtotal = bill;
  const taxAmount = subtotal * (safeTax / 100);
  const tipAmount = subtotal * (safeTip / 100);
  const total = subtotal + taxAmount + tipAmount;
  const perPerson = total / people;

  subtotalOutput.textContent = formatMoney(subtotal);
  taxOutput.textContent = formatMoney(taxAmount);
  tipOutput.textContent = formatMoney(tipAmount);
  totalOutput.textContent = formatMoney(total);
  perPersonOutput.textContent = formatMoney(perPerson);

  emptyState.style.display = 'none';
  resultsContent.style.display = 'block';
}

// Reset everything
function resetCalculator() {
  billAmountInput.value = '';
  peopleCountInput.value = 2;
  taxPercentInput.value = 0;
  tipPercentInput.value = 10;

  clearErrors();

  resultsContent.style.display = 'none';
  emptyState.style.display = 'block';

  tipButtons.forEach(function (button) {
    button.classList.remove('active');
  });

  localStorage.removeItem('splitit-bill');
  localStorage.removeItem('splitit-people');
  localStorage.removeItem('splitit-tax');
  localStorage.removeItem('splitit-tip');
  localStorage.removeItem('splitit-currency');
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';

  localStorage.setItem('splitit-theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
  const savedTheme = localStorage.getItem('splitit-theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
}

// Save settings
function saveSettings() {
  localStorage.setItem('splitit-bill', billAmountInput.value);
  localStorage.setItem('splitit-people', peopleCountInput.value);
  localStorage.setItem('splitit-tax', taxPercentInput.value);
  localStorage.setItem('splitit-tip', tipPercentInput.value);
  localStorage.setItem('splitit-currency', currencySelect.value);
}

//Load settings
function loadSettings() {
  const savedBill = localStorage.getItem('splitit-bill');
  const savedPeople = localStorage.getItem('splitit-people');
  const savedTax = localStorage.getItem('splitit-tax');
  const savedTip = localStorage.getItem('splitit-tip');
  const savedCurrency = localStorage.getItem('splitit-currency');

  if (savedBill !== null) billAmountInput.value = savedBill;
  if (savedPeople !== null) peopleCountInput.value = savedPeople;
  if (savedTax !== null) taxPercentInput.value = savedTax;
  if (savedTip !== null) tipPercentInput.value = savedTip;
  if (savedCurrency !== null) currencySelect.value = savedCurrency;
}

// Quick tip buttons 
tipButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const tipValue = button.dataset.tip;
    tipPercentInput.value = tipValue;

    tipButtons.forEach(function (b) {
      b.classList.remove('active');
    });
    button.classList.add('active');

    saveSettings();
  });
});


billForm.addEventListener('submit', calculateBill);
resetButton.addEventListener('click', resetCalculator);
themeToggle.addEventListener('click', toggleTheme);
billAmountInput.addEventListener('input', saveSettings);
peopleCountInput.addEventListener('input', saveSettings);
taxPercentInput.addEventListener('input', saveSettings);
tipPercentInput.addEventListener('input', saveSettings);
currencySelect.addEventListener('change', saveSettings);
loadTheme();
loadSettings();

