// Get all the elements we need 
const billForm = document.getElementById('billForm');
const billAmountInput = document.getElementById('billAmount');
const peopleCountInput = document.getElementById('peopleCount');
const taxPercentInput = document.getElementById('taxPercent');
const tipPercentInput = document.getElementById('tipPercent');
const currencySelect = document.getElementById('currency');

// Result elements
const emptyState = document.getElementById('emptyState');
const resultsContent = document.getElementById('resultsContent');
const subtotalOutput = document.getElementById('subtotalOutput');
const taxOutput = document.getElementById('taxOutput');
const tipOutput = document.getElementById('tipOutput');
const totalOutput = document.getElementById('totalOutput');
const perPersonOutput = document.getElementById('perPersonOutput');

// get currency symbol 
function getCurrencySymbol() {
  const currency = currencySelect.value;
  if (currency === 'USD') return '$';
  if (currency === 'EUR') return '€';
  if (currency === 'GBP') return '£';
  if (currency === 'BDT') return '৳';
  if (currency === 'INR') return '₹';
  return '$'; // fallback
}

// format money 
function formatMoney(amount) {
  const symbol = getCurrencySymbol();
  return symbol + amount.toFixed(2);
}

// Main calculation -
function calculateBill(event) {
  event.preventDefault(); 

  const bill = parseFloat(billAmountInput.value);
  const people = parseInt(peopleCountInput.value);
  const taxPercent = parseFloat(taxPercentInput.value) || 0;
  const tipPercent = parseFloat(tipPercentInput.value) || 0;

  if (isNaN(bill) || bill <= 0) {
    console.log('Please enter a valid bill amount.');
    return;
  }
  if (isNaN(people) || people < 1) {
    console.log('Number of people must be at least 1.');
    return;
  }
  if (taxPercent < 0) {
    console.log('Tax cannot be negative.');
    return;
  }
  if (tipPercent < 0) {
    console.log('Tip cannot be negative.');
    return;
  }

  const subtotal = bill;
  const taxAmount = subtotal * (taxPercent / 100);
  const tipAmount = subtotal * (tipPercent / 100);
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

billForm.addEventListener('submit', calculateBill);
