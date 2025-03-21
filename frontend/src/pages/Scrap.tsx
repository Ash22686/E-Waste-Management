import React, { useState } from "react";
import Heatmap from "@/components/Heatmap";
import { Navbar } from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const mockData = {
	cities: [
		{
			name: "Pune",
			locations: [
				{
					name: "Shivaji Nagar",
					lat: 18.5304,
					lng: 73.8567,
					totalRequests: 120,
					estimatedWeight: "1.2 tons",
					colonies: [
						{
							name: "Colony A",
							lat: 18.5314,
							lng: 73.8577,
							totalRequests: 50,
							estimatedWeight: "500 kg",
							users: [
								{
									name: "User 1",
									items: ["Laptop", "Mobile"],
									lat: 18.5324,
									lng: 73.8587,
									images: ["image1.jpg", "image2.jpg"],
								},
							],
						},
					],
				},
				{
					name: "Kothrud",
					lat: 18.5074,
					lng: 73.8077,
					totalRequests: 80,
					estimatedWeight: "800 kg",
					colonies: [
						{
							name: "Colony B",
							lat: 18.5084,
							lng: 73.8087,
							totalRequests: 40,
							estimatedWeight: "400 kg",
							users: [
								{
									name: "User 2",
									items: ["Monitor"],
									lat: 18.5094,
									lng: 73.8097,
									images: ["image3.jpg"],
								},
							],
						},
					],
				},
			],
		},
		{
			name: "Mumbai",
			locations: [
				{
					name: "Andheri",
					lat: 19.1197,
					lng: 72.8468,
					totalRequests: 150,
					estimatedWeight: "1.5 tons",
					colonies: [
						{
							name: "Colony C",
							lat: 19.1207,
							lng: 72.8478,
							totalRequests: 70,
							estimatedWeight: "700 kg",
							users: [
								{
									name: "User 3",
									items: ["Tablet"],
									lat: 19.1217,
									lng: 72.8488,
									images: ["image4.jpg"],
								},
							],
						},
					],
				},
			],
		},
	],
};

export default function Scrap() {
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedColony, setSelectedColony] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Default center (Pune)
  const [mapZoom, setMapZoom] = useState(12); // Default zoom level

  const cityData = mockData.cities.find((city) => city.name === selectedCity);

  const handleRegionClick = (region: any) => {
    if (region.colonies) {
      setSelectedLocation(region);
      setSelectedColony(null);
      setMapCenter({ lat: region.lat, lng: region.lng }); // Update map center
      setMapZoom(14); // Zoom in to location level
    } else if (region.users) {
      setSelectedColony(region);
      setMapCenter({ lat: region.lat, lng: region.lng }); // Update map center
      setMapZoom(16); // Zoom in to colony level
    }
  };

  const goBack = () => {
    if (selectedColony) {
      setSelectedColony(null);
      setMapCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng }); // Reset to location center
      setMapZoom(14); // Reset to location zoom
    } else if (selectedLocation) {
      setSelectedLocation(null);
      setMapCenter({ lat: 18.5204, lng: 73.8567 }); // Reset to city center
      setMapZoom(12); // Reset to city zoom
    }
  };

  const heatmapData = selectedColony
    ? selectedColony.users.map((user) => ({
        lat: user.lat,
        lng: user.lng,
        weight: 1, // Equal weight for users
      }))
    : selectedLocation
    ? selectedLocation.colonies.map((colony) => ({
        lat: colony.lat,
        lng: colony.lng,
        weight: colony.totalRequests, // Weight based on total requests
      }))
    : cityData.locations.map((location) => ({
        lat: location.lat,
        lng: location.lng,
        weight: location.totalRequests, // Weight based on total requests
      }));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex pt-16">
        {/* Map Section */}
        <div className="w-2/3 h-screen sticky top-0">
          <Heatmap data={heatmapData} center={mapCenter} zoom={mapZoom} onRegionClick={handleRegionClick} />
        </div>

        {/* Sidebar Section */}
        <div className="w-1/3 p-6 bg-gray-50 border-l">
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Select City
            </label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {mockData.cities.map((city, index) => (
                  <SelectItem key={index} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Go Back Button */}
          {(selectedColony || selectedLocation) && (
            <Button variant="outline" className="mb-4 flex items-center gap-2" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}

          {/* Content */}
          {selectedColony ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Users in {selectedColony.name}</h2>
              {selectedColony.users.map((user, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Items: {user.items.join(", ")}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : selectedLocation ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Colonies in {selectedLocation.name}</h2>
              {selectedLocation.colonies.map((colony, index) => (
                <Card key={index} className="mb-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRegionClick(colony)}>
                  <CardHeader>
                    <CardTitle>{colony.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Total Requests: {colony.totalRequests}</CardDescription>
                    <CardDescription>Estimated Weight: {colony.estimatedWeight}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-4">Locations in {selectedCity}</h2>
              {cityData.locations.map((location, index) => (
                <Card key={index} className="mb-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRegionClick(location)}>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Total Requests: {location.totalRequests}</CardDescription>
                    <CardDescription>Estimated Weight: {location.estimatedWeight}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}