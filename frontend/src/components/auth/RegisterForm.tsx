import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/GradientButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Laptop, ShoppingBag } from "lucide-react";
import { fadeUp } from "@/utils/animations";
import { register } from "@/services/authService";

export function RegisterForm() {
  const [userType, setUserType] = useState<"seller" | "buyer">("seller");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    coordinates: { lat: 0, lng: 0 },
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register({ ...formData, userType });
      localStorage.setItem('token', data.token);
      navigate('/marketplace');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  };

  return (
    <Card className={`border-gray-200 shadow-sm ${fadeUp(100)}`}>
      <CardContent className="pt-6">
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <Label className="mb-2 block">I want to:</Label>
            <RadioGroup 
              value={userType} 
              onValueChange={(v) => setUserType(v as "seller" | "buyer")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="seller" id="seller" />
                <Label htmlFor="seller" className="flex items-center cursor-pointer">
                  <div className="p-2 bg-eco-100 text-eco-800 rounded-full mr-3">
                    <Laptop className="h-5 w-5" />
                  </div>
                  Seller
                </Label>
              </div>
              <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="buyer" id="buyer" />
                <Label htmlFor="buyer" className="flex items-center cursor-pointer">
                  <div className="p-2 bg-tech-100 text-tech-800 rounded-full mr-3">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  Buyer
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Coordinates</Label>
            <Button type="button" onClick={handleGetCoordinates}>Get Coordinates</Button>
            <p>Latitude: {formData.coordinates.lat}</p>
            <p>Longitude: {formData.coordinates.lng}</p>
          </div>
          
          <GradientButton type="submit" className="w-full mt-6">
            Create account
          </GradientButton>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center p-6 border-t bg-gray-50 text-sm">
        <p>
          Already have an account?{" "}
          <Link to="/auth/login" className="text-eco-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}