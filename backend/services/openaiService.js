import axios from "axios";

export const askAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",

        messages: [
          {
            role: "system",
            content:
              "You are a strict JSON generator. Always respond ONLY in valid JSON. No explanation. No markdown. No extra text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0,

        // 🔥 CRITICAL: forces structured output (if model supports it)
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",

          // optional but recommended for OpenRouter tracking
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "OpsMind AI",
        },
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    return content;
  } catch (error) {
    console.error("askAI Error:", error?.response?.data || error.message);

    // 🔥 fallback so system never crashes
    return JSON.stringify({
      error: "AI request failed",
      rootCause: "unknown",
      severity: "low",
    });
  }
};