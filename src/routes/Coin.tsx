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
const Coin = () => {
  const { coinId } = useParams<Params>(); // url에서 가져오는거
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  const { state } = useLocation<RouterState>(); // link로 보낸 데이터 가져오는거

  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      .then((res) => {
        setInfo(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      .then((res) => {
        setPriceInfo(res);
        console.log(res);
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
