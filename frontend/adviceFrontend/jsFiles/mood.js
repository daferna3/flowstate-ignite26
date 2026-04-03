// ── api.js ─────────────────────────────────────────────────────────────────
// Central place for all backend calls.
// Change BASE_URL if your backend runs on a different port.

const BASE_URL = "http://localhost:3001/api";

const API = {
  /**
   * Get a calming tip for a given mood.
   * @param {string} mood - e.g. "anxious", "overwhelmed"
   * @param {string} [name] - optional user name for personalization
   * @returns {Promise<{tip: string, mood: string, source: string}>}
   */
  async getTip(mood, name = "") {
    const res = await fetch(`${BASE_URL}/advice/mood`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, name }),
    });
    if (!res.ok) throw new Error("Failed to fetch tip");
    return res.json();
  },

  /**
   * Send a chat message and get a reply.
   * @param {string} message
   * @param {Array}  history - previous [{role, content}] pairs
   * @param {string} [name]
   * @returns {Promise<{reply: string, history: Array}>}
   */
  async chat(message, history = [], name = "") {
    const res = await fetch(`${BASE_URL}/advice/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, name }),
    });
    if (!res.ok) throw new Error("Failed to get chat response");
    return res.json();
  },
};