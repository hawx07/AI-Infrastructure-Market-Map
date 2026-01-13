// Stock API - Yahoo Finance Integration
// Fetches live stock data with caching

const stockCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Yahoo Finance API proxy (using a CORS-friendly approach)
async function fetchStockData(ticker, exchange) {
    const cacheKey = `${ticker}-${exchange}`;
    const cached = stockCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    // Map exchange to Yahoo Finance suffix
    const yahooTicker = getYahooTicker(ticker, exchange);

    try {
        // Using Yahoo Finance v8 API
        const response = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${yahooTicker}?interval=1d&range=5d`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch stock data');
        }

        const data = await response.json();
        const result = parseYahooData(data, ticker, exchange);

        stockCache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        });

        return result;
    } catch (error) {
        console.warn(`Failed to fetch data for ${ticker}:`, error);
        return getFallbackData(ticker, exchange);
    }
}

function getYahooTicker(ticker, exchange) {
    const exchangeSuffixes = {
        'NYSE': '',
        'NASDAQ': '',
        'KRX': '.KS',
        'TSE': '.T',
        'EURONEXT': '.AS',
        'SIX': '.SW',
        'STO': '.ST',
        'XETRA': '.DE',
        'EPA': '.PA',
        'TWSE': '.TW',
        'VIE': '.VI',
        'HKEX': '.HK',
        'SSE': '.SS',
        'BIT': '.MI'
    };

    const suffix = exchangeSuffixes[exchange] || '';
    return ticker + suffix;
}

function parseYahooData(data, ticker, exchange) {
    try {
        const result = data.chart.result[0];
        const meta = result.meta;
        const quote = result.indicators.quote[0];

        const currentPrice = meta.regularMarketPrice || quote.close[quote.close.length - 1];
        const previousClose = meta.previousClose || quote.close[quote.close.length - 2];
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;

        return {
            ticker,
            exchange,
            price: currentPrice,
            change: change,
            changePercent: changePercent,
            currency: meta.currency || 'USD',
            marketCap: meta.marketCap || null,
            volume: meta.regularMarketVolume || null,
            high52Week: meta.fiftyTwoWeekHigh || null,
            low52Week: meta.fiftyTwoWeekLow || null,
            isLive: true
        };
    } catch (e) {
        return getFallbackData(ticker, exchange);
    }
}

function getFallbackData(ticker, exchange) {
    // Generate pseudo-random but consistent data based on ticker
    const hash = ticker.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
    const basePrice = Math.abs(hash % 500) + 50;
    const change = (hash % 20) - 10;

    return {
        ticker,
        exchange,
        price: basePrice,
        change: change,
        changePercent: (change / basePrice) * 100,
        currency: getCurrencyForExchange(exchange),
        marketCap: null,
        volume: null,
        high52Week: null,
        low52Week: null,
        isLive: false
    };
}

function getCurrencyForExchange(exchange) {
    const currencies = {
        'NYSE': 'USD',
        'NASDAQ': 'USD',
        'KRX': 'KRW',
        'TSE': 'JPY',
        'EURONEXT': 'EUR',
        'SIX': 'CHF',
        'STO': 'SEK',
        'XETRA': 'EUR',
        'EPA': 'EUR',
        'TWSE': 'TWD',
        'VIE': 'EUR',
        'HKEX': 'HKD',
        'SSE': 'CNY',
        'BIT': 'EUR'
    };
    return currencies[exchange] || 'USD';
}

function formatPrice(price, currency) {
    const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'KRW': '₩',
        'CHF': 'CHF ',
        'SEK': 'kr ',
        'TWD': 'NT$',
        'HKD': 'HK$',
        'CNY': '¥'
    };

    const symbol = symbols[currency] || currency + ' ';
    const decimals = ['JPY', 'KRW'].includes(currency) ? 0 : 2;

    return symbol + price.toFixed(decimals);
}

function formatMarketCap(marketCap) {
    if (!marketCap) return 'N/A';

    if (marketCap >= 1e12) {
        return '$' + (marketCap / 1e12).toFixed(2) + 'T';
    } else if (marketCap >= 1e9) {
        return '$' + (marketCap / 1e9).toFixed(2) + 'B';
    } else if (marketCap >= 1e6) {
        return '$' + (marketCap / 1e6).toFixed(2) + 'M';
    }
    return '$' + marketCap.toLocaleString();
}

function formatChange(change, changePercent) {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
}
