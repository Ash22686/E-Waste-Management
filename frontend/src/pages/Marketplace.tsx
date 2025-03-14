import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { MarketplaceListings } from "@/components/marketplace/MarketplaceListings";
import { MarketplaceMobileFilters } from "@/components/marketplace/MarketplaceMobileFilters";
import { getAllListings } from "@/services/listingService";

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedGrades, setSelectedGrades] = useState<Record<string, boolean>>({});
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      const data = await getAllListings();
      setListings(data.data.listings);
      setFilteredListings(data.data.listings);
    };

    fetchListings();
  }, []);

  const toggleGrade = (grade: string) => {
    setSelectedGrades(prev => ({ ...prev, [grade]: !prev[grade] }));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header with Search */}
      <MarketplaceHeader />
      
      {/* Mobile filters toggle */}
      <MarketplaceMobileFilters 
        isMobileFilterOpen={isMobileFilterOpen}
        setIsMobileFilterOpen={setIsMobileFilterOpen}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <MarketplaceFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedGrades={selectedGrades}
            toggleGrade={toggleGrade}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            isMobileFilterOpen={isMobileFilterOpen}
          />
          
          {/* Listings */}
          <MarketplaceListings listings={filteredListings} />
        </div>
      </div>
    </div>
  );
}