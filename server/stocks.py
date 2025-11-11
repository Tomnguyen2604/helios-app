import yfinance as yf

def get_trend(tickers):
    result = []
    for ticker in tickers:
        data = yf.Ticker(ticker).history(period="5d")
        if data.empty:
            result.append(f"{ticker}: No data available")
            continue
        avg_change = ((data["Close"] - data["Open"]) / data["Open"]).mean()
        if avg_change > 0.02:
            result.append(f"{ticker}: Buy signal 📈")
        elif avg_change < -0.02:
            result.append(f"{ticker}: Sell signal 📉")
        else:
            result.append(f"{ticker}: Hold")
    return result