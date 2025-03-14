import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeUp } from "@/utils/animations";
import { cn } from "@/lib/utils";
import { Clock, Eye, MapPin, ShoppingBag } from "lucide-react";

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  grade: string;
  location: string;
  delay: number;
  timeLeft: string;
  className?: string;
}

export function ListingCard({ 
  id, 
  title, 
  description, 
  image, 
  price, 
  grade, 
  location, 
  delay,
  timeLeft,
  className 
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
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          <ShoppingBag className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}