import { useState } from 'react';

const AddStockModal = ({ isOpen, onClose, onAddStock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);

  // Popular stocks list
  const popularStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: 189.98 },
    { ticker: 'MSFT', name: 'Microsoft Corporation', price: 378.91 },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 141.80 },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 178.35 },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 242.84 },
    { ticker: 'NVDA', name: 'NVIDIA Corporation', price: 495.22 },
    { ticker: 'META', name: 'Meta Platforms Inc.', price: 484.03 },
    { ticker: 'NFLX', name: 'Netflix Inc.', price: 672.49 },
    { ticker: 'AMD', name: 'Advanced Micro Devices', price: 122.56 },
    { ticker: 'INTC', name: 'Intel Corporation', price: 21.45 },
    { ticker: 'BTC-USD', name: 'Bitcoin USD', price: 43250.50 },
    { ticker: 'ETH-USD', name: 'Ethereum USD', price: 2280.75 },
    { ticker: 'DOGE-USD', name: 'Dogecoin USD', price: 0.08 },
    { ticker: 'SPY', name: 'S&P 500 ETF', price: 456.78 },
    { ticker: 'QQQ', name: 'Nasdaq 100 ETF', price: 389.12 },
  ];

  const filteredStocks = popularStocks.filter(stock =>
    stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStock = () => {
    if (selectedStock) {
      onAddStock(selectedStock);
      setSearchTerm('');
      setSelectedStock(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <div className="modal-icon">📈</div>
            <div>
              <h2>Add to Watchlist</h2>
              <p className="modal-subtitle">Search and select stocks to track</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="search-section">
            <label className="search-label">Search Stocks</label>
            <div className="search-box">
              <span className="search-icon-left">🔍</span>
              <input
                type="text"
                placeholder="Enter ticker symbol or company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <button 
                  className="clear-search" 
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="search-info">
              {filteredStocks.length} {filteredStocks.length === 1 ? 'stock' : 'stocks'} found
            </div>
          </div>

          <div className="stocks-list-container">
            <div className="stocks-list">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <div
                    key={stock.ticker}
                    className={`stock-item ${selectedStock?.ticker === stock.ticker ? 'selected' : ''}`}
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div className="stock-item-left">
                      <div className="stock-avatar">
                        {stock.ticker.includes('-USD') ? '₿' : stock.ticker.charAt(0)}
                      </div>
                      <div className="stock-info">
                        <span className="stock-ticker">{stock.ticker}</span>
                        <span className="stock-name">{stock.name}</span>
                      </div>
                    </div>
                    <div className="stock-item-right">
                      <span className="stock-price">${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      {selectedStock?.ticker === stock.ticker && (
                        <span className="selected-badge">✓</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <p className="no-results-title">No stocks found</p>
                  <p className="no-results-text">
                    Try searching for "{searchTerm}" with a different spelling or ticker symbol
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="selected-info">
            {selectedStock && (
              <span>
                <strong>{selectedStock.ticker}</strong> selected
              </span>
            )}
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button 
              className="btn-add" 
              onClick={handleAddStock}
              disabled={!selectedStock}
            >
              <span>➕</span>
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;
