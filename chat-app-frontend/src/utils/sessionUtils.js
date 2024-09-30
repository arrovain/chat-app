export const generateSessionId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const getOrCreateSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const setNickname = (nickname) => {
  sessionStorage.setItem('nickname', nickname);
};

export const getNickname = () => {
  return sessionStorage.getItem('nickname');
};