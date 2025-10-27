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
    <div className="flex flex-col items-center gap-5 p-5">
      <h2 className="text-xl font-bold">💱 Currency Converter</h2>

      <form onSubmit={handleConvert} className="flex gap-4 items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-24"
        />

        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border p-2 rounded"
        >
          {options.map((crn, index) => (
            <option value={crn} key={index}>
              {crn}
            </option>
          ))}
        </select>

        <p>➡️</p>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 rounded"
        >
          {options.map((crn, index) => (
            <option value={crn} key={index}>
              {crn}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Convert
        </button>
      </form>

      <div className="text-lg font-semibold">
        {result > 0 && (
          <p>
            {amount} {fromCurrency} = {result} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}

export default Converter;
