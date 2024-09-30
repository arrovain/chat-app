import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import api from '../api/axios';
import { getNickname, getOrCreateSessionId } from '../utils/sessionUtils';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const nickname = getNickname();
  const sessionId = getOrCreateSessionId();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('join', { nickname, sessionId });

    newSocket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on('user_joined', (data) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'system', content: `${data.nickname} odaya katıldı` }]);
    });

    newSocket.on('user_left', (data) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'system', content: `${data.nickname} odadan ayrıldı` }]);
    });

    fetchChatLogs();

    return () => newSocket.close();
  }, [nickname, sessionId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatLogs = async () => {
    try {
      const response = await api.get('/chat-logs');
      setMessages(response.data.map(log => ({ nickname: log.nickname, message: log.message })));
    } catch (error) {
      console.error('hata', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage && socket) {
      const messageObject = { nickname, sessionId, message: inputMessage };
      socket.emit('chat message', messageObject);
      setInputMessage('');

      try {
        await api.post('/save-message', messageObject);
      } catch (error) {
        console.error('hata', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-chat-bg flex flex-col">
      <div className="bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-chat-primary">Sohbet Odası</h2>
        <p className="text-chat-secondary">Kullanıcı Adınız {nickname}</p>
      </div>
      <div className="flex-grow overflow-hidden flex flex-col p-4">
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.type === 'system' ? 'bg-gray-200 text-chat-secondary italic' : 'bg-white shadow'}`}>
              {msg.type === 'system' ? (
                msg.content
              ) : (
                <>
                  <span className="font-bold text-chat-primary">{msg.nickname}: </span>
                  <span className="text-chat-secondary">{msg.message}</span>
                </>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Mesajınız..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chat-primary"
          />
          <button 
            type="submit"
            className="bg-chat-primary text-white py-2 px-4 rounded-md hover:bg-chat-secondary transition duration-300"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;