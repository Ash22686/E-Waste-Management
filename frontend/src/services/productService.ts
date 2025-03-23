import axios from 'axios';

const API_BASE_URL = '/api'; // Or your backend API URL

export const listProductsBySeller = async (token, sellerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/seller/${sellerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Assuming backend returns product array
    } catch (error) {
        console.error("Error fetching seller products:", error);
        throw error;
    }
};

export const createProduct = async (token, productData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, productData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } // Adjust Content-Type based on image handling
        });
        return response.data; // Assuming backend returns the created product
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const deleteProductService = async (token, productId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Or success message
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// ... (add editProduct if needed)