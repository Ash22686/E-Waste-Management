import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/authService";
import { Navbar } from "@/components/Navbar"; // Import Navbar

export default function SellerDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth/login");
        return;
      }

      try {
        const data = await getCurrentUser(token);
        setUser(data.user);
      } catch (error) {
        console.error(error);
        navigate("/auth/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar /> {/* Add Navbar */}
      <div className="pt-16"> {/* Add padding to the top */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
          <p>Welcome, {user.firstName} {user.lastName}!</p>
          {/* Add seller-specific content here */}
        </div>
      </div>
    </div>
  );
}