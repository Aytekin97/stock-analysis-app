import React, { useState, useEffect } from 'react';

const StockData = ({ symbol }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`https://mysterious-sands-09816-909f28a343f7.herokuapp.com/`);
        const data = await response.json();
        setData(data["Time Series (5min)"]);
        setLoading(false);
      } catch (error) {
        setError('Error fetching stock data');
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{symbol} Stock Data</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.keys(data).map((time) => (
              <tr key={time}>
                <td>{time}</td>
                <td>{data[time]['1. open']}</td>
                <td>{data[time]['2. high']}</td>
                <td>{data[time]['3. low']}</td>
                <td>{data[time]['4. close']}</td>
                <td>{data[time]['5. volume']}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockData;
