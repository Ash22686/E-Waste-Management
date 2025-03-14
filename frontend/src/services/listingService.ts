import axios from 'axios';

const API_URL = 'http://localhost:5000/api/listings';

export const getAllListings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getListingById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createListing = async (listingData: any, token: string) => {
  const response = await axios.post(API_URL, listingData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateListing = async (id: string, listingData: any, token: string) => {
  const response = await axios.put(`${API_URL}/${id}`, listingData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteListing = async (id: string, token: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSellerListings = async (token: string) => {
  const response = await axios.get(`${API_URL}/seller/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getScrapListings = async () => {
  const response = await axios.get(`${API_URL}/scrap`);
  return response.data;
};