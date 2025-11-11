import { useEffect, useState } from 'react';
import axios from 'axios';

const useStockData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/trend").then(res => {
      setData(res.data.trend);
    });
  }, []);

  return data;
};

export default useStockData;