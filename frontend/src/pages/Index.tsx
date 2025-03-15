import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { ListingCard } from "@/components/ListingCard";
import { GradientButton } from "@/components/GradientButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BadgeDollarSign, BarChart2, Clock, CreditCard, Laptop, Lock, Monitor, Phone, Recycle, RefreshCw, Shield, ShieldCheck, Smartphone, ThumbsUp, Upload } from "lucide-react";
import { fadeIn, fadeUp, slideInRight } from "@/utils/animations";
import { Link } from "react-router-dom";

// Sample featured listings
const featuredListings = [
  {
    id: "1",
    title: "Dell XPS 13 Laptop",
    description: "2020 model, working condition with minor screen scratches. Battery holds 85% capacity.",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000&auto=format&fit=crop",
    price: 450,
    grade: "A" as const,
    location: "San Francisco, CA",
    timeLeft: "2 days left"
  },
  {
    id: "2",
    title: "iPhone 11 Pro",
    description: "64GB storage, battery health at 89%. Minor scratches on the back.",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop",
    price: 320,
    grade: "B" as const,
    location: "Boston, MA",
    timeLeft: "1 day left"
  },
  {
    id: "3",
    title: "Samsung 4K Monitor",
    description: "28\" 4K UHD Monitor. Working perfectly, selling due to upgrade.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
    price: 220,
    grade: "A" as const,
    location: "Austin, TX",
    timeLeft: "3 days left"
  },
  {
    id: "4",
    title: "Gaming PC Components",
    description: "GTX 1080, 16GB RAM, Intel i7 processor. All parts tested and working.",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop",
    price: 550,
    grade: "B" as const,
    location: "Seattle, WA",
    timeLeft: "12 hours left"
  }
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${fadeUp()}`}>How It Works</h2>
            <p className={`text-xl text-gray-600 ${fadeUp(100)}`}>
              Join our sustainable e-waste ecosystem in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className={`relative ${fadeUp(200)}`}>
              <div className="bg-gradient-to-br from-eco-500 to-eco-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6">1</div>
              <div className="absolute top-6 left-12 hidden md:block w-full h-0.5 bg-gradient-to-r from-eco-500 to-transparent"></div>
              <h3 className="text-xl font-semibold mb-3">List Your E-Waste</h3>
              <p className="text-gray-600">
                Upload images of your unused electronics and answer a few questions about their condition. Our system will automatically grade and price your items.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className={`relative ${fadeUp(300)}`}>
              <div className="bg-gradient-to-br from-tech-500 to-tech-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6">2</div>
              <div className="absolute top-6 left-12 hidden md:block w-full h-0.5 bg-gradient-to-r from-tech-500 to-transparent"></div>
              <h3 className="text-xl font-semibold mb-3">Receive Requests</h3>
              <p className="text-gray-600">
                Interested buyers will submit purchase requests for your listings. Review and approve requests from verified buyers on our platform.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className={fadeUp(400)}>
              <div className="bg-gradient-to-br from-eco-500 to-tech-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3">Complete Transaction</h3>
              <p className="text-gray-600">
                Connect with approved buyers to arrange pickup or delivery. Our platform tracks successful transactions to build your eco-friendly reputation.
              </p>
            </div>
          </div>
          
          <div className={`mt-16 text-center ${fadeUp(500)}`}>
            <Link to="/auth/register">
              <GradientButton className="mx-auto">
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Listings Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${fadeUp()}`}>Featured Listings</h2>
              <p className={`text-xl text-gray-600 ${fadeUp(100)}`}>
                Discover quality-graded electronics ready for a second life
              </p>
            </div>
            <Link to="/marketplace" className={`mt-4 md:mt-0 ${fadeUp(200)}`}>
              <Button variant="ghost" className="group">
                View all listings 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing, index) => (
              <ListingCard 
                key={listing.id} 
                {...listing} 
                delay={(index + 1) * 100} 
              />
            ))}
          </div>
          
          <div className={`mt-12 text-center ${fadeUp(600)}`}>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-lg font-medium mb-4">
                Looking for a specific item? Browse our marketplace.
              </p>
              <Link to="/marketplace">
                <GradientButton className="mx-auto">
                  Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/3 right-0 translate-x-1/2 w-[30%] h-[30%] rounded-full bg-eco-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 -translate-x-1/2 w-[30%] h-[30%] rounded-full bg-tech-50 opacity-60 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${fadeUp()}`}>
              Packed With Features
            </h2>
            <p className={`text-xl text-gray-600 ${fadeUp(100)}`}>
              Everything you need to buy and sell e-waste responsibly
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={ShieldCheck} 
              title="Quality Grading" 
              description="Our AI-powered system assesses and grades items based on condition, age, and functionality."
              delay={100}
            />
            <FeatureCard 
              icon={CreditCard} 
              title="Secure Transactions" 
              description="Safe payment processing and verified user profiles for peace of mind."
              delay={200}
            />
            <FeatureCard 
              icon={BarChart2} 
              title="Market Analytics" 
              description="View regional e-waste trends and get price recommendations based on real market data."
              delay={300}
            />
            <FeatureCard 
              icon={Upload} 
              title="Easy Listing Process" 
              description="Simple uploading tools with image recognition to identify your electronics automatically."
              delay={400}
            />
            <FeatureCard 
              icon={Award} 
              title="Eco Rewards" 
              description="Earn points for successful transactions that can be redeemed for exclusive perks."
              delay={500}
            />
            <FeatureCard 
              icon={BadgeDollarSign} 
              title="Special Incentives" 
              description="Sellers receive benefits for high-quality listings, while buyers get discounts on new purchases."
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* Product Categories Section */}
      <section className="py-20 bg-gradient-to-br from-eco-50 to-tech-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${fadeUp()}`}>
              Browse by Category
            </h2>
            <p className={`text-xl text-gray-600 ${fadeUp(100)}`}>
              Find the perfect device for your needs or list your unwanted tech
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link to="/marketplace?category=laptops" className={`group ${fadeUp(200)}`}>
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-eco-200">
                <div className="w-16 h-16 bg-eco-100 text-eco-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-eco-600 group-hover:text-white">
                  <Laptop className="h-8 w-8" />
                </div>
                <h3 className="font-medium">Laptops & Computers</h3>
              </div>
            </Link>
            
            <Link to="/marketplace?category=smartphones" className={`group ${fadeUp(300)}`}>
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-eco-200">
                <div className="w-16 h-16 bg-tech-100 text-tech-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-tech-600 group-hover:text-white">
                  <Smartphone className="h-8 w-8" />
                </div>
                <h3 className="font-medium">Smartphones & Tablets</h3>
              </div>
            </Link>
            
            <Link to="/marketplace?category=monitors" className={`group ${fadeUp(400)}`}>
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-eco-200">
                <div className="w-16 h-16 bg-eco-100 text-eco-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-eco-600 group-hover:text-white">
                  <Monitor className="h-8 w-8" />
                </div>
                <h3 className="font-medium">Monitors & Displays</h3>
              </div>
            </Link>
            
            <Link to="/marketplace?category=parts" className={`group ${fadeUp(500)}`}>
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-eco-200">
                <div className="w-16 h-16 bg-tech-100 text-tech-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-tech-600 group-hover:text-white">
                  <RefreshCw className="h-8 w-8" />
                </div>
                <h3 className="font-medium">Components & Parts</h3>
              </div>
            </Link>
          </div>
          
          <div className={`mt-12 text-center ${fadeUp(600)}`}>
            <Link to="/marketplace">
              <Button variant="outline" className="mx-auto">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`mb-4 ${fadeUp()}`}>
                <span className="inline-block px-3 py-1 text-xs font-medium text-eco-800 bg-eco-100 rounded-full">
                  Environmental Impact
                </span>
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${fadeUp(100)}`}>
                Make a Difference With Every Transaction
              </h2>
              <p className={`text-lg text-gray-600 mb-8 ${fadeUp(200)}`}>
                When you buy or sell through ecoTech, you're contributing to a reduction in electronic waste 
                and the conservation of precious materials. Our impact tracker shows you exactly how your 
                actions are helping the planet.
              </p>
              
              <div className={`space-y-4 mb-8 ${fadeUp(300)}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-eco-100 text-eco-600 flex items-center justify-center mr-3 mt-0.5">
                    <ThumbsUp className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Reduced Resource Extraction</h3>
                    <p className="text-gray-600 text-sm">
                      Each reused device means fewer raw materials need to be mined and processed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-eco-100 text-eco-600 flex items-center justify-center mr-3 mt-0.5">
                    <ThumbsUp className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Energy Conservation</h3>
                    <p className="text-gray-600 text-sm">
                      Extending the life of electronics saves the significant energy required to produce new devices.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-eco-100 text-eco-600 flex items-center justify-center mr-3 mt-0.5">
                    <ThumbsUp className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Landfill Reduction</h3>
                    <p className="text-gray-600 text-sm">
                      Keeping electronics in circulation prevents them from ending up in landfills where they can leak harmful substances.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link to="/impact" className={fadeUp(400)}>
                <GradientButton>
                  View Our Impact Report
                </GradientButton>
              </Link>
            </div>
            
            <div className={`relative ${slideInRight()}`}>
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Environmental impact" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Our Community Impact</h3>
                  <p className="mb-4">Together we've saved:</p>
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold">15,230</p>
                      <p className="text-sm text-gray-300">Devices Reused</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1,250</p>
                      <p className="text-sm text-gray-300">Tons of CO₂</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$4.2M</p>
                      <p className="text-sm text-gray-300">User Savings</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 bottom-0 right-0 translate-x-8 translate-y-8 w-full h-full bg-eco-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-eco-500 to-tech-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${fadeUp()}`}>
            Ready to Join Our Movement?
          </h2>
          <p className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${fadeUp(100)}`}>
            Start buying or selling e-waste today and become part of the solution.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${fadeUp(200)}`}>
            <Link to="/auth/register">
              <Button size="lg" variant="outline" className="min-w-[180px] text-black border-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="min-w-[180px] text-black border-white hover:bg-white/10">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-eco-500 to-tech-500 p-2 rounded-lg mr-2">
                  <Recycle className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">ecoTech</span>
              </div>
              <p className="text-sm mb-4">
                A sustainable e-waste management platform connecting sellers and buyers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">For Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Buyers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Scrap Items</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recycling Facilities</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impact Report</a></li>
                <li><a href="#" className="hover:text-white transition-colors">E-Waste Education</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2023 ecoTech. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
              <span className="mx-3">|</span>
              <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}