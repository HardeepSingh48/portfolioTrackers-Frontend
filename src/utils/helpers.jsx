// utils/helpers.js
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);
  };
  
  export const formatPercentage = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  };
  
  export const calculateChange = (currentValue, previousValue) => {
    const change = currentValue - previousValue;
    const percentageChange = ((change / previousValue) * 100).toFixed(2);
    return {
      value: change,
      percentage: parseFloat(percentageChange)
    };
  };
  
  export const formatDatetime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };