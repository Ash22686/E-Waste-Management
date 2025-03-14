import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { ListingCard } from "@/components/ListingCard";
import { fadeUp } from "@/utils/animations";
import { Recycle, Clock, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getScrapListings } from "@/services/listingService";

export default function Scrap() {
  const [scrapListings, setScrapListings] = useState([]);

  useEffect(() => {
    const fetchScrapListings = async () => {
      const data = await getScrapListings();
      setScrapListings(data.data.listings);
    };

    fetchScrapListings();
  }, []);

  return (
    <Container className="py-12">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
          <Recycle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Scrap Marketplace</h1>
        <p className="text-gray-600 text-center max-w-xl">
          Browse expired or lower-grade items available for metal recovery and recycling.
          These items are priced lower and are ideal for scrap recovery operations.
        </p>
      </div>

      <Alert className="mb-8 bg-orange-50 border-orange-200">
        <Info className="h-4 w-4 text-orange-600" />
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>
          Items listed in the scrap section are not suitable for direct reuse. They are intended for 
          material recovery, recycling, or parts harvesting. All sales are final.
        </AlertDescription>
      </Alert>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {scrapListings.map((listing, index) => (
          <ListingCard
            key={listing.id}
            {...listing}
            delay={(index % 4) * 100}
          />
        ))}
      </div>
    </Container>
  );
}