import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
const CoinList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin: 20px;
  border-radius: 15px;
  width: 450px;
  a {
    display: flex;
    color: ${(props) => props.theme.bgColor};
    text-decoration: none;
    font-weight: 700;
    font-size: 1.3em;
    width: 100%;
    padding: 20px;
    flex-direction: row;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
      transition: 0.3s ease-in;
    }
  }
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
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.coinpaprika.com/v1/coins")
      .then((res) => {
        setCoins(res.data.slice(0, 100));
        // console.log(res.data.slice(0, 100));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.id} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
