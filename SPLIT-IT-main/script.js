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

// format money 
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

// calculation function 
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

// Reset 
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
}

//  Quick tip buttons
tipButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const tipValue = button.dataset.tip;
    tipPercentInput.value = tipValue;

    tipButtons.forEach(function (b) {
      b.classList.remove('active');
    });
    button.classList.add('active');
  });
});

billForm.addEventListener('submit', calculateBill);
resetButton.addEventListener('click', resetCalculator);


