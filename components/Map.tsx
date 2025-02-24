'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  address: string;
  city: string;
  country: string;
}

const MapComponent: React.FC<MapProps> = ({ address, city, country }) => {
  const fullAddress = `${address}, ${city}, ${country}`;
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default coordinates based on country (e.g., Tanzania)
  const defaultCoordinates: { [key: string]: [number, number] } = {
    TZ: [-6.7924, 39.2083], // Tanzania (Dar es Salaam)
    // Add more countries as needed
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
          {
            headers: {
              'User-Agent': 'lemajr/1.0 (erickbale360@gmail.com)', // Required by Nominatim
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
        } else {
          setError('Geolocation not found. Using default coordinates.');
          setPosition(defaultCoordinates[country] || [-6.7924, 39.2083]); // Fallback to Tanzania
          
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setError('Failed to fetch geolocation. Using default coordinates.');
        setPosition(defaultCoordinates[country] || [-6.7924, 39.2083]); // Fallback to Tanzania
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [fullAddress, country]);

  const defaultIcon = icon({
    iconUrl: '/leaflet/marker.png', // Path to your custom marker icon
    shadowUrl: '/leaflet/marker-shadow.png', // Path to the shadow
    iconSize: [41, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -34], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // Size of the shadow
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading map...</div>;
  }

  if (error) {
    console.warn(error);
  }

  return (
    <MapContainer
      center={position || defaultCoordinates[country] || [-6.7924, 39.2083]} // Default center
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