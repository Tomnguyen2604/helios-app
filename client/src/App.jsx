import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PortfolioCard from './components/PortfolioCard';
import TrendChart from './components/TrendChart';
import AlertsPanel from './components/AlertsPanel';
import VoiceToggle from './components/VoiceToggle';
import ChatBox from './components/ChatBox';
import useStockData from './hooks/useStockData';
import { askHelios } from './utils/aiAdvisor';
import './styles/App.scss';
import axios from 'axios';

function App() {
  const [trend, setTrend] = useState([]);
  const stockData = useStockData();

  useEffect(() => {
    axios.get("http://localhost:8000/trend").then(res => {
      setTrend(res.data.trend);
    });
  }, []);

  const handleSend = async (input) => {
    const reply = await askHelios(input);
    alert(reply);
  };

  return (
    <div className="App">
      <Header />
      <div className="dashboard">
        {stockData.map((item, i) => (
          <PortfolioCard key={i} ticker={item.split(":")[0]} price={0} change={0} />
        ))}
        <TrendChart data={trend} />
        <AlertsPanel alerts={stockData} />
        <VoiceToggle enabled={true} onToggle={() => {}} />
        <ChatBox onSend={handleSend} />
      </div>
    </div>
  );
}

export default App;