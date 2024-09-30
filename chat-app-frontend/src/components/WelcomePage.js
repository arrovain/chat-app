import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { setNickname, getOrCreateSessionId } from '../utils/sessionUtils';

const WelcomePage = () => {
  const [nicknameInput, setNicknameInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const sessionId = getOrCreateSessionId();
      const response = await api.post('/join', { nickname: nicknameInput, sessionId });
      
      if (response.data && response.data.success) {
        setNickname(nicknameInput);
        navigate('/chat');
      } else {
        setError('hata, tekrar deneyin');
      }
    } catch (error) {
      console.error('hata, tekrar deneyin', error);
      setError('hata, tekrar deneyin');
    }
  };

  return (
    <div className="min-h-screen bg-chat-bg flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-chat-primary mb-6 text-center">Sohbete Hoşgeldiniz</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="text"
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.target.value)}
            placeholder="Kullanıcı Adınızı Girin"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chat-primary"
          />
          <button 
            type="submit"
            className="w-full bg-chat-primary text-white py-2 px-4 rounded-md hover:bg-chat-secondary transition duration-300"
          >
            Katıl
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomePage;