import { useEffect, useState } from "react";

function Converter() {
  const [currencyData, setCurrencyData] = useState({});
  const [options, setOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/e665051bde29ac509d272c63/latest/USD`
      );
      const data = await response.json();
      setCurrencyData(data);
      setOptions(Object.keys(data.conversion_rates));
    } catch (err) {
      alert("Error fetching currency data!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConvert = (e) => {
    e.preventDefault();
    if (!currencyData.conversion_rates) return;

    const fromRate = currencyData.conversion_rates[fromCurrency];
    const toRate = currencyData.conversion_rates[toCurrency];
    const convertedValue = (amount / fromRate) * toRate;

    setResult(convertedValue.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-5">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center text-gray-100">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          💱 Currency Converter
        </h2>

        <form
          onSubmit={handleConvert}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 w-28 text-center"
              min="0"
            />

            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
            >
              {options.map((crn, index) => (
                <option value={crn} key={index}>
                  {crn}
                </option>
              ))}
            </select>

            <p className="text-2xl text-green-400">⇄</p>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
            >
              {options.map((crn, index) => (
                <option value={crn} key={index}>
                  {crn}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-green-500/30 transition-transform duration-200"
          >
            Convert
          </button>
        </form>

        {result > 0 && (
          <div className="mt-6 text-xl font-semibold text-green-300">
            {amount} {fromCurrency} ={" "}
            <span className="text-white">{result}</span> {toCurrency}
          </div>
        )}

        <p className="text-sm text-gray-400 mt-6">
          Exchange rates powered by{" "}
          <a
            href="https://www.exchangerate-api.com"
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:underline"
          >
            ExchangeRate API
          </a>
        </p>
      </div>
    </div>
  );
}

export default Converter;
