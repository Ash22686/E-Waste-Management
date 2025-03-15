import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/GradientButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Laptop, ShoppingBag, MapPin } from "lucide-react";
import { fadeUp } from "@/utils/animations";
import { register } from "@/services/authService";
import { Button } from "@/components/ui/button"; // Import the Button component

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
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const data = await register({ ...formData, userType });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/marketplace');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.address) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleGetCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Coordinates obtained:", position.coords.latitude, position.coords.longitude);
          setFormData((prevFormData) => ({
            ...prevFormData,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          setErrorMessage('');
        },
        (error) => {
          console.error("Error getting coordinates:", error);
          setErrorMessage("Failed to get coordinates. Please try again.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
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
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} />
            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label>Coordinates</Label>
            <div className="flex items-center space-x-2">
              <Button type="button" onClick={handleGetCoordinates} className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Get Coordinates</span>
              </Button>
              <div className="text-sm text-gray-600">
                <p>Lat: {formData.coordinates.lat}</p>
                <p>Lng: {formData.coordinates.lng}</p>
              </div>
            </div>
          </div>
          
          {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
          
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