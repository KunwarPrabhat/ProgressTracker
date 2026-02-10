const API_BASE = "http://localhost:5089/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}


export async function login(email, password) {
  const res = await fetch(`${API_BASE}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, passwordHash : password })
  });

  if (!res.ok) {
    throw new Error("Invalid login");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}

export async function getQuestions() {
  const res = await fetch(`${API_BASE}/Questions`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    throw new Error("Unauthorized or failed to fetch");
  }

  return await res.json();
}

export async function createQuestion(question) {
  const res = await fetch(`${API_BASE}/Questions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(question)
  });

  if (!res.ok) {
    throw new Error("Failed to create question");
  }

  return await res.json();
}

export async function getLeetCodeSqlQuestions() {
  const res = await fetch(`${API_BASE}/leetcode-questions/sql`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    throw new Error("Failed to fetch LeetCode SQL questions");
  }

  return await res.json();
}

export async function register(email, password) {
  const res = await fetch(`${API_BASE}/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, passwordHash: password })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Register failed:", text);
    throw new Error(text || "Registration failed");
  }

  // ✅ Backend returns empty body
  return;
}


