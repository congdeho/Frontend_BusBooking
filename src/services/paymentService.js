import api from './api';

/**
 * Payment Service - Handle all payment-related API calls
 */

// Create payment request (VNPay)
export const createPaymentVNPay = async (bookingId, amount, returnUrl) => {
  try {
    const response = await api.post('/payments/vnpay/create', {
      bookingId,
      amount,
      returnUrl,
      locale: 'vn'
    });
    return response.data;
  } catch (error) {
    console.error('Error creating VNPay payment:', error);
    throw error;
  }
};

// Verify payment result from VNPay
export const verifyVNPayPayment = async (paymentParams) => {
  try {
    const response = await api.post('/payments/vnpay/verify', paymentParams);
    return response.data;
  } catch (error) {
    console.error('Error verifying VNPay payment:', error);
    throw error;
  }
};

// Get payment details
export const getPaymentDetails = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};

// Get payment history for a booking
export const getBookingPayments = async (bookingId) => {
  try {
    const response = await api.get(`/payments/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking payments:', error);
    throw error;
  }
};

// Refund payment
export const refundPayment = async (paymentId, reason) => {
  try {
    const response = await api.post(`/payments/${paymentId}/refund`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error refunding payment:', error);
    throw error;
  }
};

export default {
  createPaymentVNPay,
  verifyVNPayPayment,
  getPaymentDetails,
  getBookingPayments,
  refundPayment
};
