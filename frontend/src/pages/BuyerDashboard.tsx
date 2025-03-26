import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/authService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BuyerRequest } from "@/types/types";
import { Navbar } from "@/components/Navbar";

export default function BuyerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      try {
        // Load user data
        const userData = await getCurrentUser(token);
        setUser(userData.user);

        // Load requests
        const response = await fetch('http://localhost:5000/api/requests/buyer', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setRequests(data.data);
      } catch (error) {
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, refreshKey]);


  const fetchRequests = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/requests/my-requests', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setRequests(data.data);
      } else {
        alert(data.message || "Failed to load requests");
      }
      
    } catch (error) {
      console.error("Fetch requests error:", error);
      alert("Failed to load requests. Please try again.");
    }
  };

  const handleCancelRequest = async (requestId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });
      
      const data = await response.json();
      if (data.success) {
        setRequests(prev => prev.map(req => 
          req._id === requestId ? { ...req, status: 'cancelled' } : req
        ));
        alert("Request cancelled successfully");
      }
    } catch (error) {
      alert("Failed to cancel request");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
          <Navbar />
     <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center bg-white p-4 rounded-lg shadow mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Requests</h2>
          
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No purchase requests found</p>
              <Button onClick={() => navigate('/marketplace')}>
                Browse Marketplace
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={request.listing.image}
                            alt={request.listing.title}
                            className="h-12 w-12 object-cover rounded-md"
                          />
                          <div className="ml-4">
                            <div className="font-medium">{request.listing.title}</div>
                            <div className="text-sm text-gray-500">{request.listing.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">₹{request.listing.price}</td>
                      <td className="px-6 py-4">
                        {request.listing.sellerId?.firstName} {request.listing.sellerId?.lastName}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          request.status === 'pending' ? 'secondary' :
                          request.status === 'accepted' ? 'default' :
                          'destructive'
                        }>
                          {request.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelRequest(request._id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}