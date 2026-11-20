# 💱 Currency Converter Demo Project

> A modern, responsive live demo web application that installs and showcases the [`css-currency-converter`](https://www.npmjs.com/package/css-currency-converter) NPM package.

[![npm version](https://img.shields.io/npm/v/css-currency-converter.svg)](https://www.npmjs.com/package/css-currency-converter)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## 🔗 Project Links

- **Live Deployed App:** *(Paste your Vercel URL here)*
- **NPM Package:** [css-currency-converter on npm](https://www.npmjs.com/package/css-currency-converter)
- **NPM Package Repository:** [https://github.com/itsriteshx/npm_Packages](https://github.com/itsriteshx/npm_Packages)

---

## 🚀 Features

- ⚡ **Integrates `css-currency-converter`**: Directly imports and uses `convertCurrency(from, to, units)` from npm.
- 🌐 **Real-time Conversion**: Up-to-date exchange rates between USD, EUR, INR, GBP, JPY, and more.
- ⇄ **1-Click Currency Swap**: Quick toggle between base and target currencies.
- 🎨 **Modern Glassmorphic UI**: Responsive layout designed with Plus Jakarta Sans and JetBrains Mono.
- ⚡ **Fast & Lightweight**: Built with Vite and native ES modules.

---

## 🛠️ How this Demo uses `css-currency-converter`

```javascript
import { convertCurrency } from "css-currency-converter";

// Convert 100 USD to INR
const result = await convertCurrency("USD", "INR", 100);
console.log(`100 USD = ₹${result}`);
```

---

## 💻 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itsriteshx/currency-converter-demo.git
   cd currency-converter-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👨‍💻 Author

**Ritesh**
- GitHub: [@itsriteshx](https://github.com/itsriteshx)
