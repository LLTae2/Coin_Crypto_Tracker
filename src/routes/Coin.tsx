import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loading>loading...</Loading> : null}
    </Container>
  );
};

export default Coin;
