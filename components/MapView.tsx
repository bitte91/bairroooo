import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../contexts/AppContext';
import { Post, Alert } from '../types';
import L from 'leaflet';

// Fix for Leaflet default icon not found
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export const MapView: React.FC = () => {
  const { posts, alerts } = useApp();

  // Filter items that have coordinates
  const mapPosts = posts.filter(p => p.latitude && p.longitude);

  const centerLat = -23.5505;
  const centerLng = -46.6333;

  return (
    <div className="h-[calc(100vh-200px)] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 z-0">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapPosts.map(post => (
          <Marker
            key={`post-${post.id}`}
            position={[post.latitude!, post.longitude!]}
          >
            <Popup>
              <div className="p-1">
                <strong className="block text-sm font-bold mb-1">{post.title}</strong>
                <p className="text-xs text-gray-600 mb-1">{post.type.toUpperCase()}</p>
                <p className="text-xs">{post.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
