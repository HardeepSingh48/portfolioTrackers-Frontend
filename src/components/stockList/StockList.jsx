import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import api from '../../services/api';
import { formatCurrency, formatPercentage } from '../../utils/helpers';

const StockList = ({ onEditStock }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStocks = async () => {
    try {
      const data = await api.getAllStocks();
      setStocks(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch stocks data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteStock(id);
      toast({
        title: "Stock Deleted",
        description: "Stock has been removed from your portfolio."
      });
      fetchStocks();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete stock.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Your Holdings</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchStocks}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-4">Symbol</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4 text-right">Current Price</th>
                <th className="pb-4 text-right">Market Value</th>
                {/* <th className="pb-4 text-right">Gain/Loss</th> */}
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} className="border-b">
                  <td className="py-4 font-medium">{stock.ticker}</td>
                  <td className="py-4">{stock.quantity}</td>
                  <td className="py-4 text-right">
                    {formatCurrency(stock.currentPrice)}
                  </td>
                  <td className="py-4 text-right">
                    {formatCurrency(stock.currentPrice * stock.quantity)}
                  </td>
                  {/* <td className={`py-4 text-right ${
                    stock.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(stock.gainLoss)}
                  </td> */}
                  <td className="py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditStock(stock)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(stock.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockList;