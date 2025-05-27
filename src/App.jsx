import { useReducer } from "react";
import styles from "./App.module.css";

const firstCol = [
  { text: "Salary 💳", name: "salary", type: "updateValue" },
  {
    text: "Initial investment 💲",
    name: "initialInvestment",
    type: "updateValue",
  },
  {
    text: "% to invest after expenses 🤵",
    name: "percentageToInvest",
    type: "updatePercentageAfterExpenses",
  },
  {
    text: "% to save after expenses ✅",
    name: "percentageToSave",
    type: "updatePercentageAfterExpenses",
  },
  { text: "Years ⌛", name: "years", type: "updateValue" },
];

const secondCol = [
  { text: "Housing 🏠", name: "housing", type: "updateHousing" },
  { text: "Transport 🚗", name: "transport", type: "updateValue" },
  { text: "Health 🏥", name: "health", type: "updateValue" },
  { text: "Groceries 🥦", name: "groceries", type: "updateValue" },
  { text: "Entertainment 🎥", name: "entertainment", type: "updateValue" },
  { text: "Other 🪑", name: "other", type: "updateValue" },
];

const thirdCol = [
  { text: "General inflation 🔥", name: "generalInflation" },
  { text: "Yearly salary increase 💹", name: "yearlySalaryIncrease" },
  { text: "Yearly return ➕💹", name: "yearlyReturn" },
];

const noMinZero = new Set([
  "generalInflation",
  "housingOption",
  "yearlySalaryIncrease",
  "yearlyReturn",
]);

const initialState = {
  // Income, savings and investment
  salary: 0,
  initialInvestment: 0,
  percentageToInvest: 0,
  percentageToSave: 0,
  years: 0,

  // Expenses
  housing: 0,
  transport: 0,
  health: 0,
  groceries: 0,
  entertainment: 0,
  other: 0,

  // Expected
  generalInflation: 0,
  housingOption: "none",
  housingInflation: 0,
  mortgageYearsLeft: 0,
  yearlySalaryIncrease: 0,
  yearlyReturn: 0,
};

function reducer(state, { type, name, value }) {
  switch (type) {
    case "updateValue": {
      return { ...state, [name]: value };
    }
    case "updateHousing": {
      const hasToBeZero = state.housingOption === "none";
      if (hasToBeZero) return { ...state, housing: 0 };
      return { ...state, housing: value };
    }
    case "updatePercentageAfterExpenses": {
      if (name === "percentageToInvest") {
        return {
          ...state,
          percentageToInvest: value,
          percentageToSave: 100 - value,
        };
      } else {
        return {
          ...state,
          percentageToSave: value,
          percentageToInvest: 100 - value,
        };
      }
    }
    case "updateHousingOption": {
      if (value === "none") {
        return { ...state, housing: 0, housingOption: value };
      } else {
        return { ...state, housingOption: value };
      }
    }
    default:
      throw new Error("Unexpected action.");
  }
}

