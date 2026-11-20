import { convertCurrency } from "css-currency-converter";

// DOM Elements
const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount-input");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const swapBtn = document.getElementById("swap-btn");
const convertBtn = document.getElementById("convert-btn");
const resultBox = document.getElementById("result-box");
const resultAmount = document.getElementById("result-amount");
const ratePill = document.getElementById("rate-pill");
const errorBox = document.getElementById("error-box");
const baseSymbol = document.getElementById("base-symbol");
const quickChips = document.getElementById("quick-chips");

// Currency Symbols Map
const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  INR: "₹",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
  AUD: "A$",
  CHF: "CHF",
  SGD: "S$",
  AED: "AED",
};

function updateBaseSymbol() {
  const code = fromSelect.value;
  baseSymbol.textContent = CURRENCY_SYMBOLS[code] || code;
}

function formatResult(value, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] || "";
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);

  return `${symbol}${formattedNumber} ${currency}`;
}

async function performConversion() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    showError("Please enter a valid positive amount.");
    return;
  }

  // Same currency edge case
  if (from === to) {
    hideError();
    resultAmount.textContent = formatResult(amount, to);
    ratePill.textContent = `1 ${from} = 1 ${to}`;
    return;
  }

  setLoading(true);
  hideError();

  try {
    // Calling the npm package!
    const result = await convertCurrency(from, to, amount);

    if (result === undefined || isNaN(result)) {
      throw new Error(`Unable to convert from ${from} to ${to}.`);
    }

    resultAmount.textContent = formatResult(result, to);
    const unitRate = (result / amount).toFixed(4);
    ratePill.textContent = `1 ${from} = ${unitRate} ${to}`;
  } catch (err) {
    console.error("Conversion error:", err);
    showError(
      err.message || "Failed to fetch exchange rates. Please try again."
    );
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading) {
  if (isLoading) {
    convertBtn.classList.add("loading");
    convertBtn.disabled = true;
  } else {
    convertBtn.classList.remove("loading");
    convertBtn.disabled = false;
  }
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
}

function hideError() {
  errorBox.style.display = "none";
}

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  performConversion();
});

swapBtn.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  updateBaseSymbol();
  performConversion();
});

fromSelect.addEventListener("change", () => {
  updateBaseSymbol();
  performConversion();
});

toSelect.addEventListener("change", () => {
  performConversion();
});

// Quick Presets
quickChips.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  const { from, to, amount } = chip.dataset;
  fromSelect.value = from;
  toSelect.value = to;
  amountInput.value = amount;
  updateBaseSymbol();
  performConversion();
});

// Initial Setup & First Conversion on Load
updateBaseSymbol();
performConversion();
