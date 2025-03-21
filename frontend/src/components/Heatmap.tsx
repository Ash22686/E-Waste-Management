import React, { useState, useEffect } from "react";
import { GoogleMap, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api";

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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDjdQxfohYDiWMhbc8GZ8TR2W4htx4so1w", // Replace with your API key
    libraries: ["visualization"], // Required for heatmap
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (map) {
      map.setCenter(center); // Update the map's center
      map.setZoom(zoom); // Update the map's zoom level
    }
  }, [center, zoom, map]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onLoad={handleMapLoad}
    >
      <HeatmapLayer
        data={data.map((point) => ({
          location: new google.maps.LatLng(point.lat, point.lng),
          weight: point.weight, // Weight based on e-waste type/quantity
        }))}
        options={{
          radius: 30,
          opacity: 0.7,
        }}
      />
    </GoogleMap>
  );
};

export default Heatmap;