import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useRestaurantInfoStore from "@/store/restrauntInfoStore";
import Loader from "./Loader";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;

const containerStyle = {
  width: "100%",
  height: "300px",
};

const MapComponent: React.FC = () => {
  const { basicDetailsData, setBasicDetailsData } = useRestaurantInfoStore();
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        writeLocation(lat, lng);
      },
      console.error,
      { enableHighAccuracy: true }
    );
  }, []);

  const writeLocation = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    setBasicDetailsData("latitude", lat.toString());
    setBasicDetailsData("longitude", lng.toString());
  };

  useEffect(() => {
    const lat = parseFloat(basicDetailsData.latitude);
    const lng = parseFloat(basicDetailsData.longitude);
    if (isNaN(lat) || isNaN(lng)) return;
    setCenter({ lat, lng });
  }, [
    basicDetailsData.latitude,
    basicDetailsData.longitude,
    setBasicDetailsData,
  ]);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    writeLocation(e.latLng.lat(), e.latLng.lng());
  };

  const handleMapLoad = () => {
    const lat = parseFloat(basicDetailsData.latitude);
    const lng = parseFloat(basicDetailsData.longitude);
    if (isNaN(lat) || isNaN(lng)) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const comps = results[0].address_components;
        const mapping: Record<string, keyof typeof basicDetailsData> = {
          premise: "shopNo",
          sublocality: "area",
          locality: "city",
          administrative_area_level_1: "state",
          postal_code: "pinCode",
        };

        comps.forEach((c) =>
          c.types.forEach((t) => {
            const key = mapping[t];
            if (key) setBasicDetailsData(key, c.long_name);
          })
        );
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} loadingElement={<Loader />}>
      <p className="font-medium -mb-2">
        Pin the point to the <span className="font-semibold">Location</span> of
        your Restaurant
      </p>

      {center && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={onMapClick}
          onLoad={handleMapLoad}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MapComponent;
