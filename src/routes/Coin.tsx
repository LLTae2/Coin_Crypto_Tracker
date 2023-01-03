import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Switch,
  useLocation,
  useParams,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import { AiFillHome } from "react-icons/ai";
import { isDarkAtom } from "../atom";
import { useRecoilValue } from "recoil";
import ToggleMode from "../ToggleMode";

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
  /* position: relative; */
`;
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
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
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
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
  color: ${(props) => props.theme.textColor};
`;
const ContentBox = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: ${(props) => props.theme.bgColor};
`;
const Tabs = styled.div`
  width: 490px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 240px;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: ${(props) => props.theme.textColor};
  padding: 7px 0px;
  border-radius: 10px;

  a {
    display: block;
    text-decoration: none;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.bgColor};
  }
`;
const HomeIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.textColor};
  position: absolute;
  top: 15%;
  left: 3%;
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
  const isDark = useRecoilValue(isDarkAtom);
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { coinId } = useParams<Params>(); // url에서 가져오는거
  // const location = useLocation();
  const { state } = useLocation<RouterState>(); // link로 보낸 데이터 가져오는거

  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // const [loading, setLoading] = useState(true);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  // useEffect(() => {
  //   axios
  //     .get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     .then((res) => {
  //       setInfo(res.data);
  //       console.log(info);
  //     })
  //     .catch((err) => console.log(err));
  //   axios
  //     .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     .then((res) => {
  //       setPriceInfo(res.data);
  //       console.log(priceInfo);
  //     })
  //     .catch((err) => console.log(err));
  //   setLoading(false);
  // }, []);
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <ToggleMode></ToggleMode>
        <HomeIcon>
          <Link to={"/"}>
            <AiFillHome color={isDark ? "black" : "white"} size={30} />
          </Link>
        </HomeIcon>
        <Title>
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <ContentBox>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch != null}>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
            <Tab isActive={chartMatch != null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId}></Chart>
            </Route>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId}></Price>
            </Route>
          </Switch>
        </ContentBox>
      )}
    </Container>
  );
};

export default Coin;
