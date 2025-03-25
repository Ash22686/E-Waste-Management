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
  
  export interface BuyerRequest {
    id: string;
    productId: string;
    productName: string;
    status: 'pending' | 'accepted' | 'rejected';
    requestDate: string;
    responseDate: string | null;
    message?: string;
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: 'buyer' | 'seller';
  }