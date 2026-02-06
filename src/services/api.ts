const BASE_URL = "http://localhost:8000";

export async function chatWithAI(message: string) {
  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: "demo_user",
      message,
    }),
  });

  return res.json();
}
