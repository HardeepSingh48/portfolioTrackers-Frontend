import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import api from '../../services/api';

const StockForm = ({ stock, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ticker: stock?.ticker || '',
    quantity: stock?.quantity || 1,
    purchasePrice: stock?.purchasePrice || '',
  });

  useEffect(() => {
    setFormData({
      ticker: stock?.ticker || '',
      quantity: stock?.quantity || 1,
      purchasePrice: stock?.purchasePrice || '',
    });
  }, [stock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (stock?.id) {
        // Update stock
        await api.updateStock(stock.id, formData);
        toast({
          title: "Stock Updated",
          description: "Stock has been successfully updated.",
        });
      } else {
        // Add new stock
        await api.addStock(formData);
        toast({
          title: "Stock Added",
          description: "New stock has been successfully added to your portfolio.",
        });
      }
      onSubmit(); // Notify parent component to refresh the stock list
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{stock ? 'Edit Stock' : 'Add New Stock'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ticker Symbol</label>
            <Input
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              placeholder="e.g., AAPL"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <Input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Purchase Price</label>
            <Input
              name="purchasePrice"
              type="number"
              step="0.01"
              value={formData.purchasePrice}
              onChange={handleChange}
              placeholder="Enter purchase price"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {stock ? 'Update Stock' : 'Add Stock'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel} // Call the onCancel prop to notify parent
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StockForm;
