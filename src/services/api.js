// src/services/api.js

// Local development
//export const API_URL = "http://localhost:10000/api/auth";

// For deployment on Render:
 export const API_URL = "https://backend-073d.onrender.com/api/auth";

export async function post(url, body) {
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
