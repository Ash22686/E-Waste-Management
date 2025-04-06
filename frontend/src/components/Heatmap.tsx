import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, Circle, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const Heatmap = ({
  data,
  center,
  zoom,
  onRegionClick,
}: {
  data: any[];
  center: { lat: number; lng: number };
  zoom: number;
  onRegionClick: (region: any) => void;
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDjdQxfohYDiWMhbc8GZ8TR2W4htx4so1w",
    libraries: ["visualization"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (map) {
      map.setCenter(center);
      map.setZoom(zoom);
    }
  }, [center, zoom, map]);

  // Determine circle color based on density (totalRequests)
  const getCircleColor = (totalRequests: number, maxRequests: number) => {
    const density = totalRequests / maxRequests;
    // Simple gradient from light red (#FF9999) to dark red (#8B0000)
    if (density > 0.75) return "#8B0000"; // Dark red
    if (density > 0.5) return "#FF4040"; // Medium red
    if (density > 0.25) return "#FF6666"; // Light red
    return "#FF9999"; // Very light red
  };

  // Determine circle radius based on the level (city, area, colony)
  const getCircleRadius = (regionName: string, totalRequests: number) => {
    // Approximate radius in meters (adjust based on real geographic sizes)
    if (regionName.includes("Pune") || regionName.includes("Mumbai")) {
      return 20000; // Larger radius for cities (~20km)
    } else if (["Shivaji Nagar", "Kothrud", "Hinjewadi", "Andheri", "Bandra", "Goregaon", "Dadar", "Bibwewadi"].includes(regionName)) {
      return 1000; // Smaller radius for areas (~3km)
    } else {
      return 500; // Smallest radius for colonies (~1km)
    }
  };

  if (loadError) {
    return <div className="text-red-500">Error loading Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div className="text-gray-500">Loading map...</div>;
  }

  const maxRequests = Math.max(...data.map((d) => d.totalRequests || 1)); // Avoid division by zero

  return (
    <div className="relative rounded-lg border shadow-md overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={handleMapLoad}
      >
        {data.some((point) => point.type === "user") ? (
          // Show markers for users
          data.map((point, index) =>
            point.type === "user" ? (
              <Marker
                key={index}
                position={{ lat: point.lat, lng: point.lng }}
                onClick={() => onRegionClick(point)}
              />
            ) : null
          )
        ) : (
          // Show circles based on density
          data.map((region, index) => (
            <Circle
              key={index}
              center={{ lat: region.lat, lng: region.lng }}
              radius={getCircleRadius(region.name, region.totalRequests)}
              options={{
                fillColor: getCircleColor(region.totalRequests || 1, maxRequests),
                fillOpacity: 0.5,
                strokeColor: getCircleColor(region.totalRequests || 1, maxRequests),
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
              onClick={() => onRegionClick(region)}
            />
          ))
        )}
      </GoogleMap>
    </div>
  );
};

export default Heatmap;