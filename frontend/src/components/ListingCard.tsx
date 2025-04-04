import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeUp } from "@/utils/animations";
import { cn } from "@/lib/utils";
import { Clock, MapPin, ShoppingBag, Eye } from "lucide-react";

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  grade: string;
  location: string;
  category: string;
  isScrapItem: boolean; 
  seller?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  timeLeft: string;
  delay: number;
  className?: string;
  onRequest?: () => void;
  onViewDetails?: () => void;
}

export function ListingCard({ 
  id, 
  title, 
  description, 
  image, 
  price, 
  grade, 
  location, 
  category,
  seller,
  timeLeft,
  isScrapItem,
  delay,
  className,
  onRequest,
  onViewDetails
}: ListingCardProps) {
  return (
    <Card className={cn("shadow-md", className, fadeUp(delay))}>
      <CardHeader className="p-0">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-md" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-2">{description}</CardDescription>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-xs">{grade}</Badge>
          <span className="text-lg font-bold">${price}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Clock className="w-4 h-4 mr-1" />
          {timeLeft}
        </div>
        {seller && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>Seller: {seller.firstName} {seller.lastName}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button 
          className="w-full"
          onClick={onRequest}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Request Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}