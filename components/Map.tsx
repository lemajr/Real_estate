'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  address?: string;
  city?: string;
  country?: string;
}

const MapComponent: React.FC<MapProps> = ({ address, city, country }) => {
  const fullAddress = `${address}, ${city}, ${country}`;
  const [position, setPosition] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
        } else {
          console.error('Geolocation not found, using default coordinates.');
          setPosition([-6.7924, 39.2083]); // Default to Dar es Salaam if no result
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setPosition([-6.7924, 39.2083]); // Default to Dar es Salaam on error
      }
    };
  
    fetchCoordinates();
  }, [fullAddress]); // Add fullAddress to the dependency array

  const defaultIcon = icon({
    iconUrl: '/leaflet/marker.png', // Path to your custom marker icon
    shadowUrl: '/leaflet/marker-shadow.png', // Path to the shadow
    iconSize: [41, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -34], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // Size of the shadow
  });

  return (
    <MapContainer
      center={position || [-6.7924, 39.2083]} // Default center to Dar es Salaam
      zoom={13}
      scrollWheelZoom={false}
      className="h-[24rem] w-full mt-8 z-0 rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker position={position} icon={defaultIcon}>
          <Popup>
            {address}, {city}, {country}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;