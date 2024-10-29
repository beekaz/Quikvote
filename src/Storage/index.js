export function getStoredUser() {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('user', JSON.stringify(user));
}

// Save login token to local storage
export function setLoginToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

// Get login token from local storage
export function getLoginToken() {
  const storedToken = localStorage.getItem('token');
  return storedToken ? storedToken : null;
}

// STUB: remove login token to local storage
export function removeToken() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.clear();
  localStorage.clear();
}

export const clearStoredUser = () => {
  sessionStorage.removeItem('user');
};
