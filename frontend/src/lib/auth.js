export const auth = {
  token(){ return localStorage.getItem('token'); },
  setToken(t){ localStorage.setItem('token', t); },
  clear(){ localStorage.removeItem('token'); },
};
