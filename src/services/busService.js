import api from './api';

/**
 * Bus Service - Handle all bus-related API calls
 */

// Search buses by route and date
export const searchBuses = async (from, to, date) => {
  try {
    const response = await api.get('/buses/search', {
      params: { from, to, date }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching buses:', error);
    throw error;
  }
};

// Get bus details by ID
export const getBusById = async (busId) => {
  try {
    const response = await api.get(`/buses/${busId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bus details:', error);
    throw error;
  }
};

// Get all available routes
export const getAllRoutes = async () => {
  try {
    const response = await api.get('/buses/routes');
    return response.data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};

// Get available seats for a bus
export const getAvailableSeats = async (busId, date) => {
  try {
    const response = await api.get(`/buses/${busId}/seats`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available seats:', error);
    throw error;
  }
};

export default {
  searchBuses,
  getBusById,
  getAllRoutes,
  getAvailableSeats
};
