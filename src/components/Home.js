import React, { useEffect, useState } from "react";
import classes from "./home.module.css";
import axios from "axios";

export const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();
  const [err, setError] = useState();
  function handleAmount(e) {
    setAmount(e.target.value);
  }
  const convert = async () => {
    if (from === to) {
      setResult(amount);
    } else {
      try {
        const response = await axios.post(
          "https://converter-jcpz.onrender.com/api/v1/convert",
          {
            value: amount,
            from: from,
            to: to,
          }
        );
        setResult(response.data.response.toFixed(2));
      } catch (err) {
        if (err.message) {
          console.log(err.response.data.message);
        }
      }
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://converter-jcpz.onrender.com/api/v1/convert"
        );
        setCurrencies(response.data.currencies);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);
  return (
    <div className={classes.home}>
      <div className={classes.login}>
        <h1>{err}</h1>
        <form>
          <div className={classes.control}>
            <label htmlFor="">Input</label>
            <input type="number" value={amount} onChange={handleAmount} />
            <select onChange={(e) => setFrom(e.target.value)}>
              <option>Select currency</option>
              {currencies.map((currency) => (
                <option value={currency.currency}>{currency.currency}</option>
              ))}
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="">Output</label>
            <input type="number" value={result} />
            <select
              onChange={(e) => {
                setTo(e.target.value);
                convert();
              }}
            >
              <option>Select currency</option>
              {currencies.map((currency) => (
                <option value={currency.currency}>{currency.currency}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};
