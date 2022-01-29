import React, { useState, useEffect } from 'react';
import './App.css';
import Coins from './Coins';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(resp => resp.json())
      .then(data => {
        setCoins(data);
        console.log(data);
      })
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter((coin) => (
    coin.name.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className='coin-text'>Search a Currency</h1>
        <form>
          <input 
            type="text" 
            placeholder='Search' 
            className='coin-input'
            onChange={handleChange}  
            />
        </form>
      </div>
      {filteredCoins.map((coin) => (
        <Coins 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          price={coin.current_price}
          mktcap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h} 
          volume={coin.total_volume} 
        />
      ))}
    </div>
  );
}

export default App;
