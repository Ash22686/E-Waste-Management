import axios from 'axios';

const API_BASE_URL = '/api'; // Or your backend API URL

export const listRequestsForSeller = async (token, sellerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/requests/seller/${sellerId}`, { // Adjust endpoint
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Assuming backend returns requests array
    } catch (error) {
        console.error("Error fetching seller requests:", error);
        throw error;
    }
};

export const updateRequestStatus = async (token, requestId, status) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/requests/${requestId}`, { status }, { // Adjust endpoint and request body
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Or success message
    } catch (error) {
        console.error("Error updating request status:", error);
        throw error;
    }
};