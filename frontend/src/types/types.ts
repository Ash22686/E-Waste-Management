export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    condition: 'new' | 'used';
    seller: string;
    createdAt: string;
    requests: Request[];
  }
  
  // src/types/types.ts
  export interface BuyerRequest {
    _id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    listing: {
      _id: string;
      title: string;
      price: number;
      image: string;
      category: string;
      timeLeft: string; // Add this
      sellerId: {
        _id: string;
        firstName: string;
        lastName: string;
      };
    };
  }

  export interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    grade: string;
    location: string;
    sellerId: string;
    timeLeft: string;
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: 'buyer' | 'seller';
  }