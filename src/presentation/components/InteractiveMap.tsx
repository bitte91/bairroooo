import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for Leaflet default icon not loading correctly in React
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapLocation {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface InteractiveMapProps {
  locations?: MapLocation[];
}

const TAUBATE_COORDINATES: [number, number] = [-23.0257, -45.5559];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ locations = [] }) => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={TAUBATE_COORDINATES}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <div className="font-bold">{loc.name}</div>
              <div>{loc.description}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
