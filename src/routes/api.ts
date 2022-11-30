const baseUrl = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  return fetch(`${baseUrl}/coins`).then((res) => res.json());
}
export async function fetchCoinInfo(coinId?: string) {
  return fetch(`${baseUrl}/coins/${coinId}`).then((res) => res.json());
}
export async function fetchCoinTickers(coinId?: string) {
  return fetch(`${baseUrl}/tickers/${coinId}`).then((res) => res.json());
}
