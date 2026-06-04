export const formatCurrency = (value = 0, currency = '$') => {
  return `${currency}${Number(value || 0).toFixed(2)}`;
};
