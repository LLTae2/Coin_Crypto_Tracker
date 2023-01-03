import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          width={500}
          height={300}
          type="candlestick"
          options={{
            theme: {
              mode: isDark ? "light" : "dark",
            },
            chart: {
              type: "candlestick",
              background: "transparent",
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#0be881",
                  downward: "#ff3434",
                },
              },
            },
            // fill: {
            //   type: "gradient",
            //   gradient: {
            //     gradientToColors: ["#0be881"],
            //     stops: [0, 100],
            //   },
            // },
            // colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: new Date(
                      parseInt(price.time_close) * 1000
                    ).toISOString(),
                    y: [
                      Number(price.open).toFixed(2),
                      Number(price.high).toFixed(2),
                      Number(price.low).toFixed(2),
                      Number(price.close).toFixed(2),
                    ],
                  };
                }),
              },
            ] as any
          }
        />
      )}
    </div>
  );
}

export default Chart;
