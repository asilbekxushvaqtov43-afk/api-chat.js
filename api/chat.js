const SYS = "Sen Asilbek Xushvaqtovning kontent bo'yicha AI yordamchisisan. Asilbek talaba, sun'iy intellekt bo'yicha tajribasi bor kontent-meykerdir, Telegram va Instagram uchun kontent yaratadi. Qoidalar: o'zbek tilida, oddiy va qisqa javob ber. Foydalanuvchining g'oyasini bittadan savol bilan aniqlashtir (auditoriya, mavzu, format). Keyin g'oyani rivojlantir: Instagram uchun Reels ssenariysi, karusel rejasi, caption va hashtag; Telegram uchun post matni va qiziqarli kirish jumlasi. Bir vaqtda faqat bitta savol ber. Bilmagan narsangni o'ylab topma.";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST kerak" });

  let messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  messages = messages
    .slice(-10)
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  if (!messages.length || messages[0].role !== "user" || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Xabar noto'g'ri" });
  }

  const model = process.env.GEMINI_MODEL;
  try {
    const r = await fetch(
     idalar: o'zbek tilida, oddiy va qisqa javob ber. Foydalanuvchining g'oyasini bittada
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYS }] },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 800 },
        }),
      }
    );
    const data = await r.json();
    if (!r.ok) return res.status(502).json({ error: "AI xatosi" });
    const text = (data.candidates?.[0]?.content?.partsstatus(405).json({ error: "PO"").join("");
    return res.status(200).json({ text: text || "Javob olinmadi, qayta yozing." });
  } catch (e) {
    return res.status(500).json({ error: "Server xatosi" });
  }
}
