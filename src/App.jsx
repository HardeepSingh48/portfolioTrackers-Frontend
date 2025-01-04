// App.js
import React, { useState } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import StockForm from './components/stockForm/StockForm';
import StockList from './components/stockList/StockList';
import { ToastProvider, ToastViewport } from './components/ui/toast';

const App = () => {
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [editingStock, setEditingStock] = useState(null);

  const handleStockSubmit = () => {
    setIsAddingStock(false);
    setEditingStock(null);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Dashboard onAddStock={() => setIsAddingStock(true)} />
          
          {(isAddingStock || editingStock) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <StockForm
                stock={editingStock}
                onSubmit={handleStockSubmit}
                onCancel={() => {
                  setIsAddingStock(false);
                  setEditingStock(null);
                }}
              />
            </div>
          )}

          <StockList
            onEditStock={setEditingStock}
          />
        </div>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default App;