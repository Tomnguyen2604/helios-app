import axios from 'axios';

export const askHelios = async (prompt) => {
  const res = await axios.post("http://localhost:8000/chat", { prompt });
  return res.data.reply;
};