import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Settings, Plus } from 'lucide-react';

const STOCK_POOL = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'NVDA', 'TSLA', 'JPM', 'V', 'WMT',
  'DIS', 'NFLX', 'ADBE', 'PYPL', 'CRM'
];

const FINNHUB_API_KEY = 'ctsklmpr01qin3c00a30ctsklmpr01qin3c00a3g'; // Replace with your actual Finnhub API key

const DashboardCard = ({ title, value, change, icon: Icon }) => (
  <Card className="bg-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <div className={`text-xs flex items-center ${parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {parseFloat(change) >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {parseFloat(change) >= 0 ? '+' : ''}{change}%
        </div>
      )}
    </CardContent>
  </Card>
);

const Dashboard = ({onAddStock}) => {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const selectedStocks = STOCK_POOL.sort(() => 0.5 - Math.random()).slice(0, 5);

    const fetchStockPrices = async () => {
      try {
        const responses = await Promise.all(
          selectedStocks.map((symbol) =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
          )
        );

        const data = await Promise.all(responses.map((res) => res.json()));

        const stockData = data.map((stock, index) => ({
          symbol: selectedStocks[index],
          price: stock.c.toFixed(2), // Current price
          change: ((stock.c - stock.pc) / stock.pc * 100).toFixed(2), // Percentage change
          quantity: 1,
        }));

        setPortfolio(stockData);
        setTotalValue(stockData.reduce((acc, stock) => acc + parseFloat(stock.price) * stock.quantity, 0));
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const generatePerformanceData = () => {
      const data = [];
      for (let i = 0; i < 12; i++) {
        data.push({
          month: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
          value: Math.floor(Math.random() * 1000) + 2000,
        });
      }
      setPerformanceData(data);
    };

    fetchStockPrices();
    generatePerformanceData();

    const interval = setInterval(fetchStockPrices, 500000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-foreground">StockFolio</span>
            </div>
            <button
              onClick={onAddStock}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stock
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <DashboardCard
            title="Total Investment"
            value={`\u20B9${totalValue.toFixed(2)}`}
            icon={DollarSign}
          />
          <DashboardCard
            title="Portfolio Performance"
            value="13B"
            change="8.2"
            icon={Activity}
          />
          <DashboardCard
            title="Total Projects"
            value="154"
            icon={Settings}
          />
          <DashboardCard
            title="Active Investments"
            value="2.5M"
            icon={TrendingUp}
          />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                    fill="url(#colorGradient)"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground">Name</th>
                    <th className="text-right p-2 text-muted-foreground">Price</th>
                    <th className="text-right p-2 text-muted-foreground">Change</th>
                    <th className="text-right p-2 text-muted-foreground">Quantity</th>
                    <th className="text-right p-2 text-muted-foreground">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((stock) => (
                    <tr key={stock.symbol} className="border-b border-border">
                      <td className="p-2 font-medium">{stock.symbol}</td>
                      <td className="p-2 text-right">&#8377;{stock.price}</td>
                      <td
                        className={`p-2 text-right ${parseFloat(stock.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {parseFloat(stock.change) >= 0 ? '+' : ''}
                        {stock.change}%
                      </td>
                      <td className="p-2 text-right">{stock.quantity}</td>
                      <td className="p-2 text-right">
                      &#8377;{(parseFloat(stock.price) * stock.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