function calculate(state) {
  if (state.years === 0) {
    return { savings: null, portfolio: null };
  }

  let currentSalary = state.salary;
  let currentHousingExpenses = state.housing * 12;
  let yearsLeft = state.mortgageYearsLeft;
  let currentNonHousingExpenses =
    (state.transport +
      state.health +
      state.groceries +
      state.entertainment +
      state.other) *
    12;
  let currentTotalExpenses = currentHousingExpenses + currentNonHousingExpenses;
  let disposableIncome = currentSalary - currentTotalExpenses;
  let totalSavings = 0;
  let totalPortfolio = state.initialInvestment;

  for (let i = 0; i < state.years; i++) {
    // updating savings and portfolio
    totalSavings += disposableIncome * (state.percentageToSave / 100);
    totalPortfolio *= 1 + state.yearlyReturn / 100;
    totalPortfolio += disposableIncome * (state.percentageToInvest / 100);

    // recalculating the variables
    currentSalary *= 1 + state.yearlySalaryIncrease / 100;

    if (
      state.housingOption === "none" ||
      (state.housingOption === "mortgage" && yearsLeft === 0)
    ) {
      currentHousingExpenses = 0;
    } else if (state.housingOption === "mortgage" && yearsLeft > 0) {
      yearsLeft--;
    } else if (state.housingOption === "rent") {
      currentHousingExpenses *= 1 + state.housingInflation / 100;
    }

    currentNonHousingExpenses *= 1 + state.generalInflation / 100;

    currentTotalExpenses = currentHousingExpenses + currentNonHousingExpenses;

    disposableIncome = currentSalary - currentTotalExpenses;
    if (disposableIncome < 0) {
      return { savings: 0, portfolio: 0 };
    }
  }

  return { savings: totalSavings, portfolio: totalPortfolio };
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const results = calculate(state);

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        Calculate your retirement plan with this calculator 💰
      </h1>
      <p></p>
      <div className={styles.calculator}>
        <div>
          <h2 className={styles.columnTitle}>
            Income (yearly), investment, and savings 💵
          </h2>
          {firstCol.map((el) => {
            return (
              <div className={styles.inputContainer} key={el.name}>
                <h3 className={styles.columnSubtitle}>{el.text}</h3>
                <input
                  className={styles.input}
                  type="number"
                  value={state[el.name]}
                  onChange={(e) =>
                    dispatch({
                      type: el.type,
                      name: el.name,
                      value: Number(e.target.value),
                    })
                  }
                  min={!noMinZero.has(el.name) ? 0 : ""}
                />
              </div>
            );
          })}
        </div>

        <div>
          <h2 className={styles.columnTitle}>Expenses (monthly) 🔥</h2>
          {secondCol.map((el) => {
            return (
              <div className={styles.inputContainer} key={el.name}>
                <h3 className={styles.columnSubtitle}>{el.text}</h3>
                <input
                  className={styles.input}
                  type="number"
                  value={state[el.name]}
                  onChange={(e) =>
                    dispatch({
                      type: el.type,
                      name: el.name,
                      value: Number(e.target.value),
                    })
                  }
                  min={!noMinZero.has(el.name) ? 0 : ""}
                />
              </div>
            );
          })}
        </div>

        <div>
          <h2 className={styles.columnTitle}>Expected 🤔</h2>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>
              Do you pay mortgage or rent? 🏠
            </h3>
            <select
              className={styles.input}
              value={state.housingOption}
              onChange={(e) =>
                dispatch({
                  type: "updateHousingOption",
                  name: "housingOption",
                  value: e.target.value,
                })
              }
            >
              <option value="none">None</option>
              <option value="mortgage">Mortgage</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          {state.housingOption === "rent" && (
            <div className={styles.inputContainer}>
              <h3 className={styles.columnSubtitle}>
                Housing (rent) inflation 🔥
              </h3>
              <input
                className={styles.input}
                type="number"
                value={state.housingInflation}
                onChange={(e) =>
                  dispatch({
                    type: "updateValue",
                    name: "housingInflation",
                    value: Number(e.target.value),
                  })
                }
              />
            </div>
          )}
          {state.housingOption === "mortgage" && (
            <div className={styles.inputContainer}>
              <h3 className={styles.columnSubtitle}>
                Years left to pay mortgage ⌛
              </h3>
              <input
                className={styles.input}
                type="number"
                value={state.mortgageYearsLeft}
                onChange={(e) =>
                  dispatch({
                    type: "updateValue",
                    name: "mortgageYearsLeft",
                    value: Number(e.target.value),
                  })
                }
                min={0}
              />
            </div>
          )}
          {thirdCol.map((el) => {
            return (
              <div className={styles.inputContainer} key={el.name}>
                <h3 className={styles.columnSubtitle}>{el.text}</h3>
                <input
                  className={styles.input}
                  type="number"
                  value={state[el.name]}
                  onChange={(e) =>
                    dispatch({
                      type: "updateValue",
                      name: el.name,
                      value: Number(e.target.value),
                    })
                  }
                  min={!noMinZero.has(el.name) ? 0 : ""}
                />
              </div>
            );
          })}
        </div>
      </div>

      {results.savings === 0 && results.portfolio === 0 && (
        <p className={styles.result}>
          Oops! It seems like your expenses exceed your income. See if you can
          cut them somehow!
        </p>
      )}
      {(results.savings > 0 || results.portfolio > 0) && (
        <p className={styles.result}>
          In {state.years} years, you will have {results.savings.toFixed(2)} in
          your savings and {results.portfolio.toFixed(2)} in your portfolio.
        </p>
      )}
      {results.savings === null && results.portfolio === null && (
        <p className={styles.result}>
          Please enter a positive year to calculate
        </p>
      )}
    </div>
  );
}

export default App;
