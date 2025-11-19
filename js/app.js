// Savings Calculator Functionality
// All values start at 0 on page load

document.addEventListener('DOMContentLoaded', function () {
  // Selectors
  const amountInput = document.querySelector('.input-group input[type="number"]');
  const yearsSlider = document.querySelector('.years-container input[type="range"]');
  const yearsValue = document.querySelector('.years-container .range-label-row span:last-child');
  const monthsSlider = document.querySelectorAll('.range-group input[type="range"]')[1];
  const monthsValue = document.querySelectorAll('.range-group .range-label-row span:last-child')[1];
  const interestSlider = document.getElementById('interest-slider');
  const interestInput = document.getElementById('interest-input');
  const calculateBtn = document.querySelector('.calculate-button');
  const resultAmount = document.querySelector('.result-amount');
  const resultText = document.querySelector('.results p');

  // Set initial values
  amountInput.value = 0;
  yearsSlider.value = 0;
  yearsValue.textContent = '0';
  monthsSlider.value = 0;
  monthsValue.textContent = '0';
  interestSlider.value = 0;
  interestInput.value = 0;
  resultAmount.textContent = '£0.00';
  resultText.innerHTML = "You'd have <strong>£0.00</strong> in total after saving <strong>£0.00</strong> a month for <strong>0 years</strong>";

  // Set slider attributes
  yearsSlider.min = 0;
  yearsSlider.max = 50;
  monthsSlider.min = 0;
  monthsSlider.max = 11;
  
  // Fix the interest slider range - use 0-500 for 0-50.0%
  interestSlider.min = 0;
  interestSlider.max = 500;  // This allows values up to 50.0%
  interestSlider.step = 1;
  interestInput.min = 0;
  interestInput.max = 50;
  interestInput.step = 0.1;

  // Update display on slider/input change
  amountInput.addEventListener('input', function () {
    amountInput.value = amountInput.value.replace(/,/g, '');
  });

  yearsSlider.addEventListener('input', function () {
    yearsValue.textContent = yearsSlider.value;
  });

  monthsSlider.addEventListener('input', function () {
    monthsValue.textContent = monthsSlider.value;
  });

  // Synchronize interest slider and number input
  interestSlider.addEventListener('input', function() {
    const value = parseFloat(interestSlider.value) / 10;
    interestInput.value = value.toFixed(1);
  });

  interestInput.addEventListener('input', function() {
    // Limit to 1 decimal place
    if (interestInput.value.includes('.')) {
      const parts = interestInput.value.split('.');
      if (parts[1].length > 1) {
        interestInput.value = parseFloat(interestInput.value).toFixed(1);
      }
    }
    
    // Update slider (multiply by 10 since slider works in tenths)
    const value = parseFloat(interestInput.value) || 0;
    interestSlider.value = Math.round(value * 10);
  });

  // Format currency
  function formatCurrency(num) {
    return '£' + Number(num).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Calculate savings
  calculateBtn.addEventListener('click', function () {
    const monthly = parseFloat(amountInput.value) || 0;
    const years = parseInt(yearsSlider.value) || 0;
    const months = parseInt(monthsSlider.value) || 0;
    const interest = parseFloat(interestInput.value) || 0;
    const totalMonths = years * 12 + months;
    let total = 0;

    // Compound interest calculation (monthly contributions)
    let rate = interest / 100 / 12;
    if (rate > 0 && totalMonths > 0) {
      total = monthly * ((Math.pow(1 + rate, totalMonths) - 1) / rate);
    } else {
      total = monthly * totalMonths;
    }

    // Calculate total principal (amount saved without interest)
    const principal = monthly * totalMonths;

    // Calculate total interest earned
    const totalInterest = total - principal;

    // Get selected tax rate
    const taxRadio = document.querySelector('.radio-group input[name="tax"]:checked');
    let taxType = taxRadio ? taxRadio.parentElement.textContent.trim() : 'None';
    let taxDeducted = 0;
    if (taxType === 'Basic rate') {
      // First £1,000 interest tax free, rest taxed at 20%
      if (totalInterest > 1000) {
        taxDeducted = (totalInterest - 1000) * 0.20;
      }
    } else if (taxType === 'Higher rate') {
      // First £500 interest tax free, rest taxed at 40%
      if (totalInterest > 500) {
        taxDeducted = (totalInterest - 500) * 0.40;
      }
    } else if (taxType === 'Additional rate') {
      // All interest taxed at 45%
      taxDeducted = totalInterest * 0.45;
    }
    // None: no deduction

    // Deduct tax from total
    const totalAfterTax = total - taxDeducted;

    // Update results
    resultAmount.textContent = formatCurrency(totalAfterTax);
    const yearLabel = years === 1 ? 'year' : 'years';
    const monthLabel = months === 1 ? 'month' : 'months';
    let durationText = '';
    if (years > 0 && months > 0) {
      durationText = `${years} ${yearLabel} and ${months} ${monthLabel}`;
    } else if (years > 0) {
      durationText = `${years} ${yearLabel}`;
    } else if (months > 0) {
      durationText = `${months} ${monthLabel}`;
    } else {
      durationText = '0 years';
    }
    resultText.innerHTML = `You'd have <strong>${formatCurrency(totalAfterTax)}</strong> in total after saving <strong>${formatCurrency(monthly)}</strong> a month for <strong>${durationText}</strong>`;
  });
});