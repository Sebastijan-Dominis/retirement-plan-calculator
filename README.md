# Retirement Plan Calculator

A small, interactive React app (built with Vite) that helps you estimate savings and invested portfolio value over time based on income, expenses, savings rate, and expected returns. It’s designed for quick 'what-if' scenarios to better understand how current finances and assumptions affect long-term retirement outcomes.

**Live preview:** open the app locally with `npm run dev` and visit `http://localhost:5173`.

**Highlights**
- **Interactive inputs:** Annual salary, initial investment, savings vs investment split, monthly expenses (housing, transport, health, groceries, entertainment, other), and expectations (inflation, salary increase, annual return).
- **Simple model:** Calculates cumulative savings and portfolio growth year-by-year using the provided percentages and rates.
- **Housing options:** Choose `none`, `mortgage`, or `rent` to model housing expenses and inflation/mortgage term.

**Tech stack**
- React 19
- Vite 6
- ESLint for linting

**Repository snapshot**
- `index.html` — App entry HTML
- `src/main.jsx` — React entry file
- `src/App.jsx` — Main calculator UI and logic
- `src/App.module.css` — Component styles
- `package.json` — Scripts and dependencies

**Quick start**
1. Install dependencies:

```powershell
npm install
```

2. Run development server (hot-reload):

```powershell
npm run dev
```

3. Open the app at `http://localhost:5173` (Vite default).

**Build & preview**
- Build optimized production assets:

```powershell
npm run build
```

- Preview the production build locally:

```powershell
npm run preview
```

**Lint**
- Run ESLint across the project:

```powershell
npm run lint
```

**How to use the calculator**
- Enter your annual `Salary` and any `Initial investment` you already have.
- Set the percentage of disposable income to `Invest` vs `Save` (they sum to 100%).
- Fill monthly `Expenses` (housing, transport, health, groceries, entertainment, other).
- Choose `Years` to project into the future.
- Under `Expected`, set `General inflation`, `Yearly salary increase`, and `Yearly return` (expected portfolio return).
- For housing, select `none`, `mortgage` (enter years left), or `rent` (enter housing inflation).
- The app will show projected total `savings` and `portfolio` after the selected number of years.

Notes about the model:
- The calculator compounds the portfolio annually using the provided `yearlyReturn`.
- Savings accumulate from the portion of disposable income allocated to `save` each year.
- If disposable income becomes negative at any point the app returns zeros and suggests cutting expenses.

**Development notes**
- The app is intentionally small and uses `useReducer` in `src/App.jsx` to manage inputs and derived calculation logic in `calculate()`.
- If you want to extend the model, consider:
  - Adding monthly or continuous compounding options
  - Persisting scenarios to localStorage
  - Adding charts (e.g., using `chart.js` or `recharts`) to visualize portfolio vs savings over time

**License**
- This project includes a `LICENSE` file in the repository root. Review it for licensing details.

**Contributing**
- Feel free to open issues or PRs — small improvements, accessibility fixes, and more realistic financial models are welcome.

**Contact**
- Author: repository owner (see repository metadata).
