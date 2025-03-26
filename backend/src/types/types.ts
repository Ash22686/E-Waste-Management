// src/types/types.ts
export interface BuyerRequest {
    _id: string;
    buyer: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    seller: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    listing: {
      _id: string;
      title: string;
      description: string;
      price: number;
      image: string;
      category: string;
    };
    status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
    message?: string;
    createdAt: string;
    updatedAt: string;
  }