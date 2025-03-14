import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/GradientButton";
import { Recycle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  path: string;
}

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Scrap", path: "/scrap" },
    { name: "Recycling", path: "/recycling" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg",
        scrolled ? "bg-white/70 shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-eco-500 to-tech-500 p-2 rounded-lg">
              <Recycle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ecoTech</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  location.pathname === item.path 
                    ? "text-eco-700 bg-eco-50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/auth/register">
              <GradientButton size="sm">Sign up</GradientButton>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5"
            aria-label="Toggle menu"
          >
            <span className={cn(
              "block w-6 h-0.5 bg-gray-800 transition-transform duration-300",
              mobileMenuOpen && "translate-y-2 rotate-45"
            )} />
            <span className={cn(
              "block w-6 h-0.5 bg-gray-800 transition-opacity duration-300",
              mobileMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "block w-6 h-0.5 bg-gray-800 transition-transform duration-300",
              mobileMenuOpen && "-translate-y-2 -rotate-45"
            )} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-96 pt-5" : "max-h-0"
        )}>
          <nav className="flex flex-col space-y-2 pb-5">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "text-eco-700 bg-eco-50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
              <Link to="/auth/login">
                <Button variant="ghost" className="w-full justify-start">Log in</Button>
              </Link>
              <Link to="/auth/register">
                <GradientButton className="w-full justify-center">Sign up</GradientButton>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
