# Savings Calculator

A simple, free web-based tool to help users estimate how much they could save over time with compound interest calculations and UK tax considerations.

## Project Overview

**Type**: Static Web Application  
**Language**: Vanilla JavaScript, HTML5, CSS3  
**Purpose**: Calculate potential savings growth with monthly contributions, compound interest, and UK tax rates  
**Deployment**: Can be hosted on any static web server (GitHub Pages, Netlify, etc.)

## Features

- **Monthly Savings Input**: Calculate based on regular monthly contributions
- **Flexible Time Period**: Set savings duration in years (0-50) and months (0-11)
- **Interest Rate Calculator**: Supports interest rates from 0% to 50% with 0.1% precision
- **UK Tax Integration**: Accounts for UK Personal Savings Allowance and tax bands:
  - None (below Personal Allowance)
  - Basic Rate (20% tax, £1,000 allowance)
  - Higher Rate (40% tax, £500 allowance)
  - Additional Rate (45% tax, no allowance)
- **Compound Interest**: Uses monthly compounding formula for accurate projections
- **Real-time Updates**: Interactive sliders and inputs with instant visual feedback
- **Responsive Design**: Mobile-friendly interface
- **Tooltip Help**: Contextual information about UK tax bands

## Technical Architecture

### File Structure

```
savings-calculator/
├── index.html           # Main HTML structure
├── css/
│   ├── reset.css       # CSS reset for cross-browser consistency
│   ├── typography.css  # Font and text styling
│   ├── layout.css      # Page layout and structure
│   ├── form.css        # Form elements styling
│   ├── components.css  # Reusable component styles
│   └── tooltip.css     # Tooltip popover styles
├── js/
│   ├── app.js          # Main calculator logic and event handlers
│   └── tooltip.js      # Tooltip interaction functionality
├── images/             # Image assets (piggybank.png, og-image.png, favicons)
├── favicon.ico         # Website favicon
└── README.md           # This file
```

### Key Functions and Logic

#### Compound Interest Calculation
Located in `js/app.js` (lines 81-95)

```javascript
// Formula: FV = PMT × ((1 + r)^n - 1) / r
// Where:
// FV = Future Value
// PMT = Monthly payment amount
// r = Monthly interest rate (annual rate / 12 / 100)
// n = Total number of months
```

**Implementation Details**:
- Monthly interest rate: `interest / 100 / 12`
- If interest rate is 0, simple multiplication is used: `monthly × totalMonths`
- Returns total amount including contributions and interest

#### Tax Calculation
Located in `js/app.js` (lines 104-121)

**Tax Rates**:
- **None**: No tax deduction
- **Basic Rate**: First £1,000 interest tax-free, remaining taxed at 20%
- **Higher Rate**: First £500 interest tax-free, remaining taxed at 40%
- **Additional Rate**: All interest taxed at 45%

**Process**:
1. Calculate total interest earned: `total - principal`
2. Apply tax-free allowance (if applicable)
3. Calculate tax on remaining interest
4. Deduct tax from total

#### Currency Formatting
Located in `js/app.js` (lines 76-78)

Uses `toLocaleString('en-GB')` for proper UK currency formatting with 2 decimal places.

## Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: A local web server (for testing, though not required)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anirog/savings-calculator.git
   cd savings-calculator
   ```

2. **Open in browser**:
   - **Option A**: Direct file access
     ```bash
     open index.html
     # or double-click index.html in file explorer
     ```
   
   - **Option B**: Local server (recommended for development)
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if you have npx)
     npx http-server
     
     # PHP
     php -S localhost:8000
     ```
   
   Then navigate to `http://localhost:8000`

### No Build Process Required
This is a static website with no dependencies or build steps. All assets are self-contained.

## Usage

### For End Users

1. **Set Monthly Savings**: Enter the amount you plan to save each month (in GBP)
2. **Choose Duration**: Use sliders to set years (0-50) and months (0-11)
3. **Set Interest Rate**: Adjust the interest rate slider or type a value (0-50%)
4. **Select Tax Band**: Choose your tax bracket for interest calculations
5. **Click Calculate**: View your projected savings after the specified period

### For Developers

#### Key DOM Selectors
```javascript
const amountInput = document.querySelector('.input-group input[type="number"]');
const yearsSlider = document.querySelector('.years-container input[type="range"]');
const interestSlider = document.getElementById('interest-slider');
const calculateBtn = document.querySelector('.calculate-button');
const resultAmount = document.querySelector('.result-amount');
```

#### Event Handlers
- `amountInput`: Input event for comma removal
- `yearsSlider` & `monthsSlider`: Input events for display updates
- `interestSlider` & `interestInput`: Synchronized input events (slider uses 0-500 range for 0-50.0% with 0.1 precision)
- `calculateBtn`: Click event triggers calculation and result display

#### Extending Functionality
To add new features:
1. Add HTML elements in `index.html`
2. Style in appropriate CSS file (follow existing modular structure)
3. Add event listeners and logic in `js/app.js`
4. Follow existing patterns for consistency

## External Dependencies

