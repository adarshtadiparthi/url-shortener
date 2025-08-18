const API_BASE = import.meta.env.VITE_API_BASE;

async function signup(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), 
  });
  return res.json();
}

async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function createLink(originalUrl, token) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ originalUrl }),
  });
  return res.json();
}

async function getLinks(token) {
  const res = await fetch(`${API_BASE}/api/links`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

async function getOriginalUrl(shortCode) {
  const res = await fetch(`${API_BASE}/${shortCode}`);
  return res.json();
}

export default {
  signup,
  login,
  getOriginalUrl, 
  createLink,
  getLinks,
};