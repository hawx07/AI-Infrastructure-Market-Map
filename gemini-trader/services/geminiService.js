const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE");

async function analyzePortfolio(portfolio, marketData) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = createAnalysisPrompt(portfolio, marketData);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the response to ensure it's valid JSON
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Return a safe neutral response if AI fails
        return marketData.map(stock => ({
            ticker: stock.ticker,
            action: "HOLD",
            reason: "AI Analysis failed, defaulting to HOLD."
        }));
    }
}

function createAnalysisPrompt(portfolio, marketData) {
    return `
You are an expert AI financial analyst managing a high-growth semiconductor supply chain portfolio.
Your goal is to maximize returns by making daily BUY, SELL, or HOLD decisions.

Current Portfolio:
${JSON.stringify(portfolio, null, 2)}

Market Data (Today):
${JSON.stringify(marketData, null, 2)}

Task:
Analyze each stock in the market data.
For each stock, decide whether to:
- BUY: If the stock shows strong upward momentum or is undervalued.
- SELL: If the stock has peaked or shows signs of decline.
- HOLD: If the trend is uncertain or steady.

Provide your response strictly as a JSON array of objects with the following format:
[
  {
    "ticker": "STOCK_SYMBOL",
    "action": "BUY/SELL/HOLD",
    "quantity": 10, (Suggested quantity to trade, purely illustrative for now)
    "reason": "Brief explanation of your decision based on price movement and trends."
  }
]
Do not include any markdown formatting or extra text. Just the JSON.
`;
}

module.exports = { analyzePortfolio };
