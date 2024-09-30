import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ChatLogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/chat-logs');
        setLogs(response.data);
      } catch (error) {
        console.error('hata, tekrar deneyin', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Chat Logları</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatLogViewer;