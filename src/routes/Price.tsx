import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";
interface ChartProps {
  coinId: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  width: 490px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const ContentBox = styled.div`
  width: 240px;
  height: 100px;
  border-radius: 15px;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Percent = styled.p<{ isUp: boolean }>`
  font-size: 40px;
  color: ${(props) => (props.isUp ? "#0be881" : "#ff3434")};
`;
const TimeText = styled.span``;

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );
  const checkNumber = (num: number) => {
    if (num >= 0) return true;
    else return false;
  };
  return (
    <Container>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <ContentBox>
            <Percent isUp={checkNumber(data?.quotes.USD.percent_change_1h!)}>
              {data?.quotes.USD.percent_change_1h}%
            </Percent>
            <TimeText>than a hour ago</TimeText>
          </ContentBox>
          <ContentBox>
            <Percent isUp={checkNumber(data?.quotes.USD.percent_change_24h!)}>
              {data?.quotes.USD.percent_change_24h}%
            </Percent>
            <TimeText>than a day ago</TimeText>
          </ContentBox>
          <ContentBox>
            <Percent isUp={checkNumber(data?.quotes.USD.percent_change_6h!)}>
              {data?.quotes.USD.percent_change_6h}%
            </Percent>
            <TimeText>than 6 hours ago</TimeText>
          </ContentBox>
          <ContentBox>
            <Percent isUp={checkNumber(data?.quotes.USD.percent_change_7d!)}>
              {data?.quotes.USD.percent_change_7d}%
            </Percent>
            <TimeText>than a week ago</TimeText>
          </ContentBox>
          <ContentBox>
            <Percent isUp={checkNumber(data?.quotes.USD.percent_change_12h!)}>
              {data?.quotes.USD.percent_change_12h}%
            </Percent>
            <TimeText>than 12 hour ago</TimeText>
          </ContentBox>
          <ContentBox>
            <Percent isUp={checkNumber(data?.quotes.USD.percent_change_30d!)}>
              {data?.quotes.USD.percent_change_30d}%
            </Percent>
            <TimeText>than a month ago</TimeText>
          </ContentBox>
        </>
      )}
    </Container>
  );
}

export default Price;
