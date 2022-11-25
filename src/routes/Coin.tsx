import axios from "axios";
import { useEffect, useState } from "react";
import { Switch, useLocation, useParams, Route } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

interface Params {
  coinId: string;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  padding: 0px 20px;
`;
const Loading = styled.span`
  display: block;
  text-align: center;
  font-size: 30px;
`;
const Overview = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  width: 450px;
  text-align: center;
`;
const ContentBox = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

interface RouterState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

const Coin = () => {
  const { coinId } = useParams<Params>(); // url에서 가져오는거
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  const { state } = useLocation<RouterState>(); // link로 보낸 데이터 가져오는거

  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    axios
      .get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      .then((res) => {
        setInfo(res.data);
        console.log(info);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      .then((res) => {
        setPriceInfo(res.data);
        console.log(priceInfo);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <ContentBox>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price></Price>
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart></Chart>
            </Route>
          </Switch>
        </ContentBox>
      )}
    </Container>
  );
};

export default Coin;
