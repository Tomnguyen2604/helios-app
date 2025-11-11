const PortfolioCard = ({ ticker, price, change }) => (
  <div className={`card ${change > 0 ? 'up' : 'down'}`}>
    <h2>{ticker}</h2>
    <p>${price.toFixed(2)}</p>
    <span>{change > 0 ? '📈' : '📉'} {change.toFixed(2)}%</span>
  </div>
);

export default PortfolioCard;