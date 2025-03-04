// components/Map.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SyncLoader } from 'react-spinners';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

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
  const [leafletIcon, setLeafletIcon] = useState<any>(null);

  // Default coordinates based on country
  const defaultCoordinates: { [key: string]: [number, number] } = {
    TZ: [-6.7924, 39.2083], // Tanzania (Dar es Salaam)
  };

  // Load Leaflet icon only on client side
  useEffect(() => {
    import('leaflet').then(L => {
      const iconInstance = L.icon({
        iconUrl: '/marker/marker.png',
        shadowUrl: '/marker/marker-shadow.png',
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -34],
        shadowSize: [41, 41],
      });
      setLeafletIcon(iconInstance);
    });
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
          {
            headers: {
              'User-Agent': 'lemajr/1.0 (erickbale360@gmail.com)',
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
          setPosition(defaultCoordinates[country] || [-6.7924, 39.2083]);
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setError('Failed to fetch geolocation. Using default coordinates.');
        setPosition(defaultCoordinates[country] || [-6.7924, 39.2083]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [fullAddress, country]);

  if (isLoading || !leafletIcon) {
    return (
      <div className="text-center py-4 bg-slate-50 h-[24rem] w-full mt-8 z-0 rounded-lg flex justify-center items-center">
        <SyncLoader size={14} color="gray" />
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <MapContainer
      center={position || defaultCoordinates[country] || [-6.7924, 39.2083]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[24rem] w-full mt-8 z-0 rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker position={position} icon={leafletIcon}>
          <Popup>
            {address}, {city}, {country}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;