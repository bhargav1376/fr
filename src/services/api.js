// src/services/api.js
//export const API_URL = "http://localhost:10000/api/auth";
export const API_URL = "https://backend-jv5v.onrender.com/api/auth";
export async function post(url, body) {
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");

  return data;
}
