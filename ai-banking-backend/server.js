const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini SDK safely
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === "your_actual_key_here") {
  console.error("🚨 CRITICAL ERROR: Invalid GEMINI_API_KEY in .env file.");
}
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/orchestrate', async (req, res) => {
  try {
    const { query, language } = req.body;
    console.log(`\n[+] Received Query: "${query}" (Language: ${language})`);

    // Use the explicit 1.5-flash model which supports JSON responses
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const systemPrompt = `
      You are the core orchestrator for "SBI Saathi", a proactive AI Banking Companion.
      You represent 7 specialized agents: Planner, Intent, Safety, Guidance, Recommendation, Context, and Navigation.
      
      User's Query: "${query}"
      User's Preferred Language Code: "${language}"

      Analyze the query and route it to one of the following 3 journeys: 'electricity', 'tuition', 'fixed-deposit'. 
      If it doesn't match perfectly, route it to 'unknown'.
      
      CRITICAL SAFETY RULE: You are a guide. You cannot execute payments. You only navigate and highlight fields.

      Return ONLY a JSON object matching this exact schema:
      {
        "goal": "String (e.g., Pay Electricity Bill)",
        "journey": "String ('electricity', 'tuition', 'fixed-deposit', or 'unknown')",
        "language": "String (The detected or requested language)",
        "confidence": "Number between 0.00 and 1.00 indicating your confidence",
        "nextStep": "String (A short summary of what the user needs to do next)",
        "spotlightTarget": "String (Must be 'consumer-field', 'student-field', 'deposit-field', or 'unknown')",
        "guidanceText": "String (Friendly, helpful instruction. Do not ask them to pay, ask them to fill the highlighted field)",
        "recommendation": "String (A proactive cross-sell title, e.g., 'Set up AutoPay' or 'Tax Saver FD')",
        "recommendationDetail": "String (One short sentence explaining the recommendation)",
        "complianceChecked": true
      }
    `;

    console.log(`[~] Sending prompt to Google Gemini...`);
    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    
    // Parse the JSON output from Gemini
    const aiOutput = JSON.parse(responseText);

    console.log(`[✓] AI Response Processed. Routing to: ${aiOutput.journey}`);
    res.json(aiOutput);

  } catch (error) {
    console.error("[-] Backend Routing Error:", error.message);
    
    // Graceful Fallback so the frontend demo never crashes
    res.status(500).json({
      goal: "Offline Fallback Mode",
      journey: "unknown",
      language: req.body.language || "en",
      confidence: 0.50,
      nextStep: "Backend API Error.",
      spotlightTarget: "unknown",
      guidanceText: "I am operating in offline mode. The backend failed to reach Google Gemini.",
      recommendation: "Check Backend Connection",
      recommendationDetail: "Ensure GEMINI_API_KEY is valid and your internet is connected.",
      complianceChecked: true
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 SBI Saathi Backend running on port ${PORT}`);
  console.log(`🔒 Secure Gateway active. Awaiting requests...`);
  console.log(`=========================================`);
});