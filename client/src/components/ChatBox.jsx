import { useState } from 'react';

const ChatBox = ({ onSend }) => {
  const [input, setInput] = useState('');
  return (
    <div className="chatbox">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask Helios anything..."
      />
      <button onClick={() => onSend(input)}>Send</button>
    </div>
  );
};

export default ChatBox;