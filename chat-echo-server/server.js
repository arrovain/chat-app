const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('yeni kullanıcı bağlandı');

  socket.on('join', ({ nickname, sessionId }) => {
    socket.nickname = nickname;
    socket.sessionId = sessionId;
    connectedUsers.set(sessionId, { nickname, socketId: socket.id });
    io.emit('kullanıcı katıldı', { nickname, sessionId });
  });

  socket.on('chat message', async (msg) => {
    console.log('mesaj gönderildi:', msg);
    io.emit('chat message', msg);

    try {
      await axios.post('http://localhost:8000/api/save-message', {
        nickname: msg.nickname,
        message: msg.message
      });
    } catch (error) {
      console.error('hata', error);
    }
  });

  socket.on('disconnect', () => {
    if (socket.sessionId && connectedUsers.has(socket.sessionId)) {
      const user = connectedUsers.get(socket.sessionId);
      connectedUsers.delete(socket.sessionId);
      io.emit('kullancı ayrıldı', { nickname: user.nickname, sessionId: socket.sessionId });
    }
    console.log('Kullancı ayrıldı');
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));