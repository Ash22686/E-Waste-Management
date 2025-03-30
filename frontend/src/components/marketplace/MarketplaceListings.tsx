import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { SortDesc } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";


interface Listing {
  _id: string;  // Changed from id to _id to match MongoDB
  title: string;
  description: string;
  image: string;
  price: number;
  grade: string;
  location: string;
  category: string;
  seller?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  timeLeft: string;
}

interface MarketplaceListingsProps {
  listings: Listing[];
}

export function MarketplaceListings({ listings = [] }: MarketplaceListingsProps) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRequestPurchase = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth/login");
        return;
      }

      if (!selectedListing) {
        throw new Error("No listing selected");
      }

      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          listingId: selectedListing._id  // Changed from id to _id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      alert("Request submitted successfully!");
      setIsRequestOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit request";
      alert(errorMessage);
      console.error("Request error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = (listingId: string) => {
    navigate(`/listings/${listingId}`);
  };

  return (
    <div className="lg:w-3/4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {listings.length} results</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Button variant="outline" size="sm" className="flex items-center">
            <SortDesc className="h-4 w-4 mr-2" />
            Newest
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, index) => (
          <ListingCard 
            key={listing._id} 
            {...listing} 
            id={listing._id}
            delay={(index + 1) * 100 % 600}
            onRequest={() => {
              setSelectedListing(listing);
              setIsRequestOpen(true);
            }}
            onViewDetails={() => handleViewDetails(listing._id)}
          />
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-eco-50 border-eco-200">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>

      <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase Request</DialogTitle>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedListing.image}
                  alt={selectedListing.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">{selectedListing.title}</h4>
                  <p className="text-gray-600">${selectedListing.price}</p>
                  <p className="text-sm text-gray-500">{selectedListing.category}</p>
                  {selectedListing.seller && (
                    <p className="text-sm text-gray-500">
                      Seller: {selectedListing.seller.firstName} {selectedListing.seller.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsRequestOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRequestPurchase}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Request"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}