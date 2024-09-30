import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import ChatRoom from './components/ChatRoom';
import ChatLogViewer from './components/ChatLogViewer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-chat-bg">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/logs" element={<ChatLogViewer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

