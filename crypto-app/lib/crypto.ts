
interface Data {
    price_change_percentage_24h: PriceChange;
}

interface PriceChange {
    usd: number;
}

interface Crypto {
    item: {
        id: string;
        symbol: string;
        name: string;
        small: string;
        market_cap_rank: number;
        price_btc: number;
        score: number;
        data: Data;
    };
}

export default Crypto;