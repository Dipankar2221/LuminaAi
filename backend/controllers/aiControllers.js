const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateExplanation = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `
Explain "${topic}" in three levels:
- child
- student
- expert

Return ONLY valid JSON:
{
  "child": "...",
  "student": "...",
  "expert": "..."
}
`;

    const result = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    // ✅ Extract text safely
    let text = "";

    if (typeof result.text === "function") {
      text = result.text();
    } else if (result.response && typeof result.response.text === "function") {
      text = result.response.text();
    } else if (
      result.candidates &&
      result.candidates[0]?.content?.parts?.length > 0
    ) {
      text = result.candidates[0].content.parts
        .map(part => part.text || "")
        .join("");
    } else {
      throw new Error("Unable to extract text from Gemini response");
    }

    console.log("🔍 AI RAW:", text);

    // ✅ Clean JSON
    let cleanJson = text.replace(/```json|```/g, "").trim();

    const start = cleanJson.indexOf("{");
    const end = cleanJson.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      cleanJson = cleanJson.substring(start, end + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (err) {
      return res.status(500).json({
        error: "Invalid JSON from AI",
        raw: cleanJson,
      });
    }

    // ✅ RETURN DIRECT RESPONSE (NO DB)
    res.status(200).json(parsed);

  } catch (error) {
    console.error("❌ Internal Server Error:", error);

    res.status(500).json({
      error: "AI processing failed",
      details: error.message,
    });
  }
};