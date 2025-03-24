import React, { useState, useEffect } from "react";
import Heatmap from "@/components/Heatmap";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export default function Scrap() {
  const [users, setUsers] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Default center (Pune)
  const [mapZoom, setMapZoom] = useState(10); // Default zoom for 'city' level
  const [selectedLevel, setSelectedLevel] = useState("city"); // city, area, colony, or user
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Fetch sellers with listings from the backend
  useEffect(() => {
    const fetchSellersWithListings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/sellers-with-listings");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch sellers with listings:", error);
      }
    };

    fetchSellersWithListings();
  }, []);

  // Update heatmap data based on the selected level and region
  useEffect(() => {
    if (selectedLevel === "city") {
      const cityHeatmap = users.reduce((acc, user) => {
        const city = user.address.city;
        if (!acc[city]) {
          acc[city] = {
            lat: user.address.coordinates.lat,
            lng: user.address.coordinates.lng,
            weight: 1,
            name: city,
            totalRequests: users.filter((u) => u.address.city === city).length,
            estimatedWeight: `${users
              .filter((u) => u.address.city === city)
              .reduce((sum, u) => sum + parseFloat(u.estimatedWeight), 0)} kg`,
          };
        } else {
          acc[city].weight += 1;
        }
        return acc;
      }, {});
      setHeatmapData(Object.values(cityHeatmap));
    } else if (selectedLevel === "area") {
      const areaHeatmap = users
        .filter((user) => user.address.city === selectedRegion?.name)
        .reduce((acc, user) => {
          const area = user.address.area;
          if (!acc[area]) {
            acc[area] = {
              lat: user.address.coordinates.lat,
              lng: user.address.coordinates.lng,
              weight: 1,
              name: area,
              totalRequests: users.filter(
                (u) => u.address.area === area && u.address.city === selectedRegion?.name
              ).length,
              estimatedWeight: `${users
                .filter((u) => u.address.area === area && u.address.city === selectedRegion?.name)
                .reduce((sum, u) => sum + parseFloat(u.estimatedWeight), 0)} kg`,
            };
          } else {
            acc[area].weight += 1;
          }
          return acc;
        }, {});
      setHeatmapData(Object.values(areaHeatmap));
    } else if (selectedLevel === "colony") {
      const colonyHeatmap = users
        .filter((user) => user.address.area === selectedRegion?.name)
        .reduce((acc, user) => {
          const colony = user.address.colony;
          if (!acc[colony]) {
            acc[colony] = {
              lat: user.address.coordinates.lat,
              lng: user.address.coordinates.lng,
              weight: 1,
              name: colony,
              totalRequests: users.filter(
                (u) => u.address.colony === colony && u.address.area === selectedRegion?.name
              ).length,
              estimatedWeight: `${users
                .filter(
                  (u) => u.address.colony === colony && u.address.area === selectedRegion?.name
                )
                .reduce((sum, u) => sum + parseFloat(u.estimatedWeight), 0)} kg`,
            };
          } else {
            acc[colony].weight += 1;
          }
          return acc;
        }, {});
      setHeatmapData(Object.values(colonyHeatmap));
    } else if (selectedLevel === "user") {
      setHeatmapData(
        users
          .filter((user) => user.address.colony === selectedRegion?.name)
          .map((user) => ({
            ...user.address.coordinates,
            type: "user",
            name: user.name,
          }))
      );
    }
  }, [selectedLevel, selectedRegion, users]);

  // Handle region click to drill down into the next level
  const handleRegionClick = (region) => {
    if (selectedLevel === "city") {
      setSelectedLevel("area");
      setMapCenter({ lat: region.lat, lng: region.lng });
      setMapZoom(12);
      setSelectedRegion(region);
    } else if (selectedLevel === "area") {
      setSelectedLevel("colony");
      setMapCenter({ lat: region.lat, lng: region.lng });
      setMapZoom(14);
      setSelectedRegion(region);
    } else if (selectedLevel === "colony") {
      setSelectedLevel("user");
      setMapCenter({ lat: region.lat, lng: region.lng });
      setMapZoom(16);
      setSelectedRegion(region);
    }
  };

  // Handle going back to the previous level
  const goBack = () => {
    if (selectedLevel === "user") {
      // Going back from 'user' to 'colony'
      setSelectedLevel("colony");
      setMapZoom(14);
      // Find the parent area for the selected colony
      const parentArea = users.find(
        (user) => user.address.colony === selectedRegion?.name
      )?.address.area;
      const areaRegion = {
        name: parentArea,
        lat: users.find((user) => user.address.area === parentArea)?.address.coordinates.lat,
        lng: users.find((user) => user.address.area === parentArea)?.address.coordinates.lng,
      };
      setSelectedRegion(areaRegion);
      setMapCenter({ lat: areaRegion.lat, lng: areaRegion.lng });
    } else if (selectedLevel === "colony") {
      // Going back from 'colony' to 'area'
      setSelectedLevel("area");
      setMapZoom(12);
      // Find the parent city for the selected area
      const parentCity = users.find(
        (user) => user.address.area === selectedRegion?.name
      )?.address.city;
      const cityRegion = {
        name: parentCity,
        lat: users.find((user) => user.address.city === parentCity)?.address.coordinates.lat,
        lng: users.find((user) => user.address.city === parentCity)?.address.coordinates.lng,
      };
      setSelectedRegion(cityRegion);
      setMapCenter({ lat: cityRegion.lat, lng: cityRegion.lng });
    } else if (selectedLevel === "area") {
      // Going back from 'area' to 'city'
      setSelectedLevel("city");
      setMapZoom(10);
      setSelectedRegion(null);
      setMapCenter({ lat: 18.5204, lng: 73.8567 }); // Reset to default center (Pune)
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex pt-16">
        {/* Map Section */}
        <div className="w-2/3 h-screen sticky top-0 p-4">
          <Heatmap
            data={heatmapData}
            center={mapCenter}
            zoom={mapZoom}
            onRegionClick={handleRegionClick}
          />
        </div>

        {/* Sidebar Section */}
        <div className="w-1/3 p-6 bg-gray-50 border-l">
          {selectedRegion && (
            <Button variant="outline" className="mb-4 flex items-center gap-2" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}

          <div>
            <h2 className="text-lg font-bold mb-4">
              {selectedLevel === "user"
                ? `Users in ${selectedRegion?.name || "Selected Region"}`
                : `Heatmap for ${selectedLevel}`}
            </h2>
            {selectedLevel === "user"
              ? users
                  .filter((user) => user.address.colony === selectedRegion?.name)
                  .map((user, index) => (
                    <Card key={index} className="mb-4">
                      <CardHeader>
                        <CardTitle>{user.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>Items: {user.items.join(", ")}</CardDescription>
                        <CardDescription>Estimated Weight: {user.estimatedWeight}</CardDescription>
                      </CardContent>
                    </Card>
                  ))
              : heatmapData.map((region, index) => (
                  <Card
                    key={index}
                    className="mb-4 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => handleRegionClick(region)}
                  >
                    <CardHeader>
                      <CardTitle>{region.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Total Requests: {region.totalRequests}</CardDescription>
                      <CardDescription>Estimated Weight: {region.estimatedWeight}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}