// const API_BASE = "http://localhost:5089/api";
// const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "ERROR_NO_ENV";


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
  // Backend returns empty body
  return;
}
export async function saveSolution(questionId, solution) {
  const res = await fetch(
    `${API_BASE}/leetcode-questions/${questionId}/solution`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ solution })
    }
  );

  if (!res.ok) {
    throw new Error("Failed to save solution");
  }

  return await res.json(); // should return updated question with isSolved=true
}

export async function deleteSolution(questionId) {
  const res = await fetch(
    `${API_BASE}/leetcode-questions/${questionId}/solution`,
    {
      method: "DELETE",
      headers: getAuthHeaders()
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete solution");
  }

  return await res.json();
}

export async function registerStart(email, password) {
  const res = await fetch(`${API_BASE}/Auth/register-start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, passwordHash: password })
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(t);
  }
}

export async function verifyOtp(email, code) {
  const res = await fetch(`${API_BASE}/Auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code })
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(t);
  }
}



