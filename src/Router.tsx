import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  toggleTheme: () => void;
}

function Router({ toggleTheme }: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins toggleTheme={toggleTheme} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
