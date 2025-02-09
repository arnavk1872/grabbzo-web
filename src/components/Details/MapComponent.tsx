import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useRestaurantInfoStore from "@/store/restrauntInfoStore";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent: React.FC = () => {
  const { basicDetailsData, setBasicDetailsData } = useRestaurantInfoStore();

  const [selectedLocation, setSelectedLocation] = useState({
    lat: parseFloat(basicDetailsData.latitude),
    lng: parseFloat(basicDetailsData.longitude),
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();

      setSelectedLocation({ lat: newLat, lng: newLng });

      setBasicDetailsData("latitude", newLat.toString());
      setBasicDetailsData("longitude", newLng.toString());
    }
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <p className="font-medium -mb-3">
        Pin the point to the <span className="font-semibold">Location</span> of
        your Restaurant
      </p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
