import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { ListingCard } from "@/components/ListingCard";
import { fadeUp } from "@/utils/animations";
import { Recycle, Clock, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for Scrap listings
const SCRAP_LISTINGS = [
  {
    id: "scrap-1",
    title: "Old CPU Parts - For Metal Recovery",
    description: "Collection of outdated CPU components. Good for copper and gold recovery.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    price: 25.00,
    grade: "C" as const,
    location: "Denver, CO",
    timeLeft: "2 days"
  },
  {
    id: "scrap-2",
    title: "Mixed Electronic Waste Bundle",
    description: "Assorted electronic components including circuit boards and wiring. Ideal for metal reclamation.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1101&q=80",
    price: 15.50,
    grade: "C" as const,
    location: "Phoenix, AZ",
    timeLeft: "1 day"
  },
  {
    id: "scrap-3",
    title: "Broken Smartphones - Bulk Lot",
    description: "Collection of 20+ non-functional smartphones. Various models and conditions.",
    image: "https://images.unsplash.com/photo-1612815292258-f4354f7f5a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: 40.00,
    grade: "C" as const,
    location: "Chicago, IL",
    timeLeft: "3 days"
  },
  {
    id: "scrap-4",
    title: "Miscellaneous Computer Parts",
    description: "Various computer components including RAM, hard drives and motherboards in non-working condition.",
    image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: 30.00,
    grade: "C" as const,
    location: "Seattle, WA",
    timeLeft: "12 hours"
  }
];

export default function Scrap() {
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
        {SCRAP_LISTINGS.map((listing, index) => (
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