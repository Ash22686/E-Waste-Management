import React, { useEffect, useState } from "react";
import { Recycle } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [currentPath, setCurrentPath] = useState("/");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");

  const navItems = [
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const user = localStorage.getItem("user");
      if (user && user !== "undefined") {
        try {
          const parsedUser = JSON.parse(user);
          setUserType(parsedUser.userType);
        } catch (error) {
          console.error("Failed to parse user JSON:", error);
        }
      }
    }
  }, []);

  const handleNavItemClick = (path) => {
    setCurrentPath(path);
    // Simulate navigation
    window.location.href = path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 
        backdrop-blur-lg 
        ${scrolled ? 'bg-white/70 shadow-sm py-3' : 'bg-transparent py-5'}
      `}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => handleNavItemClick("/")} 
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="bg-gradient-to-r from-eco-500 to-tech-500 p-2 rounded-lg">
              <Recycle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ecoTech</span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavItemClick(item.path)}
                onMouseEnter={() => setActiveNavItem(item.path)}
                onMouseLeave={() => setActiveNavItem(null)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg 
                  transition-all duration-300 ease-in-out
                  ${currentPath === item.path 
                    ? 'text-white bg-black' 
                    : activeNavItem === item.path
                    ? 'text-white bg-black scale-105'
                    : 'text-gray-600 hover:text-white hover:bg-black'}
                `}
              >
                {item.name}
              </button>
            ))}
            
            {isAuthenticated ? (
              <>
                {userType === "seller" && (
                  <button 
                    onClick={() => handleNavItemClick("/dashboard/seller")}
                    className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                  >
                    Dashboard
                  </button>
                )}
                {userType === "buyer" && (
                  <button 
                    onClick={() => handleNavItemClick("/dashboard/buyer")}
                    className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                  >
                    Dashboard
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleNavItemClick("/auth/login")}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                >
                  Log in
                </button>
                <button 
                  onClick={() => handleNavItemClick("/auth/register")}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-eco-500 to-tech-500 hover:opacity-90"
                >
                  Sign up
                </button>
              </>
            )}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`
                block w-6 h-0.5 bg-gray-800 
                transition-transform duration-300
                ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}
              `}
            />
            <span
              className={`
                block w-6 h-0.5 bg-gray-800 
                transition-opacity duration-300
                ${mobileMenuOpen ? 'opacity-0' : ''}
              `}
            />
            <span
              className={`
                block w-6 h-0.5 bg-gray-800 
                transition-transform duration-300
                ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}
              `}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden transition-all duration-300 overflow-hidden
            ${mobileMenuOpen ? 'max-h-96 pt-5' : 'max-h-0'}
          `}
        >
          <nav className="flex flex-col space-y-2 pb-5">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavItemClick(item.path)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg 
                  transition-colors text-left
                  ${currentPath === item.path 
                    ? 'text-white bg-black' 
                    : 'text-gray-600 hover:text-white hover:bg-black'}
                `}
              >
                {item.name}
              </button>
            ))}
            
            {isAuthenticated ? (
              <>
                {userType === "seller" && (
                  <button 
                    onClick={() => handleNavItemClick("/dashboard/seller")}
                    className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                  >
                    Dashboard
                  </button>
                )}
                {userType === "buyer" && (
                  <button 
                    onClick={() => handleNavItemClick("/dashboard/buyer")}
                    className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                  >
                    Dashboard
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleNavItemClick("/auth/login")}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-white hover:bg-black"
                >
                  Log in
                </button>
                <button 
                  onClick={() => handleNavItemClick("/auth/register")}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-eco-500 to-tech-500 hover:opacity-90"
                >
                  Sign up
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}