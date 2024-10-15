// hooks/useQuantity.js
import { useCallback } from 'react';

export const useQuantity = (updateQuantity) => {
  const handleQuantityChange = useCallback((index, newQuantity) => {
    updateQuantity(index, newQuantity);
  }, [updateQuantity]);

  const validateQuantityChange = useCallback((index, newQuantity) => {
    if (newQuantity < 1) return; // Prevents quantity from being less than 1
    handleQuantityChange(index, newQuantity);
  }, [handleQuantityChange]);

  return { handleQuantityChange, validateQuantityChange };
};
