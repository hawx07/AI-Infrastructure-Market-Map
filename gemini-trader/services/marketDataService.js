const axios = require('axios');

const stockCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Yahoo Finance API proxy logic
async function fetchStockData(ticker) {
    const cacheKey = `${ticker}`;
    const cached = stockCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        // Using Yahoo Finance v8 API via allorigins proxy to avoid CORS/Headers issues if running from browser-like context, 
        // but since this is node, we can try direct first, or use a reliable public proxy if direct fails due to scraping protections.
        // For Node.js, we often need to set User-Agent to look like a browser.

        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=5d`;

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const data = response.data;

        if (!data || !data.chart || !data.chart.result || data.chart.result.length === 0) {
            throw new Error('No stock data found from Yahoo Finance');
        }

        const result = parseYahooData(data, ticker);

        stockCache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        });

        return result;
    } catch (error) {
        console.warn(`Failed to fetch data for ${ticker}:`, error.message);
        // Fallback for development/demo purposes if API fails
        return getFallbackData(ticker);
    }
}

function parseYahooData(data, ticker) {
    try {
        const result = data.chart.result[0];
        const meta = result.meta;
        const quote = result.indicators.quote[0];

        // Get latest valid price
        let currentPrice = meta.regularMarketPrice;
        if (!currentPrice && quote.close) {
            const validCloses = quote.close.filter(c => c !== null);
            currentPrice = validCloses[validCloses.length - 1];
        }

        const previousClose = meta.chartPreviousClose || meta.previousClose;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;

        // Get history for the chart (last 5 days)
        const history = result.timestamp.map((time, i) => ({
            time: time * 1000,
            price: quote.close[i]
        })).filter(h => h.price !== null);

        return {
            ticker,
            price: currentPrice,
            change: change,
            changePercent: changePercent,
            currency: meta.currency || 'USD',
            history: history // Added history for the chart
        };
    } catch (e) {
        console.error('Error parsing data:', e);
        return getFallbackData(ticker);
    }
}

function getFallbackData(ticker) {
    // Generate pseudo-random but consistent data
    const hash = ticker.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
    const basePrice = Math.abs(hash % 500) + 50;
    const change = (hash % 20) - 10;

    // Generate fake history
    const history = [];
    const now = Date.now();
    for (let i = 0; i < 30; i++) {
        history.push({
            time: now - (30 - i) * 3600000, // hourly points
            price: basePrice + (Math.sin(i) * 5)
        });
    }

    return {
        ticker,
        price: basePrice,
        change: change,
        changePercent: (change / basePrice) * 100,
        currency: 'USD',
        history: history,
        isFallback: true
    };
}

module.exports = { fetchStockData };
