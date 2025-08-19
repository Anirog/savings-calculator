document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.tooltip-container');
  if (!container) return;
  const icon = container.querySelector('.ph-info');
  const tooltip = container.querySelector('.tooltip-popover');

  function showTooltip() {
    tooltip.classList.add('active');
    tooltip.setAttribute('aria-hidden', 'false');
  }

  function hideTooltip() {
    tooltip.classList.remove('active');
    tooltip.setAttribute('aria-hidden', 'true');
  }

  icon.addEventListener('click', function (e) {
    e.stopPropagation();
    if (tooltip.classList.contains('active')) {
      hideTooltip();
    } else {
      showTooltip();
    }
  });

  // Optional: also show pointer on hover (redundant, but for safety)
  icon.addEventListener('mouseenter', function () {
    icon.style.cursor = 'pointer';
  });

  // Hide tooltip when clicking outside
  document.addEventListener('click', function (e) {
    if (!container.contains(e.target)) {
      hideTooltip();
    }
  });

  // Hide tooltip on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideTooltip();
    }
  });

  // Accessibility: hide on focus out
  icon.addEventListener('blur', hideTooltip);
});
