import { User } from '@/types/types';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/services/authService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product, BuyerRequest } from '@/types/types';
import { ArrowLeft } from 'lucide-react';

// Dummy data
const dummyRequests: BuyerRequest[] = [
  {
    id: '1',
    productId: '1',
    productName: 'MacBook Pro 2019',
    status: 'pending',
    requestDate: '2024-03-15',
    responseDate: null,
  },
  {
    id: '2',
    productId: '2',
    productName: 'iPhone 12 Pro',
    status: 'accepted',
    requestDate: '2024-03-10',
    responseDate: '2024-03-12',
  },
  {
    id: '3',
    productId: '2',
    productName: 'Samsung Galaxy S21',
    status: 'rejected',
    requestDate: '2024-03-10',
    responseDate: '2024-03-12',
  },
];

const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 2019',
    description: '16GB RAM, 512GB SSD, Excellent condition',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop',
    category: 'Laptops',
    condition: 'used',
    seller: 'Tech Resellers',
    createdAt: '2024-03-10',
    requests: [],
  },
  {
    id: '2',
    name: 'iPhone 12 Pro',
    description: '64GB storage, battery health at 89%',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1603015269169-225cb700e29a?q=80&w=1000&auto=format&fit=crop',
    category: 'Mobile Phones',
    condition: 'used',
    seller: 'Mobile Hub',
    createdAt: '2024-03-10',
    requests: [],
  },
];

export default function BuyerDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<BuyerRequest[]>(dummyRequests);
  const navigate = useNavigate();

  // User authentication check
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      try {
        const userData = await getCurrentUser(token);
        setUser(userData.user);
      } catch (error) {
        navigate('/auth/login');
      }
    };

    loadUser();
  }, [navigate]);

  const handleCancelRequest = (requestId: string) => {
    setRequests(prevRequests => 
      prevRequests.filter(request => request.id !== requestId)
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-eco-500 to-tech-500 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Back Button */}
            <div className="absolute left-4 top-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <h1 className="text-4xl font-bold mb-4">Welcome, {user.firstName}!</h1>
            <p className="text-xl opacity-90 mb-8">
              Manage your product requests
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Your Requests Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Requests</h2>
          <div className="space-y-4">
            {requests.map((request) => {
              const product = dummyProducts.find(p => p.id === request.productId);
              return (
                <div key={request.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    {product && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-48 h-48 object-cover rounded-lg"
                      />
                    )}

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{request.productName}</h3>
                      {product && (
                        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {product && (
                          <>
                            <div>
                              <span className="font-medium">Price:</span> ₹{product.price}
                            </div>
                            <div>
                              <span className="font-medium">Seller:</span> {product.seller}
                            </div>
                          </>
                        )}
                        <div>
                          <span className="font-medium">Request Date:</span> {new Date(request.requestDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>
                          <Badge
                            variant={
                              request.status === 'pending'
                                ? 'secondary'
                                : request.status === 'accepted'
                                ? 'default'
                                : 'destructive'
                            }
                            className="ml-2"
                          >
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-center gap-2">
                      {request.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelRequest(request.id)}
                        >
                          Cancel Request
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}