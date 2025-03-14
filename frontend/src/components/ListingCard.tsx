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
  grade: "A" | "B" | "C";
  location: string;
  delay?: number;
  className?: string;
  timeLeft?: string;
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
  
  // Determine background color based on grade
  const gradeBg = {
    A: "bg-green-100 text-green-800",
    B: "bg-yellow-100 text-yellow-800",
    C: "bg-orange-100 text-orange-800"
  }[grade];
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border-gray-100 hover:border-gray-200",
        fadeUp(delay),
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
        />
        <Badge className={cn("absolute top-3 right-3", gradeBg)}>
          Grade {grade}
        </Badge>
        {timeLeft && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 backdrop-blur-md bg-black/40 text-white text-xs px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            <span>{timeLeft}</span>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
        <CardDescription className="flex items-center text-xs text-gray-500">
          <MapPin className="w-3 h-3 mr-1" /> {location}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 h-10">{description}</p>
        <p className="mt-3 text-lg font-semibold">${price.toFixed(2)}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" className="text-xs">
          <Eye className="w-3 h-3 mr-1" /> Details
        </Button>
        <Button size="sm" className="text-xs bg-eco-500 hover:bg-eco-600">
          <ShoppingBag className="w-3 h-3 mr-1" /> Request
        </Button>
      </CardFooter>
    </Card>
  );
}
