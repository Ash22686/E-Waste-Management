import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { SortDesc } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  grade: "A" | "B" | "C";
  location: string;
}

interface MarketplaceListingsProps {
  listings: Listing[];
}

export function MarketplaceListings({ listings }: MarketplaceListingsProps) {
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
            key={listing.id} 
            {...listing} 
            delay={(index + 1) * 100 % 600}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-eco-50 border-eco-200">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