- **Phosphor Icons**: Icon library loaded via CDN
  ```html
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  ```
- **Google Fonts**: Montserrat font family
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
  ```
- **PostHog**: Analytics (optional, loaded from custom domain)

## Deployment

### GitHub Pages
1. Go to repository Settings > Pages
2. Select branch (usually `main` or `master`)
3. Set root directory as source
4. Site will be available at `https://yourusername.github.io/savings-calculator/`

### Netlify
1. Connect repository to Netlify
2. No build command needed
3. Publish directory: `/` (root)
4. Deploy

### Custom Server
Simply copy all files to your web server's public directory.

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support (responsive design)

**Minimum Requirements**:
- ES6 JavaScript support
- CSS Grid and Flexbox
- HTML5 form inputs

## Configuration

### Modifying Default Values
Edit `js/app.js` (lines 17-26) to change initial state:
```javascript
amountInput.value = 0;        // Initial monthly amount
yearsSlider.value = 0;        // Initial years
monthsSlider.value = 0;       // Initial months
interestSlider.value = 0;     // Initial interest rate
```

### Modifying Ranges
Edit `js/app.js` (lines 28-40):
```javascript
yearsSlider.max = 50;         // Maximum years
monthsSlider.max = 11;        // Maximum months (0-11)
interestSlider.max = 500;     // Maximum interest (50.0%)
interestInput.max = 50;       // Maximum interest input value
```

### Customizing Tax Rates
Edit `js/app.js` (lines 107-120) to adjust tax calculations for different jurisdictions.

## SEO and Metadata

The application includes comprehensive SEO optimization:
- Open Graph tags for social media sharing
- Twitter Card support
- Canonical URL
- Descriptive meta tags
- Structured data ready

## Contributing

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Comment complex logic
- Keep functions focused and single-purpose

### Adding Features
1. Fork the repository
2. Create a feature branch
3. Make changes following existing patterns
4. Test across browsers
5. Submit a pull request

### Reporting Issues
Include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## License

This project is open source. Check repository for specific license information.

## Credits

**Author**: Larrie Knights  
**Website**: [larrieknights.com](https://larrieknights.com)

## For AI Agents and Copilot

### Quick Context
- **Main entry point**: `index.html`
- **Core logic**: `js/app.js` (142 lines)
- **Calculation function**: Lines 81-141 in `app.js`
- **No dependencies**: Pure vanilla JavaScript, no npm packages
- **No build process**: Direct HTML/CSS/JS execution

### Common Tasks

**Task: Modify calculation logic**
- File: `js/app.js`
- Function: Event listener on `calculateBtn` (line 81)
- Key variables: `monthly`, `years`, `months`, `interest`, `total`

**Task: Change styling**
- Component styles: `css/components.css`
- Form styles: `css/form.css`
- Layout: `css/layout.css`

**Task: Update UI text or structure**
- File: `index.html`
- Main sections: `.calculator` (input form), `.results` (output display)

**Task: Add new input field**
1. Add HTML in `index.html` within `.calculator` section
2. Add styles in `css/form.css`
3. Add selector and event listener in `js/app.js`
4. Integrate into calculation logic (line 81+)

### Code Patterns

**Adding an input field**:
```javascript
// 1. Select element
const newInput = document.querySelector('.new-input');

// 2. Add event listener
newInput.addEventListener('input', function() {
  // Handle input
});

// 3. Use in calculation
const newValue = parseFloat(newInput.value) || 0;
```

**Formatting values**:
```javascript
// Use existing formatCurrency function
formatCurrency(amount); // Returns '£1,234.56'
```

**Updating results**:
```javascript
resultAmount.textContent = formatCurrency(total);
resultText.innerHTML = `Your message with <strong>emphasis</strong>`;
```

## Testing

### Manual Testing Checklist
- [ ] Enter various monthly amounts (0, 100, 1000, 10000)
- [ ] Test edge cases (0 years, 50 years, 0% interest, 50% interest)
- [ ] Verify tax calculations for each band
- [ ] Check mobile responsiveness
- [ ] Test tooltip functionality
- [ ] Verify slider-input synchronization
- [ ] Confirm currency formatting
- [ ] Test across different browsers

### Automated Testing
Currently no automated tests are implemented. The project could benefit from:
- Jest for unit testing calculation logic
- Cypress/Playwright for E2E testing
- Lighthouse for performance auditing

## Performance

- **Load Time**: < 1 second (all assets < 100KB combined)
- **Render**: Instant (no JavaScript frameworks)
- **Calculation**: < 1ms (simple mathematical operations)
- **No Network Requests**: After initial load (except CDN assets)

## Accessibility

- Semantic HTML structure
- Keyboard navigable
- Screen reader friendly labels
- ARIA attributes on tooltips
- High contrast text
- Focus indicators on interactive elements

## Future Enhancements

Potential improvements:
- Graph visualization of savings growth over time
- Export results to PDF/CSV
- Multiple savings goal tracking
- Inflation adjustment calculator
- Different compounding frequencies (daily, quarterly, annually)
- Comparison mode (compare different scenarios)
- Save/load calculations
- Dark mode
- Multi-currency support
- Localization for different countries' tax systems
