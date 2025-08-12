// Savings Calculator Functionality
// All values start at 0 on page load

document.addEventListener('DOMContentLoaded', function () {
  // Selectors
  const amountInput = document.querySelector('.input-group input[type="number"]');
  const yearsSlider = document.querySelector('.years-container input[type="range"]');
  const yearsValue = document.querySelector('.years-container .range-label-row span:last-child');
  const monthsSlider = document.querySelectorAll('.range-group input[type="range"]')[1];
  const monthsValue = document.querySelectorAll('.range-group .range-label-row span:last-child')[1];
  const interestSlider = document.querySelector('.interest-rate-container input[type="range"]');
  const interestValue = document.querySelector('.interest-rate-container .range-label-row span:last-child');
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
  interestValue.textContent = '0%';
  resultAmount.textContent = '£0.00';
  resultText.innerHTML = "You'd have <strong>£0.00</strong> in total after saving <strong>£0.00</strong> a month for <strong>0 years</strong>";

  // Set slider attributes
  yearsSlider.min = 0;
  yearsSlider.max = 50;
  monthsSlider.min = 0;
  monthsSlider.max = 11;
  interestSlider.min = 0;
  interestSlider.max = 50;

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

  interestSlider.addEventListener('input', function () {
    interestValue.textContent = interestSlider.value + '%';
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
    const interest = parseFloat(interestSlider.value) || 0;
    const totalMonths = years * 12 + months;
    let total = 0;

    // Compound interest calculation (monthly contributions)
    let rate = interest / 100 / 12;
    if (rate > 0 && totalMonths > 0) {
      total = monthly * ((Math.pow(1 + rate, totalMonths) - 1) / rate);
    } else {
      total = monthly * totalMonths;
    }

  // Update results
  resultAmount.textContent = formatCurrency(total);
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
  resultText.innerHTML = `You'd have <strong>${formatCurrency(total)}</strong> in total after saving <strong>${formatCurrency(monthly)}</strong> a month for <strong>${durationText}</strong>`;
  });
});
