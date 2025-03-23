import axios from 'axios';

const API_BASE_URL = '/api'; // Your backend API base URL

export const listProductsBySeller = async (token, sellerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`, { // Backend route is just /api/products to get all products
            headers: { Authorization: `Bearer ${token}` }
        });
        // Filter products on the client side as backend route doesn't filter by sellerId
        return response.data.filter(product => product.seller === sellerId);
    } catch (error) {
        console.error("Error fetching seller products:", error);
        throw error;
    }
};

export const createProductService = async (token: any, productData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' // Important for file uploads
            }
        });
        return response.data;
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
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};