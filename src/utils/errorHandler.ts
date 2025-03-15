// src/utils/errorHandler.ts
import { message } from 'antd';
import { AxiosError } from 'axios';

export const handleApiError = (error: unknown, fallbackMessage = 'An error occurred') => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || error.message;
    message.error(errorMessage);
    return errorMessage;
  }
  
  if (error instanceof Error) {
    message.error(error.message);
    return error.message;
  }
  
  message.error(fallbackMessage);
  return fallbackMessage;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};