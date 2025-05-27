import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [salary, setSalary] = useState(0);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [percentageToInvest, setPercentageToInvest] = useState(0);
  const [years, setYears] = useState(0);

  const [housing, setHousing] = useState(0);
  const [transport, setTransport] = useState(0);
  const [health, setHealth] = useState(0);
  const [groceries, setGroceries] = useState(0);
  const [entertainment, setEntertainment] = useState(0);
  const [other, setOther] = useState(0);

  const [generalInflation, setGeneralInflation] = useState(0);
  const [housingOption, setHousingOption] = useState("None");
  const [housingInflation, setHousingInflation] = useState(0);
  const [mortgageYearsLeft, setMortgageYearsLeft] = useState(0);
  const [yearlySalaryIncrease, setYearlySalaryIncrease] = useState(0);
  const [yearlyReturn, setYearlyReturn] = useState(0);

  let housingTotal;

  let nonHousingTotal;
  let nonHousingTemp = transport + health + groceries + entertainment + other;
  let expensesTemp;
  let totalExpenses;

  let totalIncome;
  let incomeTemp = salary;

  let remaining;
  let totalNet;

  let totalInvestment = initialInvestment;
  let investmentTemp;
  let totalYield = initialInvestment;

  let totalSavings;
  let savingsTemp;

  for (let i = 0; i < years; i++) {
    if (housingOption === "None") housingTotal = 0;
    else if (housingOption === "Mortgage") housingTotal = housing * years;
    else {
      let rent = housing;
      for (let i = 0; i < years; i++) {
        housingTotal += rent;
        rent *= housingInflation;
      }
    }

    nonHousingTotal += nonHousingTemp;
    nonHousingTemp *= generalInflation;

    totalIncome += incomeTemp;
    incomeTemp *= yearlySalaryIncrease;

    expensesTemp = housingTotal + nonHousingTotal;
    totalExpenses += expensesTemp;

    remaining = incomeTemp - expensesTemp;

    // early return if investing is not possible
    if (remaining <= 0) return;
    totalNet += remaining;

    investmentTemp = percentageToInvest * remaining;
    totalInvestment += investmentTemp;
    totalYield += totalInvestment * yearlyReturn;

    savingsTemp = remaining - investmentTemp;
    totalSavings += savingsTemp;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        Calculate your retirement plan with this calculator 💰
      </h1>
      <p></p>
      <div className={styles.calculator}>
        <div>
          <h2 className={styles.columnTitle}>
            Income, investment, and savings 💵
          </h2>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Salary</h3>
            <input
              className={styles.input}
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              min={0}
            />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Initial investment</h3>
            <input className={styles.input} type="number" value />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>
              % to invest after expenses
            </h3>
            <input className={styles.input} type="number" value />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>% to save after expenses</h3>
            <input className={styles.input} type="number" value readOnly />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Years</h3>
            <input className={styles.input} type="number" value />
          </div>
        </div>

        <div>
          <h2 className={styles.columnTitle}>Expenses 🔥</h2>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Housing 🏠</h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Transport 🚗</h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Health 🏥</h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Groceries 🥦</h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Entertainment 🎉</h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Other ➖</h3>
            <input className={styles.input} type="number" />
          </div>
        </div>

        <div>
          <h2 className={styles.columnTitle}>Expected 🤔</h2>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>General inflation</h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>
              Do you pay mortgage or rent?
            </h3>
            <select className={styles.input}>
              <option value="none">None</option>
              <option value="mortgage">Mortgage</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Housing (rent) inflation</h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>
              Yearly salary increase (%)
            </h3>
            <input className={styles.input} type="number" />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.columnSubtitle}>Yearly return (%)</h3>
            <input className={styles.input} type="number" />
          </div>
        </div>
      </div>

      <p className={styles.result}>
        Your final amount is <span className={styles.resultNum}></span>
      </p>
    </div>
  );
}

export default App;
