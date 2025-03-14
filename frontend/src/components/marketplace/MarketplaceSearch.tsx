
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/GradientButton";
import { Search } from "lucide-react";

export function MarketplaceSearch() {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input 
        type="text" 
        placeholder="Search for electronics..." 
        className="w-full py-6 pl-12 pr-4 rounded-lg bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 focus-visible:ring-eco-300"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <GradientButton className="rounded-md">Search</GradientButton>
      </div>
    </div>
  );
}
