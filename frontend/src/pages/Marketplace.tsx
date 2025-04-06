// src/pages/Marketplace.tsx (or wherever it resides)

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { MarketplaceListings } from "@/components/marketplace/MarketplaceListings";
// --- IMPORT THE UPDATED TYPE ---
import { Listing } from "@/components/marketplace/MarketplaceListings"; // Adjust path if needed
import { MarketplaceMobileFilters } from "@/components/marketplace/MarketplaceMobileFilters";
import { getAllListings } from "@/services/listingService";

// --- NO NEED for separate ListingData interface ---

export default function Marketplace() {
  // --- USE THE IMPORTED Listing TYPE ---
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]); // Adjust max range if needed
  const [selectedGrades, setSelectedGrades] = useState<Record<string, boolean>>({});
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        
        const response = await getAllListings();
        // Explicitly type the API response data if needed, or assume it matches Listing[]
        const allApiListings: Listing[] = response.data;
        

        // --- Filter out scrap items ---
        const activeListings = allApiListings.filter(
          (listing) => !listing.isScrapItem // Now isScrapItem exists on the Listing type
        );

        setListings(activeListings); // Store only non-scrap items
        setFilteredListings(activeListings); // Initialize filtered list
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setListings([]);
        setFilteredListings([]);
      }
    };

    fetchListings();
  }, []); // Runs once on mount

  const applyFilters = () => {
    // Start with the original list of non-scrap items
    let filtered = listings;

    // Filter by price range
    filtered = filtered.filter(listing => listing.price >= priceRange[0] && listing.price <= priceRange[1]);

    // Filter by selected grades
    const selectedGradeKeys = Object.keys(selectedGrades).filter(key => selectedGrades[key]);
    if (selectedGradeKeys.length > 0) {
      filtered = filtered.filter(listing => selectedGradeKeys.includes(listing.grade));
    }

    // Filter by selected categories
    const selectedCategoryKeys = Object.keys(selectedCategories).filter(key => selectedCategories[key]);
    if (selectedCategoryKeys.length > 0) {
      filtered = filtered.filter(listing => selectedCategoryKeys.includes(listing.category));
    }

    // No need to filter isScrapItem here again
    setFilteredListings(filtered);
  };

  // Re-apply filters whenever the base list or filter criteria change
  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedGrades, selectedCategories, listings]); // Include listings

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <MarketplaceHeader />

      <MarketplaceMobileFilters
        isMobileFilterOpen={isMobileFilterOpen}
        setIsMobileFilterOpen={setIsMobileFilterOpen}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <MarketplaceFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedGrades={selectedGrades}
            toggleGrade={(grade) => setSelectedGrades(prev => ({ ...prev, [grade]: !prev[grade] }))}
            selectedCategories={selectedCategories}
            toggleCategory={(category) => setSelectedCategories(prev => ({ ...prev, [category]: !prev[category] }))}
            isMobileFilterOpen={isMobileFilterOpen}
          />

          {/* --- Pass filteredListings which now correctly matches Listing[] type --- */}
          <MarketplaceListings listings={filteredListings} />
        </div>
      </div>
    </div>
  );
}