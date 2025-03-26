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
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
      {/* Header Section */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="mr-4 text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold text-gray-800">
                Buyer Dashboard - Welcome, {user.firstName}!
              </h1>
            </div>
            {/* Add additional buttons here if SellerDashboard has them */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => {
                  const product = dummyProducts.find((p) => p.id === request.productId);
                  return (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product && (
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={product.image}
                              alt={product.name}
                            />
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {request.productName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product ? `₹${product.price}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product ? product.seller : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={
                            request.status === 'pending'
                              ? 'secondary'
                              : request.status === 'accepted'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {request.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelRequest(request.id)}
                            className="mr-2 hover:bg-gray-100"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:bg-gray-100"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}