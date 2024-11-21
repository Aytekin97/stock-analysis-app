import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/StockAnalysis.css';

const companies = [
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'GOOGL', name: 'Google' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'NFLX', name: 'Netflix' }
];

const StockAnalysis = () => {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (symbol) => {
    setLoading(true);
    setError(null);
    setData([]);
    try {
      const response = await fetch(`https://stock-analysis-app-be-production.up.railway.app/api/stock/${symbol}`);
      if (!response.ok) throw new Error('Error fetching data');
      const rawData = await response.json();
      const timeSeriesData = rawData["Time Series (60min)"];
      const formattedData = Object.keys(timeSeriesData).map((time) => ({
        time,
        open: parseFloat(timeSeriesData[time]['1. open']),
        high: parseFloat(timeSeriesData[time]['2. high']),
        low: parseFloat(timeSeriesData[time]['3. low']),
        close: parseFloat(timeSeriesData[time]['4. close']),
        volume: parseInt(timeSeriesData[time]['5. volume'], 10),
      }));
      setData(formattedData);
      setSelectedCompany(symbol);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate min and max values for the 'close' data to set Y-axis limits
  const closePrices = data.map(d => d.close);
  const minClose = Math.min(...closePrices);
  const maxClose = Math.max(...closePrices);
  const yAxisPadding = (maxClose - minClose) * 0.1; // add 10% padding

  return (
    <div className="stock-analysis">
      <h1>Stock Analysis</h1>
      <div className="company-grid">
        {companies.map((company) => (
          <div
            key={company.symbol}
            className="company-box"
            onClick={() => fetchStockData(company.symbol)}
          >
            <h3>{company.name}</h3>
            <p>{company.symbol}</p>
          </div>
        ))}
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}

      {data.length > 0 && (
        <div className="chart-container">
          <h2>{selectedCompany} Stock Prices</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              
              {/* Updated YAxis with custom tickFormatter for formatting the labels */}
              <YAxis 
                domain={[minClose - yAxisPadding, maxClose + yAxisPadding]} 
                tickFormatter={(tick) => tick.toFixed(2)} 
              />
              
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="close" stroke="#8884d8" name="Close Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StockAnalysis;
